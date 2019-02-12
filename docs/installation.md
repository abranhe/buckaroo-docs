---
id: installation
title: Installation
sidebar_label: Intallation
---

## Portable

Buckaroo is shipped as a self-contained executable, so all you need to do is download the bundle from the [releases page](https://github.com/LoopPerfect/buckaroo/releases).

### Linux

```bash
$ wget https://github.com/LoopPerfect/buckaroo/releases/download/v2.0.0/buckaroo-linux -O buckaroo
$ chmod +x ./buckaroo
$ ./buckaroo
```

### macOS

```bash
$ wget https://github.com/LoopPerfect/buckaroo/releases/download/v2.0.0/buckaroo-macos -O buckaroo
$ chmod +x ./buckaroo
$ ./buckaroo
```

### Windows

Download [buckaroo.exe](https://github.com/LoopPerfect/buckaroo/releases/download/v2.0.0/buckaroo-windows.exe) from the [release page](https://github.com/LoopPerfect/buckaroo/releases/v2.0.0)

This can also be done directly using PowerShell:

```
wget https://github.com/LoopPerfect/buckaroo/releases/download/v2.0.0/buckaroo-windows.exe >buckaroo.exe
./buckaroo.exe
```

### Telemetry

Buckaroo contains telemetry so that we know how many users we have for each platform. We generate a random UUID on first launch, and no personal information is sent. Please refer to the [source-code](https://github.com/LoopPerfect/buckaroo/blob/master/buckaroo/Telemetry.fs) or open an issue if you are unsure. 

To _completely_ disable this, just set the `BUCKAROO_TELEMETRY_OPT_OUT` environment variable to any value: 

```bash
export BUCKAROO_TELEMETRY_OPT_OUT=1
```

## Buck

Buckaroo uses [Buck](https://buckbuild.com/) as a packaging format and build system, so you will also need to [install that](https://buckbuild.com/setup/getting_started.html). 

You can install Buck in a number of ways, so here is an overview of the options to help you decide: 

 * Linux 
   - Debian package (see the [Buck releases](https://github.com/facebook/buck/releases))
   - Linuxbrew (use [this tap](https://github.com/facebook/homebrew-fb))
   - Portable (maintained by us, see below)
 * macOS 
   - Homebrew (use [this tap](https://github.com/facebook/homebrew-fb))
   - Portable (maintained by us, see below)
 * Windows 
   - Chocolatey (use [this Choco package](https://chocolatey.org/packages/buck))
   - Portable (maintained by us, see below)

Comprehensive instructions are [provided by Facebook](https://buckbuild.com/setup/getting_started.html). 

## Portable

Often, the *quickest* way to get up and running with Buck is to use our Warp bundles. These are portable applications that you can just download and run! 

### Linux

```bash
# Linux
$ wget https://github.com/njlr/buck-warp/releases/download/v0.3.0/buck-2019.01.10.01-linux -O buck
$ chmod +x ./buck
$ ./buck
```

### macOS

```bash
# macOS
$ wget https://github.com/njlr/buck-warp/releases/download/v0.3.0/buck-2019.01.10.01-osx -O buck
$ chmod +x ./buck
$ ./buck
```

### Windows

Download [buck.exe](https://github.com/njlr/buck-warp/releases/download/v0.3.0/buck-2019.01.10.01-windows.exe)
from the [release page](https://github.com/njlr/buck-warp/releases)

This can also be done directly using PowerShell:

```
wget https://github.com/njlr/buck-warp/releases/download/v0.3.0/buck-2019.01.10.01-windows.exe >buck.exe
./buck.exe version
```