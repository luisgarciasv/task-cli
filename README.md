<div align="center">

![task-cli](https://i.imgur.com/wTKSymh.png)

# task-cli

**Simple**, **fast** and **zero dependencies** task tracker for the terminal.

*task-cli is a command-line tool for managing tasks. It allows you to add, update, delete, mark, and list tasks directly from your terminal.*

</div>


## 💻 Quick start 

**First**, make sure you have nodejs installed running the command:

```bash
node -v 
```

If you don't have it installed, you can use the following commands:

```bash
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
```

```bash
# download and install Node.js (you may need to restart the terminal)
nvm install 20
```

```bash
## verifies the right Node.js version is in the environment
node -v # should print `v20.17.0`
```

```bash
# verifies the right npm version is in the environment
npm -v # should print `10.8.2`
```

**Second**, to install the tool you need to clone this repository, this will create a folder whenever you use the command: 

```bash
git clone https://github.com/paredev/task-tracker.git
cd task-cli
```

After that, you need to install the tool to be used globally: 

```bash
## this will create a symlink globally, allowing you to use the `task-cli` command 
## from anywhere in your terminal. you may need to use sudo with this command.
npm link
```

## ⌨️ Commands & Options

### ` add `

The **add** command is used to create a new task, it only receives a *"string"* as the task name.

```bash
task-cli add "make dinner reservations"
## Output: Task "make dinner reservations" added successfully (ID: 1)
task-cli add "help kids do the homework"
## Output: Task "help kids do the homework" added successfully  (ID: 2)
```

### ` update `

The **update** command will expect 2 arguments, the *id* and a *"string"* to update.

```bash
task-cli update 2 "buy groceries and cook dinner"
## Output: Task "help kids do the homework" updated successfully to "buy groceries and cook dinner" (ID: 2)

```

### ` delete `

The **delete** command only needs an *id* argument.

```bash
task-cli delete 1
## Output: Task "make dinner reservations" deleted successfully (ID: 5)
```

### ` mark `

The **mark** command receives 2 arguments: an *id* and a *status* to update.
*possible status include only \<todo\> \<in-progress\> \<done\>*

```bash
task-cli mark 1 done
## Output: Task "test update" updated successfully to  status: "done" (ID: 1)
```

### ` list `

The **list** command can be used to display all tasks by passing no arguments, like this: 

```bash
mark-cli list
## Output: ID:1 - Taks: make dinner reservations - Status: done
## Output: ID:2 - Taks: buy groceries and cook dinner - Status: todo
```

Or, you can provide one of the statuses to list its tasks: 

```bash 
mark-cli list todo
## Output: ID:2 - Taks: buy groceries and cook dinner - Status: todo

mark-cli list done
## Output: ID:1 - Taks: make dinner reservations - Status: done
```

## ⭐️ Acknowledgement

This project is part of the [Roadmap.sh Project Ideas](https://roadmap.sh/projects) - <https://roadmap.sh/projects/task-tracker>