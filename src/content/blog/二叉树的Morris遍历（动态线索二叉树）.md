---
title: 二叉树的Morris遍历（动态线索二叉树）
author: Shepherd
description: 一种节省空间开销的二叉树DFS方法
pubDate: 2026-03-07
tags: [Coding,Notes,Cpp,Algorithm]
categories: [Coding Notes]
---

## 背景

在实现二叉树的前、中、后序遍历时，难免会使用递归或者栈模拟，好处是写法简单，坏处是空间开销为 $$ O(h) $$，轻易导致栈溢出。
代码如下：

```cpp
//二叉树节点定义
struct TreeNode {
      int val;
      TreeNode *left;
      TreeNode *right;
      TreeNode() : val(0), left(nullptr), right(nullptr) {}
      TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
      TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 };
```

```cpp
//举例：中序遍历
class Inorder{
private:
	void* dfs(TreeNode* root){
		if (node == nullptr) return;
		dfs(root->left);
		std::cout << root -> val << std::endl;
		dfs(root->right);
	}
public:
	void inorder(TreeNode* root){
		dfs(root);
	}
};
```

时间复杂度：$$O(n)$$

## Morris遍历

Morris遍历的核心思想是利用节点的左子树和右子树的信息，通过不断地在当前节点插入和删除节点，模拟出类似于递归的效果，从而达到遍历整个二叉树的目的。具体来说，Morris遍历的过程如下：

> 1、从根节点开始，如果当前节点为空，则返回；

> 2、如果当前节点有左子树，则将左子树的根节点作为当前节点，继续遍历；

> 3、否则，在当前节点插入一个指针指向其右子树，并沿着右子树向下遍历，直到找到一个没有右子树的节点；

> 4、删除该节点指向右子树的指针，并恢复到其左子树的根节点；

> 5、重复以上步骤，直到当前节点为空。

![img](https://pic1.imgdb.cn/item/69ab98a059f896a650d459ab.png "图示by灵茶山艾府")

```cpp
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> ans;

        while (root) {
            if (root->left) {
                // 找 root 的前驱 pre：在中序遍历中，root 的上一个节点
                // 从 root->left 开始，一直向右走，直到走到尽头，或者遇到指向 root 的线索（回到 root 的路）
                TreeNode* pre = root->left;
                while (pre->right && pre->right != root) {
                    pre = pre->right;
                }

                // root 的左子树尚未访问
                if (pre->right == nullptr) {
                    pre->right = root; // 建立线索（回到 root 的路），相当于把 pre->right 当作栈
                    root = root->left; // 访问左子树
                    continue;
                }

                // root 的左子树访问完毕，去掉线索，恢复原样
                pre->right = nullptr; // 注：如果调用完 inorderTraversal 不再使用这棵二叉树，这行代码可以去掉
            }

            // root 的左子树访问完毕
            ans.push_back(root->val); // 记录当前节点的值
            root = root->right; // 如果有右子树就访问右子树，没有就顺着线索回到指向的节点
        }

        return ans;
    }
};
```

于是便做到了$$O(1)$$的空间开销
