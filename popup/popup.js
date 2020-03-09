var background = chrome.extension.getBackgroundPage(); //do this in global scope for popup.js

document.addEventListener('DOMContentLoaded', function(){ 
  toggleStatusMessage('none')
  chrome.storage.local.get('sitesToRemove', function(data){
    document.getElementById('addSite').addEventListener('click', function(e){
      if(getInputValue()){
        chrome.storage.local.set({ sitesToRemove: [getInputValue(), ...(data.sitesToRemove || [])] });
        clearInput();
        toggleStatusMessage('block');
      }
    });
    document.getElementById('deleteSite').addEventListener('click', function(e){
      if(getInputValue()){
        chrome.storage.local.set({ sitesToRemove: data.sitesToRemove.splice(data.sitesToRemove.indexOf(getInputValue(),1)) });
        clearInput()
        toggleStatusMessage('block');
      }
    });
    document.getElementById('clearAll').addEventListener('click', function(e){
      chrome.runtime.sendMessage({clearAll: true});
    });
    document.getElementById('siteToRemove').addEventListener('keyup', function(e){
      toggleStatusMessage('none');
    });
  });
});

function getInputValue(){
  return document.getElementById('siteToRemove').value.trim();
}

function clearInput(){
  document.getElementById('siteToRemove').value = "";
}

function toggleStatusMessage(val){
  document.getElementById('statusMessage').style.display = val;
}