/* 数字跳动函数 */
function numberAni(element, number, step) {
  step = step || 10
  var numPartOne = number % 1000;
  var numPartTwo = (number - numPartOne) % 1000000 / 1000;
  var numPartThree = parseInt(number / 1000000);
  var current = 0;
  var currentPartOne;
  var currentPartTwo;
  var currentPartThree;
  element.numberId = setInterval(function() {
    if(current <= number) {
      current += step;
      currentPartOne = current % 1000;
      currentPartTwo = (current - currentPartOne) % 1000000 / 1000;
      currentPartThree = parseInt(current / 1000000);
      element.innerText = currentPartOne + "";
      if(currentPartTwo > 0) {
        element.innerText = currentPartTwo + "," + currentPartOne;
      }
      if(currentPartThree > 0) {
        element.innerText = currentPartThree + "," + currentPartTwo + "," + currentPartOne;
      }
    }else {
      clearInterval(element.numberId);
      element.innerText = numPartThree + "," + numPartTwo + "," + numPartOne;
    }
  }, 30)
}

/* 显示和淡出动画函数 */
function controlOpacity(element, target) {
  clearInterval(element.timeId);
  //获取当前透明度
  var current = 10 * element.style.opacity;
  //根据透明度动态设置是淡出还是显示
  var step = current > target? -2 : 2;
  //设置定时器
  element.timeId = setInterval(function() {
    if(current === target) {
      clearInterval(element.timeId);
    }else {
      current += step;
      element.style.opacity  = current/10 + "";
    };
  }, 40);
}

/* --------------适用于故宫div事件的封装动画--------------- */

 /* 封装一个水平方向移动的动画 */
 function moveBox(element, target) {
  clearInterval(element.timeId)
  var current = element.offsetLeft
  var step = target > current ? 8 : -8;
  element.timeId = setInterval(function () {
    if ((target - current) / step < 6) {
      step = step / 4;
      if((target - current) / step < 3) {
        step = step / 2;
        if((target - current) / step < 1) {
          clearInterval(element.timeId)
          element.style.left = target + 'px'
        }
      }
    } else {
      current += step
      element.style.left = current + 'px'
    }
  }, 10)
}
/* 封装一个垂直方向移动的动画 */
function moveBoxUpDown(element, target) {
  clearInterval(element.upDownId);
  var current = element.offsetTop;
  var step = target > current ? 8 : -8;
  element.upDownId = setInterval(function () {
    if ((target - current) / step < 6) {
      step = step / 4;
      if((target - current) / step < 3) {
        step = step / 2;
        if((target - current) / step < 1) {
          clearInterval(element.upDownId)
          element.style.top = target + 'px'
        }
      }
    }else {
      current += step
      element.style.top = current + 'px'
    }
  }, 10)
}

/* -------故宫Div事件函数封装，不同方向移入移出shadowBox效果------ */

function makeGGDiv(box, shadowBox, find) {
  //获取盒子左顶点的位置
  var xLeft = box.offsetLeft + find.offsetLeft;
  var yLeft = box.offsetTop + find.offsetTop;
  //console.log(xLeft, yLeft)
  //获取盒子右下角的位置
  var xRight = xLeft + box.offsetWidth;
  var yRight = yLeft + box.offsetHeight;
  //console.log(xRight, yRight)
  //获取盒子中点的位置
  var xCenter = (xLeft + xRight) / 2;
  var yCenter = (yLeft + yRight) / 2;
  //console.log(xCenter, yCenter)
  //获取盒子从左上到右下对角线的斜率 y = k * x
  var kLeftToRight = (yRight - yLeft) / (xRight - xLeft);
  //console.log(kLeftToRight)
  //设置盒子的鼠标移入事件，获取移入时的鼠标位置
  box.onmouseenter = function (event) {
    //console.log('移入')
    //鼠标移入的时候，获取移入位置的鼠标坐标
    var xIn = event.pageX
    var yIn = event.pageY
    //console.log(xIn, yIn)
    //根据坐标判断鼠标是从盒子的哪一个方向移入的
    var kIn = (yIn - yCenter) / (xIn - xCenter)
    //假如kIn的绝对值比 外部的斜线k要大，那么鼠标要么是从上面移入的，要么是从下面移入的
    if (Math.abs(kIn) > kLeftToRight) {
      //假如坐标的yIn值大于yCenter,那么就是从下面移入的；反之就是上面移入的
      if (yIn > yCenter) {
        //alert("鼠标是从下面移入的");
        //重置子盒子的位置
          clearInterval(shadowBox.timeId)
        shadowBox.style.top = box.offsetHeight + 'px'
        shadowBox.style.left = '0'
        //垂直方向动画，从下往上运动到top为0
        moveBoxUpDown(shadowBox, 0)
      } else {
        //alert("鼠标是从上面移入的");
          clearInterval(shadowBox.timeId)
        shadowBox.style.top = -shadowBox.offsetHeight + 'px'
        shadowBox.style.left = '0'
        moveBoxUpDown(shadowBox, 0)
      }
    } else {
      //假如kIn的绝对值要小于 外部的斜线k，那么鼠标要么是从左边移入的，要么是从右边移入的
      //如果坐标的xIn值大于xCenter 那么鼠标是从右边移入的 ，如果坐标的xIn值小于xCenter 那么鼠标是从左边移入的
      if (xIn > xCenter) {
        //alert("鼠标是从右边移入的");
          clearInterval(shadowBox.upDownId)
        shadowBox.style.left = box.offsetWidth + 'px'
        shadowBox.style.top = '0'
        moveBox(shadowBox, 0)
      } else {
        //alert("鼠标是从左边移入的");
          clearInterval(shadowBox.upDownId)
        shadowBox.style.left = -shadowBox.offsetWidth + 'px'
        shadowBox.style.top = '0'
        moveBox(shadowBox, 0)
      }
    }
  }
  //设置盒子的鼠标移出事件，获取移出时的鼠标位置
  box.onmouseleave = function (event) {
    //console.log('移除')
    //鼠标移出的时候，获取移出的鼠标坐标
    var xOut = event.pageX
    var yOut = event.pageY
    var kOut = (yOut - yCenter) / (xOut - xCenter)
    //根据坐标判断鼠标是从盒子的哪一个方向移入的
    if (Math.abs(kOut) > kLeftToRight) {
      //假如坐标的yIn值大于yCenter,那么就是从下面移出的；反之就是上面移出的
      if (yOut > yCenter) {
        //alert("鼠标是从下面移出的");
        //触发一个动画，shadowBox向移出的方向移动
        moveBoxUpDown(shadowBox, box.offsetHeight)
      } else {
        //alert("鼠标是从上面移出的");
        moveBoxUpDown(shadowBox, -shadowBox.offsetHeight)
      }
    } else {
      //假如kIn的绝对值要小于 外部的斜线k，那么鼠标要么是从左边移入的，要么是从右边移入的
      //如果坐标的xIn值大于xCenter 那么鼠标是从右边移入的 ，如果坐标的xIn值小于xCenter 那么鼠标是从左边移入的
      if (xOut > xCenter) {
        //alert("鼠标是从右边移出的");
        moveBox(shadowBox, box.offsetWidth)
      } else {
        //alert("鼠标是从左边移出的");
        moveBox(shadowBox, -shadowBox.offsetWidth)
      }
    }
  }
}
