const fs = require('node:fs')
const { filterDeleted, filterList } = require('./helpers')

const statuses = ['todo', 'in-progress', 'done']

function listTasks([status]) {

    //console.log(status)

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
                .then(tasks => {
                    tasks.forEach(({ id, description, status }) => {
                        console.log(`ID:${id} - Task: ${description} - Status: ${status}`)
                    })
                })
                .catch(err => console.log('listTasks: promisen chain', err))
            break;
        case statuses[1]:
            filterList(statuses[1])
                .then(tasks => {
                    tasks.forEach(({ id, description, status }) => {
                        console.log(`ID:${id} - Task: ${description} - Status: ${status}`)
                    })
                })
                .catch(err => console.log('listTasks: promisen chain', err))
            break
        case statuses[2]:
            filterList(statuses[2])
                .then(tasks => {
                    tasks.forEach(({ id, description, status }) => {
                        console.log(`ID:${id} - Task: ${description} - Status: ${status}`)
                    })
                })
                .catch(err => console.log('listTasks: promisen chain', err))
            break
        default:

            break;

    }

    // switch (status) {
    //     case 'todo':
    //         filterDeleted()
    //             .then(tasks => {
    //                 tasks.forEach(task => {
    //                     if (task.status == 'todo') { return }
    //                     console.log(`ID:${task.id} - Task:${task.description} - Status:${task.status}`)
    //                 })
    //             })
    //         break
    //     case 'in-progress':
    //         filterDeleted()
    //             .then(tasks => {
    //                 tasks.forEach(task => {
    //                     if (task.status == 'todo') return
    //                     console.log(`ID:${task.id} - Task:${task.description} - Status:${task.status}`)
    //                 })
    //             })
    //         break
    //     case 'todo':
    //         filterDeleted()
    //             .then(tasks => {
    //                 tasks.forEach(task => {
    //                     if (task.status == 'todo') return
    //                     console.log(`ID:${task.id} - Task:${task.description} - Status:${task.status}`)
    //                 })
    //             })
    //         break
    //     case 'undefined':
    //         filterDeleted()
    //             .then(tasks => {
    //                 tasks.forEach(task => {
    //                     console.log(`ID:${task.id} - Task:${task.description} - Status:${task.status}`)
    //                 });
    //             })
    //         break
    //     default:
    //         console.error(`Tasks status "${status}" not defined on options`)
    //         break
    // }

    // if (!status) {

    // } else {
    //    console.log(`retrieving ${status}'s tasks list(WIP)`)
    //  }

}

module.exports = { listTasks }