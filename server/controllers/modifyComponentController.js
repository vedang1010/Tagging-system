 const { Component } = require('../models/ComponentModel'); // Import Component model
const { Notifications } = require('../models/Notification');
const {ModifiedComponent,ModifiedContributor}=require('../models/ModifiedModel')
const {UserInfo} = require('../models/userInfo');
const {sendNotification} = require('../index');

console.log(sendNotification)
const updateComponent = async (req, res) => {
    const componentId = req.params.id; // Accessing the parameter from req.params
    //console.log("componentId", componentId)
    const updatedData = req.body; // Updated component data from req.body
    //console.log("data", updatedData)
    try {
        const newContributor=new ModifiedContributor({
            id:updatedData.userId,
        })
        newContributor.save()

        //eturn the updated component
            const component = await Component.findById(componentId).populate("contributors.id");
            const contributorsInfo = component.contributors.map(contributor => contributor.id);
            const emailList = contributorsInfo[0].email
            console.log("email "+emailList);

        // Send notification to the contributors
            const desc =`Component ${componentId} has been modified`;
            const notification = new Notifications({
                id: componentId,
                desc,
                date: new Date(),
                email : emailList,
            });

            const socketId = getUser(emailList)
            console.log(socketId + " has been modified");
            global.io.to(socketId).emit('modifyComponent',notification);


        // Find the component by ID and update it with the new data
        const newComponent=new ModifiedComponent({
            name:updatedData.name,
            componentId:componentId,
            taglist:updatedData.taglist,
            type:updatedData.type,
            description:updatedData.description,
            sys_requirements:updatedData.sys_requirements,
            preview:updatedData.preview,
            file:updatedData.file,
            contributors:newContributor,
        })
        newComponent.save();
        // const updatedComponent = await Component.findByIdAndUpdate(
        //     componentId,
        //     updatedData,
        //     { new: true } // Return the updated document
        // );
        // Check if the component was found and updated
        if (!newComponent) {
            return res.status(404).json({ message: 'Component not found' });
        }
        

        await notification.save();
        //console.log("New Component:", newComponent);
        res.status(200).json(newComponent);
    } catch (error) {
        // Handle any errors that occurred during the update
        console.error('Error updating component:', error);
        res.status(500).json({ message: 'Error updating component', error });
    }
};

const getModifiedComponent = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the review by ID
      const component = await ModifiedComponent.findById(id);
  
      // Check if the review was found
      if (!component) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      // Return the found review
      res.status(200).json(component);
    } catch (error) {
      // Handle any errors that occurred during the search
      console.error(error);
      res.status(500).json({ message: 'Error retrieving review', error });
    }
  };

module.exports = {
    updateComponent,getModifiedComponent
};
