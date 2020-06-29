
//0227document.querySelector("#app > div.app-content.head-fixed > div > div.task-main > div > div.el-col.el-col-18 > div > div > div.the-task > div.task-msg > div.btn-chose > div")

btn=document.querySelectorAll("div.btn-chose")[1].childNodes[0]  //child 确保选择的是按钮




if (btn.innerText=="开始任务") {
    btn.click()
}






