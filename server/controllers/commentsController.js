const mongoose = require('mongoose');
const Comments = require('../models/CommentsModel');
const insertDummyData = async () => {
    try {
        // Define some dummy comments
        const dummyComments = [
            {
                componentId: new mongoose.Types.ObjectId('66693aede01afec0ab853b59'), // Replace with actual component ID if available
                comments: [
                    {
                        title: 'INSTALLING WHATSAPP WINDOWS',
                        body: 'My laptop runs on Windows 10 Home. When I try to install from Windows Store I get an updating error referred to troubleshooter that fails to update.',
                        author: 'Ziad',
                        likes: 94,
                        dislikes: 27
                    },
                    {
                        title: 'Nice App',
                        body: 'Works well but could be better.',
                        author: 'Alex',
                        likes: 50,
                        dislikes: 10
                    },
                    {
                        title: 'Could be improved',
                        body: 'The UI is a bit clunky and slow.',
                        author: 'Jane',
                        likes: 23,
                        dislikes: 5
                    }
                ]
            },
            {
                componentId:new mongoose.Types.ObjectId('666853df5a37c0dfb0acdc2d'), // Replace with actual component ID if available
                comments: [
                    {
                        title: 'Amazing Performance',
                        body: 'The app works flawlessly and is very fast.',
                        author: 'John',
                        likes: 150,
                        dislikes: 3
                    },
                    {
                        title: 'Not bad',
                        body: 'Had some issues but overall it\'s good.',
                        author: 'Doe',
                        likes: 45,
                        dislikes: 15
                    }
                ]
            }
        ];

        // Insert the dummy comments into the database
        for (const commentData of dummyComments) {
            const commentsDoc = new Comments(commentData);
            await commentsDoc.save();
        }

        console.log('Dummy data inserted successfully');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    }
};



// Function to post a new comment
const postComment = async (req, res) => {
    const { title, body, author,date } = req.body;
    const componentId  = req.params.id;
    //console.log(componentId)
    try {
        // Find the Comments document for the given componentId or create a new one if it doesn't exist
        let commentsDoc = await Comments.findOne({componentId: componentId });
        // const commentsDoc = await Comments.findOne({componentId: componentId });
        console.log(title, body, author, date)

        if (!commentsDoc) {
            commentsDoc = new Comments({
                componentId,
                comments: []
            });
        }

        // Create the new comment
        const newComment = {
            title,
            body,
            author: author || 'Anonymous', // Default to 'Anonymous' if author is not provided
            date
        };

        // Add the new comment to the comments array
        commentsDoc.comments.push(newComment);

        // Save the updated comments document
        await commentsDoc.save();

        res.status(201).json({
            message: 'Comment added successfully',
            comment: newComment
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding comment',
            error: error.message
        });
    }
};

// Function to fetch comments for a specific component
const fetchComments = async (req, res) => {
    const componentId  = req.params.id;
    console.log(componentId)
    try {
        // Find the Comments document for the given componentId
        const commentsDoc = await Comments.findOne({componentId: componentId });

        if (!commentsDoc) {
            return res.status(404).json({
                message: 'No comments found for this component'
            });
        }
        const sortedComments = commentsDoc.comments.sort((a, b) => b.likes - a.likes);

        return res.status(200).json({
            comments: commentsDoc.comments
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching comments',
            error: error.message
        });
    }
};

const updateLikes = async (req, res) => {
    const { componentId, commentId } = req.params;

    try {
        const commentsDoc = await Comments.findOne({ componentId: componentId });
        if (!commentsDoc) {
            return res.status(404).json({
                message: 'Component not found'
            });
        }

        const comment = commentsDoc.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            });
        }

        comment.likes += 1;
        await commentsDoc.save();

        return res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating likes',
            error: error.message
        });
    }
};

const updateDislikes = async (req, res) => {
    const { componentId, commentId } = req.params;
    console.log("hi")
    console.log(componentId)
    try {
        const commentsDoc = await Comments.findOne({ componentId: componentId });
        if (!commentsDoc) {
            return res.status(404).json({
                message: 'Component not found'
            });
        }

        const comment = commentsDoc.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            });
        }

        comment.dislikes += 1;
        await commentsDoc.save();

        return res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({
            message: 'Error updating dislikes',
            error: error.message
        });
    }
};

module.exports = { postComment,fetchComments ,insertDummyData,updateDislikes,updateLikes};
