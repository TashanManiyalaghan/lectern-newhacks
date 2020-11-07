let changeColor = document.getElementById('changeColor');

chrome.storage.local.get('Monday', (value) => {
  console.log(value);
  var dayArray = value.Monday;
  console.log(dayArray)
 
  
})