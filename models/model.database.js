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
        console.log("Users table initialized.");
    } catch(err){
        console.log(err);
    }
}

export const makeProjectsTable = async (client)=>{
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS Projects(
            project_ID SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            posted_by VARCHAR(255),
            category VARCHAR(255) NOT NULL,
            company VARCHAR(255) NOT NULL,
            country VARCHAR(255) NOT NULL,
            price DECIMAL NOT NULL,
            currency VARCHAR(10) NOT NULL,
            delivery_time DATE NOT NULL,
            is_completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`)
        console.log("Projects table initialized.")
    } catch (err) {
        console.log(err);
    }
}