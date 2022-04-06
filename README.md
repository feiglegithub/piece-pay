# qmsdemo

> QMS的demo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



### 选择物料的思路说明
####第一种
是跳到另外一个页面，进行选择，选择后，将数据存到vuex里面，然后跳回原来的页面，在mounted里面获取数据。
但是这种有个问题是，其他之前操作的数据，如果不使用vuex存储，那么这些数据都会清空。
解决的方法是，将选择的数据都存在vuex里面。然后在进入页面的时候，就在mounted里面从vuex里面获取，并赋值。
####第二种
通过引用vux的popup组件，在点击文本框时，在当前页面弹出数据显示，一切的数据都在一个页面处理，减少了代码的交互。
缺点是一个页面的代码就会相对大一点，不能上拉下拉，一次性获取到的数据相对大。
有点是不用对数据进行太多的跨页面操作。
解决方法，把获取物料编码的页面当成一个组件，引入到整个页面当中。这样可以通过父子组件互相传值的方式来进行数据交互。