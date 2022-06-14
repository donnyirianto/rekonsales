const {StaticPool} = require("node-worker-threads-pool");

var dateFormat = require("dateformat"); 
var now = new Date();
const today = dateFormat(now,"yyyy-mm-dd") 
const periode = dateFormat(now,"yyyy-mm") 


const pool = new StaticPool({
  size: 20,
  task: "./worker.js"
});

for (let i = 0; i < 10; i++) {
    (async () => {

        const res =  await pool.exec({id: i , kdcab:"G004", periode:periode, tanggal:today })
        pool.destroy()

        console.log(`result:`, res);
    })();
}
