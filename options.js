var timesList = document.getElementById('timesList');
// var addTimeButton = document.getElementById('addTime')
var addClassForm = document.getElementById('addClassForm')

var times = [];
var numOfTimes = 1;
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


function launch() {
  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: { width: 620, height: 500 }
  });
}

addClassForm.onsubmit = () => {
  var classNameValue = document.getElementById('className').value;
  var lectureLink = document.getElementById('lectureLink').value;
  var lectureTime = document.getElementById('time').value;
  var lectureDay = document.getElementById('days').value;
  var minutes = findMinutes(lectureTime, lectureDay);
  var sevenDaysInMins = 10080;

  var lectureObject = {
    className: classNameValue,
    lectureLink: lectureLink,
    lectureTime: lectureTime
  } 

  setAlarm(classNameValue + lectureDay, minutes, sevenDaysInMins);

  chrome.storage.local.get([lectureDay], (result) => {
    result[lectureDay].push(lectureObject);
    chrome.storage.local.set(result);
  })
}

function findMinutes(time, day) {
  var sevenDaysInMins = 10080
  var current = new Date();
  var currMinutes = current.getMinutes();
  var currHours = current.getHours();
  var currDays = current.getDay();
  var lectureMinutes = parseInt(time.slice(3, 5));
  var lectureHours = parseInt(time.slice(0, 2));
  var scheDay;
  
  switch (day) {
    case "Monday":
      scheDay = 1;
      break;
    case "Tuesday":
      scheDay = 2;
      break;
    case "Wednesday":
      scheDay = 3;
      break;
    case "Thursday":
      scheDay = 4;
      break;
    case "Friday":
      scheDay = 5;
      break;
    case "Saturday":
      scheDay = 7;
      break;
    case "Sunday":
      scheDay = 0;
      break;
  }

  //Same hour, greater minutes
  if(scheDay == currDays && lectureHours == currHours && lectureMinutes > currMinutes){
    var minuteDiff = lectureMinutes - currMinutes;
    return minuteDiff - 10;
  }

  //Greater hour, greater minutes
  if(scheDay == currDays && lectureHours > currHours && lectureMinutes > currMinutes){
    var minuteDiff = lectureMinutes - currMinutes;
    var hourDiff = lectureHours - currHours;
    return hourDiff * 60 + minuteDiff - 10;
  }

  if(scheDay == currDays){
    return sevenDaysInMins + (lectureHours - currHours * 60) + (lectureMinutes - currDays);
  }
  var minutesToReturn = 0;

  minutesToReturn += 60 - currMinutes;
  currHours++;

  if(currHours != 0) {
    minutesToReturn += 60*(24 - currHours);
    currHours = 0;
    currDays++;
  }
  

  if(scheDay - currDays < 0){
    minutesToReturn += (24 * 60) * (7 + scheDay - currDays);
  }else{
    minutesToReturn += (24 * 60) * (scheDay - currDays);
  }

  minutesToReturn += 60 * lectureHours;
  minutesToReturn += lectureMinutes;
  
  return minutesToReturn - 10;
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  renderSchedule();
});

