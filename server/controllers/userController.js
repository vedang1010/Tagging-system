// login User
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' });
};
//'fgsdfgdfgfsdvkdjhvbibfqubwoiuefbosdjdfbsdj'

const loginUser = async (req,res) =>{
    const {email,password} = req.body
    try {
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
            
    
};




// const signupUser = async (req,res) =>{
//     const {email,password} = req.body;
//     try{
  
//         const user = await User.signup(email,password);
//         const token = createToken(user._id);
//         res.status(200).json({
//             email,
//             token
//         });
//     }
//     catch(err){
//         res.status(400).json({err: err.message});
//     }


// }

module.exports = {loginUser};
