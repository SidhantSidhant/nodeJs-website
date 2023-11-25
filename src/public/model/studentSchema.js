require("dotenv").config()
const { mongoose, bcrypt, jwt } = require("../db/dbConnection")

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    message: {
        type: String,
    }
})

const logInSchema = mongoose.Schema({
    email: String,
    password: {
        type: String
    },

    // tokens : [{
    //     token : {
    //         type : String
    //     }
    // }]

    token: {
        type: String
    }
})

logInSchema.methods.genrateAuterizationToken = async function () {
    console.log(this._id.toString());
    let token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
    //  this.tokens = this.tokens.concat({token : token});
    this.token = token;
    await this.save();
    return token;
}

logInSchema.pre("save", async function (next) {
    const password = await bcrypt.hash(this.password, 10);
    // console.log(password);
    this.password = password;
    next()
})



const studentmodel = new mongoose.model("studentData", studentSchema);
const loginModel = new mongoose.model("login", logInSchema);

module.exports = { studentmodel, loginModel };
