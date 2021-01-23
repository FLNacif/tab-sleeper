document.addEventListener('DOMContentLoaded', function () {

    console.log(verifyIfHasActiveTimerAndShowCorrespondent)

    var sleepTabButton = document.getElementById('sleepTab');
    sleepTabButton.addEventListener('click', function () {
        let min = +(document.getElementById('minutesInput').value);
        if (min === 0) return;
        let alarmName;
        chrome.tabs.getSelected(null, function (tab) {
            let tabId = tab.id
            alarmName = tabId + "-sleep-" + min;
            chrome.alarms.create(alarmName, { delayInMinutes: min });

            var obj = {}
            obj[tabId + ''] = {
                expiresIn: +(new Date(new Date().setMinutes(new Date().getMinutes() + min))), // Somar minutos para data atual
                alarmName: alarmName
            }
            chrome.storage.local.set(obj);

            verifyIfHasActiveTimerAndShowCorrespondent(tabId);
        });


    }, false);




    var cancelSleepButton = document.getElementById('cancelSleep');
    cancelSleepButton.addEventListener('click', function () {
        chrome.tabs.getSelected(null, function (tab) {
            let tabId = tab.id;
            chrome.storage.local.get(tabId + '', (tabTimerInfo) => {
                if (tabTimerInfo[tabId] != null) {
                    chrome.alarms.clear(tabTimerInfo[tabId].alarmName);
                    chrome.storage.local.remove(tabId + '');
                }
                verifyIfHasActiveTimerAndShowCorrespondent(tabId);
            })
        });

    }, 'true');



    chrome.tabs.getSelected(null, function (tab) {
        let tabId = tab.id;
        verifyIfHasActiveTimerAndShowCorrespondent(tabId);
    });


}, false);

function showMinutes(minutesLeft) {
    let minutes = Math.trunc(minutesLeft);
    let seconds = Math.trunc((minutesLeft - minutes) * 60);
    if ('' + seconds < 2) {
        seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
}

function verifyIfHasActiveTimerAndShowCorrespondent(tabId) {
    chrome.storage.local.get(tabId + '', (tabTimerInfo) => {
        if (tabTimerInfo[tabId] != null) {
            document.getElementById('sleepDiv').style.display = 'none';
            document.getElementById('cancelDiv').style.display = 'unset';

            var minutesLeft = (tabTimerInfo[tabId].expiresIn - new Date()) / 60000;
            document.getElementById('timeLeft').textContent = showMinutes(minutesLeft);
            return;
        }

        document.getElementById('sleepDiv').style.display = 'unset';
        document.getElementById('cancelDiv').style.display = 'none';
    });

}
