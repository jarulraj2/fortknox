
    var scs = [ "https://cdn.shulex-voc.com/shulex-live-chat/embedding/vendors_586baa03.js","https://cdn.shulex-voc.com/shulex-live-chat/embedding/embedding_3463557e.js","https://cdn.shulex-voc.com/shulex-live-chat/embedding/runtime_ae2ae7fe.js" ];
    
    function __shulexLoadScript(src, callback) {
      var sc = document.createElement("script");
      sc.src = src;
      document.body.appendChild(sc);
      sc.onload = function () {
        callback();
      };
    }
    
    (function __shulexloadScriptsSequentially(scripts) {
      var index = 0;
    
      function loadNext() {
        if (index < scripts.length) {
          __shulexLoadScript(scripts[index], function () {
            index++;
            loadNext();
          });
        } else {
          console.log("All scripts loaded");
        }
      }
    
      loadNext();
    })(scs);
    