var tab = "all";
$(document).ready(function () {
  getAllTodos(tab);
  $("body").delegate("#task-input", "keyup", function (e) {
    if (e.keyCode === 13) {
      var name = e.target.value;
      createTodo(name);
      getAllTodos(tab);
    }
  });

  $("body").delegate("#clear-completed", "click", function (e) {
    clearCompleted();
  });
  $("body").delegate(".remove-button", "click", function (e) {
    var id = $(this).attr("data-id");
    deleteTodo(id);
  });

  $("body").delegate(".change-todo-status", "click", function (e) {
    var status = $(this).attr("data-status");
    var id = $(this).attr("data-id");
    changeStatusOfTodos(status, id);
  });

  $("body").delegate("#All", "click", function (e) {
    tab = "all";
    getAllTodos(tab);
    $("#All").addClass("selected");
    $("#Active").removeClass("selected");
    $("#Completed").removeClass("selected");
  });
  $("body").delegate("#Active", "click", function (e) {
    tab = "active";
    $("#All").removeClass("selected");
    $("#Active").addClass("selected");
    $("#Completed").removeClass("selected");
    getAllTodos(tab);
  });
  $("body").delegate("#Completed", "click", function (e) {
    tab = "completed";
    $("#All").removeClass("selected");
    $("#Active").removeClass("selected");
    $("#Completed").addClass("selected");
    getAllTodos(tab);
  });
});

function getAllTodos(status) {
  $.ajax({
    method: "GET",
    url: `/all-todos?status=${status}`,
    dataType: "json",
    success: function (data) {
      var todos = data.data;
      var itemsLeft = todos.length;
      $("#active-tasks").html(itemsLeft);
      var tab = data.tab;
      var html = "";
      if (tab == "all") {
        for (i = 0; i < todos.length; i++) {
          if (todos[i].status == "active") {
            html +=
              '<div class="task"><span data-id="' +
              todos[i]._id +
              '" data-status="completed" class="mark-complete-button change-todo-status" ></span><p class="task-content">' +
              todos[i].name +
              '</p><span data-id="' +
              todos[i]._id +
              '" class="remove-button">×</span></div>';
          } else {
            $("#clear-completed").css("display", "inline-block");
            html +=
              '<div data-status="active" data-id="' +
              todos[i]._id +
              '" class="task completed  change-todo-status"><span class="mark-complete-button"></span><p class="task-content">' +
              todos[i].name +
              '</p><span data-id="' +
              todos[i]._id +
              '" class="remove-button">×</span></div>';
          }
        }
      } else if (tab == "active") {
        /*
        <div class="task completed"><span class="mark-complete-button"></span><p class="task-content">d</p><span class="remove-button">×</span></div>
        */
        for (i = 0; i < todos.length; i++) {
          html +=
            '<div class="task"><span data-id="' +
            todos[i]._id +
            '" data-status="completed" class="mark-complete-button change-todo-status" ></span><p class="task-content">' +
            todos[i].name +
            '</p><span data-id="' +
            todos[i]._id +
            '" class="remove-button">×</span></div>';
        }
      } else if (tab == "completed") {
        for (i = 0; i < todos.length; i++) {
          html +=
            '<div data-status="active" data-id="' +
            todos[i]._id +
            '" class="task completed  change-todo-status"><span class="mark-complete-button"></span><p class="task-content">' +
            todos[i].name +
            '</p><span data-id="' +
            todos[i]._id +
            '" class="remove-button">×</span></div>';
        }
      }

      $("#todo-list").html(html);
    },
  });
}

function changeStatusOfTodos(status, id) {
  $.ajax({
    method: "POST",
    url: "/change-status",
    data: { status: status, id: id },
    success: function (data) {
      getAllTodos(tab);
    },
  });
}

function createTodo(name) {
  $.ajax({
    method: "POST",
    url: "/create-todo",
    data: { name: name },
    dataType: "json",
    success: function (data) {
      $("#task-input").val("");
    },
  });
}
//delete Todo
function deleteTodo(id) {
  $.ajax({
    method: "POST",
    url: "/delete-todo",
    data: { id: id },
    success: function (data) {
      getAllTodos(tab);
    },
  });
}
function clearCompleted() {
  $.ajax({
    method: "POST",
    url: "/clear-completed",
    data: { clear: true },
    success: function (data) {
      getAllTodos(tab);
    },
  });
}
