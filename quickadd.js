document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('settingsButton');
    button.addEventListener('click', function() {
      window.open('options.html');
    });
  });

addClassForm.onsubmit = () => {
    var classNameValue = document.getElementById('className').value;
    var lectureLink = document.getElementById('lectureLink').value;
    var lectureTime = document.getElementById('time').value;
    var lectureDay = document.getElementById('days').value;

  
    var lectureObject = {
      className: classNameValue,
      lectureLink: lectureLink,
      lectureTime: lectureTime
    } 
    chrome.storage.local.get([lectureDay], (result) => {
      console.log(result);
      result[lectureDay].push(lectureObject);
      // currentSavedDay = result[lectureDay];
      // console.log(currentSavedDay);
      console.log(result);
      chrome.storage.local.set(result);
    })
  }