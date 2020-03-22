  chrome.history.onVisited.addListener(function(historyItem){
    chrome.storage.local.get('sitesToRemove', function(data){
      if(!data.sitesToRemove) return;
      const removeThisSite = data.sitesToRemove.some(siteName => {
        return historyItem.url.includes(siteName);
      });
      if(removeThisSite){
        chrome.history.deleteUrl({
          url: historyItem.url
        });
      }
    });
  });

  chrome.runtime.onMessage.addListener(function(req){
    if(req.clearAll){
      chrome.history.deleteAll(function(){
      })
    }
  })
