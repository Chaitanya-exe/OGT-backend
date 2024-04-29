export const makeUserTable = async (client)=>{
    try{
        await client.query(`CREATE TABLE IF NOT EXISTS Users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            dob DATE,
            country VARCHAR(50) NOT NULL,
            phNumber VARCHAR(50) NOT NULL,
            description VARCHAR(255) NOT NULL,
            isEmployer BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log("table created.");
    } catch(err){
        console.log(err);
    }
}

export const makeProjectsTable = async ()=>{
    try {
        
    } catch (err) {
        console.log(err);
    }
}