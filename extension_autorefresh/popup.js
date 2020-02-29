



timeout=12000  //不建议低于6s

var onsetting
var rstext
var count=1

codereadpage={file:"inject.js"}
codegotoindex= {code:"window.location.replace(\"http://www.baichuanweb.com/produce/index\")"};
coderefresh= {code:"location.reload();"};
codebtnclick={file:"pressbtn.js"}


var OggAudio = new Audio(chrome.runtime.getURL("start.wav"));


document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('start');
    checkPageButton.addEventListener('click', function() {
        

        checkPageButton.style.visibility="hidden"

        document.getElementById("workingstate").innerText="开始刷新：间隔"+timeout/1000+"秒";


        sendcode(codegotoindex)
        setTimeout(() => {
            chrome.tabs.executeScript(null, codereadpage, function(ro){ onsetting= ro;
                onsettext=onsetting[0]
                document.getElementById("workingtext").innerText="原"+onsettext.slice(-7);
                //slice 剩余题量：9
            })
  
        }, 5000);
        
        //pls make sure onsetting is not null





        OggAudio.play();


        timehandler= setInterval(() => {
            sendcode(coderefresh)
            setTimeout(() => {
                
            
                chrome.tabs.executeScript(null, codereadpage, function(rs){ 
                    rstext=rs[0]
    
                    if(rstext!=null && rstext!=onsetting[0]){  ///谨记onsetting为object，rstext为string
                        //console.log(rstext,onsetting)
                        ringing(rstext)
                        clearInterval(timehandler)
                    }; 
                })
            }, 3000);


        }, timeout);
        




        
}, false);
}, false);



function sendcode(codenode) {
    


    chrome.tabs.executeScript(null, codenode) ; 

    
    workingminute=Math.round((count-1)*timeout/6000)/10
    str="刷新次数："+count+"\n工作时间："+workingminute+"分钟"
    document.getElementById("workingtimes").innerText=str;

    count++;
}



function ringing(rstext) {
  
    




    chrome.tabs.executeScript(null, codebtnclick) ; 

    var NotifiAudio = new Audio(chrome.runtime.getURL("notification.mp3"));

    
setInterval(() => {
    NotifiAudio.play();
}, 1200);





    document.getElementById("workingtext").innerText=rstext;


    


} 
