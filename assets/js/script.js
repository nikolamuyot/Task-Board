$(document).ready(function () {
  const tasks = [
    { id: 1, title: "Task 1", state: "Not Yet Started" },
    { id: 2, title: "Task 2", state: "In Progress" },
    { id: 3, title: "Task 3", state: "Completed" },
    // Add more tasks as needed
  ];

  function displayTasks() {
    tasks.forEach((task) => {
      const taskHtml = `
                <div class="task-card">
                    <h5>${task.title}</h5>
                </div>
            `;

      switch (task.state) {
        case "Not Yet Started":
          $("#not-started").append(taskHtml);
          break;
        case "In Progress":
          $("#in-progress").append(taskHtml);
          break;
        case "Completed":
          $("#completed").append(taskHtml);
          break;
      }
    });
  }

  displayTasks();
});
