/*---------------故宫首页轮播图 GGhomePage_banner------------*/

$(function () {
  //1 轮播图的效果需要是打开时候全屏的，需要动态获取可视区域的大小，并赋给轮播图
  //动态获取可视区域的高度，把高度设置给轮播图的图片
  var $imgs = $(".GGhomePage_banner ul > li > a > img");
  var $carousel = $(".GGhomePage_banner");
  var $point = $(".GGhomePage_banner .point");
  var $left = $(".GGhomePage_banner .left");
  var $right = $(".GGhomePage_banner .right");
  //注册一个动态获取可视区域大小的事件
  $(window).resize(function () {
    $carousel.css('height', $(window).height());
  });
  $(window).trigger('resize');
  //动态添加分页器
  $imgs.each(function (index, element) {
    $('<li></li>').appendTo($point);
  });
  $point.children().eq(0).addClass('current');
  //设置计数,分开控制显示的图片和淡化动画的图片
  var count = 0;
  var that = 0;
  //基础样式
  $imgs.eq(count).css({
    display: 'block',
    opacity: 1
  });

  //注册右焦点图点击事件
  $right.click(function () {
    
    count++;
    count = count >= $imgs.length ? 0 : count;
    $imgs.eq(count).css({
      display: 'block',
      opacity: 1,
      zIndex: -1
    });
    $imgs.eq(that).css('zIndex', 1);
    $imgs.eq(that).animate({
      height: '130%',
      opacity: 0
    }, 500, function() {
      $imgs.eq(that).css({
        height: '100%',
        display: 'none'
      });
      that = count;
    });

    //分页器联动
    $point.children().eq(count).addClass('current').siblings().removeClass('current');
  })
  //给左侧焦点图注册点击事件
  $left.click(function() {

    count--;
    count = count < 0 ? $imgs.length-1 : count;
    $imgs.eq(count).css({
      display: 'block',
      opacity: 1,
      zIndex: -1
    });
    $imgs.eq(that).css('zIndex', 1);
    $imgs.eq(that).animate({
      height: '140%',
      opacity: 0
    }, 500, function() {
      $imgs.eq(that).css({
        height: '100%',
        display: 'none'
      });
      that = count;
    });
  
    //分页器联动
    $point.children().eq(count).addClass('current').siblings().removeClass('current');
  })

  //给carousel注册鼠标移动事件，鼠标靠近左右边150px内，让焦点图显示，离开让焦点图隐藏
  //这个动画有明显的卡顿问题
  $carousel.mouseenter(function() {
    $left.stop().fadeIn();
    $right.stop().fadeIn();
    //clearInterval(autoPlayId);
  });
  $carousel.mouseleave(function() {
    $left.stop().fadeOut();
    $right.stop().fadeOut();
    //autoPlayId = setInterval(function() {
    //  $imgs.eq(that).animate({height: '110%'}, 4000, 'linear', function() {
    //    $right.trigger('click');
    //  });
    //}, 5000)
  });
  //自动播放效果
  //(function() {
  //  $imgs.eq(that).animate({height: '110%'}, 4000, 'linear', function() {
  //    $right.trigger('click');
  //  });
  //})();
  //var autoPlayId = setInterval(function() {
  //  $imgs.eq(that).animate({height: '110%'}, 4000, 'linear', function() {
  //    $right.trigger('click');
  //  });
  //}, 5000)
  //注册分页器点击切换页面事件
  $point.on('click', 'li', function() {
    count = $(this).index() - 1;
    $right.trigger('click');
  });

});



/* --------------------------------废弃版本------------------------- */

