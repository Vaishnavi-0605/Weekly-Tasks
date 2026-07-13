const mongoose = require ('mongoose');

const taskSchema = new mongoose.Schema({
    task : String,
    tid : String,
    priority : String,
    completed : Boolean,
    date : {type : Date, default:Date.now}
});

const task = mongoose.model('task', taskSchema);

module.exports=task;