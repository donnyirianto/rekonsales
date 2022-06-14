var cron = require('node-cron');
const Controller = require('./controller/controller')
var dateFormat = require("dateformat"); 
var taskRunning = true;

//console.log("EDP REG IV - Cek Data Mtran & Mstran Toko");
//cron.schedule('*/1 * * * *', async() => { 
(async () =>{ 
    try {      
        var now = new Date(); 
        
        console.log(`[START] Service Running (${dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss")})`)
        if(taskRunning){
            taskRunning = false                     
            console.log("Pengecekan Mtran Toko: " + dateFormat(now, "yyyy-mm-dd HH:MM:ss") )            
            const kodecabang = "G004,G025,G030,G034,G097,G146,G149,G158,G174,G301,G305,G148,G177,G224,G232"
            await Controller.runningAll(kodecabang);
            taskRunning = true
        } else{
            taskRunning = true
            console.log("Task On Delay: " + dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss") )	
        }  
                
    } catch (err) {
    
        taskRunning = true
        console.log(err);
    } 
})();