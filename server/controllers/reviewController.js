const {reviewIdeaSchema, reviewComponent}= require('../models/ReviewIdeaModel');

const fetchIdea = async(req,res)=>{
    //const{Idea}=req.body;
    try{
        console.log("fetchIdea");
        return res.json({msg: 'hello from fetcghIdeas'})
    } catch(error){
        console.log(error);
    }
}

const fetchComponent = async(req,res)=>{
    try{
        console.log("fetchIdea");

    } catch(error){
        console.log(error);
    }
}

const getAllIdeas = async(req,res)=>{
    try{
        console.log("fetchIdea");
        return res.json({msg: 'hello from getAllIdeas'})
    } catch(error){
        console.log(error);
    }

}

module.exports = {getAllIdeas, fetchIdea, fetchComponent}