$(document).ready(function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    { id: 1, title: "Task 1", state: "not-started", deadline: "2024-03-20" },
    { id: 2, title: "Task 2", state: "in-progress", deadline: "2024-03-22" },
    { id: 3, title: "Task 3", state: "completed", deadline: "2024-03-18" },
  ];

  function displayTasks() {
    $(".task-column").empty(); // Clear existing tasks to prevent duplication

    tasks.forEach((task) => {
      const taskHtml = `
        <div class="task-card" draggable="true" data-id="${task.id}" data-deadline="${task.deadline}">
          <h5>${task.title}</h5>
          <p>Deadline: ${task.deadline}</p>
          <button class="delete-task-btn" data-id="${task.id}">Delete</button>
        </div>
      `;

      $(`#${task.state}`).append(taskHtml);
    });

    updateTaskColors(); // Apply color coding based on deadlines
    setupDragAndDrop(); // Setup drag and drop functionality
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

  function addTask(title, state, deadline) {
    const newTaskId =
      tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
    const newTask = {
      id: newTaskId,
      title,
      state,
      deadline,
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks(); // Refresh the task board
  }

  $(document).on("click", ".delete-task-btn", function () {
    const taskId = $(this).data("id");
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    displayTasks(); // Refresh the display
  });

  $("#saveTaskBtn").click(function () {
    const title = $("#taskTitleModal").val();
    const state = $("#taskStateModal").val(); // Assuming you have a state selection in your modal
    const deadline = $("#taskDeadlineModal").val();

    if (title && state && deadline) {
      addTask(title, state, deadline);
      $("#taskTitleModal").val("");
      $("#taskStateModal").val("not-started"); // Reset to default state
      $("#taskDeadlineModal").val("");
      $("#taskCreationModal").modal("hide"); // Assuming you're using a modal to add tasks
    } else {
      alert("Please fill in all required fields.");
    }
  });

  function setupDragAndDrop() {
    // Drag and drop functionality as you have it
  }

  function updateTaskState(taskId, newState) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.state = newState;
      saveTasks();
      displayTasks();
    }
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  displayTasks(); // Initial display of tasks
});
