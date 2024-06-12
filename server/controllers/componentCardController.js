const  {Component}= require('../models/ComponentModel');
const mongoose=require('mongoose')
// mongoose.connect('mongodb://localhost:27017/your_database_name', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
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
        console.log("fetchComponent");
        const component_id = req.params.id; // Accessing the parameter from req.params

        const compo = await Component.find({_id:component_id});

        if (compo.length > 0) {
            console.log(compo);
        } else {
            console.log('nothing found');
        }
        return res.json(compo)
    } catch(error){
        console.log(error);
    }
}


const postData = async(req,res)=>{
    try{
        console.log("fetchIdea");
        return res.json({msg: 'hello from getAllIdeas'})
    } catch(error){
        console.log(error);
    }

}
const insertComponent = async (req, res) => {
    const {
        _id,
        name,
        idea,
        taglist,
        contributors,
        type,
        frequency,
        stars,
        likes,
        description,
        sys_requirements,
        dependencies,
        license,
        status1,
        status2,
        preview
    } = req.body;

    const newComponent = new Component({
        _id,
        name,
        idea,
        taglist,
        contributors,
        type,
        frequency,
        stars,
        likes,
        description,
        sys_requirements,
        dependencies,
        license,
        status1,
        status2,
        preview
    });

    try {
        const savedComponent = await newComponent.save();
        res.status(201).json(savedComponent);
    } catch (error) {
        res.status(500).json({ message: 'Error inserting component', error });
    }
};

const insertDummyData = async (req, res) => {
    const dummyComponent = {
        _id: new mongoose.Types.ObjectId(),
        name: "Component M",
        idea: "An innovative idea for component M",
        taglist: ["tag1", "tag2"],
        contributors: [
            {
                id: new mongoose.Types.ObjectId(),
                date: new Date("2023-06-05T08:00:00.000Z"),
                version: 1,
                link: "http://example.com/component-a/v1",
                _id: new mongoose.Types.ObjectId()
            },
            {
                id: new mongoose.Types.ObjectId(),
                date: new Date("2023-06-05T09:00:00.000Z"),
                version: 2,
                link: "http://example.com/component-a/v2",
                _id: new mongoose.Types.ObjectId()
            }
        ],
        type: "DTS",
        frequency: 5,
        stars: 4.9,
        likes: 100,
        description: {
            short: "<p>This is a short description of component A.</p>",
            full: "<p>This is a detailed description of component A. It goes into more depth about the features and capabilities of the component, including technical specifications and use cases.</p>"
        },
        sys_requirements: "<p>Requirement 1</p><p>Requirement 2</p><p>Requirement 3</p>",
        dependencies: "Dependencies for component A",
        license: "MIT",
        status1: "Pending",
        status2: "Pending",
        preview: ["http://example.com/preview1", "http://example.com/preview2"]
    };

    const newComponent = new Component(dummyComponent);

    try {
        const savedComponent = await newComponent.save();
        res.status(201).json(savedComponent);
    } catch (error) {
        res.status(500).json({ message: 'Error inserting dummy data', error });
    }
};


module.exports = {postData, fetchIdea, fetchComponent,insertComponent,insertDummyData}