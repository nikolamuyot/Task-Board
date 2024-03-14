$(document).ready(function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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
    const newTask = {
      id: tasks.length + 1, // Simple ID assignment
      title: title,
      state: "Not Yet Started", // Default state for new tasks
      deadline: deadline,
    };

    tasks.push(newTask);
    displayTasks(); // Refresh the task board

    // Save tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  $("#saveTaskBtn").click(function () {
    const title = $("#taskTitleModal").val();
    const description = $("#taskDescriptionModal").val(); // Description isn't used in display yet
    const deadline = $("#taskDeadlineModal").val();

    if (title && deadline) {
      // Check for title and deadline, description is optional
      addTask(title, description, deadline);
      // Clear modal inputs after adding
      $("#taskTitleModal").val("");
      $("#taskDescriptionModal").val("");
      $("#taskDeadlineModal").val("");
      $("#taskCreationModal").modal("hide"); // Hide the modal
    } else {
      alert("Please fill in all required fields.");
    }
  });

  displayTasks(); // Initial display of tasks
});
