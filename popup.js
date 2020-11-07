let changeColor = document.getElementById('changeColor');

chrome.storage.local.get('Monday', (value) => {
  if(!value.isEmpty()){
    for(var lectureObjects of value){
      console.log(lectureObjects.className);
    }
  }
  
})