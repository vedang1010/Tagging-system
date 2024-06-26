 const { Component ,Tag} = require('../models/ComponentModel'); // Import Component model
const { Notifications } = require('../models/Notification');
const {ModifiedComponent,ModifiedContributor}=require('../models/ModifiedModel')
const {UserInfo} = require('../models/userInfo');
const {sendNotification} = require('../index');

console.log(sendNotification)
const updateComponent = async (req, res) => {
    const componentId = req.params.id; // Accessing the parameter from req.params
    //// console.log("componentId", componentId)
    const updatedData = req.body; // Updated component data from req.body
    //console.log("data", updatedData)
    try {
        const newContributor=new ModifiedContributor({
            id:updatedData.userId,
        })
        newContributor.save()

        //zReturn the updated component
            const component = await Component.findById(componentId).populate("contributors.id");
            const contributorsInfo = component.contributors.map(contributor => contributor.id);
            const length = contributorsInfo.length;
            const emailList = contributorsInfo[length-1].email
            console.log("email "+emailList);

        // Send notification to the contributors
            const desc =`${component.name} has been modified by ${emailList}`;
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
        await updateTagListDB(updatedData, componentId);
        // console.log("updated component",updatedComponent)
        await notification.save();
        // const desc = `Component ${componentId} has been modified`;
        // const notification = new Notifications({
        //     id: id,
        //     desc,
        //     date: new Date()
        // });
        // console.log("updated component")

        // await notification.save();
        // global.io.emit('modifyComponent', notification);

        // Return the updated component
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

const updateTagListDB = (updatedData, componentId) => {
    const tagList = updatedData.taglist;

    // for each tag update db
    try {
        tagList.forEach(async (tag) => {
            const components_array = [{
                id: componentId,
                access: [
                    "DTS", "SB", "MO"
                ]
            }];

            const result1 = await Tag.findOne({ tag_name: tag }).exec();

            if (result1) {
                result1.components.forEach(async (comp) => {
                    if (comp.id == componentId) {
                    } 
                    else {
                        result1.components.push(components_array[0]);
                    }
                })

                await result1.save();
            }
            else {
                const result2 = await Tag.create({ tag_name: tag, components: components_array })
            }
            return result1;
        })
    }
    catch (err) {
        console.log("Error in updating tag list");
        console.log(err);
        return tagList;
    }




}


  const updateComponentInDatabase = async (req, res) => {
    const componentId = req.params.id; // Accessing the parameter from req.params
    const updatedData = req.body; // Updated component data from req.body
    console.log("data",updatedData)
    try {
        // Find the component by ID and update it with the new data
        const updatedComponent = await Component.findByIdAndUpdate(
            componentId,
            updatedData,
            { new: true } // Return the updated document
        );

        // Check if the component was found and updated
        if (!updatedComponent) {
            return res.status(404).json({ message: 'Component not found' });
        }

        // Return the updated component
        res.status(200).json(updatedComponent);
    } catch (error) {
        // Handle any errors that occurred during the update
        console.error('Error updating component:', error);
        res.status(500).json({ message: 'Error updating component', error });
    }
};

module.exports = {
    updateComponent,getModifiedComponent,updateComponentInDatabase,updateTagListDB
};
