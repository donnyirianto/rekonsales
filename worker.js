const {parentPort} = require("worker_threads"); 
const Controller = require('./controller/controller');
const Models = require('./models/model');
const id = Math.random()
parentPort.on("message", async(workerData) => {

        const kdcab = workerData.kdcab 
        
        try {
            const results = await Models.getListIpToko(kdcab);
            if(results.length > 0){
                results.forEach( async (r) => {        
                    try {
                        const rv = await Controller.getrekon(r)
        
                        if(rv === "G" || rv === "Gagal" ){
                            await Models.updateFlag(r.kdtk, 'Gagal')  
                        
                        }else{             
                            await Models.insertQuery(r,rv)
                            await Controller.insertRekon(r)               
                            await Models.updateFlag(r.kdtk, 'SUKSES') 
                        } 
                    } catch (e) {
                        console.log(e)                    
                    }    
                })
            }
        } catch (e) {
            console.log(e)       
        }
        
        
        parentPort.postMessage(`id : ${id} ====  Sukses`);
        

}) 
parentPort.on('close',()=>{
    console.log(`id : ${id}==== Close Thread`)
})