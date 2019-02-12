---
id: vc-dsl
title: Version Constraints DSL
---

When adding a dependency on a package, you must specify a constraint on the version. Since Buckaroo can work directly on Git, this is a little different to other package managers: 

 * `v1`, `1`, `1.0.0`, `1.0.0` take only semantic version `1.0.0`
 * `>= 1.2` take only semantic versions >= `1.2.0`
 * `^1.2` works as in [NPM](https://docs.npmjs.com/about-semantic-versioning)
 * `~1.2` works as in [NPM](https://docs.npmjs.com/about-semantic-versioning)
 * `branch=master` take only commits on branch `master`
 * `tag=some-tag` take only commits at tag `some-tag`
 * `revision=dc16c91af2519b6129a33bd6e1675ebf73739103` take only revision `dc16c91...`
 * `any(branch=master tag=abc 1.2.3)` take versions that satisfy at least one of: 
   - `branch=master`
   - `tag=abc`
   - `1.2.3`
 * `all(branch=master branch=develop)` take versions that satisfy all of: 
   - `branch=master`
   - `branch=develop`
 * `!tag=abc` take any version that does *not* satisfy `tag=abc`
 
As you might expect, these building blocks can be combined to write complex expressions: 

 * `all(!branch=master any(tag=abc tag=def 1.0.0))`
 * `all(>=1.0.0 !any(1.0.0 1.3.4 revision=dc16c91af2519b6129a33bd6e1675ebf73739103))`