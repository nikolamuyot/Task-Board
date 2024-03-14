$(document).ready(function () {
  let tasks = [
    {
      id: 1,
      title: "Task 1",
      state: "Not Yet Started",
      deadline: "2024-03-20",
    },
    { id: 2, title: "Task 2", state: "In Progress", deadline: "2024-03-22" },
    { id: 3, title: "Task 3", state: "Completed", deadline: "2024-03-18" },
  ];

  function displayTasks() {
    $(".task-column").empty(); // Clear existing tasks to prevent duplication

    tasks.forEach((task) => {
      const taskHtml = `
        <div class="task-card" data-deadline="${task.deadline}">
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

    updateTaskColors(); // Apply color coding based on deadlines
  }

  function updateTaskColors() {
    $(".task-card").each(function () {
      const deadline = new Date($(this).data("deadline"));
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day

      const diffDays = Math.round((deadline - now) / oneDay);

      if (diffDays < 0) {
        $(this).addClass("overdue");
      } else if (diffDays <= 3) {
        $(this).addClass("nearing-deadline");
      }
    });
  }

  // Function to handle adding a new task from the form inputs
  function addTask(title, state, deadline) {
    const newTask = {
      id: tasks.length + 1, // Simple ID assignment; consider a more robust approach for real applications
      title,
      state,
      deadline,
    };

    tasks.push(newTask);
    displayTasks(); // Refresh the task board display
  }

  // Event listener for the Add Task button
  $("#addTaskBtn").click(function () {
    const title = $("#taskTitle").val();
    const state = $("#taskState").val();
    const deadline = $("#taskDeadline").val();

    if (title && state && deadline) {
      addTask(title, state, deadline);
      $("#taskTitle").val(""); // Clear the input fields after adding
      $("#taskState").val("Not Yet Started");
      $("#taskDeadline").val("");
    } else {
      alert("Please fill in all fields.");
    }
  });

  displayTasks(); // Initial display of tasks
});
