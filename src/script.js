
const { mongoose, express, path, hbs, bcrypt } = require("./public/db/dbConnection");
const studentmodel = require("../src/public/model/studentSchema").studentmodel;
const logInModel = require("../src/public/model/studentSchema").loginModel;

const template_path = path.join(__dirname, "../src/public/template/views");
const patrial_template_path = path.join(__dirname, "../src/public/template/partials");
const stylePath = path.join(__dirname, "./public")
const app = express();

mongoose.connect("mongodb://localhost:27017/studentList").then(() => {
  // console.log("conntction successful")
}).catch(() => {
  throw new Error("database is not Connectd")
});

app.use(express.static(stylePath));
app.set("view engine", "hbs");
app.set('views', template_path);
hbs.registerPartials(patrial_template_path)
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get("/nice-page", (req, res) => {
  let carrerArr = [{ head: "BUILDING", text: "Excepteur sint occaecat", button: 'more', icon: "" }, { head: "BUILDING", text: "Excepteur sint occaecat", button: 'more', icon: "" }, { head: "BUILDING", text: "Excepteur sint occaecat", button: 'more', icon: "" }]
  let gaillaryArr = [
    { img: 'https://assets.nicepagecdn.com/d2cc3eaa/3854207/images/w.jpg', alt: "", name: "JEFFREY BROWN", work: "Handyman" },
    { img: 'https://assets.nicepagecdn.com/d2cc3eaa/3854207/images/q.jpg', alt: "", name: "BOB RICHMOND", work: "Craftsman" },
    { img: 'https://assets.nicepagecdn.com/d2cc3eaa/3854207/images/3222.jpg', alt: "", name: "JENNIE ROBERTS", work: "Plumber" },
    { img: 'https://assets.nicepagecdn.com/d2cc3eaa/3854207/images/33333.jpg', alt: "", name: "ALEX GREENFIELD", work: "Plumber" },
    { img: 'https://assets.nicepagecdn.com/d2cc3eaa/3854207/images/ee211.jpg', alt: "", name: "WALTER LILLY", work: "Partner" },
    { img: 'https://assets.nicepagecdn.com/d2cc3eaa/3854207/images/err.jpg', alt: "", name: "MONICA POULIOT", work: "Associate Partner" },
    { img: 'https://assets.nicepagecdn.com/d2cc3eaa/3854207/images/4213.jpg', alt: "", name: "ALEX GREEN", work: "Associate Partner" },
    { img: 'https://assets.nicepagecdn.com/d2cc3eaa/3854207/images/33214.jpg', alt: "", name: "MICK PARKER", work: "Partner" },
  ]
  res.render("index", { carrerArr, gaillaryArr })
})

app.get("/about", (req, res) => {
  res.render("about")
})

app.get("/", (req, res) => {
  res.render('login')
})

app.post("/student", async (req, res) => {
  try {
    console.log(req.body.name);
    const newStudentListData = new studentmodel({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    })
    let storeStudentListData = await newStudentListData.save()
    res.send(storeStudentListData);
  } catch (err) {
    res.status(400).send(err);
  }
})

// signIn means log in
app.post("/", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let insertLoginData = new logInModel({
    email: email,
    password: password
  })

  let data = await insertLoginData.save(); 
  console.log(data);
  res.send(data)
})

// signUp means create account
app.post("/signUp", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  const userEmail = await logInModel.findOne({ email: email });
  const isMatch = bcrypt.compare(password, userEmail.password);
  if(isMatch){
      res.render("index");
  }else{
    res.status(400).send("Invalid login");
  }

  // console.log(userEmail);
  // if (isMatch === password) {
  //   res.render("index");
  // } else {
  //   res.status(400).res('login invalid')
  // }
})

app.listen('8000')


