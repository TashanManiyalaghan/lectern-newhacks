const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

chrome.runtime.onInstalled.addListener(function() {
  for(var day of days){
    var dayObject = {};
    dayObject[day] = new Array();
    chrome.storage.local.set(dayObject);
  }
  
});

chrome.alarms.onAlarm.addListener(function() {
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  './res/icon_48.png',
      title:    'Lecture in 10 minutes',
      message:  'You have lecture in 10 minutes!',
      priority: 0});
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: item.minutes});
  });
});


