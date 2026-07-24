---
title: 2026年程序设计实践 · 期末题解集
description: XMUOJ 50题
template: doc
tableOfContents:
  minHeadingLevel: 1
  maxHeadingLevel: 3
sidebar:
  hidden: true
---

![img](https://pic1.imgdb.cn/i/033usIwRvluRUQYaxT7MnL.png "header")

**姓名：孟想**

题目来源：XMUOJ（LinK 系列 34 题为主，JD 系列 16 题补充）  

题目数量：50  

> 说明：每题严格按“思路、关键代码、总结”组织。代码展示核心逻辑，统一采用 C++17；提交前以本人实际 AC 代码再次核对。

---

# 目录（按知识大类编排）

> 每题括号内标注**精确知识点**；整体按“基础算法 → 搜索与图论 → 动态规划”递进。

## 一、排序、二分与分治（10题）
1. **<a href="http://xmuoj.com/contest/362/problem/LinK06" target="_blank">LinK06</a> 两数之和【双指针 / 有序数组夹逼】**
2. **<a href="http://xmuoj.com/contest/362/problem/LinK07" target="_blank">LinK07</a> 三数之和【排序 + 双指针 / 去重处理】**
3. **<a href="http://xmuoj.com/contest/362/problem/LinK27" target="_blank">LinK27</a> 大数排序【比较排序 / long long 数据范围】**
4. **<a href="http://xmuoj.com/contest/362/problem/LinK28" target="_blank">LinK28</a> 快速选择第 k 个数【快速选择 / 分区思想】**
5. **<a href="http://xmuoj.com/contest/362/problem/LinK30" target="_blank">LinK30</a> 归并排序【分治 / 有序区间合并】**
6. **<a href="http://xmuoj.com/contest/362/problem/LinK31" target="_blank">LinK31</a> 求排列的逆序数【归并排序 / 逆序对统计】**
7. **<a href="http://xmuoj.com/contest/362/problem/LinK32" target="_blank">LinK32</a> 查找指定数【二分查找 / 精确匹配】**
8. **<a href="http://xmuoj.com/contest/362/problem/LinK33" target="_blank">LinK33</a> 攻击范围【二分边界 / lower_bound、upper_bound】**
9. **<a href="http://xmuoj.com/contest/362/problem/LinK34" target="_blank">LinK34</a> 求方程的根【浮点二分 / 单调性与精度控制】**
10. **<a href="http://xmuoj.com/contest/362/problem/LinK35" target="_blank">LinK35</a> 数的三次方根【浮点二分 / 负数边界】**

## 二、递归、回溯与状态搜索（15题）
11. **<a href="http://xmuoj.com/contest/362/problem/LinK09" target="_blank">LinK09</a> 汉诺塔 I【递归 / 规模缩小】**
12. **<a href="http://xmuoj.com/contest/362/problem/LinK11" target="_blank">LinK11</a> DFS试炼之排列数字【回溯 / 全排列】**
13. **<a href="http://xmuoj.com/contest/362/problem/LinK13" target="_blank">LinK13</a> 输出 N 皇后的全部摆法【回溯 / 对角线剪枝】**
14. **<a href="http://xmuoj.com/contest/362/problem/LinK16" target="_blank">LinK16</a> 放苹果【递归划分 / 空盘分类】**
15. **<a href="http://xmuoj.com/contest/362/problem/LinK17" target="_blank">LinK17</a> 递归求波兰表达式【递归下降 / 表达式求值】**
16. **<a href="http://xmuoj.com/contest/362/problem/LinK19" target="_blank">LinK19</a> 递归实现指数型枚举【递归枚举 / 子集】**
17. **<a href="http://xmuoj.com/contest/362/problem/LinK20" target="_blank">LinK20</a> 递归实现组合型枚举【递归枚举 / 组合去重】**
18. **<a href="http://xmuoj.com/contest/362/problem/LinK23" target="_blank">LinK23</a> 二进制密码锁【状态搜索 / 首位枚举与递推确定】**
19. **<a href="http://xmuoj.com/contest/362/problem/LinK24" target="_blank">LinK24</a> 熄灯问题【位运算枚举 / 行间状态传递】**
20. **<a href="http://xmuoj.com/contest/362/problem/LinK26" target="_blank">LinK26</a> 算24【搜索 / 运算顺序枚举与浮点误差】**
21. **<a href="http://xmuoj.com/contest/362/problem/LinK39" target="_blank">LinK39</a> 净化迷雾森林【DFS / 网格连通块】**
22. **<a href="http://xmuoj.com/contest/362/problem/LinK46" target="_blank">LinK46</a> 寻找林克的回忆(1)【回溯 / 数独合法性判定】**
23. **<a href="http://xmuoj.com/contest/362/problem/LinK51" target="_blank">LinK51</a> 净化迷雾森林(广搜)【BFS / 网格层次扩展】**
24. **<a href="http://xmuoj.com/contest/362/problem/LinK52" target="_blank">LinK52</a> 波克布林的巡逻范围【BFS / 状态合法性约束】**
25. **<a href="http://xmuoj.com/contest/357/problem/JD162" target="_blank">JD162</a> 雪道寻长【记忆化搜索 / DAG 最长路】**

## 三、基础数据结构与字符串（8题）
26. **<a href="http://xmuoj.com/contest/362/problem/LinK43" target="_blank">LinK43</a> 求二进制中1的个数【位运算 / lowbit】**
27. **<a href="http://xmuoj.com/contest/357/problem/JD121" target="_blank">JD121</a> 蓄势之术【前缀和 / 区间查询】**
28. **<a href="http://xmuoj.com/contest/357/problem/JD123" target="_blank">JD123</a> 差分之术【差分 / 区间修改】**
29. **<a href="http://xmuoj.com/contest/357/problem/JD125" target="_blank">JD125</a> 离散聚力【离散化 / 坐标映射】**
30. **<a href="http://xmuoj.com/contest/357/problem/JD134" target="_blank">JD134</a> 一山更比【单调栈 / 最近更小元素】**
31. **<a href="http://xmuoj.com/contest/357/problem/JD135" target="_blank">JD135</a> 窗移镜照【单调队列 / 滑动窗口最值】**
32. **<a href="http://xmuoj.com/contest/357/problem/JD136" target="_blank">JD136</a> 剑谱寻踪【KMP / 失配跳转】**
33. **<a href="http://xmuoj.com/contest/357/problem/JD137" target="_blank">JD137</a> 堆石成丘【堆 / 下沉调整】**

## 四、贪心、并查集与图论（9题）
34. **<a href="http://xmuoj.com/contest/357/problem/JD127" target="_blank">JD127</a> 一箭穿心【区间贪心 / 按右端点选择】**
35. **<a href="http://xmuoj.com/contest/357/problem/JD138" target="_blank">JD138</a> 合帮并派【并查集 / 路径压缩】**
36. **<a href="http://xmuoj.com/contest/357/problem/JD140" target="_blank">JD140</a> 三界相克【带权并查集 / 模 3 关系维护】**
37. **<a href="http://xmuoj.com/contest/357/problem/JD145" target="_blank">JD145</a> 古树重心【树形 DFS / 重心判定】**
38. **<a href="http://xmuoj.com/contest/357/problem/JD147" target="_blank">JD147</a> 拓扑之序【拓扑排序 / 入度删除】**
39. **<a href="http://xmuoj.com/contest/357/problem/JD153" target="_blank">JD153</a> 逐边成林【最小生成树 / Kruskal】**
40. **<a href="http://xmuoj.com/contest/357/problem/JD154" target="_blank">JD154</a> 二色分界【二分图 / BFS 染色】**
41. **<a href="http://xmuoj.com/contest/362/problem/LinK57" target="_blank">LinK57</a> Dijkstra求最短路(1)【最短路 / 朴素 Dijkstra】**
42. **<a href="http://xmuoj.com/contest/362/problem/LinK58" target="_blank">LinK58</a> Dijkstra求最短路(2)【最短路 / 堆优化 Dijkstra】**

## 五、动态规划（8题）
43. **<a href="http://xmuoj.com/contest/362/problem/LinK64" target="_blank">LinK64</a> 林克的完全背包【动态规划：完全背包 / 正序容量转移】**
44. **<a href="http://xmuoj.com/contest/362/problem/LinK78" target="_blank">LinK78</a> 加分二叉树【区间动态规划：枚举根节点 + 方案恢复】**
45. **<a href="http://xmuoj.com/contest/362/problem/LinK15" target="_blank">LinK15</a> 爬天梯【线性 DP / Fibonacci 型递推】**
46. **<a href="http://xmuoj.com/contest/362/problem/LinK62" target="_blank">LinK62</a> 数字三角形【线性 DP / 自底向上转移】**
47. **<a href="http://xmuoj.com/contest/362/problem/LinK63" target="_blank">LinK63</a> 林克的01背包【背包 DP / 倒序容量转移】**
48. **<a href="http://xmuoj.com/contest/362/problem/LinK71" target="_blank">LinK71</a> 最长上升子序列【序列 DP / LIS】**
49. **<a href="http://xmuoj.com/contest/362/problem/LinK75" target="_blank">LinK75</a> 最长公共子序列【双序列 DP / LCS】**
50. **<a href="http://xmuoj.com/contest/357/problem/JD170" target="_blank">JD170</a> 万城巡游【状态压缩 DP / 旅行商问题】**

# 题解正文

# 一、排序、二分与分治（10题）

**算法本质：** 通过**分而治之**与**单调性**，将大规模问题降维打击。排序建立次序，二分利用次序在对数时间内逼近答案，分治则是将大问题拆分为结构相同的独立小问题。

**核心思想：**
1. **二分查找**：通过不断缩小区间，在 $O(\log N)$ 时间内找到目标，关键在于单调性的判定。
2. **分治法**：拆分（Divide） -> 解决子问题（Conquer） -> 合并结果（Combine），如归并排序的合并。

**避坑指南：** 二分边界极易写错（死循环或漏解），需明确区间开闭；计算中间值 `mid = l + (r - l) / 2` 防溢出。


## 1. <a href="http://xmuoj.com/contest/362/problem/LinK06" target="_blank">LinK06</a> 两数之和【双指针 / 有序数组夹逼】

**思路：** 在升序数组两端移动指针，依据当前和调整。

**关键代码：**

```cpp
// 提前对数组排序；保证双指针的移动有单调性。
int l=0,r=n-1; // n指代nums.size()，下同
while(l<r){ 
 int s=nums[l]+nums[r];
 if(s==target) 
     break;
 if(s<target) 
     ++l; 
 else --r; // 通过两数之和调整左/右指针
}
```

**总结：** 本题重点是掌握双指针的基本建模与边界处理（比如**当指针移动时，要确保不会越过对方**，即循环条件严格为 `l < r` 的开区间；另外，若题目要求返回下标（原数组下标），则排序后需额外记录原索引，或使用哈希表处理）

---

## 2. <a href="http://xmuoj.com/contest/362/problem/LinK07" target="_blank">LinK07</a> 三数之和【排序 + 双指针 / 去重处理】

**思路：** 排序后固定一个数，再对剩余部分做双指针并去重。

**关键代码：**

```cpp
vector<vector<int>> res;// 用三元组存储答案
// ...    
sort(nums.begin(),nums.end());
for(int i=0;i<n;i++){ 
    if (i&&nums[i]==nums[i-1]) // 固定起点跳过相同值，开始枚举
        continue;
 for(int l=i+1,r=n-1;l<r;){ /*移动并去重，其中左右指针分别跳过相同值*/ } }
```

**总结：** 本题重点是掌握排序+双指针的基本建模与边界处理。

---

## 3. <a href="http://xmuoj.com/contest/362/problem/LinK27" target="_blank">LinK27</a> 大数排序【比较排序 / long long 数据范围】

**思路：** 使用 O(nlogn) 的快速排序处理十万级数据。

**关键代码：**

```cpp
int i = l - 1, j = r + 1, x = q[l + r >> 1];
while (i < j) {
    do i++; while (q[i] < x);
    do j--; while (q[j] > x);
    if (i < j) swap(q[i], q[j]);
}
quick_sort(q, l, j); quick_sort(q, i, r);
```

**总结：** 本题重点是掌握排序的双指针基本建模与边界处理，在日常做题时可以调用sort或range::sort方法。

---

## 4. <a href="http://xmuoj.com/contest/362/problem/LinK28" target="_blank">LinK28</a> 快速选择第 k 个数【快速选择 / 分区思想】

**思路：** 快排划分后只递归包含第 k 小数的一侧。

**关键代码：**
```cpp
int sl = j - l + 1;
if (sl >= k) return quick_select(q, l, j, k);
return quick_select(q, j + 1, r, k - sl);
```

**总结：** 本题重点是掌握快速选择的基本建模与边界处理：**分治 + 剪枝**—每次只递归可能包含答案的那一侧，另一侧直接舍弃。
实际中也可以维护大小为 k 的最大堆，或者直接调用c++的nth_element方法。

---

## 5. <a href="http://xmuoj.com/contest/362/problem/LinK30" target="_blank">LinK30</a> 归并排序【分治 / 有序区间合并】

**思路：** 递归分治并合并两个有序子区间。

**关键代码：**
```cpp
// 先递归，再归并，使用临时数组来存放归并的子区间
while(i<=mid&&j<=r) tmp[k++]=a[i]<=a[j]?a[i++]:a[j++]; //每次取较小的放入临时数组
while(i<=mid) tmp[k++]=a[i++];// 扫描左侧放入临时数组
while(j<=r) tmp[k++]=a[j++]; // 扫描右侧放入临时数组
```

**总结：** 本题重点是掌握归并排序的基本建模与边界处理。

Tips:  **归并排序和快速排序比较：**

**1、处理顺序相反** ; 快排先分区再递归（先整理位置），归并先递归再合并（先处理子问题再汇总结果）

**2、时间复杂度稳定性不同** ; 快排平均O(n log n)但最坏O(n²)（有序数组退化），归并稳定O(n log n)无最坏情况

**3、空间占用差异巨大** ; 快排O(log n)原地交换内存友好，归并O(n)需要额外临时数组空间开销大

**4、稳定性不同** ; 快排不稳定（交换打乱相等元素原始顺序），归并稳定（合并时相等元素先取左半保持原序）

---

## 6. <a href="http://xmuoj.com/contest/362/problem/LinK31" target="_blank">LinK31</a> 求排列的逆序数【归并排序 / 逆序对统计】

**思路：** 归并时右侧元素先出，则左侧剩余元素都构成逆序对。

**关键代码：**
```cpp
if (a[i] <= a[j]) {
    tmp[k++] = a[i++];
} else {
    tmp[k++] = a[j++]; // 右侧a[j]更小
    ans += mid - i + 1;  // a[j]与左半部分[i, mid]中的每个元素都构成逆序对
    // ans用long long 
}
```

**总结：** 本题重点是掌握归并统计的基本建模与边界处理。

---

## 7. <a href="http://xmuoj.com/contest/362/problem/LinK32" target="_blank">LinK32</a> 查找指定数【二分查找 / 精确匹配】

**思路：** 在有序数组中二分目标值。

**关键代码：**

```cpp
// 先对数组进行排序
while (l < r) {
    int mid = l + r >> 1;
	if (p[mid] >= target) // check函数
		r = mid; // 去掉右边区间，在左区间查找
	else
		l = mid + 1; // 去掉左边区间，到右区间查找
}
```

**总结：** 本题重点是掌握二分查找的基本建模与边界处理：

​     1.确定二分的区间 ; 2. 编写二分的代码框架(选择模板) ; 3. 设计Check函数 ; 4. 确定应该如何更新区间 ; 5. 确定如何更新mid。

---

## 8. <a href="http://xmuoj.com/contest/362/problem/LinK33" target="_blank">LinK33</a> 攻击范围【二分边界 / lower_bound、upper_bound】

**思路：** 用 lower_bound 与 upper_bound 找首次和末次出现位置。

**关键代码：**

```cpp
// 数组有重复元素
int L=lower_bound(a,a+n,x)-a;
int R=upper_bound(a,a+n,x)-a-1;
if(L==n||a[L]!=x) cout<<"-1 -1";
```

**总结：** 本题重点是掌握二分边界的基本建模与边界处理。

**左边界**：`>=` 时去左边（`r=mid`），mid下取整，找第一个`>=x`；

**右边界**：`<=` 时去右边（`l=mid`），mid上取整（`+1`），找最后一个`<=x`。

等号朝向决定重复元素归属哪一侧。

---

## 9. <a href="http://xmuoj.com/contest/362/problem/LinK34" target="_blank">LinK34</a> 求方程的根【浮点二分 / 单调性与精度控制】

**思路：** 利用函数单调性不断缩小根所在区间。

**关键代码：**
```cpp
double bsearch_d1(double l, double r) {
    double eps = 1e-11; // 小数点后面9位，精度为(9+2)
    while (r - l > eps) {
        double mid = (l + r) / 2;
        if (f(mid) > 0)
            r = mid; // 去掉右区间
        else
            l = mid; // 去掉左区间
    }
    return l;
}
```

**总结：** 本题重点是掌握浮点二分的基本建模与边界处理。

**原则**：`eps` 比要求精度小 **2个数量级**（防止浮点误差累积）。（下同）

---

## 10. <a href="http://xmuoj.com/contest/362/problem/LinK35" target="_blank">LinK35</a> 数的三次方根【浮点二分 / 负数边界】

**思路：** 比较 mid 的立方和目标数，二分答案。

**关键代码：**

```cpp
double l = -100, r = 100;  // 根据实际范围估计
    double eps = 1e-8;
    while (r - l > eps) {
        double mid = (l + r) / 2;
        if (mid * mid * mid >= n) // check函数
            r = mid;
        else
            l = mid;
    }
printf("%.6f\n", l); 
```

**总结：** 本题重点是掌握浮点二分的基本建模与边界处理。

---

# 二、递归、回溯与状态搜索（15题）

**算法本质：** 穷举与状态空间树的遍历。**递归**是程序的实现形式，**回溯**是带“撤销”动作的深度优先搜索（DFS），用于寻找所有可行解或最优解。

**核心框架：**
1. **边界条件**（Base Case）：什么时候终止搜索并记录答案。
2. **选择列表**：当前状态下有哪些分支可以走。
3. **状态回溯**：做选择 -> 递归 -> 撤销选择，恢复现场。

**常见优化（剪枝）：**
- **可行性剪枝**：如果当前状态已经不满足条件，直接 return。
- **最优性剪枝**：如果当前代价已经大于已知的最优代价，停止搜索。


## 11. <a href="http://xmuoj.com/contest/362/problem/LinK09" target="_blank">LinK09</a> 汉诺塔 I【递归 / 规模缩小】

**思路：** 先移动 n-1 个盘，再移动最大盘，最后移动剩余盘。

**关键代码：**
```cpp
if(n==1){ 
    cout<<a<<"->"<<c<<'\n'; 
    return; 
} // 递归边界
hanoi(n-1,a,c,b); // 移动上方 n-1 个盘子
cout<<a<<"->"<<c<<'\n'; // 	移动最大的盘子
hanoi(n-1,b,a,c); // 移动剩下的 n-1 个盘子
```

**总结：** 本题重点是掌握递归的基本建模与分治思想。

---

## 12. <a href="http://xmuoj.com/contest/362/problem/LinK11" target="_blank">LinK11</a> DFS试炼之排列数字【回溯 / 全排列】

**思路：** 当前位置选一个未使用数字，递归后撤销标记。

**关键代码：**
```cpp
for(int x=1;x<=n;x++) 
    if(!used[x]){
 used[x]=true; // 尝试占位
 path[u]=x; 
 dfs(u+1);
 used[x]=false;  // 回溯
}
```

**总结：** 本题重点是掌握DFS与回溯的基本建模与边界处理。DFS:  沿着一个分支一直深入探索到底，直到无法继续，再回溯到上一个分叉点，换条路继续探索。

# 经典回溯模板

```cpp
void dfs(参数) {
    if(终止条件) {
        记录结果;
        return;
    }
    
    for(选择 : 所有选择) {
        if(选择合法) {
            做出选择;
            dfs(下一层);
            撤销选择;  // 回溯
        }
    }
}
```

---

## 13. <a href="http://xmuoj.com/contest/362/problem/LinK13" target="_blank">LinK13</a> 输出 N 皇后的全部摆法【回溯 / 对角线剪枝】

**思路：** 逐行放置皇后，用列和两条对角线判断冲突。

**关键代码：**
```cpp
if(!col[c]&&!dg[r+c]&&!udg[r-c+n]){ 
 col[c]=dg[r+c]=udg[r-c+n]=true; 
 dfs(r+1);
 col[c]=dg[r+c]=udg[r-c+n]=false; 
}
```

**总结：** 本题重点是掌握N皇后回溯的基本建模与边界处理。

---

## 14. <a href="http://xmuoj.com/contest/362/problem/LinK16" target="_blank">LinK16</a> 放苹果【递归划分 / 空盘分类】

**思路：** 按是否存在空盘，将问题分成两个子问题。

**关键代码：**
```cpp
int f(int m,int n){
 if(m==0||n==1) return 1; // 边界：没有苹果了，或者只有一个盘子
 if(m<n) return f(m,m); // 苹果数量少于盘子，多余盘子可以忽略
 return f(m,n-1)+f(m-n,n); } // f(m, n-1) —— 至少有一个盘子为空；f(m-n, n) —— 所有盘子都有苹果
```

**总结：** 本题重点是掌握递归划分的基本建模与边界处理，考虑互斥子问题。

---

## 15. <a href="http://xmuoj.com/contest/362/problem/LinK17" target="_blank">LinK17</a> 递归求波兰表达式【递归下降 / 表达式求值】

**思路：** 读到运算符就递归计算两个操作数，读到数字就返回。

**关键代码：**

```cpp
double calc() {
    string s;
    cin >> s;  // 读取一个token
    if(s == "+") return calc() + calc();  // 加法
    if(s == "*") return calc() * calc(); // 乘法
    return stod(s); // 数字（递归边界）
}
```

**总结：** 本题重点是掌握递归解析的基本建模与边界处理，将运算符视为递归节点，数字作为递归边界

**拓展**：复杂逆波兰表达式的标准做法是用**栈模拟**，因为其完美符合栈的先进后出性质。

---

## 16. <a href="http://xmuoj.com/contest/362/problem/LinK19" target="_blank">LinK19</a> 递归实现指数型枚举【递归枚举 / 子集】

**思路：** 每个元素只需决定选或不选，等价于集合的所有子集。

**关键代码：**
```cpp
if(u>n){ output(); return; } // 递归边界
// 选u
path.push_back(u); 
dfs(u+1); 
path.pop_back();

dfs(u+1);  // 不选 u
```

**总结：** 本题重点是掌握子集枚举的"选/不选"建模范式与边界处理：处理完所有元素。

---

## 17. <a href="http://xmuoj.com/contest/362/problem/LinK20" target="_blank">LinK20</a> 递归实现组合型枚举【递归枚举 / 组合去重】

**思路：** 从上次选择之后开始枚举，保证组合不重复。

**关键代码：**
```cpp
void dfs(int start, int cnt) {
	if(cnt==m){ output(); return; } // 递归边界
	// 剪枝与去重：确保还能选够剩余的数
	for(int x=start;x<=n-(m-cnt)+1;x++){
	path.push_back(x); // 选x
    dfs(x+1,cnt+1); // 从下一个数开始，继续选
 	path.pop_back(); // 回溯
}
```

**总结：** 本题重点是掌握组合枚举的基本建模与边界处理：用 `start` 参数控制起始位置以避免重复组合，通过 `cnt` 记录已选数量，以 `cnt == m` 作为递归边界，并在循环中加入剪枝条件 `x <= n - (m - cnt) + 1` 提前排除无效分支，从而高效生成所有长度为 m 的组合。

---

## 18. <a href="http://xmuoj.com/contest/362/problem/LinK23" target="_blank">LinK23</a> 二进制密码锁【状态搜索 / 首位枚举与递推确定】

**思路**： 遍历每个位置，如果当前位置不匹配目标，就按下下一个按钮来翻转它。这样左边已处理的位置不会再被影响，保证递推的正确性。

**关键代码：**

```cpp
for(int i=0; i<n-1; i++) { 
    if(cur[i] != target[i]) { 
        cur[i]^=1, cur[i+1]^=1, cur[i+2]^=1; // 翻转 i, i+1, i+2
        times++; 
    }
}
```

**总结：** 本题重点是掌握**熄灯问题**的状态搜索的基本建模与边界处理。

---

## 19. <a href="http://xmuoj.com/contest/362/problem/LinK24" target="_blank">LinK24</a> 熄灯问题【位运算枚举 / 行间状态传递】

**思路：** 枚举首行的 2^6 种按法，再逐行确定后续按法。

**关键代码：**
```cpp
for(int mask=0;mask<(1<<6);mask++){ 
 apply_first_row(mask); 
 for(int r=1;r<5;r++) force_row(r);  
 check_last_row();  
}
```

**总结：** 本题重点是掌握熄灯问题枚举+模拟的基本建模与边界处理。

---

## 20. <a href="http://xmuoj.com/contest/362/problem/LinK26" target="_blank">LinK26</a> 算24【搜索 / 运算顺序枚举与浮点误差】

**思路：** 从集合任取两数进行运算，将结果放回后继续搜索。

**关键代码：**

```cpp
for (int i = 0; i < a.size(); i++) {
    for (int j = i + 1; j < a.size(); j++) {
        vector<double> b; /* 将未被选中的数加入b */
        b.push_back(a[i] + a[j]);
        if (dfs(b)) return true;
    }
}
```

**总结：** 本题重点是掌握DFS枚举的基本建模与边界处理。

---

## 21. <a href="http://xmuoj.com/contest/362/problem/LinK39" target="_blank">LinK39</a> 净化迷雾森林【DFS / 网格连通块】

**思路：** 从起点向四个方向 DFS，访问所有可达格。

**关键代码：**
```cpp
vis[x][y]=true;  // 标记访问过 
++ans;
for(int k=0;k<4;k++){ 
    int nx=x+dx[k],ny=y+dy[k]; // 遍历所有方向的下个格子
 if(valid(nx,ny)&&!vis[nx][ny]) // valid判断格子是否合法
     dfs(nx,ny);
}
```

**总结：** 本题重点是掌握DFS连通块的基本建模与边界处理。

---

## 22. <a href="http://xmuoj.com/contest/362/problem/LinK46" target="_blank">LinK46</a> 寻找林克的回忆(1)【回溯 / 数独合法性判定】

**思路：** 在空格尝试 1 到 9，合法则递归，失败恢复。

**关键代码：**

```cpp
for(int x=1;x<=9;x++) 
    if(ok(r,c,x)){ 
 		board[r][c]=x;
 	    if(dfs()) return true; 
 	    board[r][c]=0; 
}
```

**总结：** 本题重点是掌握数独回溯的基本建模与边界处理，重点是宫格检查：计算当前格子所在 3×3 宫格的起始位置，`startRow = (r / 3) * 3`，`startCol = (c / 3) * 3`，然后双重循环遍历该宫格内的 9 个格子，如果发现其中某个格子等于 `ch`，说明该宫格已有此数字。

---

## 23. <a href="http://xmuoj.com/contest/362/problem/LinK51" target="_blank">LinK51</a> 净化迷雾森林(广搜)【BFS / 网格层次扩展】

**思路：** 队列按层扩展所有未访问邻格。

**关键代码：**

```cpp
// BFS标准模板：起点入队并标记
queue<pair<int, int>> q;
q.push({sx,sy}); // 起点入队
vis[sx][sy]=true; // 标记访问
while(!q.empty()){ 
    auto [x,y]=q.front(); // 取出当前节点
    q.pop(); // 出队当前节点，表示已处理
 // 各个方向扩展
 for(int k=0;k<4;k++) 
     if(valid(x+dx[k],y+dy[k])) 
         q.push({x+dx[k],y+dy[k]}); // 如果邻居合法且未访问，则入队
}
```

**总结：** 本题重点是掌握BFS连通块的基本建模与边界处理，队列保证"先进先出"，实现按层遍历（距离起点由近到远）。入队即标记是BFS防止死循环的关键。

---

## 24. <a href="http://xmuoj.com/contest/362/problem/LinK52" target="_blank">LinK52</a> 波克布林的巡逻范围【BFS / 状态合法性约束】

**思路：** 只有坐标数位和不超过 k 的格子可扩展。

**关键代码：**
```cpp
if(sumDigit(nx)+sumDigit(ny)<=k&&!vis[nx][ny]){ // 用坐标数位和判断合法性
 vis[nx][ny]=true;
 q.push({nx,ny});
}
```

**总结：** 本题重点是掌握BFS+条件的基本建模与边界处理。

---

## 25. <a href="http://xmuoj.com/contest/357/problem/JD162" target="_blank">JD162</a> 雪道寻长【记忆化搜索 / DAG 最长路】

**思路：** 缓存每格出发的最长下降路径，避免重复 DFS。

**关键代码：**
```cpp
int &res=f[x][y]; // 引用缓存
if(res) return res; // 若计算过，直接返回
res=1; // 至少包含自己
if(valid(nx,ny) && h[nx][ny]<h[x][y]) // 合法且更低
    res=max(res,dfs(nx,ny)+1); // 当前格子 + 后续最长路径
```

**总结：** 本题重点是掌握记忆化搜索的基本建模与边界处理。

---

# 三、基础数据结构与字符串（8题）

**知识本质：** 利用特定的组织形式（如单调性、区间等）来高效存储和查询数据，从而优化时间和空间复杂度。

**核心工具：**
- **前缀和与差分**：将 $O(N)$ 的区间查询或修改降维到 $O(1)$。
- **单调栈/队列**：维护元素的单调性，在线性时间内解决“最近更大/更小元素”或“滑动窗口最值”问题。
- **KMP 算法**：通过预处理模式串的 `Next` 数组，实现无回溯的线性时间字符串匹配。


## 26. <a href="http://xmuoj.com/contest/362/problem/LinK43" target="_blank">LinK43</a> 求二进制中1的个数【位运算 / lowbit】

**思路：** 每次删除最低位的一个 1，循环次数即答案。

**关键代码：**
```cpp
int ans=0;
while(x){
 x-=x&-x;  // 删除最低位的 1
 ++ans;
}
```

**总结：** 本题重点是掌握lowbit的基本建模与边界处理 ，`lowbit(x) = x & -x` 返回二进制中最低位1对应的数值。原理是利用补码 `-x = ~x + 1`，与运算后只保留最低位1。主要应用：统计1的个数（不断减lowbit计数）、树状数组更新/查询（±lowbit）、判断2的幂（`x == lowbit(x)`）。注意 `x=0` 时 lowbit=0，需特殊处理避免死循环。

---

## 27. <a href="http://xmuoj.com/contest/357/problem/JD121" target="_blank">JD121</a> 蓄势之术【前缀和 / 区间查询】

**思路：** 预处理前缀和，用两个前缀和之差回答区间查询。

**关键代码：**
```cpp
for(int i=1;i<=n;i++) 
    s[i]=s[i-1]+a[i]; // s[i]即为前缀和数组

// 查询操作

cin>>l>>r; 
cout<<s[r]-s[l-1]<<'\n';  // [l,r] 的和
```

**总结：** 本题重点是掌握前缀和的基本建模与边界处理，**边界处理提示：** 下标从1开始，s[0]=0作为哨兵处理l=1的情况；查询前检查1≤l≤r≤n避免越界和逻辑错误；用long long存储防止溢出；多组数据时重置s[0]=0；大量查询用输入输出优化提速。核心是处理好l=1和r=n两个端点，以及s数组的索引范围（0到n）

---

## 28. <a href="http://xmuoj.com/contest/357/problem/JD123" target="_blank">JD123</a> 差分之术【差分 / 区间修改】

**思路：** 区间加法仅修改左右边界，最后求前缀和还原。

**关键代码：**

```cpp
b[l] += c;
b[r+1] -= c;  // 区间 [l,r] 加 c
for(int i = 1; i <= n; i++)
    b[i] += b[i-1];  // 还原数组
```

**总结：** 本题重点是掌握差分的基本建模与边界处理。**边界处理提示：** 下标从1开始，b[0]=0作为哨兵；修改时若 `r+1 ≤ n` 才执行 `b[r+1]-=c`（否则越界但可忽略，因为前缀和不使用 n+1）；注意差分数组 `b[i]=a[i]-a[i-1]` 的构造方式；多组数据时重置 `b[1..n]` 为0；区间修改只改两个点，最终通过前缀和 O(n) 还原；核心是处理好 `r+1` 的边界（是否超出数组范围），以及前缀和还原时从1到n的顺序。

---

## 29. <a href="http://xmuoj.com/contest/357/problem/JD125" target="_blank">JD125</a> 离散聚力【离散化 / 坐标映射】

**思路：** 将所有用到的坐标（操作位置和查询端点）收集排序去重，映射到连续下标；操作时在映射位置加c，查询时用二分找到l和r对应的下标，前缀和O(1)回答区间和。

**关键代码：**

```cpp
// 离散化
sort(alls.begin(), alls.end());
alls.erase(unique(alls.begin(), alls.end()), alls.end());

// 坐标映射：1-based下标
int idx = lower_bound(alls.begin(), alls.end(), x) - alls.begin() + 1;

// 操作
add[idx] += c;

// 查询
int L = lower_bound(alls.begin(), alls.end(), l) - alls.begin() + 1;
int R = lower_bound(alls.begin(), alls.end(), r) - alls.begin() + 1;
cout << pre[R] - pre[L-1] << '\n';
```

**总结：** 本题重点是掌握离散化的基本建模与边界处理。**边界处理提示：** 收集坐标时把查询的l和r也加入alls（即使没有操作过），保证二分查找有效；映射为1-based方便前缀和；unique去重后alls有序不重复；注意add数组大小与alls.size()匹配。

---

## 30. <a href="http://xmuoj.com/contest/357/problem/JD134" target="_blank">JD134</a> 一山更比【单调栈 / 最近更小元素】

**思路：** 弹出不小于当前值的栈元素，栈顶即最近更小值。

**关键代码：**

```cpp
stack<int> st;
while(!st.empty()&&st.top()>=x) 
    st.pop(); // 维护严格递增
cout<<(st.empty()?-1:st.top())<<' ';
st.push(x);  // 保持递增栈
```

**总结：** 本题重点是掌握单调栈的基本建模与边界处理。

---

## 31. <a href="http://xmuoj.com/contest/357/problem/JD135" target="_blank">JD135</a> 窗移镜照【单调队列 / 滑动窗口最值】

**思路：** 队列保存下标，删除过期项并保持值单调。

**关键代码：**

```cpp
// 维护一个单调递增队列：队首始终是当前窗口的最小值
while(!q.empty() && q.front()<=i-k) // 删除过期项：队首下标已移出窗口
    q.pop_front();
while(!q.empty() && a[q.back()]>=a[i]) // 维护单调性：新元素更小，队尾永远没用了
    q.pop_back();
q.push_back(i);
cout<<a[q.front()]<<' ';
```

**总结：** 本题重点是掌握单调队列的基本建模与边界处理。

---

## 32. <a href="http://xmuoj.com/contest/357/problem/JD136" target="_blank">JD136</a> 剑谱寻踪【KMP / 失配跳转】

**思路：** 预处理 next 数组，失配时按前后缀信息跳转。

**关键代码：**
```cpp
while(j && p[i]!=p[j+1]) 
    j=ne[j]; // 失配回退：当前前缀匹配失败，利用已有信息缩短匹配长度
if (p[i]==p[j+1]) 
    ++j; // 匹配成功：可匹配的前缀长度+1
ne[i]=j; // 记录当前位置i的最长相等前后缀长度
```

**总结：** 本题重点是掌握KMP的基本建模与边界处理。

 ## KMP 拓展：

**核心思想：** 利用已匹配的前后缀信息，失配时不回溯主串只移动模式串，将匹配从O(n×m)优化到O(n+m)。

**next数组含义（最关键）：** `ne[i]`表示模式串前i个字符中最长相等前后缀的长度（不含自身）。如`p="ababc"`中`ne[4]=2`（"ab"="ab"），`ne[5]=0`。求next本质是模式串自匹配：用前缀去匹配后缀，`j`记录已匹配长度，比较`p[i]`和`p[j+1]`，匹配则`j++`并记录`ne[i]=j`，失配则`j=ne[j]`回退。匹配过程同理：主串指针`i`遍历不回溯，模式串指针`j`表示已匹配长度，比较`s[i]`和`p[j+1]`，完全匹配（`j==n`）后输出起始位置`i-n+1`，然后`j=ne[j]`继续寻找重叠匹配。

**边界处理：** 下标从1开始留s[0]和p[0]空位；ne[1]=0；while中加`j&&`防止访问ne[0]；数组开n+1和m+1；匹配成功后j回退到ne[j]允许重叠；若求所有匹配位置则不退出继续循环。

**高效原因：** 主串指针永不回退，模式串智能跳跃，每个字符最多比较两次。常见应用包括求所有匹配位置、最小循环节（`n-ne[n]`，当`n%(n-ne[n])==0`时）等。

---

## 33. <a href="http://xmuoj.com/contest/357/problem/JD137" target="_blank">JD137</a> 堆石成丘【堆 / 下沉调整】

**思路：** 数组维护小根堆，删除或修改后向下调整。

**关键代码：**

```cpp
int t = u;
if(u*2<=sz && h[u*2]<h[t]) t=u*2;  
if(u*2+1<=sz && h[u*2+1]<h[t]) t=u*2+1;
if(t!=u){
    heap_swap(t,u); 
    down(t); 
}
```

**总结：** 本题重点是掌握手写堆的基本建模与边界处理:  数组维护小根堆，删除或修改后向下调整。同时需要维护两个映射数组：`ph[]`记录每个插入元素在堆中的位置，`hp[]`记录堆中每个位置对应的是第几个插入的元素，两者互为反函数。这样就能实现通过插入序号k快速定位元素在堆中的位置，从而支持删除任意元素和修改任意元素的操作。

---

# 四、贪心、并查集与图论（9题）

**知识本质：** **贪心**旨在通过局部最优推导全局最优；**图论**通过点与边的连通性对复杂现实世界建模。

**核心算法：**
- **贪心策略**：常与排序结合，如按右端点排序解决区间覆盖问题。
- **并查集（DSU）**：高效解决动态连通性问题，包含“路径压缩”和“按秩合并”两大优化。
- **最短路算法**：Dijkstra 算法利用贪心和堆优化，在加权有向图中求解单源最短路径。

**重要原则：** 贪心算法不总是正确的，必须经过严格证明（如交换论证法或反证法）才能保证全局最优解。


## 34. <a href="http://xmuoj.com/contest/357/problem/JD127" target="_blank">JD127</a> 一箭穿心【区间贪心 / 按右端点选择】

**思路：** 按右端点排序，当前点无法覆盖时选该区间右端点。

**关键代码：**
```cpp
sort(seg.begin(),seg.end(),[](auto a,auto b){
    return a.second<b.second;
});

for(auto [l,r] : seg) 
    	if(l>p){ // 如果当前区间的左端点大于上次暗器位置，说明未被覆盖
 		p=r; // 在当前区间右端点放置暗器
 		++ans; // 选最早结束的右端点
    }	
```

**总结：** 本题重点是掌握区间贪心的基本建模与边界处理。

---

## 35. <a href="http://xmuoj.com/contest/357/problem/JD138" target="_blank">JD138</a> 合帮并派【并查集 / 路径压缩】

**思路：** 路径压缩找根，合并根节点，查询两点根是否相同。

**关键代码：**

```cpp
// 查找x所在集合的根节点，带路径压缩
int find(int x){ 
    return p[x]==x?x:p[x]=find(p[x]); 
}

// 合并a和b所在的集合
p[find(a)]=find(b); // 将a的根节点指向b的根节点

// 查询a和b是否属于同一集合
cout<<(find(a)==find(b)?"Yes\n":"No\n");
```

**总结：** 本题重点是掌握并查集的基本建模与边界处理。

---

## 36. <a href="http://xmuoj.com/contest/357/problem/JD140" target="_blank">JD140</a> 三界相克【带权并查集 / 模 3 关系维护】

**思路：** 记录节点到根的关系模3，路径压缩时同步更新关系。带权并查集在普通并查集的基础上，为每个节点增加一个权值`d[x]`，表示节点x到其父节点的关系。对于食物链问题，定义权值模3的意义：0表示与根同类，1表示吃根，2表示被根吃。路径压缩时，节点到根的关系等于节点到原父节点的关系加上原父节点到根的关系之和再模3。合并时根据给定的关系类型计算新的权值。

**关键代码：**

```cpp
int find(int x) {
    if (p[x] != x) { 
        int root = find(p[x]);     
        d[x] = (d[x] + d[p[x]]) % 3; 
        p[x] = root;  
    }
    return p[x];  
}
```

**总结：** 本题重点是掌握带权并查集的基本建模与边界处理：

```cpp
int find(int x) {
    if (p[x] != x) { 
        int root = find(p[x]);     
        d[x] = (d[x] + d[p[x]]) % 3; 
        p[x] = root;  
    }
    return p[x];  
}
```

---

## 37. <a href="http://xmuoj.com/contest/357/problem/JD145" target="_blank">JD145</a> 古树重心【树形 DFS / 重心判定】

**思路：** 计算子树大小，删除节点后的最大连通块最小者即重心。

**关键代码：**
```cpp
for (int v : g[u]) {
    if (v == fa) continue;  
    int s = dfs(v, u);      
    sum += s;               
    mx = max(mx, s);        
}
mx = max(mx, n - sum);      
ans = min(ans, mx);
```

**总结：** 本题重点是掌握树形DFS的基本建模与边界处理。

---

## 38. <a href="http://xmuoj.com/contest/357/problem/JD147" target="_blank">JD147</a> 拓扑之序【拓扑排序 / 入度删除】

**思路：**入度为零的点入队，删边后新入度为零的点继续入队。拓扑排序的本质是将有向无环图的所有顶点排成一个线性序列，使得对每条有向边u→v，u都在v之前。通过不断删除入度为0的节点及其出边，如果最终所有节点都能被删除，则存在拓扑序；否则图中存在环。

**关键代码：**

```cpp
while(!q.empty()){ int u=q.front();q.pop(); order.push_back(u);
 for(int v:g[u]) if(--indeg[v]==0) q.push(v);
}
if(order.size()!=n) cout<<-1;
```

**总结：** 本题重点是掌握拓扑排序的基本建模与边界处理。

---

## 39. <a href="http://xmuoj.com/contest/357/problem/JD153" target="_blank">JD153</a> 逐边成林【最小生成树 / Kruskal】

**思路：** 边按权排序，只选连接两个不同集合的边。

**关键代码：**
```cpp
// 按边权从小到大排序（Kruskal算法前提）
sort(edges.begin(), edges.end());

// 遍历所有边，结构化绑定直接拆出 权值w、顶点a、顶点b
for (auto [w, a, b] : edges) {
    // 如果a和b不在同一连通块（不会形成环）
    if (find(a) != find(b)) {
        // 合并两个连通块：把a的根指向b的根
        p[find(a)] = find(b);
        // 累加最小生成树的边权和
        ans += w;
        // 已选边数+1
        ++cnt;
    }
}
```

**总结：** 本题重点是掌握Kruskal的基本建模与边界处理。Kruskal算法本质上是**贪心算法**，它通过每次选择当前权值最小的边来构造最小生成树，并利用**并查集**来检测是否形成环。

---

## 40. <a href="http://xmuoj.com/contest/357/problem/JD154" target="_blank">JD154</a> 二色分界【二分图 / BFS 染色】

**思路：** 相邻点染相反颜色，出现同色相邻即失败。

**关键代码：**

```cpp
while (q.size()) {
    int u = q.front(); q.pop();
    for (int v : g[u]) 
        if (!color[v]) color[v] = 3 - color[u], q.push(v);  
        else if (color[v] == color[u]) return false; 
}
```

**总结：** 本题重点是掌握二分图染色的基本建模与边界处理。二分图染色本质上是判断图中是否存在奇环，核心是BFS/DFS交替染色并检测冲突。除基本判定外，还可拓展到二分图最大匹配（匈牙利算法）、带权匹配（KM算法）、最小点覆盖与最大独立集（König定理）等经典问题；实际应用涵盖课程排课、工作分配、社交分组等场景。处理不连通图需遍历所有连通块，自环会导致直接冲突，重边不影响判断。递归DFS需注意栈溢出风险，可用BFS或迭代栈替代。掌握染色法的思想后，可进一步延伸至一般图的奇偶性分析和约束满足问题。

---

## 41. <a href="http://xmuoj.com/contest/362/problem/LinK57" target="_blank">LinK57</a> Dijkstra求最短路(1)【最短路 / 朴素 Dijkstra】

**思路：** 每轮选择未确定的最短距离点，并松弛所有点。

**关键代码：**
```cpp
for (int i = 0; i < n; i++) {
    int t = -1;
    for (int j = 1; j <= n; j++) if (!st[j] && (t == -1 || dist[j] < dist[t])) t = j;
    st[t] = 1; 
    for (int j = 1; j <= n; j++) dist[j] = min(dist[j], dist[t] + g[t][j]);
}
```

**总结：** 本题重点是掌握朴素Dijkstra的基本建模与边界处理——**贪心**：每次从所有尚未确定最短路的点中，选择距离起点最近的那个点，将其标记为已确定，然后尝试通过该点作为“中转站”去更新其所有邻接点的距离，因为所有边权非负，所以一旦被标记，它的最短路就已经确定，后续不会再有更短的路径。反复执行这个过程，直到所有点都被标记或剩余点不可达，最终得到起点到所有点的最短距离。

---

## 42. <a href="http://xmuoj.com/contest/362/problem/LinK58" target="_blank">LinK58</a> Dijkstra求最短路(2)【最短路 / 堆优化 Dijkstra】

**思路：** 小根堆每次取当前最短点，松弛邻边。

**关键代码：**
```cpp
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();  
    if (d > dist[u]) continue;         
    for (auto &e : graph[u]) { int v = e.to, w = e.weight;
        if (dist[v] > dist[u] + w) {   
            dist[v] = dist[u] + w;
            pq.push({dist[v], v});
        }
    }
}
```

**总结：** 本题重点是掌握堆优化Dijkstra的基本建模与边界处理：使用优先队列代替O(n)方法寻找最小点

---

# 五、动态规划（8题）

**动态规划（DP）的本质：** 通过**状态**表示子问题，从子问题出发（**自底向上**，与递归不同），用**状态转移方程**描述子问题之间的关系，利用**最优子结构**和**重叠子问题**，将大问题拆解为小问题，用空间换时间避免重复计算。

**核心公式：** 当前状态 = f(历史状态)，即 `dp[i] = f(dp[j])`，通过已解决的子问题推导出更大问题的解。

**两个特征：**

1. **最优子结构**：大问题的最优解包含子问题的最优解
2. **重叠子问题**：子问题被重复计算（用记忆化/递推解决）

## 43. <a href="http://xmuoj.com/contest/362/problem/LinK64" target="_blank">LinK64</a> 林克的完全背包【动态规划：完全背包 / 正序容量转移】

**思路：** 每种物品均可取无限次。枚举物品后让容量从小到大转移，使同一种物品可以在当前轮被重复选择。

**关键代码：**

```cpp
for(int i=1;i<=n;i++){
    cin>>v>>w;
    for(int j=v;j<=V;j++)  // 正序：允许重复选择第 i 种物品
        dp[j]=max(dp[j],dp[j-v]+w); // 容量为 j 的背包能装下的最大价值
}
cout<<dp[V]<<'\n';
```

**总结：** 完全背包与 01 背包的关键区别是容量循环方向：完全背包正序，01 背包倒序。

---

## 44. <a href="http://xmuoj.com/contest/362/problem/LinK78" target="_blank">LinK78</a> 加分二叉树【区间动态规划：枚举根节点 + 方案恢复】

**思路：** 设`dp[l][r]` 表示区间 `[l, r]` 能获得的最大价值，枚举区间内每个节点作为根；同时记录最优根，以递归输出前序遍历。

**关键代码：**

```cpp
for(int k=l;k<=r;k++){
    long long left=(k==l?1:dp[l][k-1]);
    long long right=(k==r?1:dp[k+1][r]);
    if(left*right+score[k]>dp[l][r])
        dp[l][r]=left*right+score[k], root[l][r]=k;
}
```

**总结：** 区间 DP 常通过枚举“最后决策”（本题为根节点）转移，并记录决策以恢复构造方案。

---

## 45. <a href="http://xmuoj.com/contest/362/problem/LinK15" target="_blank">LinK15</a> 爬天梯【线性 DP / Fibonacci 型递推】

**思路：** 最后一步来自前一阶或前两阶。

**关键代码：**
```cpp
f[1]=1; f[2]=2;
for(int i=3;i<=n;i++)
 f[i]=f[i-1]+f[i-2]; // f[i]表示到第i级台阶的方法数
cout<<f[n];
```

**总结：** 本题重点是掌握递推的基本建模与边界处理。

---

## 46. <a href="http://xmuoj.com/contest/362/problem/LinK62" target="_blank">LinK62</a> 数字三角形【线性 DP / 自底向上转移】

**思路：** 自底向上，当前位置加上下一层两个可达值中的较大者。

**关键代码：**

```cpp
vector<int> dp = triangle[N - 1]; // 取最后一行
	for (int i = N - 2; i >= 0; i--) { // 自底向上做N-1次迭代
		for (int j = 0; j <= i; j++) {
			dp[j] = triangle[i][j] + max(dp[j], dp[j + 1]); 
		} // dp[j]表示从底部到当前位置(i,j)的最大路径和
	}
cout << dp[0] << endl;
```

**总结：** 本题重点是掌握线性DP的基本建模与边界处理。

---

## 47. <a href="http://xmuoj.com/contest/362/problem/LinK63" target="_blank">LinK63</a> 林克的01背包【背包 DP / 倒序容量转移】

**思路：** 容量倒序转移，保证每件物品最多选择一次。

**关键代码：**
```cpp
for(int i=1;i<=n;i++){ cin>>v>>w;
	for(int j=V;j>=v;j--)
  		dp[j]=max(dp[j],dp[j-v]+w);  // 倒序
}
```

**总结：** 本题重点是掌握01背包的基本建模与边界处理。

**为什么倒序？**

倒序保证了在考虑第 `i` 个物品时，`dp[j-v]` 还**没有**被第 `i` 个物品更新过，即来自**前 i-1 个物品**的状态。

---

## 48. <a href="http://xmuoj.com/contest/362/problem/LinK71" target="_blank">LinK71</a> 最长上升子序列【序列 DP / LIS】

**思路：** 以每个位置结尾的最长上升子序列由此前更小元素转移。

**关键代码：**
```cpp
for(int i=0;i<n;i++){ 
    f[i]=1; // 包含自身
	for(int j=0;j<i;j++) 
        if(a[j]<a[i])
  			f[i]=max(f[i],f[j]+1); // f[i] 表示以a[i]结尾的最长上升子序列的长度。
	ans=max(ans,f[i]);
}
```

**总结：** 本题重点是掌握LIS的基本建模与边界处理。

---

## 49. <a href="http://xmuoj.com/contest/362/problem/LinK75" target="_blank">LinK75</a> 最长公共子序列【双序列 DP / LCS】

**思路：** 按两个前缀定义状态，末字符相同则左上转移。

**关键代码：**

```cpp
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
        if (a[i] == b[j]) 
            dp[i][j] = dp[i-1][j-1] + 1; // 匹配: 同时往前退
        else 
            dp[i][j] = max(dp[i-1][j], dp[i][j-1]);  // 不匹配： 取较大值
    } // dp[i][j] 表示序列a[n]的前i个字符和序列 b[m]的前j个字符的最长公共子序列
}
cout << dp[n][m] << '\n';
```

**总结：** 本题重点是掌握LCS的基本建模与边界处理。

---

## 50. <a href="http://xmuoj.com/contest/357/problem/JD170" target="_blank">JD170</a> 万城巡游【状态压缩 DP / 旅行商问题】

**思路：** mask 表示已访问集合，枚举下一个未访问城市转移。

**关键代码：**
```cpp
for (int mask = 1; mask < (1 << n); mask++) {
    for (int i = 0; i < n; i++) if (mask >> i & 1) {
        for (int j = 0; j < n; j++) if (!(mask >> j & 1)) {
            dp[mask | (1 << j)][j] = min(dp[mask | (1 << j)][j], dp[mask][i] + w[i][j]);
        }
    }
}
```

**总结：** 本题重点是掌握状态压缩DP的基本建模与边界处理。

**`dp[mask][i]`**：已经访问的城市集合为 `mask`，**当前所在城市为 i** 的最小路径代价。

**状态转移：**
当前状态：(mask, i)  代价 = dp[mask][i]
选择下一个城市 j（未访问）
转移至：(mask|1<<j, j)  新代价 = dp[mask][i] + w[i][j]


---

# 附录：AC 情况截图

## 基础算法（LinK 系列）AC 记录

![LinK AC Page 1](/ac-screenshots/link_page_1.png)
![LinK AC Page 2](/ac-screenshots/link_page_2.png)
![LinK AC Page 3](/ac-screenshots/link_page_3.png)

## 搜索与图论、动态规划（JD 系列）AC 记录

![JD AC Page 1](/ac-screenshots/jd_page_1.png)
![JD AC Page 2](/ac-screenshots/jd_page_2.png)
![JD AC Page 3](/ac-screenshots/jd_page_3.png)
![JD AC Page 4](/ac-screenshots/jd_page_4.png)
![JD AC Page 5](/ac-screenshots/jd_page_5.png)
![JD AC Page 6](/ac-screenshots/jd_page_6.png)
![JD AC Page 7](/ac-screenshots/jd_page_7.png)

