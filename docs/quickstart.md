---
id: quickstart
title: Quick Start
---

 1. Install Buckaroo and Buck
 2. Run 
 
```
$ buckaroo quickstart
```

 3. Run the generated app:

```bash
$ buck run :app
Parsing buck files: finished in 0.7 sec (100%)
Building: finished in 1.0 sec (100%) 6/6 jobs, 6 updated
  Total time: 1.9 sec
Hello, world.
```

 4. Add a dependency:

```bash
$ buckaroo add github.com/buckaroo-pm/ericniebler-range-v3@branch=master
```

 5. Now you can use range-v3. Update `main.cpp` to:

```cpp
#include <iostream>
#include <vector>
#include <range/v3/all.hpp>

int main() {
  auto const xs = std::vector<int>({ 1, 2, 3, 4, 5 });
  auto const ys = xs
    | ranges::view::transform([](auto x) { return x * x; })
    | ranges::to_vector;

  for (auto const& i : ys) {
    std::cout << i << std::endl;
  }

  return 0;
}
```


**🚨 WARNING**

If your C++ compiler does not default to C++ 14, then you will need to add this to your `.buckconfig` file: 

```buck
[cxx]
  cxxflags = -std=c++14
```