---
title: C语言算法笔记
author: Shepherd Meng
description: 算法笔记
pubDate: 2025-10-11
updated: 2025-11-05
tags: [Coding,Notes,C]
categories: [Coding Notes]
---

# 排序

## 冒泡排序

```c
int tmp;
```

# 递归

# 贪心

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

## 双指针法解决最大盛水量（LeetCode 11）

给定一个长度为 `n` 的整数数组 `height` 。有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])` 。

找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**说明：**你不能倾斜容器。

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
    for (int i=0;i<n;i++) scanf("%d",&arr[i]);
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
