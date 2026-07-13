const express = require ('express');
let app = express();
let bodyParser = require('body-parser');
const path = require ('path');
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

let tdata = require('./db/taskschema');
const { v4: uuidv4 } = require("uuid");

const mongoose = require('mongoose');

app.get('/', async (req,res)=>{
    const tasks = await tdata.find();
    res.render('index', {tasks});
});

app.post('/addtask', async (req,res)=>{
    let {newtask, priority} = req.body;

    await tdata.create({
        task : newtask,
        tid : uuidv4(),
        priority : priority,
        completed : false
    })
    console.log('Task added');
    res.redirect('/');
});

app.delete('/:id', async (req,res) => {
    let { id }= req.params;
    await tdata.findByIdAndDelete(id);
    res.redirect('/');
});

app.put('/:id', async (req,res)=>{
    let {id} = req.params;
    let {task} = req.body;

    await tdata.findByIdAndUpdate(
        id, {
            task : task,
        }
    )

    // let found = task.findByIdAndUpdate(t=> t.tid === id);
    // found.task = task;

    res.redirect('/');
});

app.put('/:id/check', async (req,res)=>{
    // console.log('CHECK ROUTE HIT');
    let {id} = req.params;

    let found = await tdata.findById(id);
    found.completed = !found.completed;
    await found.save();

    res.redirect('/');
})

async function connectdb(){
    await mongoose.connect('mongodb://127.0.0.1:27017/taskdb');
    console.log('Connected to db');
}
connectdb();

app.listen(3001, ()=>{
    console.log('To-Do list app is running on port 3001');
})