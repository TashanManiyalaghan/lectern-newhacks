const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

chrome.runtime.onInstalled.addListener(function() {
  for(var day of days){
    var dayObject = {};
    dayObject[day] = new Array();
    chrome.storage.local.set(dayObject);
  }
  
});