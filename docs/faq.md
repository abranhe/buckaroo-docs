---
id: faq
title: FAQ
---

## How is Buckaroo different from ...?

### wget

You can use `wget` and some shell scripts to cobble together a dependency management solution. Buckaroo improves on this by offering:

 * Deterministic installations of packages
 * SAT solver to find a set of package versions that work together
 * Graph flattening to ensure transitive dependencies are shared correctly
 * Native Git integration to install packages directly from source-control
 * Buckaroo generates a build-graph that links your dependencies together
 * Works in PowerShell and Bash environments
 * An upgrade mechanism to new versions of your dependencies
 * A much nicer CLI 😉

### Git Submodules

Git does not do any constraint solving over submodules, so you must generate and flatten your dependency graph by hand. This is entirely impractical as the number of nodes in your dependency graph grows. It also does not generate a build-graph for you, which is something that Buckaroo provides. 

### apt-get

`apt-get` is used to install _system-level_ packages on Debian systems, whereas Buckaroo is used to install _project-level_ packages on all systems. The disadvantages of using `apt-get` for project-level packages are: 

 * It is tied to the operating system. `apt-get` only works cleanly on Linux, and usually only on Debian environments.
 * Installing binaries onto your system does not help with cross-compilation.
 * It modifies your system. What happens when you are working on two projects that require different versions of a dependency?
 * `apt-get` does not guarantee reproducibility (unless you rigorously lock down the PPAs)
 * You have little control over the chosen ABI, build configuration or standard library used
 * It does not allow you to install experimental code directly from source-control

### Nix

Buckaroo and Nix share the same philosophy of reproducible installations and builds, but they provide two different things. Nix is used to fetch and install _files_ in a deterministic way, whereas Buckaroo is used to fetch _build targets_. The difference to the user is that Buckaroo will glue together your dependencies to generate an optimal build-graph for your project, whereas Nix will put your dependencies into a given location. 

So Nix and Buckaroo are actually complementary: you could use Nix to install system packages, such as the compiler toolchain and  pkg-config libraries, but Buckaroo for fetching project packages and gluing them together. This is similar to how you might install Yarn via Nix. 

To illustrate this difference, consider Boost, which is available for both Nix and Buckaroo. Nix can build Boost from source, and it will put the artefacts into `include` and `lib`. Buckaroo, on the other hand, will download Boost into your project folder and integrate the source-code with your build system, so you do not need to supply any include-paths or linker flags. Buckaroo will automatically only build the parts you actually use. 

Additionally, Buckaroo (and Buck) can run in PowerShell or Cmd on Windows. 


## Why F#? 

We *really* wanted to use C++ to implement Buckaroo, but the lack of monads and tail-call recursion made it a quite scary task and hard to get it right. We invested quite a lot of time implementing the necessary building blocks (e.g. [Conduit](https://github.com/LoopPerfect/conduit), [Satori](https://github.com/LoopPerfect/satori)), but concluded that the Corotine TS is not _quite_ ready for such a task. We had to fight with many compiler bugs and even ICEs (Internal Compiler Exceptions)!

C++ is _absolutely_ the best tool for many applications, but package management (IO-bound, extremely complex execution flow) is currently not one of them. You need to use the right tool for the job!

Still, we remain hopeful that the standards committee will implement these features! 🙏🏻


## Do I need to use Mono then?

Nope! _Absolutely not!_ Buckaroo is built using .NET Core AoT compilation to create a native executable that is then bundled into a single portable app. You can just `wget` and go! 😎


## Does Buck require Java?

*No*. You can download Buck as a [[single-file bundle|installation#portable-1]], in addition to the usual installation options provided by Facebook. 
