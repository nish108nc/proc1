const express=require("express")
const app=express()
const Student=require("./models/students-model")

const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/StudentsDatabase")
.then(()=>{
    console.log("Connected to MongoDb .!!");
    
})
.catch((error)=>{
    console.log("Error Connecting to MongoDb .!!");
})
app.set('view engine','ejs')

// Middle ware
app.use(express.urlencoded({extended:true}))

app.listen(3000,()=>{
    console.log("Server is running on port number: 3000");
    
})
app.get('/',async(req,res)=>{
    const students=await Student.find()
    res.render("home",{students})
})
app.get('/add-student',(req,res)=>{
    res.render("add-student")
})
app.post('/add-student',async(req,res)=>{
    await Student.create(req.body)
    res.redirect("/")
})

app.get('/show-student/:id',async(req,res)=>{
    const student=await Student.findOne({_id:req.params.id})
    res.render("show-student",{student})
})

app.get('/update-student/:id',async(req,res)=>{
    const student=await Student.findById(req.params.id)
    res.render("update-student",{student})
})

app.post('/update-student/:id',async(req,res)=>{
   await Student.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/")
})
app.get('/delete-student/:id',async(req,res)=>{
    await Student.findByIdAndDelete(req.params.id)
    res.redirect("/")
})
