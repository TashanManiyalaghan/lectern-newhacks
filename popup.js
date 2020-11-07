let changeColor = document.getElementById('changeColor');

chrome.storage.local.get('Monday', (value) => {
  console.log(value);
  var dayArray = value.Monday;
  console.log(dayArray)
  // if(!value.isEmpty()){
  //   for(var lectureObjects of value){
  //     console.log(lectureObjects.className);
  //   }
  // }
  
})