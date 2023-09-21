document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const taskService = new TaskService(); // Créez une instance de TaskService

  const todoListInput = document.querySelector(".todo-list-input");

  document.querySelector(".todo-list-add-btn").addEventListener("click", (event) => {
      event.preventDefault();
      
      const item = todoListInput.value;

      if (item) {
        taskService.addTask(item);
        todoListInput.value = ""; 
      }
    });

  // Appelez la fonction pour lister les tâches au chargement de la page
  taskService.listTasks();

  document.querySelector(".todo-list").addEventListener("change", (event) => {
    if (event.target.matches(".checkbox")) {
      const checkbox = event.target;

      if (checkbox.getAttribute("checked")) {
        checkbox.removeAttribute("checked");
      } else {
        checkbox.setAttribute("checked", "checked");
      }

      checkbox.closest("li").classList.toggle("completed");
    }
  });

  // Ajoutez un gestionnaire d'événement pour supprimer une tâche
  document.querySelector(".todo-list").addEventListener("click", (event) => {
    if (event.target.matches(".remove")) {
      // Récupérez l'ID de la tâche que vous souhaitez supprimer
      const taskId = event.target.parentNode.dataset.taskId;
      console.log(taskId);
      taskService.deleteTask(taskId);
    }
  });
});
