var addClassForm = document.getElementById('addClassForm');
var addTimeButton = document.getElementById('addTime')


var times = [];
var numOfTimes = 1;
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", " Sunday"];

addTimeButton.onclick = () => {
  numOfTimes++;
  const daySelect = document.createElement('select');
  daySelect.setAttribute('id', 'days'+numOfTimes);
  for(var day of days){
    const optionsDay = document.createElement('option');
    optionsDay.setAttribute('value', day);
    optionsDay.textContent = day;
    daySelect.appendChild(optionsDay);
  }


  const timeElement = document.createElement('input');
  timeElement.setAttribute('type', 'time');
  timeElement.setAttribute('id', 'time'+numOfTimes);
  addClassForm.appendChild(timeElement);
  addClassForm.appendChild(daySelect);
  addClassForm.appendChild(document.createElement('br'))
}



