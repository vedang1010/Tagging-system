const { Component, Tag } = require('../models/ComponentModel'); // Import Component model
const { Notifications } = require('../models/Notification');
const updateComponent = async (req, res) => {
    const componentId = req.params.id; // Accessing the parameter from req.params
    console.log("componentId", componentId)
    const updatedData = req.body; // Updated component data from req.body
    console.log("data", updatedData)
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
        await updateTagListDB(updatedData,componentId);
        // console.log("updated component",updatedComponent)

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
        res.status(200).json(updatedComponent);
    } catch (error) {
        // Handle any errors that occurred during the update
        console.error('Error updating component:', error);
        res.status(500).json({ message: 'Error updating component', error });
    }
};

const updateTagListDB = (updatedData,componentId) => {
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
                console.log("Tag exists");
                console.log(result1);
                result1.components.forEach(async (comp) =>{
                    if(comp.id == componentId){
                        console.log("Component already exists in tag");
                        }else{
                            result1.components.push(components_array[0]);
                        }
                })
                
                await result1.save();
            }
            else {
                console.log("tag does not exists");
                const result2 = await Tag.create({tag_name:tag,components:components_array})
                console.log(result2);
            }
            return result1; 
        })
    }
    catch(err){
        console.log("Error in updating tag list");
        console.log(err);
        return tagList;
    }
        
       


}


module.exports = {
    updateComponent
};
