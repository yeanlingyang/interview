/*code is far away from bug with the animal protecting
     ┏┓　　　┏┓
   ┏┛┻━━━┛┻┓
   ┃　　　　　　　┃ 　
   ┃　　　━　　　┃
   ┃　┳┛　┗┳　┃
   ┃　　　　　　　┃
   ┃　　　┻　　　┃
   ┃　　　　　　　┃
   ┗━┓　　　┏━┛
   　　┃　　　┃神兽保佑
   　　┃　　　┃代码无BUG！
   　　┃　　　┗━━━┓
   　　┃　　　　　　　┣┓
   　　┃　　　　　　　┏┛
   　　┗┓┓┏━┳┓┏┛
   　　　┃┫┫　┃┫┫
   　　　┗┻┛　┗┻┛
  2019-05-02  woodPeckerAnos 　　　
 */
(function() {
/*-------------------故宫导航 GG_nav--------------------*/

      /* 故宫次级导航 */
//鼠标移入对应导航条目的时候，下方的次级导航高度从0展开至50px
//鼠标移出时立刻降为0，不需要过渡动画效果
function subnavRise(element) {
    var current = element.offsetHeight;
    element.timeId = setInterval(function() {
    var step = 5;
    if(current >= 50) {
      clearInterval(element.timeId);
    }else {
      current += step;
      element.style.height = current + "px";
    };
  }, 20);
}
var navUl = document.querySelector("ul.nav");
var nav_subnav = document.querySelector(".nav_subnav")
var subnav_items = document.querySelectorAll(".nav_subnav > ul");
var nav_items = document.querySelectorAll(".GG_nav .nav > li > a");
var listIcon = document.querySelectorAll(".GG_nav .nav li > a .listIcon");
//给里面的第二到第八项注册鼠标移入和鼠标移出事件
for(var i = 1; i < nav_items.length; i++) {
  nav_items[i].index = i;
  subnav_items[i-1].index = i-1;
  nav_items[i].onmouseover = function() {
    listIcon[this.index].style.display = "block";
    subnav_items[this.index-1].style.display = "block";
    subnavRise(nav_subnav);
    //if(listIcon[this.index].touched) {
    //  clearInterval(nav_subnav.timeId);
    //  nav_subnav.style.height = "50px";
    //}
  };
  //用于处理小下标导致的次级导航闪烁bug
  // listIcon[i].touched = false;
  // listIcon[i].onmouseover = function() {
    // this.touched = true;
  // };
  nav_items[i].onmouseout = function(e) {
    clearInterval(nav_subnav.timeId);
    if(e.pageY <= 47) {
      subnav_items[this.index-1].style.display = "none";
      listIcon[this.index].style.display = "none";
      nav_subnav.style.height = "0";
      subnav_items[this.index-1].style.display = "none";
      // listIcon[this.index].touched = false;
    };
  };
  //为了保证移动到子元素上也不会消失，必须注册两个事件，利用事件冒泡
  subnav_items[i-1].onmouseover = function() {
    nav_subnav.style.height = "50px";
    this.style.display = "block";
    listIcon[this.index + 1].style.display = "block";
  };
  subnav_items[i-1].onmouseout = function() {
    nav_subnav.style.height = "0";
    this.style.display = "none";
    listIcon[this.index + 1].style.display = "none";
    // listIcon[this.index + 1].touched = false;
  };
  //把每一个ul的左padding值动态的设定为当前对应主导航项的offsetLeft + offsetWidth/2 - ul.offsetWidth/2
  //会因为屏幕大小的改变而产生bug，需要使用定时器来动态更新。
  //subnav_items[i-1].style.paddingLeft = nav_items[i].offsetLeft + nav_items[i].offsetWidth/2 + "px";
}
  //(navUl.offsetLeft - navUl.offsetWidth/2) + nav_items[i].offsetLeft + nav_items[i].offsetWidth/2 - subnav_items[i-1].scrollWidth / 2  + 'px';
/* 修改意见，通过获取盒子内文本的宽度来更好的调节位置 */
  /* 改成减去Ul文本内容的宽度的一半就可以了 ul.scrollWidth / 2  */
  /* 设置导航栏宽度 */
  var dataUl = document.querySelectorAll('.nav_subnav_data > ul');
  var dataUlWidth = [];
  for(var i = 0; i < dataUl.length; i++) {
    var sum = 0;
    for(var j = 0 ; j < dataUl[i].children.length; j++) {
      sum += dataUl[i].children[j].offsetWidth;
    }
    dataUlWidth.push(sum);
  }
  window.onresize = function() {
    for(var i = 1; i < nav_items.length; i++) {
      subnav_items[i-1].style.paddingLeft = (navUl.offsetLeft - navUl.offsetWidth/2) + nav_items[i].offsetLeft + nav_items[i].offsetWidth/2 - dataUlWidth[i-1] / 2 + "px";
    }
  }
  window.onresize();
  //你刷新了，你电脑炸了，跟我是一个冷酷无情的定时器，又有什么关系呢？

  //subnav_items[1].style.paddingLeft = "350px";
  
          /* 功能模块 */
  //获取对象
  var func_items = document.querySelectorAll(".GG_nav .function div.item");
  var outBoxes = document.querySelectorAll(".function .item .outbox");
  var searchBox = document.querySelector(".function .search .searchbox");
  //console.log(func_items);        
  //给前两个注册鼠标移入事件，移入给outbox进行透明度动画，并且隐藏搜索框
  for(var i = 0; i < func_items.length-1; i++) {
    func_items[i].index = i;
    func_items[i].onmouseover = function() {
      this.style.height = "110px";
      outBoxes[this.index].style.display = "block";
      controlOpacity(outBoxes[this.index], 10);
      searchBox.style.display = "none";
    };
    //给前两个注册鼠标移出事件，移出给Outbox进行透明度动画
    func_items[i].onmouseout = function() {
      var that = this;
      setTimeout(function() {
        //包一个判断，防止因为延时器导致最后出现的none覆盖掉block;
        if(outBoxes[that.index].style.opacity == 0) {
          outBoxes[that.index].style.display = "none";
        }
      }, 200);
      this.style.height = "";
      controlOpacity(outBoxes[this.index], 0);
    };
  };  
  //给搜索设置点击事件，点击显示搜索框
  func_items[2].onclick = function() {
    searchBox.style.display = "flex";
  };
  //给搜索框设置获取焦点事件，获取焦点的时候清空默认的内容
  searchBox.children[0].onfocus = function() {
    if(searchBox.children[0].value === "搜索关键字...") {
    searchBox.children[0].value = "";
    }
  };
            /* 按钮模块 */
  //点击按钮，弹出固定定位的大导航盒子
  var navBox = document.querySelector("div.GG_navBox");
  var nav_btn = document.querySelector(".GG_nav .button");
  var navBoxClose = navBox.querySelector("div.close");
  nav_btn.onclick = function() {
    navBox.style.display = "flex";
    controlOpacity(navBox, 10);
  };
  //点击x按钮，关闭导航盒子
  navBoxClose.onclick = function() {
    navBox.style.display = "none";
    navBox.style.opacity = "0";
  };
})();
