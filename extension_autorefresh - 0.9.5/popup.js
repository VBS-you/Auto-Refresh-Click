



timeout=11000  //不建议低于6s

var onsetting
var rstext
var count=1
var psnum=0

codereadpage={file:"inject.js"}
codegotohomepage= {code:"window.location.replace(\"http://www.baichuanweb.com/produce/index\")"};
coderefresh= {code:"location.reload();"};
codebtnclick={file:"pressbtn.js"}


var OggAudio = new Audio(chrome.runtime.getURL("start.wav"));


document.addEventListener('DOMContentLoaded', function() {
var checkPageButton = document.getElementById('start');
checkPageButton.addEventListener('click', function() {
    

    checkPageButton.style.visibility="hidden"

    document.getElementById("workingstate").innerText="开始刷新：间隔"+timeout/1000+"秒";


    sendcode(codegotohomepage)
    setTimeout(() => {
        chrome.tabs.executeScript(null, codereadpage, function(onsetting){ 
            onsettext=onsetting[0]
            
            if (onsettext!=null) { //pls make sure onsetting is not null
                
            
            document.getElementById("workingtext").innerText="原"+onsettext.slice(-7);

            psnum=strip(onsettext) 
        }
            //slice 剩余题量：9
        })

    }, 2000);
    
    


    OggAudio.play();




    


    timehandler= setInterval(() => {
        sendcode(coderefresh)
        setTimeout(() => {
            
        
            chrome.tabs.executeScript(null, codereadpage, function(rsreturn){ 
                rstext=rsreturn[0]
                rsnum=strip(rstext)

                if (rstext!=null) {
                    
                
                if(rsnum>psnum){  
                    //console.log(,)
                    ringing(psnum,rsnum)
                    clearInterval(timehandler)
                }; 

                psnum=rsnum
            }

            
            })
        }, 2000);


    }, timeout);
    




    
}, false);
}, false);



function sendcode(codenode) {



chrome.tabs.executeScript(null, codenode) ; 


workingminute=Math.round((count)*timeout/6000)/10
str="刷新次数："+count+"\n工作时间："+workingminute+"分钟"
document.getElementById("workingtimes").innerText=str;

count++;
}



function ringing(psnum,rsnum) {

chrome.tabs.executeScript(null, codebtnclick) ; 


deff=rsnum-psnum

notifinterval=2000


if (deff<=0) {
var NotifiAudio = new Audio(chrome.runtime.getURL("start.wav"));    


} else{
var NotifiAudio = new Audio(chrome.runtime.getURL("notification.mp3"));  
notifinterval=(4/Math.log(deff**2+2)+0.8)*1000
}



setInterval(() => {
NotifiAudio.play();
}, notifinterval);





document.getElementById("workingtext").innerText="题量变化为："+String(deff);




} 




function strip(text) {
    
    if (text!=null) {
        striped_num=parseInt(text.replace(/[^0-9]/g,""))
        if (striped_num==null ||striped_num==NaN ) {
            return 0
        }
        return striped_num
    }



}


