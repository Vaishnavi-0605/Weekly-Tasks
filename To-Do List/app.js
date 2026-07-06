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

let tasks = [
    {
        task : "Complete to-do list",
        tid : 'T01',
        priority : 'High',
        completed : false,
        date : "2026-07-04"
    },
     {
        task : "Solve three leetcode problems",
        tid : 'T02',
        priority : 'Moderate',
        completed : false,
        date : "2026-07-04"
    },
     {
        task : "Work on ELMS project",
        tid : 'T03',
        priority : 'High',
        completed : false,
        date : "2026-07-04"
    }, {
        task : "Write chapter 32",
        tid : 'T04',
        priority : 'Low',
        completed : false,
        date : "2026-07-04"
    }
]

app.get('/', (req,res)=>{
    res.render('index', {tasks});
});


app.post('/addtask', (req,res)=>{
    let {newtask, priority} = req.body;

    let newnum = tasks.length + 1;

    let tid = "T"+String(newnum).padStart(2, '0');

    let newdate = new Date().toISOString().split('T')[0];

    let tasknew = {
        task : newtask,
        tid : tid,
        priority : priority,
        completed : false,
        date : newdate
    }
    tasks.push(tasknew);
     
    res.redirect('/');
});

app.delete('/:id', (req,res) => {
    let { id }= req.params;
    tasks = tasks.filter(task =>task.tid != id);
    res.redirect('/');
});

app.put('/:id', (req,res)=>{
    let {id} = req.params;
    let {task} = req.body;

    let found = tasks.find(t=> t.tid === id);
    found.task = task;

    res.redirect('/');
});

app.put('/:id/check',  (req,res)=>{
    // console.log('CHECK ROUTE HIT');
    let {id} = req.params;

    let found = tasks.find(t => t.tid === id);
    found.completed = !found.completed;

    res.redirect('/');
})




app.listen(3001, ()=>{
    console.log('To-Do list app is running on port 3001');
})