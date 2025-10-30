---
title: C语言算法笔记
author: Shepherd Meng
description: 算法笔记
pubDate: 2025-10-11
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
