import Projects from "../models/projects.model.js";

export const createProjects = async (req, res)=>{
    try{
        if(req.isEmployer){
            const newProject = new Projects({
                title: req.body.title,
                desc: req.body.desc,
                category: req.body.category,
                price: req.body.price,
                DeliveryTime: req.body.deliveryTime,
                postedBy: req.username,
                projectId: req.id
            });
            await newProject.save();
            res.status(200).json({message: "project created", newProject});
        }
        else{
            res.status(403).json({message:'only employers can post a project'});
        }
    }
    catch(err){
        res.status(400).json({error: err});
    }
}

export const getOneProject = async (req, res)=>{
    try{
        const singleProject = await Projects.findOne({_id : req.params.id});
        if(singleProject){
            res.status(201).json({singleProject});
        }
        else{
            res.status(404).json({error: "Project not found"});
        }
    }
    catch(err){
        res.status(400).json({error: err});
    }
}

export const getAllProjects = async (req, res)=>{
    try{
        const allProjects = await Projects.find();
        if(allProjects){
            res.status(200).send(allProjects);
        }
        else{
            res.status(404).json({error: "No projects found :("});
        }
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