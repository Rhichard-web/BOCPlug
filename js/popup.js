
const messState = document.getElementById("messState");
let toggleState = false;

function updateAssisState(state) {
    console.log("upAssistantState:" + state);
    if (state) {
        messState.innerHTML = "已启用！";
        messState.style.color = 'green';
    } else {
        messState.innerHTML = "未启用！";
        messState.style.color = 'red';
    }
}

try {
    chrome.storage.sync.get("toggleState", (result) => {
        toggleState = result.toggleState;
        updateAssisState(toggleState);
    });
} catch (err) {
    toggleState = false;
    chrome.storage.sync.set({ "toggleState": toggleState }, () => {
        updateAssisState(toggleState);
    });
}


const toggle = document.getElementById('toggle');

document.addEventListener('DOMContentLoaded', function () {

    // 加载页面时设置滑动按钮状态
    toggleState = localStorage.getItem('toggleState') === 'true';
    toggle.checked = toggleState;

    // 监听滑动按钮的变化
    toggle.addEventListener('change', function () {
        localStorage.setItem('toggleState', toggle.checked);
        chrome.storage.sync.set({ "toggleState": toggle.checked }, () => {
            updateAssisState(toggle.checked);
        })
    });
});



//计时器
// let startTime;
// let endTime;
// const timeDisplay  = document.getElemen tById("timer");
