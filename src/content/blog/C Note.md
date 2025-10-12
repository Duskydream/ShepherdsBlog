---
title: C语言学习笔记
author: Shepherd Meng
description: 学习笔记
pubDate: 2025-10-12
tags: [Coding,Notes,C]
categories: [Coding Notes]
---

### 10-12: 使用指针进行动态内存分配

```c
#include <stdio.h>
#include <stdlib.h>
int main() {
	int i,n;
	int* p;
	scanf("%d", &n);
	p = (int*)malloc(n * sizeof(int));
	for (i = 0; i < n; i++) {
		scanf("%d", &p[i]);
	}
	for (i = n - 1; i >= 0; i--) {
		printf("%d ", p[i]);
	}
	free(p);
	return 0;
}
```

