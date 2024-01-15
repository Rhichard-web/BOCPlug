let use_midbtn_to_submit = false;


window.onload = function () {
    // let cans = document.getElementsByClassName("first-img first-img-9f4fac082ffd4482803c95fefff5fa7a");
    // console.log(cans);
    try{
        chrome.storage.sync.get("use_midbtn_to_submit", (result)=> {
            use_midbtn_to_submit = result.use_midbtn_to_submit;
        });
    } catch(err) {
        use_midbtn_to_submit = false;
        chrome.storage.sync.set({"use_midbtn_to_submit": use_midbtn_to_submit},()=> {
            updateState(use_midbtn_to_submit);
        });
    }
}

function pass_commit() {
    let dialog_window = document.querySelector("div[aria-label='提示'] > div[class='bfe-dialog__body']");
    if (dialog_window != null &&
        dialog_window != undefined &&
        dialog_window.children != undefined &&
        dialog_window.children.length != 0) {
        let submit2Button = document.getElementsByClassName('bfe-button bfe-button--primary');
        if (submit2Button.length > 0) {
            for(let i=submit2Button.length-1; i>=0; i--) {
                let item = submit2Button[i];
                if (item.children === undefined) continue;
                if (item.children[0].innerText === "确定(Y)") {
                    item.click();
                    break;
                }
            }
        }
    } else {
        let submitButton = document.getElementsByClassName('bfe-button bfe-button--info bfe-elevation-4');
        
        if (submitButton.length > 0) {
            for (let item of submitButton) {
                if (item.children === undefined) continue;
                if (item.children[0].innerText === "批准(Y)") {
                    item.click();
                    break;
                }
            }
        }
    }
}

document.addEventListener('mousedown', (event) => {
    if (event.button === 1 && use_midbtn_to_submit) {
        event.preventDefault();
        pass_commit();
    }
});

const clickBtn = (event, idx) => {
    event.preventDefault();
    const tops_lst = document.getElementsByClassName("top");
    const tops = tops_lst[tops_lst.length-1];
    const imgs = tops.children;
    if (imgs != undefined) imgs[idx].click();
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        res = ""
        if (request.action === "all_img_tag_src") res = all_img_tag_src()
        sendResponse(res);
    }
);

/**
 * send all img tag src as a list to background
 */
var all_img_tag_src = () => {
    var images = document.querySelectorAll('img');
    var imgs = Array.from(images).filter(img => img.src.length > 2000);
    return imgs.map(img => img.src);
}

var getBaseInfo = () => {
    const code_ele = document.querySelector("#authorize > div.mask > div.box > div.box_content.bl-box-content > div > div:nth-child(1) > div.box_approval_desc > div > div:nth-child(1) > div:nth-child(1) > div.desc > span");
    const left_img_ele = document.querySelector("#reviewMain > div.review-page-content > div > div.boxs-review > div > div > img").innerText;
    if(code_ele != null && code_ele != undefined) {
        const code = code_ele.innerText;
    }
}

var grayPicture = async () => {
    const left_img_ele = await document.querySelector("#reviewMain > div.review-page-content > div > div.boxs-review > div > div > img").innerText;
    const img = await left_img_ele.src;
    console.log(img)
    chrome.runtime.sendMessage({
    action: "executeInSandbox",
    script: "to_gray",
    img: img
    }, response => {
        console.log('Received response from sandbox:', response);
    });
}

document.onkeydown = function (event) {
    if (event.key == "F1") {
        clickBtn(event, 1);
    } else if (event.key == "F2") {
        clickBtn(event, 2);
    } else if (event.key == "F3" || (event.key == "Tab" && event.shiftKey)) {
        clickBtn(event, 3);
    } else if (event.key == "F4" || event.key == "Tab") {
        clickBtn(event, 4);
    } else if (event.key == "F5") {
        event.preventDefault();
        pass_commit()
    } else if (event.key == "F7") {
        event.preventDefault();
        grayPicture();
    }
}