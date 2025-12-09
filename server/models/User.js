const mongoose=require('mongoose');

const userSchema= new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required: true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        profilePic:{
            type:String,
            default:"",
        },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        
        subscribers:{
            type: Number,
            default: 0, // A counter for how many people follow me 
        },
        subscribedUsers:{
            type: [String], // An Array of IDs of people I follow 
            default: [],
        },
    },
    
    {timestamps:true}
);

module.exports=mongoose.model("User",userSchema);