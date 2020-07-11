document.addEventListener('DOMContentLoaded', function () {

    var sleepTabButton = document.getElementById('sleepTab');
    sleepTabButton.addEventListener('click', function () {
        let min = +document.getElementById('minutesInput').value;
        let alarmName;
        chrome.tabs.getSelected(null, function (tab) {
            alarmName = tab.id + "-sleep-" + min;
            chrome.alarms.create(this.alarmName, { delayInMinutes: min });
        });

        document.getElementById('sleepDiv').style.display = 'none';
        document.getElementById('cancelDiv').style.display = 'unset';
    }, false);

    var cancelSleepButton = document.getElementById('cancelSleep');
    cancelSleepButton.addEventListener('click', function () {
        chrome.alarms.clear(alarmName);
        document.getElementById('sleepDiv').style.display = 'unset';
        document.getElementById('cancelDiv').style.display = 'none';
    }, 'true');
}, false);

