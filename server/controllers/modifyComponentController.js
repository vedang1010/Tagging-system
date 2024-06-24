const { Component } = require('../models/ComponentModel'); // Import Component model
const { Notifications } = require('../models/Notification');
const updateComponent = async (req, res) => {
    const componentId = req.params.id; // Accessing the parameter from req.params
    console.log("componentId", componentId)
    const updatedData = req.body; // Updated component data from req.body
    // console.log("data", updatedData)
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

module.exports = {
    updateComponent
};
