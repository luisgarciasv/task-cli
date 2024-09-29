#!/usr/bin/env node

const fs = require('node:fs')
const { usage, createJSON } = require('./methods/helpers')
const { createTask } = require('./methods/createTask')
const { updateTask } = require('./methods/updateTask')
const { deleteTask } = require('./methods/deleteTask')
const { markTask } = require('./methods/markTask')
const { listTasks } = require('./methods/listTasks')

const [method, ...options] = process.argv.slice(2)

//console.log(method, options)

try {
    if (!fs.existsSync('./tasks.json')){
        createJSON()
    } 
} catch (error) {
    console.log(error)
}

// if (!method) {
//     //console.warn('Expeccted at least 1 argument')
//     console.log(usage())}
// } else if (method === 'add'){
//     //console.log('starting createTask')
//     createTask(options)
// } else if (method === 'update') {
//     updateTask(options)
// } else if (method === 'delete') {
//     deleteTask(options)
// } else if (method === 'mark') {

switch (method) {
    case 'add':
        createTask(options)
        break
    case 'update':
        updateTask(options)
        break
    case 'delete':
        deleteTask(options)
        break
    case 'mark':
        markTask(options)
        break
    case 'list':
        listTasks(options)
        break
    default:
        console.warn(usage())
        break;
}


