const {ReviewIdea, ReviewComponent}= require('../models/ReviewIdeaModel');
const {Component,Tag} = require('../models/ComponentModel');
const {UserInfo} = require('../models/userInfo');
const {Notifications} = require('../models/Notification');
const {io} = require('../index');


const fetchIdea = async(req,res)=>{
    //const{Idea}=req.body;
    try{
        // console.log("fetchIdea");
        const objectId = req.params.id;
        console.log(objectId);
        try {
            const component = await Component.findById(objectId).populate("contributors.id");
            //console.log("new Component "+component);
            const contributorsInfo = component.contributors.map(contributor => contributor.id);
            //console.log("contributors" +contributorsInfo); 
            // const contributors = component.contributors;
            // console.log("contributors: ", contributors);
    
            if(!component){
                return res.status(404).json({ message: 'Component not found' });
            }

            // const contributorsInfo = [];
    
            // for (let i = 0; i < contributors.length; i++) {
            //     try {
            //         const user = await UserInfo.findById(contributors[i].id);
            //         if(!user){
            //             return res.status(404).json({ message: 'User not found' });
            //         }
            //         else {
            //             console.log("user: ", user);
            //             contributorsInfo.push(user);
            //         }
            //     } catch (error) {
            //         console.error("Error fetching user info: ", error);
            //         return res.status(500).json({ error: 'Internal Server Error' });
            //     }
            // }
    
            
            return res.status(200).json({ component,contributorsInfo});
            
        } catch (error) {
            console.error("Error fetching component: ", error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch(error){
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
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

const getReviewById = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the review by ID
      const review = await ReviewComponent.findById(id);
  
      // Check if the review was found
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      // Return the found review
      res.status(200).json(review);
    } catch (error) {
      // Handle any errors that occurred during the search
      console.error(error);
      res.status(500).json({ message: 'Error retrieving review', error });
    }
  };


const getAllIdeas = async (req, res) => {
    try {
        //console.log("fetchIdea");

        const compo = await ReviewIdea.find({
            status: 'Pending'
        });

        if (compo.length > 0) {
           // console.log("Original compo:", compo);

            const updatedCompo = await Promise.all(compo.map(async (component) => {
                try {
                    const id = component.id;
                    const compbyId = await Component.findById(id);

                    if (!compbyId) {
                        console.error(`Component with id ${id} not found`);
                        return res.status(400).json({ });; 
                    }

                    // Create a new object with the additional fields
                    const updatedComponent = {
                        ...component.toObject(), // Convert Mongoose document to plain object
                        name: compbyId.name,
                        preview: compbyId.preview,
                        type : compbyId.type,
                        short_desc : compbyId.description.short
                    };

                    //console.log("Updated component:", updatedComponent);
                    return updatedComponent;
                } catch (innerError) {
                    console.error("Error processing component:", component, innerError);
                    return res.status(500).json({ });; 
                }
            }));

            //console.log("Updated compo:", updatedCompo);
            return res.status(200).json(updatedCompo);
        } else {
            console.log('nothing found');
            return res.status(500).json({ msg: 'Nothing found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Nothing found' });
    }
};

const getAllComponents = async (req, res) => {
    try {
        //console.log("fetch");

        const compo = await ReviewComponent.find({
            //status: 'Pending'
            $or: [
                { status_tech: 'Pending' },
                { status_legal: 'Pending' }
            ]
            
        });
// console.log("compo",compo)
        if (compo.length > 0) {
            //console.log("Original compo:", compo);

            const updatedCompo = await Promise.all(compo.map(async (component) => {
                try {
                    const id = component.id;
                    const compbyId = await Component.findById(id);

                    if (!compbyId) {
                        console.error(`Component with id ${id} not found`);
                        return res.status(400).json({ });; 
                    }

                    //console.log("Component with id ${id}", compbyId.type);
                    // Create a new object with the additional fields
                    const updatedComponent = {
                        ...component.toObject(), // Convert Mongoose document to plain object
                        name: compbyId.name,
                        preview: compbyId.preview,
                        type : compbyId.type,
                        
                        
                    };
                    // console.log("modify id",compbyId)
                    // console.log("Updated component:     7             ", updatedComponent);
                    return updatedComponent;
                } catch (innerError) {
                    console.error("Error processing component:", component, innerError);
                    return res.status(500).json({ });;; 
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
        return res.status(500).json({ error: 'Nothing Found to review' });
    }
};

const updateStatus1 = async(req, res) => {
    try{
        const data = req.body;
        //console.log(data);
        const status = data.status;
        const remarks = data.remarks;
        const ratings = data.ratings;
        const id = data.objectId;
        const id2 = data.reviewId;

        const component= await Component.findById(id).populate("contributors.id");;
        if (!component) {
            return res.status(404).json({ error: 'Component not found' });
        }
        else component.status1 = status;
        //console.log(" new user :"+component);
        const reviewIdea = await ReviewIdea.findById(id2)
        if (!reviewIdea) {
            console.log("review Idea");
            return res.status(404).json({ error: 'Component not found' });
        }
        //console.log(" reviee "+reviewIdea);
        reviewIdea.status = status;
        reviewIdea.Remarks = remarks;
        reviewIdea.funct_stars = ratings;

        const contributorsInfo = component.contributors.map(contributor => contributor.id);
        
        console.log("contributors" +contributorsInfo); 
        const email = contributorsInfo[0].email
        const socketId = getUser(email);
        console.log(socketId + "socketId" + " " + email);
        const desc = `${component.name} idea has been ${reviewIdea.status} by Functional review Team`;

        const notification = new Notifications({
            id: id,
            desc,
            date: new Date(),
            email
        });

        await notification.save();
        await component.save();
        await reviewIdea.save();

        global.io.to(socketId).emit('statusUpdate', notification);

        return res.status(200).json({msg : 'hello'})
    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

const updateStatus2 = async(req, res) => {
    try{
        const data = req.body;
       // console.log(data);
        const status = data.status;
        const remarks = data.remarks;
        const rating = data.rating1;
        
        const id = data.objectId;
        const id2 = data.reviewId;
        const isTech = data.isTech;
        
        
        const reviewComponent = await ReviewComponent.findById(id2)
        if (!reviewComponent) {
            console.log(" 2 review Idea");
            return res.status(404).json({ error: 'Component not found' });
        }
        //console.log(" reviee "+reviewComponent);
        

        if(isTech){
            reviewComponent.status_tech = status;
            reviewComponent.Remarks_tech = remarks;
            reviewComponent.tech_stars = rating;
        }
        else {   
            reviewComponent.status_legal = status;
            reviewComponent.Remarks_legal = remarks;
            reviewComponent.legal_stars = rating;
        }

        await reviewComponent.save();

        const component= await Component.findById(id);
        if (!component) {
            return res.status(404).json({ error: 'Component not found' });
        }
        else if(reviewComponent.status_tech=='Accepted' && reviewComponent.status_legal=='Accepted') component.status2 = 'Accepted';
        else if(reviewComponent.status_tech=='Pending' || reviewComponent.status_legal=='Pending') component.status2 = 'Pending';
        else component.status2 = 'Rejected';

        const desc = `${component.name} Component has been ${status} by ${isTech ? 'Technical Review Team' : 'Legal Review Team'}`

        const notification = new Notifications({
            id: id,
            desc,
            date: new Date()
        });

        await notification.save();
        
        await component.save();
        global.io.emit('statusUpdate', notification);

        return res.status(200).json({msg : 'hello'})
    }catch(error){
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error'})
    }
}


const fetchUserInfo= async (req, res) => {
    try{
        const userId = req.params.user;
        //console.log(" USeer id "+userId);
        const response = await UserInfo.findOne({
            email : userId
        });
        if(!response){
            console.log("Nothing found");
            return res.status(500).json({error: 'Internal Server Error'})
        }
        //console.log(response)
        return res.status(200).json(response);
    } catch(error){
        console.log(error);
    }
}
console.log("Welcome2");

module.exports = {getAllIdeas, fetchIdea, getAllComponents, updateStatus1, updateStatus2, fetchUserInfo,getReviewById}