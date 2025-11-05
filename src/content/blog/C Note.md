---
title: C语言学习笔记
author: Shepherd Meng
description: 学习笔记
pubDate: 2025-10-12
updated: 2025-11-02
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

## 2025-10-30 链表初探

### 可变数组

```c
#include <stdio.h>
#include <stdlib.h>
#define BLOCK_SIZE 5

typedef struct {
	int *arr；
	int size；
} Arr; //定义类型Arr作为可变数组

Arr arr_create(int init_size){
	Arr a;
	a.size = init_size;
	a.arr = (int*)malloc(sizeof(int)*a.size); //为数组调用内存
	return a;
}

int arr_free(Arr *a){
	free(a->arr);
	a->arr = NULL;
	a->size = 0;
} //对数组内存进行清空

int arr_size(const Arr *a){
	return a->size;
} //返回数组大小

int* arr_at(Arr *a,int index){
	//检查数组是否越界并自动增长
	if (index >= a->size){
		arr_inflate(a,(index/BLOCK_SIZE+1)*BLOCK_SIZE-a->size);
	}
	return &(a->arr[index]);
}

/*数组的增长
	实际上是重新调用了一块更大的内存，并将原数组复制到新的内存里面去
*/
void arr_inflate(Arr*a, int more_size){
	int *p = (int*)malloc(sizeof(int)(a->size + more_size));
	int i;
	for (i=0;i<a->size;i++){
		p[i] = a->arr[i];
	}
	free(a->arr)；
	a->arr = p;
	a->size +=more_size;
}

int main(){
	Arr a = arr_create(100);
	//初始化数组
	int cnt=0;
	while(getchar()!='\n')
		scanf("%d",&*arr_at(&a , cnt++));
	*arr_at(&a,0) = 10; //对数组进行赋值的方法
}
```

### 可变数组的缺陷:

#### 1. 赋值时间长；

#### 2. 占用内存空间大

——>链表: 不再申请新的内存，而是在结构体中包含指向上一个或下一个节点的指针

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct _node { //节点的定义
	int value;
	struct _node *next;
} Node;

typedef struct list{ //链表整体的定义
	Node* head;
} List;

void add(List *pList, int number); //单向链表的添加
void print(List *pList);//链表的遍历
void delete(List *pList)；//链表中的搜索与删除
void clear(List *plist); //链表的清除

int main(){
	List list;
	int number;
	list.head = NULL;

	while(getchar()!='\n'){
		scanf("%d",&number);
		head = add(&list,number);
	}

	print(&list);
	delete(&list,1211);
	clear(&list);
}

void add(List *pList, int number){
Node *head = NULL; //节点首位初始化为NULL
		Node *p = (Node*)malloc(sizeof(Node))；
		p->value = number;
		p->next = NULL;
		Node *last = *pList->head;
		if (last){//检查last节点是否为空
		while (last->next){ //检查last节点的next地址是否为空(下一个节点是不是最后一个节点)
			last = last->next; //若非空，则last节点后移一位
		}
		last -> next = p; //访问结束后
		} else {
			pList->head = p;//若last节点所指的head为空，则head=p;
		}
	}

void print(List *pList){
	Node *p;
	for (p = pList.head ; p ; p = p->next)
		printf("%d ",p->value);
	return 0;
}

void delete(List *pList, int number){
	Node *p;
	int isFound = 0;
	for (p=pList;p;p = p->next){
		if (p->value == number){
			isFound = 1;
			break;
		}
		}
	Node *q;
	for (q=NULL , p=pList.head ; p ; q = p , p = p->next){
		if (p->value == number){
			if(q){ //检查q是否为空
		q->next = p->next;
			} else{
				pList.head = p->next;
			}
		free(p);
		break;
		}
	}
}

void clear(List *pList){
	Node *p;
	Node *q;
	for (p = pList.head;p;p=q){
		q = p->next;
		free(p);
	}
}
```
