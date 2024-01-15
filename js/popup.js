// $(function(){
//     $('#input1').keyup(function(){
//         $('#message').text('你好，'+$('#input1').val());
//     });
// })

//计时器
// let startTime;
// let endTime;
// const timeDisplay  = document.getElementById("timer");

// document.getElementById('st')

const messState = document.getElementById("messState");
const onState = document.getElementById("onState");
const closeState = document.getElementById("closeState");
const assisState  = document.getElementById("assisState");
let click_assisState = false;

function updateAssisState(state){
    console.log("upAssistantState:"+state);
    if(state){
        messState.innerHTML="已启用！";
        messState.style.color = 'green';
    }else{
        messState.innerHTML="未启用！";
        messState.style.color = 'red';
    }
}

try{
    chrome.storage.sync.get("click_assisState", (result)=>{
        click_assisState = result.click_assisState;
        updateAssisState(click_assisState);
    });
}catch(err){
    click_assisState = false;
    chrome.storage.sync.set({"click_assisState":click_assisState},()=>{
        updateAssisState(click_assisState);
    });
}
// assisState.addEventListener("click", (event)=>{
//     click_assisState = !click_assisState;
//     chrome.storage.sync.set({"click_assisState":click_assisState},()=>{
//         updateAssisState(click_assisState);
//     });
// })


onState.addEventListener("click", (event)=>{
    chrome.storage.sync.set({"click_assisState" : true},()=>{
        updateAssisState(true);
    })
})

closeState.addEventListener("click", (event)=>{
    console.log("qiyong");
    chrome.storage.sync.set({"click_assisState" : false},()=>{
        updateAssisState(false);
    })
})
