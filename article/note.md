```json data
{
  "date": "2018/12/19",
  "categories": ["笔记"],
  "description": "杂记"
}
```

# 杂记

## 如何在疲劳的 JS 世界中持续学习

[如何在疲劳的 JS 世界中持续学习 ](https://github.com/ProtoTeam/blog/blob/master/201805/1.md)

## Sort 按时间排序

```js
array.sort(function(a, b) {
  return new Date(b.date) - new Date(a.date);
});
```

## React16 Context 使用

// 创建 context 实例

```js
const ThemeContext = React.createContext({
  background: 'red',
  color: 'white'
});


// Provider

<ThemeContext.Provider value={{background: 'green', color: 'white'}}>
  <Header />
</ThemeContext.Provider>


// Consumer

<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>

```
