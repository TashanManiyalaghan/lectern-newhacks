document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('settingsButton');
  btn.addEventListener('click', function() {
    window.open('options.html');
  });
});

function compare( a, b ) {
  if ( a.lectureTime < b.lectureTime ){
    return -1;
  }
  if ( a.lectureTime > b.lectureTime ){
    return 1;
  }
  return 0;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

var d = new Date();
var day = d.getDay();

day+=7;

if (day > 7) {
  day = day%7;
}

chrome.storage.local.get(days[day - 1], (value) => {
  var dayArray = value[days[day - 1]];
  dayArray.sort(compare);

  if(dayArray.length == 0){
    var noLectures = document.createElement('p');
    noLectures.setAttribute('style', 'color: white;')
    noLectures.innerText = "No lectures scheduled :)"
    var container = document.getElementById('popupContainer')
    container.appendChild(noLectures);
  }else{
    for (var course of dayArray) {
      const button = document.createElement('BUTTON');
      button.setAttribute('type', 'sumbit');
      button.setAttribute('style', "background-color: " + course.courseColour);
      button.setAttribute('class','stylingButton')
  
      const title = document.createTextNode(course.className + " @ " + course.lectureTime);
  
      button.appendChild(title);
  
      var container = document.getElementById('popupContainer')
      container.appendChild(button);
  
      button.onclick = function () {
        window.open(course.lectureLink);
      }
    }
  }
});