var renderSchedule = () => {
  var dayCol;
  for(var day of days){
    var idStd = "dayCol"
    dayCol = document.getElementById(idStd.concat(day));
    dayCol.innerHTML = '';
    const header = document.createElement('h3');
    header.innerText = day;
    dayCol.appendChild(header);
  }
  
  chrome.storage.local.get([days[0]], (result) => {
    var dayArray = result[days[0]];
    var id = 0;

    for(var dayItem of dayArray){
      var column = document.getElementById("dayColMonday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);
      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', id)
      deleteButton.setAttribute('class', "btn btn-danger")
      deleteButton.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg>';
      deleteButton.onclick = () => {
        deleteAlarm(dayItem.className + days[0]);
        chrome.storage.local.get([days[0]], (result) => {
          result[days[0]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[0]]);
          chrome.storage.local.set(result);
        })
      }

      const name = document.createElement('h4');
      const time = document.createElement('h4');
      name.setAttribute('id', 'textStylingB');
      time.setAttribute('id', 'textStylingB');
      name.innerHTML = dayItem.className;
      time.innerHTML = dayItem.lectureTime;

      
      lectureNode.appendChild(name);
      lectureNode.appendChild(time);
      lectureNode.appendChild(deleteButton);
      column.appendChild(lectureNode);
      id++;
    }
  })

  chrome.storage.local.get([days[1]], (result) => {
    var dayArray = result[days[1]];
    var id = 0;
    
    for(var dayItem of dayArray){
      
      var column = document.getElementById("dayColTuesday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', id)
      deleteButton.setAttribute('class', "btn btn-danger")
      deleteButton.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg>';
      deleteButton.onclick = () => {
        deleteAlarm(dayItem.className + days[1]);
        chrome.storage.local.get([days[1]], (result) => {
          result[days[1]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[1]]);
          chrome.storage.local.set(result);
        })
      }

      const name = document.createElement('h5');
      const time = document.createElement('h5');
      name.setAttribute('id', 'textStylingB');
      time.setAttribute('id', 'textStylingB');
      name.innerHTML = dayItem.className;
      time.innerHTML = dayItem.lectureTime;

      
      lectureNode.appendChild(name);
      lectureNode.appendChild(time);
      lectureNode.appendChild(deleteButton);
      column.appendChild(lectureNode);
      id++;
    }
  })
  chrome.storage.local.get([days[2]], (result) => {
    var dayArray = result[days[2]];
    var id = 0;
    
    for(var dayItem of dayArray){
      
      var column = document.getElementById("dayColWednesday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', "btn btn-danger")
      deleteButton.setAttribute('id', id)
      deleteButton.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg>';
      deleteButton.onclick = () => {
        deleteAlarm(dayItem.className + days[2]);
        chrome.storage.local.get([days[2]], (result) => {
          result[days[2]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[2]]);
          chrome.storage.local.set(result);
        })
      }

      const name = document.createElement('h5');
      const time = document.createElement('h5');
      name.setAttribute('id', 'textStylingB');
      time.setAttribute('id', 'textStylingB');
      name.innerHTML = dayItem.className;
      time.innerHTML = dayItem.lectureTime;

      
      lectureNode.appendChild(name);
      lectureNode.appendChild(time);
      lectureNode.appendChild(deleteButton);
      column.appendChild(lectureNode);
      id++;
    }
  })

  chrome.storage.local.get([days[3]], (result) => {
    var dayArray = result[days[3]];
    var id = 0;
    
    for(var dayItem of dayArray){
      
      var column = document.getElementById("dayColThursday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', "btn btn-danger")
      deleteButton.setAttribute('id', id)
      deleteButton.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg>';
      deleteButton.onclick = () => {
        deleteAlarm(dayItem.className + days[3]);
        chrome.storage.local.get([days[3]], (result) => {
          result[days[3]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[3]]);
          chrome.storage.local.set(result);
        })
      }

      const name = document.createElement('h5');
      const time = document.createElement('h5');
      name.setAttribute('id', 'textStylingB');
      time.setAttribute('id', 'textStylingB');
      name.innerHTML = dayItem.className;
      time.innerHTML = dayItem.lectureTime;

      
      lectureNode.appendChild(name);
      lectureNode.appendChild(time);
      lectureNode.appendChild(deleteButton);
      column.appendChild(lectureNode);
      id++;
    }
  })

  chrome.storage.local.get([days[4]], (result) => {
    var dayArray = result[days[4]];
    var id = 0;
    
    for(var dayItem of dayArray){
      
      var column = document.getElementById("dayColFriday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', "btn btn-danger")
      deleteButton.setAttribute('id', id)
      deleteButton.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg>';
      deleteButton.onclick = () => {
        deleteAlarm(dayItem.className + days[4]);
        chrome.storage.local.get([days[4]], (result) => {
          result[days[4]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[4]]);
          chrome.storage.local.set(result);
        })
      }

      const name = document.createElement('h5');
      const time = document.createElement('h5');
      name.setAttribute('id', 'textStylingB');
      time.setAttribute('id', 'textStylingB');
      name.innerHTML = dayItem.className;
      time.innerHTML = dayItem.lectureTime;

      
      lectureNode.appendChild(name);
      lectureNode.appendChild(time);
      lectureNode.appendChild(deleteButton);
      column.appendChild(lectureNode);
      id++;
    }
  })

  chrome.storage.local.get([days[5]], (result) => {
    var dayArray = result[days[5]];
    var id = 0;
    
    for(var dayItem of dayArray){
      
      var column = document.getElementById("dayColSaturday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', "btn btn-danger")
      deleteButton.setAttribute('id', id)
      deleteButton.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg>';
      deleteButton.onclick = () => {
        deleteAlarm(dayItem.className + days[5]);
        chrome.storage.local.get([days[5]], (result) => {
          result[days[5]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[5]]);
          chrome.storage.local.set(result);
        })
      }

      const name = document.createElement('h5');
      const time = document.createElement('h5');
      name.setAttribute('id', 'textStylingB');
      time.setAttribute('id', 'textStylingB');
      name.innerHTML = dayItem.className;
      time.innerHTML = dayItem.lectureTime;

      
      lectureNode.appendChild(name);
      lectureNode.appendChild(time);
      lectureNode.appendChild(deleteButton);
      column.appendChild(lectureNode);
      id++;
    }
  })

  chrome.storage.local.get([days[6]], (result) => {
    var dayArray = result[days[6]];
    var id = 0;
    
    for(var dayItem of dayArray){
      
      var column = document.getElementById("dayColSunday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('class', "btn btn-danger")
      deleteButton.setAttribute('id', id)
      deleteButton.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/></svg>';
      deleteButton.onclick = () => {
        deleteAlarm(dayItem.className + days[6]);
        chrome.storage.local.get([days[6]], (result) => {
          result[days[6]].splice(lectureNode.getAttribute('id'), 1);
          chrome.storage.local.set(result);
        })
      }

      const name = document.createElement('h5');
      const time = document.createElement('h5');
      name.setAttribute('id', 'textStylingB');
      time.setAttribute('id', 'textStylingB');
      name.innerHTML = dayItem.className;
      time.innerHTML = dayItem.lectureTime;

      
      lectureNode.appendChild(name);
      lectureNode.appendChild(time);
      lectureNode.appendChild(deleteButton);
      column.appendChild(lectureNode);
      id++;
    }
  })

}



function setAlarm(alarmName, minutes, sevenDaysInMins) {
  chrome.alarms.create(alarmName, {delayInMinutes: minutes, periodInMinutes: sevenDaysInMins});
}

function deleteAlarm(alarmName){
  chrome.alarms.clear(alarmName);
}

renderSchedule();