/* (function() {
  //1 轮播图的效果需要是打开时候全屏的，需要动态获取可视区域的大小，并赋给轮播图
   //1 动态获取可视区域的高度，把高度设置给轮播图的图片
   var imgs = document.querySelectorAll(".GGhomePage_banner ul > li > a > img");
   var carousel = document.querySelector(".GGhomePage_banner");
   var point = carousel.querySelector(".point");
   var left = carousel.querySelector(".left");
   var right = carousel.querySelector(".right");
   //console.log(imgs);
   //注册一个动态获取可视区域大小的事件
   function resetImgSize() {
     for(var i = 0; i < imgs.length; i++) {
       imgs[i].height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
     }
     carousel.style.height = imgs[0].height + "px"; 
   }
   resetImgSize();
   window.onresize = function() {
     resetImgSize();
   };
   //动态添加分页器
    for(var i = 0 ; i < imgs.length; i++) {
      var li = document.createElement("li");
      li.index = i;
      point.appendChild(li);
    };
   //封装一个放大动画，直接增加img的高度即可； 
   function imgGrowing(element, target, speed, func) {
     clearInterval(element.sizeId);
     speed = speed || 5;
     var current = element.offsetHeight;
     element.sizeId = setInterval(function() {
       var step = target > current ? speed : -speed;
       if((target - current) / step < 1) {
         clearInterval(element.sizeId);
         element.height = target + "";
         func && func();
       }else {
         current += step;
         element.height = current + "";
       };
     }, 20)
   }
   //封装一个淡化动画
   function controlCarouselOpacity(element, target, speed) {
     clearInterval(element.timeId);
     speed = speed || 2;
     //获取当前透明度
     var current = 10 * element.style.opacity;
     //根据透明度动态设置是淡出还是显示
     var step = current > target? -speed : speed;
     //设置定时器
     element.timeId = setInterval(function() {
       if((target-current) / step < 1) {
         clearInterval(element.timeId);
         element.style.opacity = target/10 + "";
       }else {
         current += step;
         element.style.opacity = current/10 + "";
       };
     }, 40);
   }

   for(var i = 0; i < imgs.length; i++) {
     imgs[i].index = i;
   };
   //设置计数
   var count = imgs.length - 1;
   var thisIndex = imgs.length - 1;
   point.children[count].className = 'current';
   //注册右焦点图点击事件
   right.onclick = function() {
     //点击的时候给imgs伪数组倒序注册z-index
     //干掉全部的opacity
     for(var i = 0; i < imgs.length; i++) {
       imgs[i].style.zIndex = imgs.length - 1 - i + "";
       imgs[i].style.opacity = "0";
     };
     //给点击的那一项以及后面一项恢复opacity的值
     imgs[count].style.opacity = "1";
     //判断count + 1有没有超过imgs.length - 1, 超过了就变成0
     if(count >= imgs.length - 1) {
       imgs[0].style.zIndex = "0";
       imgs[0].style.opacity = "1";
     }else {
        imgs[count + 1].style.opacity = "1";
     };
     //调用动画效果
     var target = imgs[count].height * 1.5;
     var speed = imgs[count].height * 0.5 / 20;
     imgGrowing(imgs[count], target, speed);
     controlCarouselOpacity(imgs[count], 0, 1);
     //动画效果结束后，要把被动画改动的图片高度改回默认值
     setTimeout(function() {
       imgs[thisIndex].height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
       if(thisIndex >= imgs.length-1) {
         thisIndex = 0;
       }else {
         thisIndex++;
       }
     }, 500);//把延时器设置得稍微久一点，400可能会被函数覆盖
     //变动count计数
     count++;
     //假如已经是最后一张图片了，那么就把计数重置为0
     if(count > imgs.length -1) {
       count = 0;
     }; 
     //重置分页器
      for(var a = 0; a < point.children.length; a++) {
        point.children[a].className = "";
      }
      point.children[count].className = "current";
   }
   //给左侧焦点图注册点击事件
   left.onclick = function() {
     //点击给所有img正序注册index
     //干掉全部img的opacity
     for(var i = 0; i < imgs.length; i++) {
       imgs[i].style.zIndex = i + "";
       imgs[i].style.opacity = "0";
     };
     //给点击的这一项以及前面的一项恢复opacity
     imgs[count].style.opacity = "1";
     //如果count <= 0 那么就把 最后一张图片重置opacity和z-index
     if(count <= 0) {
       //因为不同于右焦点，后面的图在同层级的情况下盖在前面一张上面，所以一并要把imgs[0]的层级改掉
       imgs[0].style.zIndex = "1";
       imgs[imgs.length-1].style.zIndex = "0";
       imgs[imgs.length-1].style.opacity = "1";
     }else {
       imgs[count-1].style.opacity = "1";
     };
     //调用动画效果
     var target = imgs[count].height * 1.5;
     var speed = imgs[count].height * 0.5 / 20;
     imgGrowing(imgs[count], target, speed);
     controlCarouselOpacity(imgs[count], 0, 1);
     //动画效果结束后，要把被动画改动的图片高度改回默认值
     setTimeout(function() {
       imgs[thisIndex].height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
       if(thisIndex <= 0) {
         thisIndex = imgs.length - 1;
       }else {
         thisIndex--;
       }
     }, 600);
     count--;
     //如果已经是最前面一张图了，则把count重置为最后一张图
     if(count < 0) {
       count = imgs.length - 1;
     };
     //重置分页器
     for(var a = 0; a < point.children.length; a++) {
       point.children[a].className = "";
     }
     point.children[count].className = "current";
   };

   //给carousel注册鼠标移动事件，鼠标靠近左右边150px内，让焦点图显示，离开让焦点图隐藏
   //这个动画有明显的卡顿问题
   carousel.onmousemove = function(e) {
     if(e.clientX <= 150) {
       controlCarouselOpacity(left, 10, 2);
     }else if(e.clientX >= carousel.offsetWidth - 150) {
       controlCarouselOpacity(right, 10, 2);
     }else {
       controlCarouselOpacity(left, 0, 2);
       controlCarouselOpacity(right, 0, 2);
     }
   };
   //自动播放效果
   //有Bug, 已修复，基本可以正常使用
   function carouselAutoPlay() {
     imgGrowing(imgs[count], imgs[count].height * 1.1, imgs[count].height * 0.1 / 248, right.onclick);
   }
   carouselAutoPlay();
   var autoplayId = setInterval(function() {
     carouselAutoPlay();
   }, 5000)
   //注册分页器点击切换页面事件
   var $pages = $('.GGhomePage_banner .point').children();
   $pages.click(function() {
     if($(this).index() > count) {
       count = $(this).index() - 1;
       thisIndex = $(this).index() - 1;
        right.onclick();
      }else if($(this).index() < count) {
        count = $(this).index() + 1;
        thisIndex = $(this).index() + 1;
       left.onclick();
      };
   })
   
})(); */