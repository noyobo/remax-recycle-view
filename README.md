# 瀑布流组件

```js
renderItem: propTypes.func, // 渲染子元素
columns: propTypes.number, // 共有几列
dataSource: propTypes.array, // 数据源
scrollOffest: propTypes.number, // 页面滚动偏移量， 上下交集点
style: propTypes.object, // 根节点样式
```

## 使用

```jsx
const list = [{title: '虚拟列表'}， {title: '虚拟列表'}]

// 需要指定每个 item 的设计稿高度 750 为基准
// 如设计稿整个块的高度是 300 则，高度就是300， 需要间距自行加一个值 300 + 24
<RecycleView
  columns={2}
  dataSource={list.map(item=> {item: item, height: 100})}
  renderItem={({item}) => {
    return <View>{item.title}<View>
  }} />
```
