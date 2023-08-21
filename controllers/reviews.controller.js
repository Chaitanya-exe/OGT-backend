import Reviews from "../models/reviews.model.js";
import Users from "../models/users.model.js";


export const createReview = async (req, res) => {
    try {
        if (!req.isEmployer){
            return res.status(403).json({messgae:"Only employers can create a review"});
        }

        const someReview = await Reviews.findOne({userId:{$eq:req.id}, devId:{$eq:req.body.devId}});
        console.log(someReview)
        if(someReview){
            return res.status(403).json({message: "you have already reviewed this developer"})
        }
        
        const newReview = new Reviews({
            userId: req.id,
            devId: req.body.devId,
            desc: req.body.desc,
            star: req.body.star,
        });
        await newReview.save();

        await Users.findByIdAndUpdate(req.body.devId, {
            $inc:{totalRating:req.body.star , numRating: 1, avgRating:(totalRating/numRating)}
        })

        return res.status(200).json({newReview});

    }   
    catch (err) {
        return res.status(400).json({messgae: err});
    }
};

export const getReviews = async (req, res) => {
    try {
        const reviews = await Reviews.find({devId:{$eq: req.params.id}});
        return res.status(200).send(reviews);
    } 
    catch (err) {
        return res.status(400).json({error : err});
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        await Reviews.findOneAndDelete({userId: req.id, devId: req.body.id});
        return res.status(200).send({message: "Review deleted successfully"});
    } 
    catch (err) {
        return res.status(400).json({error: err});
    }
};