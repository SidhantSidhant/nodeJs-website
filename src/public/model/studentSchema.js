const { mongoose, bcrypt } = require("../db/dbConnection")

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
    },
})

const logInSchema = mongoose.Schema({
    email: String,
    password: {
        type: String
    },
})

logInSchema.pre("save", async function (next) {
    const password = await bcrypt.hash(this.password, 10);
        console.log(password);
        this.password = password;
    next()
})


const studentmodel = new mongoose.model("studentData", studentSchema);
const loginModel = new mongoose.model("login", logInSchema);


module.exports = { studentmodel, loginModel };
