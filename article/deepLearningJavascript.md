```json data
{
  "date": "2018/12/26",
  "categories": ["技术"],
  "tags": ["Javascript"],
  "description": "对于Javascript的深入理解及笔记"
}
```

# 深入学习 Javascript 笔记

## 原型链

[#](https://github.com/mqyqingfeng/Blog/issues/2)

![](https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype5.png)

图中由相互关联的原型组成的链状结构就是原型链，也就是蓝色的这条线。

关于 es6 的 class 和 es5 的原型链

```js
function Person(){//构造函数
  let name ="hello";//私有属性
  this.name ="hello";//公有属性
  function getName(){}//私有方法
}
Person.getName=function(){}//静态方法
Person.name="a";//静态属性
Person.prototype.name="b";//公有属性
Person.prototype.getName=function(){};//公有方法
console.log(Person.name)//a 取静态属性
var person=new Person();
console.log(person)
-------------------------
Person {name: "hello"}
  name: "hello"
▾ __proto__:
  ▸ getName: ƒ ()
    name: "b"
  ▸ constructor: ƒ Person()
  ▸ __proto__: Object

```

## 静态作用域与动作用域

[#](https://github.com/mqyqingfeng/Blog/issues/3)

静态作用：函数的作用域在函数定义的时候就决定了。

动态作用域：函数的作用域是在函数调用的时候才决定的。

JavaScript 采用的是词法作用域(静态作用域)

举例：

```js
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar();
```

JavaScript 采用的是静态作用域，所以这个例子的结果是 1。如果是动态编译结果会打印 2。

## 执行上下文栈

[#](https://github.com/mqyqingfeng/Blog/issues/4)

JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。
可执行代码分三种全局代码、函数代码、eval 代码。

当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"执行上下文(execution context)"。

JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文。

ECStack = [];

最先执行的是全局代码，所以程序结束之前， ECStack 最底部永远有个 globalContext

ECStack = [
globalContext
];

当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。
## 执行上下文

对于每个执行上下文，都有三个重要属性：

- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this

一个执行上下文的生命周期可以分为两个阶段。

创建阶段
在这个阶段中，执行上下文会分别创建变量对象，建立作用域链，以及确定this的指向。

代码执行阶段
创建完成之后，就会开始执行代码，这个时候，会完成变量赋值，函数引用，以及执行其他代码。



## 变量对象

[#](https://github.com/mqyqingfeng/Blog/issues/5)
