import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try{
        const token = req.header('Authorization').split(" ")[1];
        if(!token){
            return res.status(401).send({error: `not logged in`});
        }

        jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
            if (err) {
                return res.status(403).send({err:"user logged or session expired"});
            }
            req.id = payload.id;
            req.username = payload.username; 
            req.isEmployer = payload.isEmployer;
            req.email = payload.email,
            req.country = payload.country
            req.phNumer = payload.phNumber
            next();
        });
    }
    catch(err){
        return res.status(400).json({error:`you are not logged in`})
    }
}
