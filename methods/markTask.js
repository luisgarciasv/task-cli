const fs = require('node:fs')
const { generatePath, isNumber, filterDeleted } = require('./helpers')

const statuses = ['todo', 'in-progress', 'done']

function markTask([id, status]) {

    if (!isNumber(id)) {
        console.error('Task id must be a number or is missing\nTry task-cli mark <#id> <updated status>')
        return
    } else if (!status) {
        console.error('Status for task update not defined \nTry task-cli mark <#id> <updated status>')
        return
    } else if (!statuses.includes(status)) {
        console.error('Status must be <todo>, <in-progress> or <done> \nTry task-cli mark <#id> <updated status>')
        return
    }

    filterDeleted()
        .then(tasks => {
            let lastName, noChange;

            const updatedTasks = tasks.map((task) => {
                if (task.id == id) {
                    lastName = task.description
                    if (task.status == status) { noChange = true }
                    task.status = status
                    task.updatedAt = new Date().toString()
                    return task
                }
                return task
            })
            if (!lastName) {
                console.error('Task id not found to be updated \nTry task-cli mark <#id> <updated status>')
                return
            }

            if (noChange) {
                console.error(`Task is already marked as ${status} \nTry task-cli mark <#id> <updated status>`)
                return
            }

            try {
                fs.writeFileSync(generatePath(), JSON.stringify(updatedTasks))
                console.log(`Task "${lastName}" updated successfully to  status: "${status}" (ID: ${id})`)
            } catch (error) {
                console.log('updateTask: writefile', error)
            }
        })
        .catch( err => console.log('markTask: promise chain' ,err))

}

module.exports = { markTask }