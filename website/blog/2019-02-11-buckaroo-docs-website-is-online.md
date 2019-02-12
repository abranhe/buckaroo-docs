---
title: Buckaroo Documentation website is now online
author: Carlos Abraham
authorURL: https://github.com/abranhe
authorImageURL: https://avatars3.githubusercontent.com/u/21347264?s=100
---

Buckaroo is been around one year and a half making life easier for C/C++ developers to manage dependencies on their projects in a controlled and cross-platform way. 

After many many commits and hard work [Buckaroo v2.0.0](https://github.com/LoopPerfect/buckaroo/releases/tag/v2.0.0) has arraived, removing around [17k lines of **Java** code and replaced it with 8k lines of **F#**](https://github.com/LoopPerfect/buckaroo/pull/285). Incorporating your feedbacks, accommodating the lessons learned from previous versions and closing over 85 issues in the process.

### Here are some of accomplishments of **Buckaroo v2.0.0**:

#### Live at Head - Depend on Moving Branches & Tags
You can now treat Git branches & tags as versions too!

Thanks to our locking mechanism we ensure that the installation is reproducible even if the branch or tag is updated. When you are ready to move to the next version, just do buckaroo upgrade.

##### New Robotic Team-Members: Upgrade Bot & Patch Bot
Upgrade Bot and Patch Bot are now operational and work hard to update and port packages to the buckaroo ecosystem. These are all tested on Travis CI.

#### 100% Decentralised, no Cookbook or Publishing Process
Buckaroo now does not need a central repository of packages.
This means any URL - Git or HTTP - can be installed as long as it has a buckaroo.toml file.

#### Works Offline - Download Once Install Many Times.
We cache all packages centrally, so you can work offline.

Allows any build configuration (even on a package-by-package basis)
Private and public dependencies to avoid "dependency hell"
Packages can declare private dependencies, whose version does not have to be shared with the rest of the project. Escape dependency hell!

Multiple libraries per package, so tools like Lerna are unnecessary
You can now pull individual components out of a package.

#### Smart Version Reconciliation
Did you know that boostorg/iterator v1.67.0 points to the same commit as v1.68.0?

Buckaroo is now smart enough to detect that those two version on Git point to the same revision and therefore are equivalent. We discovered that when a package manager understands this, it reduces the need to resolve many dependency conflicts.

#### No Java Dependency
We got rid of the JVM and use a Warp bundle to ship a self contained executable for Linux, Mac and Windows. Oh, and we also did this for Buck!

#### TOML over JSON
It might seem to be a small cosmetic change, but we discovered TOML is not only easier to read but also reduces the number of merge conflicts in manifest and lock files. Buckaroo v2.0.0 only uses TOML.

## Documentation website

With all those changes the Buckaroo team needed to recreate the Documentation website previously hosted on the Buckaroo Github's wiki page and moving it to what is today https://docs.buckaroo.pm.