const fs = require('node:fs')
const { generatePath, readDB } = require('./helpers')

function createTask([str]) {
    if (!str) {
        console.error('Task name not defined \nTry task-cli add <task name>')
        return
    }
  
    readDB()
        .then( tasks => {
            const last = tasks.length ? tasks.slice(-1)[0].id : 0
            //console.log(tasks)
            //console.log(last);
    
            const newTask = {
                id: last + 1,
                description: str,
                status: 'todo',
                createdAt: new Date().toString(),
                updatedAt: new Date().toString()
            }
    
            //console.log(newTask)
    
            tasks.push(newTask)
            
            try {
                fs.writeFileSync(generatePath(), JSON.stringify(tasks))
                console.log(`Task "${newTask.description}" added successfully (ID: ${newTask.id})`)
            } catch (error) {
                console.log('createTask: writefile', error)
            }
        })
        .catch( err => console.log('createTask: promise chain', err))

    // fs.readFile(generatePath(), (err, data) => {
    //     if (err) {throw new Error(err)}
    //     const tasks = JSON.parse(data)
    //     const last = tasks.slice(-1)[0].id
    //     //console.log(tasks)
    //     //console.log(last);

    //     const newTask = {
    //         id: last + 1,
    //         description: str,
    //         status: 'todo',
    //         createdAt: new Date().toString(),
    //         updatedAt: new Date().toString()
    //     }

    //     //console.log(newTask)

    //     tasks.push(newTask)
        
    //     try {
    //         fs.writeFileSync(generatePath(), JSON.stringify(tasks))
    //         console.log(`Task "${newTask.description}" added successfully (ID: ${newTask.id})`)
    //     } catch (error) {
    //         console.log('createTask: writefile', error)
    //     }
    // })


}

module.exports = { createTask }