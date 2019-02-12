---
id: cpp-developement-in-powershell
title: C++ developement in powershell
---

 > Note: Working inside "Developer Command Prompt for VS 2017" should work out of the box and may be preferred.
However if you want to use PowerShell and VC++, this is page is for you. 

This is how you configure PowerShell for C++ development so you can use Visual Studio Toolchain.
We need to export Visual Studio Environment Variables in PowerShell as this is not done by default.

 1. Install Visual Studio from https://visualstudio.microsoft.com/ and make sure you've installed VC++
 2. Open PowerShell as administrator and run the following commands:

```bash
set-executionpolicy unrestricted
Install-Module -Name PSCX -AllowClobber
Install-Module -Name VSSetup -AllowClobber
Import-VisualStudioVars 2017 amd64
```

Now you can use Visual Studio Compiler and tools like Buck will be able to pick up your toolchain.
As `Import-VisualStudioVars 2017 amd64` is not exporting the environment variables permanently you will need to rerun this command on every new PowerShell session.
 
```bash
Import-VisualStudioVars 2017 amd64
cd path/to/project
buck build :app
```

Credits to @shybovycha who shared this instructions [here](https://github.com/facebook/buck/issues/1849). 