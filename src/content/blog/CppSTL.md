---
title: 杂项 | 算竞常用 C++ STL 用法
author: zouht
description: Brief Introduction to C++ STL
pubDate: 2026-02-07
tags: [Coding,Notes,Cpp]
categories: [Coding Notes]
---

# 杂项 | 算竞常用 C++ STL 用法

> **时间：** 2023-09-28
> **分类：** 杂项
> **来源：** [颢天笔记](https://io.zouht.com/)

**C++ 标准模板库 (STL, Standard Template Library)**：包含一些常用数据结构与算法的模板的 C++ 软件库。其包含四个组件——算法 (Algorithms)、容器 (Containers)、仿函数 (Functors)、迭代器 (Iterators)。

**示例：**

- **算法：** `sort(a.begin(), a.end())`
- **容器：** `priority_queue<int> pque`
- **仿函数：** `greater<int>()`
- **迭代器：** `vector<int>::iterator it = a.begin()`

---

## 1 前言

STL 作为一个封装良好，性能合格的 C++ 标准库，在算法竞赛中运用极其常见。灵活且正确使用 STL 可以节省非常多解题时间，这一点不仅是由于可以直接调用，还是因为它封装良好，可以让代码的可读性变高，解题思路更清晰，调试过程往往更顺利。

不过 STL 毕竟使用了很多复杂的结构来实现丰富的功能，它的效率往往是比不上自己手搓针对特定题目的数据结构与算法的。因此，STL 的使用相当于**使用更长的运行时间换取更高的编程效率**。因此，在实际比赛中要权衡 STL 的利弊，不过这一点就得靠经验了。

接下来，我会分享在算法竞赛中常用的 STL 容器和算法，对于函数和迭代器，就不着重展开讲了。

---

## 2 常用容器

### 2.1 内容总览

打勾的是本次将会详细讲解的，**加粗**的是算法竞赛中有必要学习的。

- **顺序容器**
  - [ ] array
  - [x] **vector**
  - [ ] deque
  - [ ] forward_list
  - [ ] list
- **关联容器**
  - [x] **set**
  - [x] **map**
  - [ ] multiset
  - [ ] multimap
- **无序关联容器**
  - [ ] unordered_set
  - [ ] unordered_map
  - [ ] unordered_multiset
  - [ ] unordered_multimap
- **容器适配器**
  - [x] **stack**
  - [x] **queue**
  - [x] **priority_queue**
- **字符串**
  - [x] **string**
- **对与元组**
  - [x] **pair**
  - [ ] tuple

---

### 2.2 向量 Vector

`#include <vector>`

连续的顺序的储存结构（和数组一样的类别），但是有长度可变的特性。

#### 2.2.1 常用方法

**构造**
`vector<类型> arr(长度, [初值])`
时间复杂度：$O(n)$

```cpp
vector<int> arr;                 // 构造int数组
vector<int> arr(100);            // 构造初始长100的int数组
vector<int> arr(100, 1);         // 构造初始长100的int数组，初值为1

// 构造初始100行，不指定列数的二维数组
vector<vector<int>> mat(100, vector<int> ());
// 构造初始100行，初始666列的二维数组，初值为-1
vector<vector<int>> mat(100, vector<int> (666, -1));
```

> **⚠️ 构造二维数组的奇葩写法，千万别用：**
>
> - `vector<int> arr[100];` // 正确，但通常用于链式前向星存图
> - `vector<int> arr[100](100, 1);` // **语法错误！**
> - `vector<int> arr(100, 1)[100];` // **语法错误！**
> - `vector<int> arr[100] {{100, 1}, ...};` // 正确但奇葩，使用列表初始化

**尾接 & 尾删**

- `.push_back(元素)`：在 vector 尾接一个元素，数组长度 $+1$。
- `.pop_back()`：删除 vector 尾部的一个元素，数组长度 $-1$。
- 时间复杂度：均摊 $O(1)$。

**中括号运算符**
和一般数组一样的作用。时间复杂度 $O(1)$。

**获取长度**

- `.size()`：获取当前 vector 的长度。
- 时间复杂度：$O(1)$。

**清空**

- `.clear()`：清空 vector。
- 时间复杂度：$O(n)$。

**判空**

- `.empty()`：如果是空返回 `true` 反之返回 `false`。
- 时间复杂度：$O(1)$。

**改变长度**

- `.resize(新长度, [默认值])`
- 如果是缩短，则删除多余的值；如果是扩大，且指定了默认值，则新元素均为默认值（旧元素不变）。
- 时间复杂度：$O(n)$。

#### 2.2.2 适用情形

一般情况 vector 可以替换掉普通数组，除非该题卡常。

有些情况普通数组没法解决：$n \times m$ 的矩阵，$1 \le n,m \le 10^6$ 且 $n \times m \le 10^6$。

- 如果用普通数组 `int mat[1000010][1000010]`，浪费内存，会导致 MLE。
- 如果使用 `vector<vector<int>>`，完美解决该问题。
- 另外，vector 的数据储存在堆空间中，不会爆栈。

#### 2.2.3 注意事项

**1. 提前指定长度**
如果长度已经确定，那么应当直接在构造函数指定长度，而不是一个一个 `.push_back()`。因为 vector 额外内存耗尽后的重分配是有时间开销的。

- 优化前（一个一个 push）：522ms
- 优化后（直接构造）：259ms

**2. 当心 size_t 溢出**
`.size()` 返回值类型为 `size_t`，通常是 unsigned int (32 位)，范围 $[0, 2^{32})$。

```cpp
vector<int> a(65536);
long long result = a.size() * a.size(); // 直接溢出变成0了！
```

---

### 2.3 栈 Stack

`#include <stack>`

通过二次封装双端队列 (deque) 容器，实现先进后出的栈数据结构。

#### 2.3.1 常用方法

| 作用       | 用法              | 示例                 |
| :--------- | :---------------- | :------------------- |
| **构造**   | `stack<类型> stk` | `stack<int> stk;`    |
| **进栈**   | `.push(元素)`     | `stk.push(1);`       |
| **出栈**   | `.pop()`          | `stk.pop();`         |
| **取栈顶** | `.top()`          | `int a = stk.top();` |

#### 2.3.2 适用情形与注意事项

如果不卡常，直接用。vector 也可以当栈用（`.push_back`, `.pop_back`, `.back`）。

**错误用法：** 不可遍历！`stack` 不支持下标访问或迭代器遍历。

---

### 2.4 队列 Queue

`#include <queue>`

通过二次封装双端队列 (deque) 容器，实现先进先出的队列数据结构。

#### 2.4.1 常用方法

| 作用       | 用法              | 示例                   |
| :--------- | :---------------- | :--------------------- |
| **构造**   | `queue<类型> que` | `queue<int> que;`      |
| **进队**   | `.push(元素)`     | `que.push(1);`         |
| **出队**   | `.pop()`          | `que.pop();`           |
| **取队首** | `.front()`        | `int a = que.front();` |
| **取队尾** | `.back()`         | `int a = que.back();`  |

**错误用法：** 不可访问内部元素（`que[i]`），不可遍历。

---

### 2.5 优先队列 priority_queue

`#include <queue>`

提供常数时间的最大元素查找，对数时间的插入与提取，底层原理是二叉堆。

#### 2.5.1 常用方法

**构造**
`priority_queue<类型, 容器, 比较器> pque`

- 容器：默认为 `vector<类型>`。
- 比较器：默认为 `less<类型>`（大顶堆）。

```cpp
priority_queue<int> pque1;                            // 大顶堆
priority_queue<int, vector<int>, greater<int>> pque2; // 小顶堆
```

| 作用       | 用法          | 示例                 |
| :--------- | :------------ | :------------------- |
| **进堆**   | `.push(元素)` | `que.push(1);`       |
| **出堆**   | `.pop()`      | `que.pop();`         |
| **取堆顶** | `.top()`      | `int a = que.top();` |

- 进出队复杂度：$O(\log n)$
- 取堆顶复杂度：$O(1)$

#### 2.5.3 注意事项

- **仅堆顶可读**：`pque[1]` 是错误的。
- **所有元素不可写**：堆中元素不可修改。
- **Tip**：如果要修改堆顶，可以先 `.pop()` 再 `.push(新值)`。

---

### 2.6 集合 Set

`#include <set>`

提供对数时间的插入、删除、查找的集合数据结构。底层原理是红黑树。

#### 比较：Set / Multiset / Unordered_set

| 集合三要素 | 解释                 | set      | multiset   | unordered_set |
| :--------- | :------------------- | :------- | :--------- | :------------ |
| **确定性** | 元素要么在，要么不在 | ✔       | ✔         | ✔            |
| **互异性** | 元素仅出现一次       | ✔       | ❌(任意次) | ✔            |
| **无序性** | 元素没有顺序         | ❌(有序) | ❌(有序)   | ✔            |

#### 2.6.1 常用方法

增删查时间复杂度均为 $O(\log n)$。

| 作用         | 用法            | 示例                    |
| :----------- | :-------------- | :---------------------- |
| **插入**     | `.insert(元素)` | `st.insert(1);`         |
| **删除**     | `.erase(元素)`  | `st.erase(2);`          |
| **查找**     | `.find(元素)`   | `auto it = st.find(1);` |
| **判断存在** | `.count(元素)`  | `st.count(3);`          |

**遍历**

```cpp
// 迭代器遍历
for (set<int>::iterator it = st.begin(); it != st.end(); ++it)
    cout << *it << endl;
// C++11 基于范围的循环
for (auto &ele : st) cout << ele << endl;
```

#### 2.6.3 注意事项

- **不存在下标索引**：`st[0]` 错误。
- **元素只读**：`*st.begin() = 1` 错误（需要先 erase 再 insert）。
- **不可用迭代器计算下标**：`it - st.begin()` 错误。

---

### 2.7 映射 Map

`#include <map>`

提供对数时间的有序键值对结构。底层原理是红黑树。

#### 2.7.1 常用方法

| 作用            | 用法           | 示例                    |
| :-------------- | :------------- | :---------------------- |
| **增/改/查**    | 中括号         | `mp[1] = 2;`            |
| **查 (迭代器)** | `.find(元素)`  | `auto it = mp.find(1);` |
| **删除**        | `.erase(元素)` | `mp.erase(2);`          |
| **判断存在**    | `.count(元素)` | `mp.count(3);`          |

增删改查时间复杂度均为 $O(\log n)$。

**遍历**

```cpp
// C++17 结构化绑定
for (auto &[key, val] : mp)
    cout << key << " " << val << endl;
```

#### 2.7.3 注意事项

- **中括号访问的默认值**：如果不存在的键被 `[]` 访问（如 `mp['a']`），会自动插入该键并赋默认值（如 0）。使用 `.count()` 检查不会产生此副作用。
- **不可用迭代器计算下标**。

---

### 2.8 字符串 String

`#include <string>`

#### 2.8.1 常用方法

| 作用          | 用法                  | 示例               |
| :------------ | :-------------------- | :----------------- |
| **修改/查询** | `[]`                  | `s[1] = 'a';`      |
| **连接**      | `+` / `+=`            | `s += "awa";`      |
| **取子串**    | `.substr(起点, 长度)` | `s.substr(2, 10);` |
| **查找**      | `.find(串, 起点)`     | `s.find("awa");`   |

**数值与字符串互转 (C++11)**

- `to_string(数值)` -> `string`
- `stoi(s)`, `stoll(s)`, `stof(s)` -> `int`, `long long`, `float`

#### 2.8.3 注意事项

- **尾接一定要用 `+=`**：`s += "a"` 是原地操作，`s = s + "a"` 会产生临时对象导致 $O(n^2)$ 复杂度，容易 TLE。
- **substr 参数**：第二个参数是**长度**，不是终点下标。
- **find 复杂度**：暴力实现，$O(n^2)$，不要指望它有 KMP 的效率。

---

### 2.9 二元组 Pair

`#include <utility>`

- **构造**：`pair<int, int> p = {1, 2};` 或 `make_pair(1, 2);`
- **取值**：`p.first`, `p.second`。
- **判同**：直接用 `==`。

---

## 3 迭代器简介

迭代器是定义某个数据结构的遍历方式。对于非线性结构（如 set/map），无法用下标遍历，必须使用迭代器。

### 3.3 常用操作 (以 Vector 为例)

- `.begin()` / `.end()`：头 / 尾（后一位）。
- `it++` / `it--`：移动。
- `*it`：解引用取值。

### 3.4 常见问题

- `.end()` 指向的位置是无意义的，不可访问。
- **删除操作时的警惕**：在遍历中调用 `.erase(it)` 会使当前迭代器失效，导致 RE。

  ```cpp
  // 错误写法
  for (auto it = a.begin(); it != a.end(); ++it)
      if (*it == 4) a.erase(it); // 崩溃
  ```

  建议：如无必要，别用迭代器操作容器进行增删。

---

## 4 常用算法

### 4.1 内容总览

- [x] `swap()`
- [x] `reverse()`
- [x] `unique()`
- [x] `sort()`
- [x] `lower_bound()` / `upper_bound()`
- [x] `max()` / `min()`
- [x] `abs()` (cmath)
- [x] `gcd()` / `lcm()` (numeric, C++17)

### 4.3 sort()

默认从小到大。

```cpp
sort(arr.begin(), arr.end());                   // 升序
sort(arr.begin(), arr.end(), greater<int>());   // 降序
// 自定义比较器
bool cmp(const int& a, const int& b) { return a > b; }
```

**注意**：比较器中若 `a == b`，必须返回 `false`。

### 4.4 lower_bound / upper_bound

二分查找，要求序列已排序。返回的是迭代器。

- `lower_bound`: 寻找 $\ge x$ 的第一个元素。
- `upper_bound`: 寻找 $> x$ 的第一个元素。
- 获取下标：`iterator - arr.begin()`。

### 4.7 unique()

消除数组的**相邻**重复元素。通常需要先 `sort`。

它不改变数组物理大小，而是将重复元素移到末尾，返回有效数据的尾迭代器。

**标准去重写法：**

```cpp
sort(arr.begin(), arr.end());
arr.erase(unique(arr.begin(), arr.end()), arr.end());
```

### 4.8 数学函数

- `abs()`, `exp()`, `log()`, `pow()`, `sqrt()`
- `ceil()` (向上取整), `floor()` (向下取整), `round()` (四舍五入)

**注意事项（避免浮点误差）：**

- $\lfloor a/b \rfloor$：直接写 `a / b`
- $\lceil a/b \rceil$：写成 `(a + b - 1) / b`
- $\lfloor \sqrt{a} \rfloor$：推荐使用整数二分查找 `sqrt`
- $a^b$：使用快速幂
- $\log_2 a$：使用 `__lg(a)` (GNU 扩展) 或 `bit_width` (C++20)

### 4.9 Gcd / Lcm

C++17 起支持 `std::gcd` 和 `std::lcm` (`<numeric>`)。

手写 `gcd`：

```cpp
int gcd(int a, int b) {
    return !b ? a : gcd(b, a % b);
}
```
