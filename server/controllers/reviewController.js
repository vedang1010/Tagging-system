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

// const fetchComponent = async(req,res)=>{
//     try{
//         console.log("fetchIdea");
//         const objectId = req.params.id;
//         console.log(objectId);
        
//         try{
//             const component = await Component.findById(objectId);
//             console.log(component);
//             if(!component){
//                 return res.status(404).json({message: 'Component not found'});
//             }else{
//                 return res.status(200).json({component});
//             }
//         }catch(error){
//             console.log(error);
//         }
//     } catch(error){
//         console.log(error);
//     }
// }



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

const getAllComponents = async (req, res) => {
    try {
        console.log("fetch");

        const compo = await ReviewComponent.find({
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

const updateStatus1 = async(req, res) => {
    try{
        const data = req.body;
        console.log(data);
        const status = data.status;
        const remarks = data.remarks;
        const ratings = data.ratings;
        const id = data.objectId;
        const id2 = data.reviewId;

        const component= await Component.findById(id);
        if (!component) {
            return res.status(404).json({ error: 'Component not found' });
        }
        else component.status1 = status;
        
        const reviewIdea = await ReviewIdea.findById(id2)
        if (!reviewIdea) {
            console.log("review Idea");
            return res.status(404).json({ error: 'Component not found' });
        }
        console.log(" reviee "+reviewIdea);
        reviewIdea.status = status;
        reviewIdea.Remarks = remarks;
        reviewIdea.funct_stars = ratings;

        
        await component.save();
        await reviewIdea.save();

        return res.status(200).json({msg : 'hello'})
    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

const updateStatus2 = async(req, res) => {
    try{
        const data = req.body;
        console.log(data);
        const status = data.status;
        const remarks = data.remarks;
        const rating1 = data.rating1;
        const rating2 = data.rating2;
        const id = data.objectId;
        const id2 = data.reviewId;

        const component= await Component.findById(id);
        if (!component) {
            return res.status(404).json({ error: 'Component not found' });
        }
        else component.status1 = status;
        
        const reviewIdea = await ReviewComponent.findById(id2)
        if (!reviewIdea) {
            console.log(" 2 review Idea");
            return res.status(404).json({ error: 'Component not found' });
        }
        console.log(" reviee "+reviewIdea);
        reviewIdea.status = status;
        reviewIdea.Remarks = remarks;
        //reviewIdea.funct_stars = ratings;

        
        await component.save();
        await reviewIdea.save();

        return res.status(200).json({msg : 'hello'})
    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'})
    }
}
console.log("Welcome2");

module.exports = {getAllIdeas, fetchIdea, getAllComponents, updateStatus1, updateStatus2}