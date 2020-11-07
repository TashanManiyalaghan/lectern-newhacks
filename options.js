var timesList = document.getElementById('timesList');
// var addTimeButton = document.getElementById('addTime')
var addClassForm = document.getElementById('addClassForm')


var times = [];
var numOfTimes = 1;
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", " Sunday"];

// addTimeButton.onclick = () => {
//   numOfTimes++;
//   const daySelect = document.createElement('select');
//   daySelect.setAttribute('id', 'days'+numOfTimes);
//   for(var day of days){
//     const optionsDay = document.createElement('option');
//     optionsDay.setAttribute('value', day);
//     optionsDay.textContent = day;
//     daySelect.appendChild(optionsDay);
//   }


//   const timeElement = document.createElement('input');
//   timeElement.setAttribute('type', 'time');
//   timeElement.setAttribute('id', 'time'+numOfTimes);
//   timesList.appendChild(timeElement);
//   timesList.appendChild(daySelect);
//   timesList.appendChild(document.createElement('br'))
// }


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
  chrome.storage.log.get()
  
  chrome.storage.local.set(lectureDay, [... lectureObject]);
}



