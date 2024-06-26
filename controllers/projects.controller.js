import Projects from "../models/projects.model.js";
import pool from "../db.cjs";

export const createProjects = async (req, res)=>{
    try{
        const userClient = await pool.connect()
        const values = [req.body.title, req.body.description, req.body.category, req.body.company, req.username, req.body.price, req.body.currency, req.body.deliveryTime]

        if(req.isEmployer){
            const dbRes = userClient.query(`INSERT INTO Projects (
                title, description, category, company, posted_by, price, currency, delivery_time
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * ;`,values,(err, result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    return res.status(201).json({msg:"Project created",project:result.rows[0]})
                }
            })
        }
        else{
            return res.status(403).json({message:'Not an employer'});
        }
        userClient.release();
    }
    catch(err){
        res.status(501).json({error: err});
    }
}

export const getOneProject = async (req, res)=>{
    try{
        const userClient = await pool.connect();

        if(req.body.id){

            userClient.query("SELECT * FROM Projects WHERE project_ID = $1",[req.body.id],(err, result)=>{
                if(err){
                    console.log("There was an error.");
                    console.log(err);
                    return res.status(501).json({msg:"Some error occured"});
                } else{
                    const dbRes = result.rows[0];
                    return res.status(200).json({data:dbRes})
                }
            })

        } else if(req.body.posted_by){

            userClient.query("SELECT * FROM Projects WHERE posted_by = $1",[req.body.posted_by],(err, result)=>{
                if(err){
                    console.log("There was an error.");
                    console.log(err);
                    return res.status(501).json({msg:"Some error occured"});
                } else{
                    const dbRes = result.rows;
                    return res.status(200).json({data:dbRes})
                }
            })

        } else{
            return res.status(401).json({msg:"Invalid Query"})
        }
        userClient.release();
    }
    catch(err){
        res.status(400).json({error: err});
    }
}

export const getAllProjects = async (req, res)=>{
    try{
        const userClient = await pool.connect();
        const {limit, page} = req.body
        userClient.query("SELECT * FROM Projects LIMIT $1 OFFSET $2",[limit, (page-1)*limit],(err, result)=>{
            if(err){
                console.log("There was an error");
                console.log(err)
                return res.status(501).json({msg:"There was an error occured"})
            } else{
                const dbRes = result.rows;
                return res.status(200).json({data:dbRes})
            }
        });
    }
    catch(err){
        res.status(400).json({error: err});
    }
}

export const updateProject = async (req, res)=>{
    try{
        if(req.isEmployer){
            const updated = await Projects.findOneAndUpdate({_id: req.params.id},{
                title: req.body.title,
                desc: req.body.desc,
                price: req.body.price,
                category: req.body.category,
                deliveryTime: req.body.deliveryTime,
                requests: req.body.requests
            },{
                new:true
            });
            
            if(updated){
                res.status(200).json({messge: "Project updated", info: updated})
            }
            else{
                res.status(400).json({error: "there was some error"});
            }
        }
        else{
            res.status(403).json({messgae: "forbidden"});
        }
    }
    catch(err){
        res.status(404).json({error: err});
    }
}

export const deleteProject = async (req, res)=>{
    try{
        if(req.isEmployer){
            await Projects.findByIdAndDelete(req.params.id);
            res.status(201).json({message: "Project deleted"});
        }
        else{
            res.status(403).json({message: "forbidden"});
        }
    }   
    catch(err){
        res.status(400).json({error: err});
    }
}