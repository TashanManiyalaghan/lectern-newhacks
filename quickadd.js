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
    var colour = document.getElementById('colours').value;
  
    var lectureObject = {
      className: classNameValue,
      lectureLink: lectureLink,
      lectureTime: lectureTime,
      courseColour: colour
    } 
    chrome.storage.local.get([lectureDay], (result) => {
      result[lectureDay].push(lectureObject);
      chrome.storage.local.set(result);
    })
  }