

// chrome.storage.local.get('Monday', (value) => {
//   console.log(value);
//   var dayArray = value.Monday;
//   console.log(dayArray)
//   // if(!value.isEmpty()){
//   //   for(var lectureObjects of value){
//   //     console.log(lectureObjects.className);
//   //   }
//   // }
  
// })

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", " Sunday"];

var d = new Date();
var day = d.getDay();

console.log(day);

chrome.storage.local.get(days[day - 1], (value) => {
  var dayArray = value[days[day - 1]];

  for (var course of dayArray) {
    const button = document.createElement('BUTTON');
    button.setAttribute('type', 'sumbit');

    const courseDisplay = document.createElement('H6');
    const name = document.createTextNode(course.className);
    const time = document.createTextNode(course.lectureTime);

    button.appendChild(name);
    button.appendChild(time);
    document.body.appendChild(button);

    button.onclick = function () {
      window.open(course.lectureLink);
    }
  }
});
