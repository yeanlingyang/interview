####     ES5/ES6中新增的数组的方法

​    forEach()

```
  作用：遍历数组，将每个元素交给function进行处理
  语法：arr.forEach(function(item,index,array){console.log(item*2)})
  优点：不会产生额外的全局变量；配合箭头函数使用
```

​    map()

```
 作用：执行过程中，创建一个空数组，将每个元素交给function进行处理，将得到的结果放到空数组中，最终返回这个新数组
 语法：let newArr=arr.map(function(item,index,array){return item*item})
```

​    filter()

```
 作用：执行过程，创建一个空数组，将符合条件的元素存放在空数组中，最终返回这个新数组
 语法：let newArr=arr.filter(function(item,index,array){return 条件})
```

​    some()

```
 作用：判断数组中是否有一个或多个满足条件，只要有一个满足就返回true
 语法：let result=arr.some(function(item,index,array){return 条件})
```

​    every()

```
 作用：判断数组中是否所有的元素都满足条件，只要有一个不满足就返回false
 语法：let result=arr.every(function(item,index,array){return 条件})
```

​    find()

```
 作用：遍历数组，返回符合条件的第一个元素
 语法：let newArr=arr.find(function(item,index,array){return 条件})
```

​    findIndex()

```
 作用：遍历数组，返回符合条件的第一个元素的下标
 语法：let index=arr.findIndex(function(item,index,array){return 条件})
```

​    reduce()

```
 作用：让数组的前后两项进行某种计算,然后返回其值，并继续计算,不改变原数组,返回计算的最终结果，从数组的第二项开始遍历。
		某种计算 例如：求和 、 求最大值 、 去重 等等
 语法：arr.reduce(function(prev,cur,index,arr){...}, init);
 参数:
    prev 必写，表示上一次调用回调函数时的返回值，或者初始值 init，如果没有设置初始值init，直接取数组中的第一项;   
    cur 必写，表示当前正在处理的数组元素；
    	cur的取值跟初始值init有关，如果设置了初始值init那么cur从数组中的第0项开始取值，如果没有设置初始值init，cur从数组中的第1项开始取值；
    index 可写可不写，表示当前正在处理的数组元素的索引，若提供 init 值，则索引为0，否则索引为1；
    arr 可写可不写，表示原数组；
    init 可写可不写，表示初始值。
```

​    includes()

```
 作用：用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。
```

##### reduce()举例

```
 // reduce()求数组项之和

 var arr = [3, 9, 4, 3, 6, 0, 9];

  var sum = arr.reduce(function (prev, cur) {

    return prev + cur;

    }, 0);

  console.log(sum);
```

#####   

```
 // reduce()求数组项最大值
 
var arr = [3, 9, 4, 3, 6, 0, 9];
 
var max = arr.reduce(function (prev, cur) {

    return Math.max(prev,cur);
    
});

console.log(max);
```

#####  reduce()实现数组去重

```
(indexOf() 返回值都是字符串中字符所在的下标，如果没有找到则返回-1)

 	var arr = [3, 9, 4, 3, 6, 0, 9];

	var newArr = arr.reduce(function (prev, cur) {

    prev.indexOf(cur) === -1 && prev.push(cur);

	    return prev;

    }, []);
    
    console.log(newArr);
    
    
    // 实现原理：
    // 1 初始化一个空数组
    // 2 将需要去重处理的数组中的第1项在初始化数组中查找，如果找不到（空数组中肯定找不到），就将该项添加到初始化数组中
    // 3 将需要去重处理的数组中的第2项在初始化数组中查找，如果找不到，就将该项继续添加到初始化数组中
    // 4 ……
    // 5 将需要去重处理的数组中的第n项在初始化数组中查找，如果找不到，就将该项继续添加到初始化数组中
    // 6 将这个初始化数组返回

```

#####     includes()举例

```
// includes()用来判断一个数组是否包含一个指定的值

var array1 = [1, 2, 3];

console.log(array1.includes(2));
```

#####  拓展

find()

find方法中如果没有写return就会把判断条件执行完，然后输出所有符合条件的元素，如果写了return，不管return后边写了什么值，都会返回找到的第一个符合条件的元素

```
   let arr = [1, 2, 234, 'sdf', -2];

   // arr.find(function (v) {

    //   return v <= 2;

    // })//find找到第一个符合条件的元素，也就是1
    

    arr.find(function (v, i, arr) {

     if (v < 2) {

        console.log(v, i, arr)

      }

      // return arr

     })
```

findIndex()

findIndex同find方法一样，如果没有写return就会返回所有符合条件的元素的下标，如果写了return就会返回第一个符合条件的元素的下标 

```
    // let arr = [1, 2, 234, 'sdf', -2];

    // arr.findIndex(function (v) {

    //   return v <= 2;

    // })//findIndex方法找到小于等于2的值，并返回他的下标
    

    // arr.findIndex(function (v, i, arr) {

    //   if (v < 2) { console.log(v, i, arr) }

    //   // return v;

    // })
```

