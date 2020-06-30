
//200619 针对页面升级（增加了“真题”），将inject及pressbtn依次挪位
//200630 响铃30s 之后自动重新开始工作

timeout=11000  //不建议低于6s

var onsetting
var rstext
var count=1
// var psnum=99  // 确保即使没有读到prev num  后期也能正常预警 // test//  出现了“原始题量”空白 //还是不能正常预警

codereadpage={file:"inject.js"}
codegotohomepage= {code:"window.location.replace(\"http://www.baichuanweb.com/produce/index\")"};
coderefresh= {code:"location.reload();"};
codebtnclick={file:"pressbtn.js"}


var OggAudio = new Audio(chrome.runtime.getURL("start.wav"));


document.addEventListener('DOMContentLoaded', function() {
var checkPageButton = document.getElementById('start');
checkPageButton.addEventListener('click', function() {


    checkPageButton.style.display="none" //改进了start.btn

    document.getElementById("workingstate").innerText="开始刷新：间隔"+timeout/1000+"秒";

    refresh_monitor_pages(1000)//初次点击 快速反应 1s


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

half_min=30*1000/notifinterval


for (let index = 1; index < half_min; index++) { //修正index=0
    setTimeout(() => {
        NotifiAudio.play();
        }, notifinterval*index);
}





document.getElementById("workingtext").innerText="题量变化为："+String(deff);

setTimeout(() => {
    document.getElementById("title").innerText="上一轮刷新了"+String(deff)+"题";
    refresh_monitor_pages() //再召唤
    }, notifinterval*half_min);



} 



function refresh_monitor_pages(first_refresh_lag=2400) {
    
    sendcode(codegotohomepage)
    setTimeout(() => {
        chrome.tabs.executeScript(null, codereadpage, function(onsetting){ 
            onsettext=onsetting[0]

            if (onsettext!=null) { //pls make sure onsetting is not null

            psnum=strip(onsettext) 

            document.getElementById("workingtext").innerText="原始题量为："+psnum;


        }//else{alert("网络不佳。请刷新")}//会被挡住 无法点击 无法取消 
            //slice 剩余题量：9
        })

    }, first_refresh_lag);




    OggAudio.play();







    timehandler= setInterval(() => {
        sendcode(coderefresh)
        setTimeout(() => {


            chrome.tabs.executeScript(null, codereadpage, function(rsreturn){ 
                rstext=rsreturn[0]
                rsnum=strip(rstext)

                if (rstext!=null&&onsettext!=null) {


                if(rsnum>psnum+1){    //ring only if deff >1
                    //console.log(,) deff=rsnum-psnum
                    ringing(psnum,rsnum)
                    clearInterval(timehandler)
                }; 

                psnum=rsnum
            }


            })
        }, 2000);


    }, timeout);




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


