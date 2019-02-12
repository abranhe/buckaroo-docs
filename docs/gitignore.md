---
id: gitignore
title: To .gitignore or not to .gitignore?
---

A general purpose `.gitignore` for Buckaroo projects is: 

```
.buckd
buck-out
.buckconfig.local
.buckconfig.d
buckaroo
buckaroo_macros.bzl
```

You should always check-in you `buckaroo.lock.toml`!

This file gives you reproducible installations of your dependencies every time you build. 