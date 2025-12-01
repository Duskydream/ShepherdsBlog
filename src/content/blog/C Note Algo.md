---
title: C语言算法笔记
author: Shepherd Meng
description: 算法笔记
pubDate: 2025-10-11
updated: 2025-11-21
tags: [Coding,Notes,C]
categories: [Coding Notes]
encrypted: true
pinned: true
---

# 排序

## 冒泡排序

```c
//核心：相邻数字依次比较
void bubble(int arr[], int n) {
    int i, j;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            int tmp;
            if (arr[j] > arr[j + 1]) { //升序排列
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}
```

## 选择排序

略 简要理解为从数组遍历n-i个数选择最值到第i个位置替换

# 高精度算法

## 高精度的四则运算

```c
#include <stdio.h>
#include <string.h>

// 高精度四则运算，本质上是算法对竖式的实现
char* plus(char* num1, char* num2, char result[]);
int main() {
	char num1[1001] = { 0 }, num2[1001] = { 0 };
	char result[2002] = { 0 };
	scanf("%s", num1);
	scanf("%s", num2);
	printf("%s", plus(num1, num2, result));
}

char* plus(char* num1, char* num2, char result[]) {
	int a[1001] = {0}, b[1001] = {0}, c[2002] = {0}, i;
	int la = strlen(num1), lb = strlen(num2);
	for (i = 0; i < la; i++) a[i] = num1[la - 1 - i] - '0';
	for (i = 0; i < lb; i++) b[i] = num2[lb - 1 - i] - '0';
	int lc = la > lb ? la : lb;
	for (i = 0; i < lc; i++) {
		c[i] += a[i] + b[i]; //加法逻辑
		//处理进位
		c[i + 1] += c[i] / 10;
		c[i] %= 10;
	}
	while (c[lc] == 0 && lc > 0) lc--;
	for (i = 0; i <= lc; i++) result[i] = c[lc - i] + '0';
	result[lc + 1] = '\0';
	return result;
}

//乘法：
int lc = la+lb;
for (i=0;i<la;i++){
	for (j=0;j<lb;j++){
		c[i+j] += a[i]*b[j];
		c[i+j+1] += c[i+j] /10;
        c[i+j] = c[i+j]%10;
	}
}

//减法
int lc = la>lb?la:lb;
for (int i = 0; i < len; i++) {
	c[i] = a[i] - b[i];
	if (c[i] < 0) {
		c[i] += 10;
		a[i + 1]--;
	}
}

//除法（需要提前检查除数是否为零）
int lc = 0;
int tempLen = 0, temp[1001] = {0};

for (i = 0; i < la; i++) {
	// 将temp左移一位，并添加新的一位数字
	for (j = tempLen; j > 0; j--) {
		temp[j] = temp[j - 1];
	}
	temp[0] = a[i];
	if (tempLen > 0 || temp[0] != 0) tempLen++;

	// 计算当前temp可以被除数除多少次
	int quotient = 0;
	while (1) {
		// 比较temp和b的大小
		int cmp = 0;
		if (tempLen > lb) {
			cmp = 1;
		} else if (tempLen < lb) {
			cmp = -1;
		} else {
			for (j = 0; j < tempLen; j++) {
				if (temp[j] > b[j]) {
					cmp = 1;
					break;
				} else if (temp[j] < b[j]) {
					cmp = -1;
					break;
				}
			}
		}

		if (cmp < 0) break;

		// temp >= b，执行减法
		int borrow = 0;
		for (j = tempLen - 1; j >= 0; j--) {
			int pos = j - (tempLen - lb);
			int sub = (pos >= 0) ? b[pos] : 0;
			temp[j] -= sub + borrow;
			if (temp[j] < 0) {
				temp[j] += 10;
				borrow = 1;
			} else {
				borrow = 0;
			}
		}

		// 去掉前导0
		while (tempLen > 0 && temp[0] == 0) {
			for (j = 0; j < tempLen - 1; j++) {
				temp[j] = temp[j + 1];
			}
			temp[tempLen - 1] = 0;
			tempLen--;
		}

		quotient++;
	}

	c[lc++] = quotient;
}
```

# 贪心

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

# DFS

## N皇后

在NxN的国际象棋盘上放置N个皇后，输出方案总数；

```c++
#include <iostream>
#include <stdlib.h>

// 可选：打印棋盘
void print(int n, int* row) {
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			if (row[i] == j)
				std::cout << "Q";
			else
				std::cout << ".";
		}
		std::cout << std::endl;
	}
	std::cout << std::endl;
}

void dfs(int n, int r, int* row, int* column, int* diagup, int* diagdown, int* solutions) {
	if (r == n) { // 遍历完后找到一个解，r是表示当前放置到第几行的索引
		(*solutions)++;
		print(n, row); // 可选：打印棋盘
		return;
	}
	for (int col = 0; col < n; col++) { // 检查该行是否可以放置皇后，col表示遍历该行的列数
		if (column[col] || diagup[r + col] || diagdown[r - col + n - 1])
			/*检查占位的逻辑：
			遍历每列时，1、检查该列上方是否安全；
				      2、检查该列此时对应的向上对角线（和为定值）是否安全
					  3、检查该列此时对应的向下对角线（差为定值，n-1保证是正数，最大为2n-1）*/
			continue;
		column[col] = diagup[r + col] = diagdown[r - col + n - 1] = 1; // 占位
		row[r] = col; // 记录皇后位置在第r行col列
		dfs(n, r + 1, row, column, diagup, diagdown, solutions); // 递归放置下一行皇后
		column[col] = diagup[r + col] = diagdown[r - col + n - 1] = 0; // 若下一行皇后无法放置，则回溯撤销放置
	}
}

int main() {
	int n, solutions = 0;
	std::cin >> n;
    std::cout << std::endl;
	int* row = (int*)malloc(n * sizeof(int));
	int* column = (int*)malloc(n * sizeof(int));
	int* diagup = (int*)malloc((2 * n - 1) * sizeof(int));
	int* diagdown = (int*)malloc((2 * n - 1) * sizeof(int));
	for (int i = 0; i < n; i++) {
		row[i] = 0;
		column[i] = 0;
	}
	for (int i = 0; i < 2 * n - 1; i++) {
		diagup[i] = 0;
		diagdown[i] = 0;
	}
	dfs(n, 0, row, column, diagup, diagdown, &solutions);
	std::cout << "Total solutions: " << solutions << std::endl;
	free(row);
	free(column);
	free(diagup);
	free(diagdown);
	return 0;
}
```

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
