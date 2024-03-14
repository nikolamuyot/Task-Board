$(document).ready(function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    {
      id: 1,
      title: "Task 1",
      state: "not-started",
      deadline: "2024-03-20",
    },
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

  function addTask(title, description, deadline) {
    const newTask = {
      id: tasks.length + 1,
      title: title,
      state: "not-started",
      deadline: deadline,
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to localStorage
    displayTasks(); // Refresh the task board
  }

  $("#saveTaskBtn").click(function () {
    const title = $("#taskTitleModal").val();
    const description = $("#taskDescriptionModal").val(); // Capturing description
    const deadline = $("#taskDeadlineModal").val();

    if (title && deadline) {
      addTask(title, description, deadline);
      // Clear modal inputs after adding
      $("#taskTitleModal").val("");
      $("#taskDescriptionModal").val("");
      $("#taskDeadlineModal").val("");
      $("#taskCreationModal").modal("hide"); // Hide the modal
    } else {
      alert("Please fill in all fields.");
    }
  });

  function setupDragAndDrop() {
    $(".task-card").on("dragstart", function (event) {
      event.originalEvent.dataTransfer.setData(
        "text/plain",
        event.target.dataset.id
      );
    });

    $(".task-column").on("dragover", function (event) {
      event.preventDefault(); // Necessary to allow a drop
    });

    $(".task-column").on("drop", function (event) {
      event.preventDefault();
      const taskId = event.originalEvent.dataTransfer.getData("text/plain");
      const newState = this.id;
      const taskElement = document.querySelector(`[data-id='${taskId}']`);
      if (taskElement && this !== taskElement.parentNode) {
        this.appendChild(taskElement); // Append to new column
        updateTaskState(taskId, newState);
      }
    });
  }

  function updateTaskState(taskId, newState) {
    const task = tasks.find((task) => task.id.toString() === taskId);
    if (task) {
      task.state = newState;
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
      displayTasks();
    }
  }

  displayTasks(); // Initial display of tasks
});
