---
title: C语言学习笔记
author: Shepherd Meng
description: 学习笔记
pubDate: 2025-10-12
tags: [Coding,Notes,C]
categories: [Coding Notes]
---

### 使用指针进行动态内存分配

```c
#include <stdio.h>
#include <stdlib.h>
int main() {
	int i,n;
	int* p;
	scanf("%d", &n);
	p = (int*)malloc(n * sizeof(int));
    //  
	free(p);
	return 0;
}
```

### 字符串逆序

```c
#include<stdio.h>
#define MAX 100

void reverse_string(char* str) {
	int len = strlen(str);
	char tmp = *str;//缓存字符串的第一个字符
	*str = *(str + len - 1);//将最后一个字符放在第一位
	*(str + len - 1) = '\0';//创建去除最后一个字符的子字符串/0/0
	if (strlen(str + 1) >= 2) {
		reverse_string(str + 1);
	}
	*(str + len - 1) = tmp;
}

int main() {
	char arr[MAX];
	fgets(arr,sizeof(arr),stdin);
	reverse_string(arr);
	printf("%s", arr);
	return 0;
}
```

```c
//或者用非递归的更高效方法
void reverse_string(char* str) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char temp = str[i];
        str[i] = str[len - 1 - i];
        str[len - 1 - i] = temp;
    }
}
```
