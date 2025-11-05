---
title: test
author: Shepherd
description: test
pubDate: 2025-09-23
---

可选frontmatter:

```c
title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string().optional(),
    badge: z.string().optional(),
    draft: z.boolean().default(false),
    pinned: z.boolean().default(false),
    categories: z
      .array(z.string())
      .refine((items) => new Set(items).size === items.length, {
        message: "categories must be unique",
      })
      .optional(),
    tags: z
      .array(z.string())
      .refine((items) => new Set(items).size === items.length, {
        message: "tags must be unique",
      })
      .optional(),
```

markdown教程：https://markdown.com.cn/

test

> I love Genshin Impact
>
> > I love Genshin Impact too

```C
#include <stdio.h>
int main()
{
    printf("Hello, World!\n");
    return 0;
}
```

![TestImage](https://pic1.imgdb.cn/item/68d69d1ac5157e1a883874a3.jpg "Claude Monet-Pica Pica")
