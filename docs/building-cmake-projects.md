---
id: building-cmake-projects
title: Building CMake Projects
---

Buckaroo uses Buck build to allow packages to be easily integrated together. This is possible because Buck takes a declarative approach and abstracts over the linking process. This means that to introduce a non-Buck package into the Buckaroo ecosystem, we must supply rules to Buck that enable it to find its _headers_, _static libraries_ and _shared libraries_. 

## Buck and CMake

When integrating a CMake project, there are three approaches you can take: 

_(from best to worst)_

 1. Port the build entirely to Buck :crown: 
 2. Call CMake inside of a Buck `genrule` to generate headers (e.g. `config.h`), and port the compilation process to Buck :ok_hand: 
 3. Call CMake inside of a Buck `genrule` :disappointed: 

(Buck)aroo takes _reproducibility_ & _cross-compilation_ very seriously, wheras CMake does not guarantee reproducible builds because it is not hermetically sealed.

Therefore, when porting libraries a pure Buck build is preferable. If your build can be described using only glob patterns, [this](https://buckbuild.com/rule/cxx_library.html) will be very straight forward, and is the approach you should take. However, if you have a complex CMake build, wrapping it will get you off the ground quickly.

We have created a [small library of utilities](https://github.com/LoopPerfect/utils.bzl) to make this process more convenient.

## Wrapping a CMake build

It is possible to call CMake from Buck, which defers the whole build process to CMake. This is the most pragmatic way to port a CMake project.

First, download our utilities library into your project folder: 

```bash
wget https://raw.githubusercontent.com/LoopPerfect/utils.bzl/master/utils.bzl
```

Now, create a `BUCK` file at the root level: 

```python
load('//:utils.bzl', 'cmake', 'extract' , 'extractFolder')

cmake(
  name = 'cmake',
  prefix = 'dist',
  targets = [ 'install' ],
  srcs = glob([
    'include/**',
    'srcs/**',
    '*.txt',
  ]),
)

prebuilt_cxx_library(
  name = 'foo',
  header_namespace = '',
  shared_lib = extract(':cmake', 'dist/lib/libfoo.so'),
  static_lib = extract(':cmake', 'dist/lib/libfoo.a'),
  header_dirs = [ 
    extractFolder(':xerces-cmake', 'dist/include')
  ]
)
```

This will seamlessly integrate your CMake build into the Buck build. 

You will gain some of the benefits of Buck, such as build artefact caching. However, Buck will not be able to optimize your build and you won't be able to benefit from Buck's parallelization and scheduling strategies. From Buck's perspective, CMake is a black-box! 

In the next section, we demonstrate how you can mitigate the caveats by using CMake only for configuration.  

## Wrapping CMake Configure Only

This is a minimal wrapper over CMake's configure step.

Many CMake projects have a simple structure and generate a few configuration based files (usually `.in`), but the rest of the build can be described using only globs. If this is the case for your project, this template could be for you. 

This snippet shows you how to wrap CMake, extract a generated `config.h` and use it in Buck.

```python
load('//:utils.bzl', 'cmake', 'extract')

cmake(
  name = 'config',
  srcs = glob([ # declare all files needed for cmake   
    'src/**', 
    'CMakeLists.txt',
  ]),
)

cxx_library(
  name = 'foo',
  header_namespace = '',
  exported_headers = subdir_glob([
    'include', '**/*.h',
  ]),
  headers = {
    'foo/config.h': extract(':cmake', 'include/config.h'),
  },
  srcs = glob([
    'src/**/*.c', 
    'src/**/*.cpp',
  ]),
  visibility = [
    'PUBLIC',
  ],
)
```

This approach still has a dependency on CMake, but you will have all of the benefits of a Buck build. More specifically, Buck will be able to cache, parallelize and optimize your build. Buck will also perform LTO (if desired) and enable you to choose between static and shared builds based on your needs.

You may also consider generating the `config.h` for each target platform and checking it into your VCS to remove the dependency on CMake. 