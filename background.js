chrome.alarms.onAlarm.addListener(
    (alarm) => {
        const tabId = alarm.name.split('-')[0]
        chrome.tabs.remove(+tabId)
        console.log("Tab closed at: " + new Date())
    });

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting == "hello")
            sendResponse({ farewell: "goodbye" });
    });