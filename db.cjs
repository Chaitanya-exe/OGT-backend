const dotenv = require('dotenv');
dotenv.config();
const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString:`${process.env.URI}`
});

(async ()=>{
    try{
        const {makeUserTable} = await import("./models/model.database.js")
        const client = await pool.connect();
        console.log("connected to the database");
        await makeUserTable(client);
    } catch(err){
        console.log(err);
    }
})();

module.exports = pool;