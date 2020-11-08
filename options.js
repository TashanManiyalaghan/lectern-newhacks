var timesList = document.getElementById('timesList');
// var addTimeButton = document.getElementById('addTime')
var addClassForm = document.getElementById('addClassForm')

var times = [];
var numOfTimes = 1;
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

chrome.alarms.onAlarm.addListener(function() {
  chrome.notifications.create(classNameValue + lectureDay, "u have class");
  launch();
  console.log("works");
});

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
  var daysInMin = 10080;

  var lectureObject = {
    className: classNameValue,
    lectureLink: lectureLink,
    lectureTime: lectureTime
  } 

  chrome.alarms.create(classNameValue + lectureDay, {delayInMinutes: minutes, periodInMinutes: daysInMin});
  chrome.storage.local.get([lectureDay], (result) => {
    result[lectureDay].push(lectureObject);
    chrome.storage.local.set(result);
  })
}

function findMinutes(time, day) {
  var current = new Date();
  var minutes = current.getMinutes();
  var hours = current.getHours();
  var days = current.getDay();
  var lectureMinutes = parseInt(time.slice(3, 4), 10);
  var lectureHours = parseInt(time.slice(0, 1), 10);
  var temp = 0;
  var numDay;
  
  switch (day) {
    case "Monday":
      numDay = 1;
      break;
    case "Tuesday":
      numDay = 2;
      break;
    case "Wednesday":
      numDay = 3;
      break;
    case "Thursday":
      numDay = 4;
      break;
    case "Friday":
      numDay = 5;
      break;
    case "Saturday":
      numDay = 6;
      break;
    case "Sunday":
      numDay = 7;
      break;
  }

  console.log(lectureMinutes);

  if (numDay == days && minutes < lectureMinutes && hours < lectureHours) {
    temp+=lectureMinutes - minutes;
    temp+=60*(lectureHours - hours);
    return temp;
  } else if (numDay == days && minutes < lectureMinutes && hours == lectureHours) {
    temp+=lectureMinutes - minutes;
    console.log(temp);
    return temp;
  } else if (numDay == days && hours < lectureHours) {
    temp+=60 - minutes;
    hours++;
    temp+=60*(lectureHours - hours);
    temp+=lectureMinutes;
    return temp;
  }

  temp+=60 - minutes;
  hours++;

  temp+=60*(24 - hours);
  hours = 0;
  days++;

  if (days - numDay < 0){
    temp+= (24*60)*(7 + days - numDay);
  } else {
    temp+= (24*60)*(days - numDay);
  }

  temp+= 24*60*lectureHours;
  temp+= 60*lectureHours;
  temp+= lectureMinutes;
  
  return temp;
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
    const header = document.createElement('h2');
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
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = () => {
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
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = () => {
        chrome.storage.local.get([days[1]], (result) => {
          result[days[1]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[1]]);
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
  chrome.storage.local.get([days[2]], (result) => {
    var dayArray = result[days[2]];
    var id = 0;
    
    for(var dayItem of dayArray){
      
      var column = document.getElementById("dayColWednesday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', id)
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = () => {
        chrome.storage.local.get([days[2]], (result) => {
          result[days[2]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[2]]);
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

  chrome.storage.local.get([days[3]], (result) => {
    var dayArray = result[days[3]];
    var id = 0;
    
    for(var dayItem of dayArray){
      
      var column = document.getElementById("dayColThursday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', id)
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = () => {
        chrome.storage.local.get([days[3]], (result) => {
          result[days[3]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[3]]);
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

  chrome.storage.local.get([days[4]], (result) => {
    var dayArray = result[days[4]];
    var id = 0;
    
    for(var dayItem of dayArray){
      
      var column = document.getElementById("dayColFriday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', id)
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = () => {
        chrome.storage.local.get([days[4]], (result) => {
          result[days[4]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[4]]);
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

  chrome.storage.local.get([days[5]], (result) => {
    var dayArray = result[days[5]];
    var id = 0;
    
    for(var dayItem of dayArray){
      
      var column = document.getElementById("dayColSaturday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', id)
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = () => {
        chrome.storage.local.get([days[5]], (result) => {
          result[days[5]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[5]]);
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

  chrome.storage.local.get([days[6]], (result) => {
    var dayArray = result[days[6]];
    var id = 0;
    
    for(var dayItem of dayArray){
      
      var column = document.getElementById("dayColSunday");
      const lectureNode = document.createElement('div');
      lectureNode.setAttribute('class', 'lectureNode');
      lectureNode.setAttribute('id', id);

      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', id)
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = () => {
        chrome.storage.local.get([days[6]], (result) => {
          result[days[6]].splice(lectureNode.getAttribute('id'), 1);
          console.log(result[days[6]]);
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

}

renderSchedule();


