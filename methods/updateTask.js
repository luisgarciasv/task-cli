const fs = require("node:fs");
const { generatePath, isNumber, filterDeleted } = require("./helpers");

function updateTask([id, str]) {
  if (!isNumber(id)) {
    console.error(
      "Task id must be a number or is missing\nTry task-cli update <#id> <update value>",
    );
    return;
  } else if (!str) {
    console.error(
      "Task name for update not defined \nTry task-cli update <#id> <update value>",
    );
    return;
  }

  filterDeleted()
    .then((tasks) => {
      let previousName;

      const updatedTasks = tasks.map((task) => {
        if (task.id == id) {
          previousName = task.description;
          task.description = str;
          task.updatedAt = new Date().toString();
          return task;
        }
        return task;
      });

      if (!previousName) {
        console.error(
          "Task id not found to be updated \nTry task-cli update <#id> <update value>",
        );
        return;
      }

      try {
        fs.writeFileSync(generatePath(), JSON.stringify(updatedTasks));
        console.log(
          `Task "${previousName}" updated successfully to "${str}" (ID: ${id})`,
        );
      } catch (error) {
        console.log("updateTask: writefile", error);
      }
    })
    .catch((err) => console.log("updateTask: promise chain", err));
}

module.exports = { updateTask };
