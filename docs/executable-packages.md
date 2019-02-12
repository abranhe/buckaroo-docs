---
id: executable-packages
title: Executable Packages
---

Some packages contain a library and a complementary tool. For example, Protobuf provides `libproto`, which is a library, and `protoc`, which is a compilation tool. Often, it is essential that the versions of these match up, so Buckaroo is a great way to manage this kind of dependency. 

## Example: Protobuf with Buckaroo

Since Protobuf is a canonical case, let's walk through an example. The concepts are largely the same for similar tools. You can see the [complete example on GitHub](https://github.com/njlr/buckaroo-protobuf-example).

First, lets create a project folder: 

```bash
mkdir protobuf-example
cd protobuf-example
buckaroo init
```

We need to install Protobuf. 

```bash
buckaroo add github.com/buckaroo-pm/protobuf@2.6.1
```

Now we can run `protoc`, provided by the Buckaroo package: 

```bash
buck run buckaroo.github.buckaroo-pm.protobuf//:protoc
```

The long prefix (`buckaroo.github.buckaroo-pm.protobuf`) is the Buck cell into which Buckaroo has installed the package. In your build scripts you can [[use a macro|buckaroo-macros]] to fetch this in a cleaner way. 

Awesome. We will repurpose the "address book" example that ships with Protobuf to illustrate how to use the package. 

First, create [`addressbook.proto`](https://github.com/njlr/buckaroo-protobuf-example/blob/master/addressbook.proto):

```bash
wget https://raw.githubusercontent.com/njlr/buckaroo-protobuf-example/master/addressbook.proto
```

Next, create two C++ programs, one to [add a person to the address book](https://github.com/njlr/buckaroo-protobuf-example/blob/master/add_person.cc) and one to [list the people already there](https://github.com/njlr/buckaroo-protobuf-example/blob/master/list_people.cc). 

```bash
wget https://raw.githubusercontent.com/njlr/buckaroo-protobuf-example/master/add_person.cc
wget https://raw.githubusercontent.com/njlr/buckaroo-protobuf-example/master/list_people.cc
```

With these in place, we can write a `BUCK` file to build them. 

We will leverage some utilities from [utils.bzl](https://github.com/LoopPerfect/utils.bzl), so fetch that:

```bash
wget https://raw.githubusercontent.com/LoopPerfect/utils.bzl/master/utils.bzl
```

Here is the `BUCK` file: 

```
load('//:buckaroo_macros.bzl', 'buckaroo_cell')
load('//:utils.bzl', 'extract')

# The cell name of the Protobuf package
# 'buckaroo.github.buckaroo-pm.protobuf'
protobuf_cell = buckaroo_cell('github.com/buckaroo-pm/protobuf')

# The Buck target for protoc, the Protobuf compiler
# 'buckaroo.github.buckaroo-pm.protobuf//:protoc'
protoc = protobuf_cell + '//:protoc'

# The Buck target for the Protobuf library
# 'buckaroo.github.buckaroo-pm.protobuf//:protobuf'
protobuf = protobuf_cell + '//:protobuf'

# Generate C++ code from addressbook.proto
genrule(
  name = 'addressbook-cpp',
  out = 'out',
  srcs = [
    'addressbook.proto',
  ],
  cmd = 'mkdir -p $OUT && $(exe ' + protoc + ') $SRCDIR/addressbook.proto --proto_path=$SRCDIR --cpp_out=$OUT',
)

# Group the generated code into a library
cxx_library(
  name = 'addressbook',
  header_namespace = '',
  exported_headers = {
    'addressbook.pb.h': extract(':addressbook-cpp', 'addressbook.pb.h'),
  },
  srcs = [
    extract(':addressbook-cpp', 'addressbook.pb.cc'),
  ],
  deps = [
    protobuf,
  ],
)

# Tool for adding a person to the database
cxx_binary(
  name = 'add-person',
  srcs = [
    'add_person.cc',
  ],
  deps = [
    ':addressbook',
  ],
)

# Tool for listing people in the database
cxx_binary(
  name = 'list-people',
  srcs = [
    'list_people.cc',
  ],
  deps = [
    ':addressbook',
  ],
)
```

Now we can run the tools. 

To add a person to the database `ab`, do: 

```bash
buck run :add-person -- ab
```

Then, to view the people you have added, do: 

```bash
buck run :list-people -- ab
```

## How it Works

In Buckaroo, packages can export multiple targets. These targets can be libraries, files or even executables. In this case, we have the Protobuf library (`protobuf`) and the compiler (`protoc`), an executable. 

We can call an executable inside of a `genrule`, allowing us to create source files as part of the build process. This what the target called `addressbook-cpp` does. 

Next, we can pass those sources-files to a C++ library target, in this case `addressbook`. We can also depend on the Protobuf library. 

Finally, building the two tools is very simple, because the headers and symbols they require are provided by `addressbook`, so they can just depend on that. 