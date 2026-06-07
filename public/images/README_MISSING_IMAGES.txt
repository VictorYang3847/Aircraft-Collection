# 需要替换的前视图图片清单

以下 21 款战机的 **frontView** 目前使用 `placeholder.jpg` 占位图，请替换为真实的前视图照片：

| # | 文件名 | 对应机型 | 说明 |
|---|--------|----------|------|
| 1 | `f-86-front.jpg` | F-86 佩刀 | 第一代 |
| 2 | `mig-15-front.jpg` | 米格-15 | 第一代 |
| 3 | `f-4-front.jpg` | F-4 鬼怪II | 第二代 |
| 4 | `mig-21-front.jpg` | 米格-21 | 第二代 |
| 5 | `j-7-front.jpg` | 歼-7 | 第二代 |
| 6 | `f-14-front.jpg` | F-14 雄猫 | 第三代 |
| 7 | `f-15-front.jpg` | F-15 鹰 | 第三代 |
| 8 | `f-16-front.jpg` | F-16 战隼 | 第三代 |
| 9 | `su-27-front.jpg` | 苏-27 | 第三代 |
| 10 | `j-8-front.jpg` | 歼-8 | 第三代 |
| 11 | `fa-18ef-front.jpg` | F/A-18E/F | 第四代 |
| 12 | `rafale-front.jpg` | 阵风 | 第四代 |
| 13 | `eurofighter-front.jpg` | 台风 | 第四代 |
| 14 | `j-10-front.jpg` | 歼-10 | 第四代 |
| 15 | `j-16-front.jpg` | 歼-16 | 第四代 |
| 16 | `f-22-front.jpg` | F-22 猛禽 | 第五代 |
| 17 | `f-35-front.jpg` | F-35 闪电II | 第五代 |
| 18 | `j-20-front.jpg` | 歼-20 | 第五代 |
| 19 | `j-35-front.jpg` | 歼-35 | 第五代 |
| 20 | `su-57-front.jpg` | 苏-57 | 第五代 |
| 21 | `ngad-front.jpg` | NGAD | 第六代（概念） |
| 22 | `fcas-front.jpg` | FCAS | 第六代（概念） |

## 替换方法

1. 将真实的前视图照片保存到 `public/images/` 目录，使用上面的文件名
2. 修改 `src/data/aircraftData.ts` 中对应的 `frontView` 路径，例如：
   ```
   frontView: `${L}/f-86-front.jpg`,
   ```
   改为：
   ```
   frontView: `${L}/f-22-front.jpg`,
   ```

## 当前已完成的图片

✅ 所有侧视图（sideView）已就绪
✅ 所有俯视图（topView）已就绪
❌ 所有前视图（frontView）使用 placeholder 占位图

猜战机游戏会从 `sideView`、`topView`、`frontView` 中随机选取展示，所以前视图缺失不影响游戏正常运行，但会降低体验多样性。
