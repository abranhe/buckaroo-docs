---
id: commands
title: Commands
---

## Init

```bash=
$ buckaroo init
```

Create a Buckaroo manifest in the current working directory.

## Resolve

```bash=
$ buckaroo resolve
```

Generates a fresh lock-file from the existing manifest.

To resolve with an upgrading strategy:

```bash=
$ buckaroo resolve --upgrade
```

## Install

```bash=
$ buckaroo install
```

Installs the packages as described in the current lock-file.

## Add

```bash
$ buckaroo add <package>[@<version>]...
```

Adds the given package(s) to the current manifest, updates the lock-file and installs it to the packages folder.

If no satisfactory resolution can be found then nothing is changed.

For example: 

```bash
$ buckaroo add github.com/buckaroo-pm/boost-spirit
```

## Upgrade

```bash
$ buckaroo upgrade [ <package> ]
```

Upgrades the given package(s) to the highest version that meets the constraints in the manifest. This command will also install the upgraded packages. 

If no packages are specified, then all packages are upgraded.

## Remove

```bash
$ buckaroo remove <package>...
```

Removes an existing package from the manifest and updates the lock-file.

If no satisfactory resolution can be found then nothing is changed.

## Version

```bash
$ buckaroo version
```

Displays the version of this installation of Buckaroo.
