const dotenv = require('dotenv');
dotenv.config();
const Pool = require('pg').Pool;

const pool = new Pool({
    connectionString:`${process.env.URI}`
});

(async ()=>{
    try{
        const {makeUserTable, makeProjectsTable} = await import("./models/model.database.js")
        const client = await pool.connect();
        console.log("connected to the database");
        await makeUserTable(client);
        await makeProjectsTable(client);

        client.release();
    } catch(err){
        console.log(err);
    }
})();

module.exports = pool;