const {mongoose} = require("../db/dbConnection")

const studentSchema = mongoose.Schema({
    name : {
        type : String,
        unique : true,
        trim : true,
        lowercase : true,
    },
    email :{
        type : String,
        unique : true,
        required : true,
        lowercase : true,
        trim : true,
    },
    message : {
        type :String,
    }
})

const studentmodel = new mongoose.model("studentData", studentSchema);


module.exports = studentmodel;

