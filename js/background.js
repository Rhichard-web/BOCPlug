chrome.commands.onCommand.addListener((command) => {
    if (command === "rotate-image") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['content.js']
            });
        });
    }
});
