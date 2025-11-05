---
title: C语言算法笔记
author: Shepherd Meng
description: 算法笔记
pubDate: 2025-10-11
updated: 2025-11-05
tags: [Coding,Notes,C]
categories: [Coding Notes]
pinned: true
---

# 排序

## 冒泡排序

```c
int tmp;
```

# 贪心

## 背包问题

## 双指针

### 最大盛水量（LeetCode 11）

给定一个长度为 `n` 的整数数组 `height` 。有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])` 。

找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**说明：** 你不能倾斜容器。

![img](https://pic1.imgdb.cn/item/690b1dd63203f7be00d62866.png "图例")

```
输入：[1,8,6,2,5,4,8,3,7]
输出：49
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

**示例 2：**

```
输入：height = [1,1]
输出：1
```

穷举法，时间复杂度为

$$
O(n^2)
$$

```c
#include <stdio.h>

int min(int a, int b){
    return (a>b?b:a);
}
int main(void){
    long long int max,tmp;
    int n,i,j;
    scanf("%d",&n);
    int height[n];
    for (int i=0;i<n;i++) scanf("%d",&height[i]);
    max = height[0];
    for (i=0;i<n;i++){
        for (j=i+1;j<n;j++){
            tmp = min(height[i],height[j])*(j-i);
            if (tmp > max) max = tmp;
        }
    }
    printf ("%lld",max);
}
```

双指针法，时间复杂度为

$$
O(n)
$$

```c
#include <stdio.h>

int maxArea(int* height, int heightSize) {
    int left = 0, right = heightSize - 1;
    int max_water = 0;

    while (left < right) {
        // 计算当前容器的水量
        int current_water = (right - left) *
                           (height[left] < height[right] ? height[left] : height[right]);

        // 更新最大水量
        if (current_water > max_water) {
            max_water = current_water;
        }

        // 移动较短的指针
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return max_water;
}
// 如果移动较长的指针：

// ​	宽度一定减少

// ​	最小高度可能不变或减少（因为受限于较短的那边）

// ​	水量一定减少或不变

// 如果移动较短的指针：

// ​	宽度减少

// ​	但最小高度可能增加

// ​	水量可能增加
```

### 接雨水（LeetCode 42）

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

![img](https://pic1.imgdb.cn/item/690b2b7b3203f7be00d68bf0.png "图例")

示例 1：

输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
示例 2：

输入：height = [4,2,0,3,2,5]
输出：9

我的思路:

    1、可以先把装水的部分填平，然后水量就是遍历的每格减去柱子高度后的求和，除了最高的柱子；

    2、 怎么填平：先找到最高的柱子，然后分别正、反向遍历到最高的柱子去；

    如果下一个柱子比现在的柱子矮，复制给下一个柱子相同的高度；如果更高，就替换掉现在的高度；

时间复杂度：

$$
O(n)
$$

```c
// By Shepherd
int trap(int* height, int heightSize) {

    int highest = 0;
    int left = 0, right = heightSize-1;
    int maxleft = height[left],maxright = height[right];
    // 找到最高的柱子
    while (height[left]<=maxleft && left<right){
        left ++;
        if (height[left]>maxleft) {
            maxleft = height[left];
            highest = left;
        }
    }
    left = 0;
    int water = maxleft;
    maxleft = height[left];
    while (left<highest){
        water += maxleft;
        if (height[left+1]>maxleft) maxleft = height[left+1];
        left ++;
    }
    while (right>highest){
        water += maxright;
        if (height[right-1]>maxright) maxright = height[right-1];
        right --;
    }
    for (left = 0;left<heightSize;left++) water -=height[left];

    return water;
}
```

遍历次数更少的优化算法，即将上面四步进行部分合并

```c
int trap(int* height, int heightSize) {
    if (heightSize < 3) return 0;

    int highest = 0;
    int water = 0;
    int currentMax = 0;

    // 第一次遍历：找最高点 + 计算左半部分
    for (int i = 0; i < heightSize; i++) {
        if (height[i] > height[highest]) {
            highest = i;
        }
    }

    // 左半部分计算（可以与找最高点合并）
    for (int i = 0; i < highest; i++) {
        if (height[i] > currentMax) {
            currentMax = height[i];
        } else {
            water += currentMax - height[i];
        }
    }

    currentMax = 0;
    // 右半部分计算
    for (int i = heightSize - 1; i > highest; i--) {
        if (height[i] > currentMax) {
            currentMax = height[i];
        } else {
            water += currentMax - height[i];
        }
    }

    return water;
}
```

双指针法，时间复杂度为

$$
O(n)
$$

```c
int trap(int* height, int heightSize) {
    if (heightSize < 3) return 0;

    int left = 0, right = heightSize - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;

    while (left < right) {
        // 关键：总是处理较矮的那一边
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];  // 更新左边最大值
            } else {
                water += leftMax - height[left];  // 计算存水量
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];  // 更新右边最大值
            } else {
                water += rightMax - height[right];  // 计算存水量
            }
            right--;
        }
    }

    return water;

//      为什么有效：

// 对于当前位置，能存多少水取决于左右两边最大值的较小值

// 通过比较 height[left] 和 height[right]，我们可以确定哪边的"短板"限制了存水量

// 处理较矮的一边是安全的，因为另一边有足够高的墙来支撑
}
```

# 二分法

## 二分查找

```c
#include <stdio.h>
int main(void) {
	int n, m;
	scanf("%d", &n);
    int left = 0, right = n-1, mid, result=-1;
	int num[n];
	for (int i = 0; i < n; i++) {
		scanf("%d", &num[i]);
	}
	scanf("%d", &m);
    //先用冒泡排序确保大小顺序
    int temp;
    for (int i=0;i<n;i++){
        for (int j=0;j<n-i;j++){
            if (num[j]>num[j+1]){
                temp = num[j];
                num[j]=num[j+1];
                num[j+1]=temp;
            }
        }
    }
    //二分查找
    while (left<=right){
        mid = left+(right-left)/2;
        if (num[mid]==m){
            result = mid;
            right = mid - 1;
        }
        else if(num[mid]<m){
            left = mid + 1;
        }
        else{
            right = mid - 1;
        }
    }
    if (result!=-1){
        printf("%d\n",result+1);
    }
    else{
        printf("None\n");
    }
    return 0;
}
```

# 字符串

# 动态规划

# 其他

## 约瑟夫环

```c
#include <stdio.h>

int main(void) {
    int n, i, count = 0, step = 0, j = 0;
    scanf("%d", &n);
    int arr[n];
    for (i = 0; i < n; i++) arr[i] = i + 1;
    while (count < n - 1) {
        if (arr[j] != 0) {
            step++;
            if (step == 3) {
                arr[j] = 0;
                count++;
                step = 0;
            }
        }
        j = (j + 1) % n;//环形数组
    }
    //查找剩余序号
    for (i = 0; i < n; i++) {
        if (arr[i] != 0)
            printf("%d\n", arr[i]);
    }
    return 0;
}
```
