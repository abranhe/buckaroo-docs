---
id: creating-a-package
title: Creating a package
---

Creating a Buckaroo package is really easy!

You will need to create a few files:

 * `BUCK` containing a build rule ([example](https://github.com/buckaroo-pm/hello/blob/master/BUCK#L1))
 * `buckaroo.toml` containing `targets = [ "<some-build-rule>" ]` ([example](https://github.com/buckaroo-pm/hello/blob/master/buckaroo.toml))

Push these to GitHub.

Now, you can install your package as follows:

```bash
$ buckaroo add github.com/<org>/<project>@branch=master
```

You can also look at our [demo package](github.com/buckaroo-pm/hello) or the many [official packages](https://github.com/buckaroo-pm).
