const fs = require('node:fs')
const { filterDeleted, filterList } = require('./helpers')

const statuses = ['todo', 'in-progress', 'done']

function listTasks([status]) {

    if (!status) {
        filterDeleted()
            .then(tasks => {
                tasks.forEach(task => {
                    console.log(`ID:${task.id} - Task: ${task.description} - Status: ${task.status}`)
                });
            })
            .catch(err => console.log('listTasks: promisen chain', err))
        return
    } else if (!statuses.includes(status)) {
        console.error('Status must be <todo>, <in-progress> or <done> \nTry task-cli list <list status>')
        return
    }

    switch (status) {
        case statuses[0]:
            filterList(statuses[0])
                .then(logs => {
                    logs.forEach(log => console.log(log))
                })
                .catch(err => console.log('listTasks: promisen chain', err))
            break;
        case statuses[1]:
            filterList(statuses[1])
                .then(logs => {
                    logs.forEach(log => console.log(log))
                })
                .catch(err => console.log('listTasks: promisen chain', err))
            break
        case statuses[2]:
            filterList(statuses[2])
                .then(logs => {
                    logs.forEach(log => console.log(log))
                })
                .catch(err => console.log('listTasks: promisen chain', err))
            break
        default:

            break;

    }

}

module.exports = { listTasks }