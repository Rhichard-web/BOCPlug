
// 定义一个变量来记录上一次点击的时间
let lastClickTime = 0;

// 添加一个事件监听器来监听右键点击事件
document.addEventListener('contextmenu', function(event) {
    // 阻止默认的右键菜单
    event.preventDefault();

    // 获取当前时间
    const currentTime = Date.now();

    // 检查两次点击之间的时间差
    if (currentTime - lastClickTime < 800) { // 例如，500毫秒内为双击
        // 如果是快速连续两次点击，执行函数
        onDoubleClick();
    }

    // 更新最后一次点击的时间
    lastClickTime = currentTime;
});

// 定义双击时触发的函数
function onDoubleClick() {
    console.log("鼠标右键被快速连续点击两次");
    // 在这里添加您希望执行的操作
}


