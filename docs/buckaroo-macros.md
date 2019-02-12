---
id: buckaroo-macros
title: Buckaroo Macros
---

Buckaroo will install some macros for use in your build scripts. If you have used quickstart, then you do not need to set this up.

However, if you need something more custom, this is how they work:

```py
# Load the macros
load('//:buckaroo_macros.bzl', 'buckaroo_cell', 'buckaroo_deps', 'buckaroo_deps_from_package')

# Or just load the one you need
# load('//:buckaroo_macros.bzl', 'buckaroo_deps')

# buckaroo_deps gives you all list of all dependencies in buckaroo.toml
# This is the function you will use most of the time.
all_deps = buckaroo_deps()
# [ 'buckaroo.github.buckaroo-pm.hello//:hello' ]

# buckaroo_cell gives you the cell name for a give package
hello_cell = buckaroo_cell('github.com/buckaroo-pm/hello')
# 'buckaroo.github.buckaroo-pm.hello'

# buckaroo_deps_from_package gives you all deps for a given package
# Unlike most package managers, Buckaroo supports multiple projects per package!
hello_deps = buckaroo_deps_from_package('github.com/buckaroo-pm/hello')
# [ 'buckaroo.github.buckaroo-pm.hello//:hello' ]