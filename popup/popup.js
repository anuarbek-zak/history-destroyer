var background = chrome.extension.getBackgroundPage(); //do this in global scope for popup.js

document.addEventListener('DOMContentLoaded', function(){ 
  toggleStatusMessage('none')
  chrome.storage.local.get('sitesToRemove', function(data){
    let sitesToRemove = data.sitesToRemove;
    document.getElementById('addSite').addEventListener('click', function(e){
      if(getInputValue()){
        sitesToRemove = [getInputValue(), ...(sitesToRemove || [])]
        clearInput();
        toggleStatusMessage('block');
        chrome.storage.local.set({ sitesToRemove });
      }
    });
    document.getElementById('deleteSite').addEventListener('click', function(e){
      if(getInputValue()){
        sitesToRemove = sitesToRemove.filter(function(val){
          return val !== getInputValue();
        });
        clearInput();
        toggleStatusMessage('block');
        chrome.storage.local.set({ sitesToRemove });
      }
    });
  });
  document.getElementById('clearAll').addEventListener('click', function(e){
    chrome.runtime.sendMessage({clearAll: true});
  });
  document.getElementById('siteToRemove').addEventListener('keyup', function(e){
    toggleStatusMessage('none');
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