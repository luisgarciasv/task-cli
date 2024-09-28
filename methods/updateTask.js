const fs = require('node:fs')
const { generatePath, isNumber, filterDeleted } = require('./helpers')

function updateTask([id, str]) {

    if (!isNumber(id)) {
        console.error('Task id must be a number or is missing\nTry task-cli update <#id> <update value>')
        return
    } else if (!str) {
        console.error('Task name for update not defined \nTry task-cli update <#id> <update value>')
        return
    }

    filterDeleted()
        .then(tasks => {

            let previousName
            //console.log(tasks)
            //console.log(last);

            const updatedTasks = tasks.map((task) => {
                if (task.id == id) {
                    previousName = task.description
                    task.description = str
                    task.updatedAt = new Date().toString()
                    //console.log(task)
                    return task
                }
                return task
            })

            if (!previousName) {
                console.error('Task id not found to be updated \nTry task-cli update <#id> <update value>')
                return
            }

            try {
                fs.writeFileSync(generatePath(), JSON.stringify(updatedTasks))
                console.log(`Task "${previousName}" updated successfully to "${str}" (ID: ${id})`)
            } catch (error) {
                console.log('updateTask: writefile', error)
            }

        })
        .catch(err => console.log('updateTask: promise chain', err))

    // fs.readFile(generatePath(), (err, data) => {
    //     if (err) {throw new Error(err)}        

    //     const tasks = JSON.parse(data)

    //     let lastName;

    //     const updatedTasks = tasks.map( (task) => {
    //         if (task.id == id) {
    //             lastName = task.description
    //             task.description = str
    //             task.updatedAt = new Date().toString()
    //             //console.log(task)
    //             return task
    //         }
    //         return task
    //     })

    //     if (!lastName){
    //         console.error('Task id not found to be updated \nTry task-cli update <#id> <update value>')
    //         return
    //     }

    //     try {
    //         fs.writeFileSync(generatePath(), JSON.stringify(updatedTasks))
    //         console.log(`Task "${lastName}" updated successfully to "${str}" (ID: ${id})`)
    //     } catch (error) {
    //         console.log('updateTask: writefile', error)
    //     }
    // })
}

module.exports = { updateTask }