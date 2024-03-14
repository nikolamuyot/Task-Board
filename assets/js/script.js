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
          <p>Deadline: ${task.deadline}</p>
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

  function addTask(title, description, deadline) {
    // Updated to include description
    const newTask = {
      id: tasks.length + 1, // Simple ID assignment
      title: title,
      state: "Not Yet Started", // Default state for new tasks
      deadline: deadline,
    };

    tasks.push(newTask);
    displayTasks(); // Refresh the task board
  }

  // Updated to listen for the Save Task button in the modal
  $("#saveTaskBtn").click(function () {
    const title = $("#taskTitleModal").val();
    const description = $("#taskDescriptionModal").val(); // Now capturing description
    const deadline = $("#taskDeadlineModal").val();

    if (title && description && deadline) {
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

  displayTasks(); // Initial display of tasks
});
