chrome.alarms.onAlarm.addListener(
    (alarm) => {
        const tabId = alarm.name.split('-')[0]
        chrome.tabs.remove(+tabId)
        chrome.storage.local.remove(tabId + '');
        console.log(`Tab ${tabId} closed at ${new Date()}`)
    });