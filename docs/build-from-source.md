---
id: build-from-source
title: Build from source
---

## Why Build From Source?

With system package managers, a common mode of distribution is binary packages. This works well for tools, but it is less than ideal for libraries. 

The problem is compilation flags. For many flags, it is crucial that libraries that we link together are compiled for the same architecture and using the same flags. If they are not, then you will get undefined references, symbol collisions or (worse) binary layout mismatches. 

It might be tempting to invent a receipt system—this binary was compiled with these flags—and store binaries for a combination of flags, but this quickly hits scaling issues. How do we know which combinations of binaries are important to people when there are so many combinations? Even just with boolean flags, there are `2^n` possibilities!

That aside, there might be experimental versions of a library, perhaps on a branch, that you want to experiment with. 

Inevitably, we will have to fallback to builds from source... so we better make sure this is fast! C++ compilation is notoriously slow and many of the optimization passes in LLVM are NP-complete. There's not much we can do there. What we can do is cache build artefacts between sessions and even across the network. 

Buckaroo enables this because every package builds with Buck. Like most build-systems, Buck can be used with CCache, but additionally you can enable a [Buck HTTP cache](https://github.com/uber/buck-http-cache) to share artefacts across your team. With the cache enabled, Buck will detect when a particular build step (e.g. the compilation of a translation-unit) has been done in the past, and pull the artefact from the cache. You can learn more about the Buck cache API in [their documentation](https://buckbuild.com/concept/http_cache_api.html). 

<img src="https://raw.githubusercontent.com/LoopPerfect/buckaroo/fa17e1a14bb915c77d652b81b5e101e63a05b52b/www/packages.png" height="200" alt="Packages" />


With this mechanism in place, the question then becomes: why have binary packages at all? If our artefact cache is effective (and it has to be for the reasons given above), then binary packages are simply a less flexible, less granular and more error-prone implementation of the same idea. 

This why Buckaroo packages build from source.