const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", " Sunday"];

chrome.runtime.onInstalled.addListener(function() {
  for(var day of days){
    chrome.storage.local.set({day: []}, function() {
      console.log("The color is green.");
    });
  }
  
});