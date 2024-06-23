const {Notifications} = require('../models/Notification');

const getAllNotifications = async(req,res)=>{

    try {
        const notifications = await Notifications.find().sort({ timestamp: -1 });
        if (!notifications.length) {
          return res.status(404).json({ error: 'No Notifications found' });
        }
        return res.status(200).json(notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
      };
    }

module.exports = {getAllNotifications}