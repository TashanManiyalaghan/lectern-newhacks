document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('settingsButton');
  btn.addEventListener('click', function() {
    window.open('options.html');
  });
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

var d = new Date();
var day = d.getDay();

console.log(day);

chrome.storage.local.get(days[day - 1], (value) => {
  var dayArray = value[days[day - 1]];

  for (var course of dayArray) {
    const button = document.createElement('BUTTON');
    button.setAttribute('type', 'sumbit');
    button.setAttribute('class','stylingButton')

    const title = document.createTextNode(course.className + " @ " + course.lectureTime);

    button.appendChild(title);
    document.body.appendChild(button);

    button.onclick = function () {
      window.open(course.lectureLink);
    }
  }
});
