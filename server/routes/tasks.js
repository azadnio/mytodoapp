const express = require('express')
    , router = express.Router();

// tsks array
let tasks = [
    { title: 'Attend Interview', description: 'having an job interview with Mr. Arshad on Wednesday 3.00 PM', time: new Date('6/20/2022'), isActive: true, id: 1 },
    { title: 'Book the cab', description: 'Planed a trip to Ohio coming month, has to book a comfortable cab before the end of this month', time: new Date('6/21/2022'), isActive: true, id: 2 },
    { title: "Visit shan's house", description: 'Mr.Shan Invited me for the dinner on Thursday, has to pickup kabeer and go at 7 pm', time: new Date('6/22/2022'), isActive: false, id: 3 }
];

router
    // get all the tasks
    .get('/', (req, res) => { 
        res.json(tasks);
    })
    
    // create a new task
    .post('/', (req, res) => {

        const task = req.body.task; 
        
        task.id = (new Date()).getTime(),
        task.time = new Date();

        tasks.push(task);
        res.json({status:true, id: task.id, time: task.time, message: `task ${task.id} addedd`});
    })

    //update a task
    .put('/', (req, res) => {

        const task = req.body.task;
        tasks = tasks.map(tsk => {
            if(tsk.id === task.id) tsk = task;
            return tsk;
        });
        res.json({status:true, message: `task ${task.id} edited`});
    })

    //delete a task
    .delete('/:id', (req, res) => {
        
        const id = req.params.id;
        tasks = tasks.filter(tsk => tsk.id !== id)
        res.json({status:true, message: `task ${id} deleted`});
    });

module.exports = router;