const {ReviewIdea, ReviewComponent}= require('../models/ReviewIdeaModel');
const {Component,Tag} = require('../models/ComponentModel');
console.log(Component);
const fetchIdea = async(req,res)=>{
    //const{Idea}=req.body;
    try{
        console.log("fetchIdea");
        const objectId = req.params.id;
        console.log(objectId);
        
        try{
            const component = await Component.findById(objectId);
            console.log(component);
            if(!component){
                return res.status(404).json({message: 'Component not found'});
            }else{
                return res.status(200).json({component});
            }
        }catch(error){
            console.log(error);
        }
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

const getAllIdeas = async (req, res) => {
    try {
        console.log("fetchIdea");

        const compo = await ReviewIdea.find({
            status: 'Pending'
        });

        if (compo.length > 0) {
            //console.log("Original compo:", compo);

            const updatedCompo = await Promise.all(compo.map(async (component) => {
                try {
                    const id = component.id;
                    const compbyId = await Component.findById(id);

                    if (!compbyId) {
                        console.error(`Component with id ${id} not found`);
                        return component; 
                    }

                    // Create a new object with the additional fields
                    const updatedComponent = {
                        ...component.toObject(), // Convert Mongoose document to plain object
                        name: compbyId.name,
                        preview: compbyId.preview
                    };

                    console.log("Updated component:", updatedComponent);
                    return updatedComponent;
                } catch (innerError) {
                    console.error("Error processing component:", component, innerError);
                    return component; 
                }
            }));

           // console.log("Updated compo:", updatedCompo);
            return res.status(200).json(updatedCompo);
        } else {
            console.log('nothing found');
            return res.json({ msg: 'hello from getAllIdeas' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


console.log("Welcome2");

module.exports = {getAllIdeas, fetchIdea, fetchComponent}