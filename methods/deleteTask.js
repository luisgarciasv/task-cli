const fs = require('node:fs')
const { isNumber, filterDeleted, generatePath } = require('./helpers')

function deleteTask([id]) {

    if (!isNumber(id)) {
        console.error('Task id must be a number\nTry task-cli delete <#id>')
        return
    }

    filterDeleted()
        .then(tasks => {
            let previousName

            const updatedTasks = tasks.map((task) => {
                if (task.id == id) {
                    previousName = task.description
                    task.updatedAt = new Date().toString()
                    task.isDeleted = true
                    return task
                }
                return task
            })

            if (!previousName) {
                console.error('Task id not found to be deleted \nTry task-cli delete <#id>')
                return
            }

            try {
                fs.writeFileSync(generatePath(), JSON.stringify(updatedTasks))
                console.log(`Task "${previousName}" deleted successfully (ID: ${id})`)
            } catch (error) {
                console.log('deleteTask: writefile', error)
            }
        })
        .catch(err => console.log('deleteTask: promise chain', err))


    // fs.readFile(generatePath(), (err, data) => {
    //     if (err) {throw new Error(err)}        

    //     const tasks = JSON.parse(data)

    //     let lastName;

    //     const updatedTasks = tasks.map( (task) => {
    //         if (task.id == id) {
    //             lastName = task.description
    //             task.updatedAt = new Date().toString()
    //             task.isDeleted = true
    //             //console.log(task)
    //             return task
    //         }
    //         return task
    //     })

    //     if (!lastName){
    //         console.error('Task id not found to be deleted \nTry task-cli delete <#id>')
    //         return
    //     }

    //     try {
    //         fs.writeFileSync(generatePath(), JSON.stringify(updatedTasks))
    //         console.log(`Task "${lastName}" deleted successfully (ID: ${id})`)
    //     } catch (error) {
    //         console.log('deleteTask: writefile', error)
    //     }
    // })
}

module.exports = { deleteTask }