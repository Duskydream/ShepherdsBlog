---
title: BFS初探
author: Shepherd
description: Brief Introduction to BFS
pubDate: 2026-02-26
tags: [Coding,Notes,Cpp]
categories: [Coding Notes]
---

# BFS初探

## DFS -> 利用栈的天然回溯性质，走到死路自动回头

DFS 的核心思想是“能走多深走多深”。它利用栈 (Stack) 或者递归来实现。

适用于以下场景：
寻找所有路径/排列组合： 当你需要找出从 A 到 B 的所有可能路径，或者解决数独、全排列等组合问题时，DFS 是首选。

> 拓扑排序： 在处理任务依赖关系（比如课程预修表）时，DFS 能很好地完成排序。

> 连通性问题： 判断图中的两个节点是否连通，或者统计地图中有多少个“岛屿”（连通分量）。

> 内存受限： 如果树非常宽但不太深，DFS 通常比 BFS 更省内存，因为它不需要存储整层的所有节点。

## BFS -> 利用队列的先入后出性质，层序遍历

广度优先搜索 (BFS)
BFS 的核心思想是“先近后远”。它利用队列 (Queue) 逐层扫描。
适用于以下场景：

> 最短路径（无权图）： 这是 BFS 的杀手锏。在步长相等的情况下，BFS 第一次到达目标点时，走过的一定是最短路径（比如迷宫的最少步数）。

> 层序遍历： 如果你需要按层级处理数据（例如社交网络中的一度好友、二度好友），BFS 是唯一的选择。

> 最小生成树 (Prim算法思想) / 网络广播： 消息从一个节点出发，最快扩散到整个网络的过程。

## 举例

### 1、二叉树的层序遍历

> 给你二叉树的根节点 root ，返回其节点值的 层序遍历。（即逐层地，从左到右访问所有节点）。

![img](https://pic1.imgdb.cn/item/69a06b82569239540e679d83.png "img")

**1、两个数组**

使用cur和next两个数组分别存储每层的节点

```cpp
#include <vector>
#include <utility>
#include <queue>

struct TreeNode { //节点定义
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution{
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (root == nullptr) return {};

        vector<vector<int>> ans;
        vector<TreeNode*> cur = {root};
        while (cur.size()) {
            vector<TreeNode*> next;
            vector<int> vals;
            for (auto node : cur) {
                vals.push_back(node->val);
                if (node->left)  next.push_back(node->left);
                if (node->right) next.push_back(node->right);
            }
            cur = move(next); //用move函数避免拷贝开销
            ans.push_back(move(vals));
        }
        return ans;
    }
};
```

**2、队列：**

```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (root == nullptr) {
            return {};
        }
        vector<vector<int>> ans;
        queue<TreeNode*> q;
        q.push(root); //根节点入队
        while (!q.empty()) {
            vector<int> vals;
            for (int n = q.size(); n--;) { //遍历同层父节点
                auto node = q.front(); //tmp
                q.pop(); //父节点出队
                vals.push_back(node->val); //返回父节点值

                if (node->left)  q.push(node->left);
                if (node->right) q.push(node->right); //遍历左右子节点
            }
            ans.push_back(move(vals));
        }
        return ans;
    }
};
```

两种方法，时间与空间复杂度均为 $$ O(n) $$ （因为每层都只入队一次，不会发生回溯）

### 2、迷宫的最短路径

给你一个 `m x n` 的迷宫矩阵 `maze`（下标从 0 开始），矩阵中有空格子（用 `.` 表示）和墙（用 `+` 表示）。同时给你迷宫的入口 `entrance`，用 `entrance` = `[entrance_row, entrance_col]` 表示你一开始所在格子的行和列。

每一步操作，你可以往 **上，下，左 或者 右** 移动一个格子。你不能进入墙所在的格子，你也不能离开迷宫。你的目标是找到离 `entrance` 最近的出口。

**出口** 的含义是 `maze` 边界上的 **空格子**。`entrance` 格子不算出口。

请你返回从 `entrance` 到最近出口的最短路径的 **步数**，如果不存在这样的路径，请你返回 `-1`。

```cpp
class Solution {

    static constexpr int DIRS[4][2] = {{0, -1}, {0, 1}, {-1, 0}, {1, 0}}; // 左右上下

public:
    int nearestExit(vector<vector<char>>& maze, vector<int>& entrance) {

        int m = maze.size(), n = maze[0].size();
        int sx = entrance[0], sy = entrance[1]; // 起点

        maze[sx][sy] = 0; // 访问标记
        vector<pair<int, int>> q = {{sx, sy}};

        for (int ans = 1; !q.empty(); ans++) {
            auto tmp = q;
            q.clear();
            for (auto& [i, j] : tmp) {
                // 注意起点不算终点，不能在这里判断 p 是不是终点
                for (auto [dx, dy] : DIRS) { // 访问相邻的格子
                    int x = i + dx, y = j + dy;
                    if (0 <= x && x < m && 0 <= y && y < n && maze[x][y] == '.') { // 之前没有访问过
                        if (x == 0 || y == 0 || x == m - 1 || y == n - 1) { // 到达终点
                            return ans;
                        }
                        maze[x][y] = 0; // 访问标记
                        q.push_back(x, y);
                    }
                }
            }
        }
        return -1; // 无法到达终点
    }
};
//BFS不需要回溯。但是注意要把走过的点封上，避免反复查找溢出
```

**时间复杂度**：$O(mn)$，其中 $m$ 和 $n$ 分别为 $maze$ 的行数和列数。

**空间复杂度**：$O(\min(m, n))$。BFS 按曼哈顿距离逐层扩展。在无限平面上，距离起点为 $d$ 的格子个数为 $4d$（菱形周长）。在网格图上，这会受到 $\min(m, n)$ 的限制，导致每次扩展的格子个数是 $O(\min(m, n))$。所以队列的大小只有 $O(\min(m, n))$。
