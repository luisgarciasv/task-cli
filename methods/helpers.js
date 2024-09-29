const {name: packageName} = require('../package.json')
const fs = require('node:fs')
const path = require('node:path')

function usage () {
    return `
Hello and welcome to ${packageName}. Some usage examples

# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark 1 in-progress
task-cli mark 2 done

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
`
}

function createJSON () {
    try {
        fs.writeFileSync( generatePath(), JSON.stringify([]))
        console.log('tasks.json created successfully')
    } catch (error) {
        console.log('an error ocurred:', error)
    }
}

function generatePath () {
    return path.join(__dirname, "../tasks.json")
}

function isNumber (number) {
    return !isNaN(number) && isFinite(number)
}
 
function readDB() {
    return fs.promises.readFile(generatePath())
        .then(data => JSON.parse(data))
}

function filterDeleted () {
    return readDB()
    .then( data => data.filter( ({isDeleted}) => !isDeleted) )
}

function filterList (option) {
    return filterDeleted()
            .then( tasks => {
                return tasks.filter( ({status})=>  status == option)
            })
} 

module.exports = 
    { 
        usage, 
        createJSON, 
        generatePath, 
        isNumber,
        readDB, 
        filterDeleted,
        filterList
    }