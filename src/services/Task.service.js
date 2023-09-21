class TaskService {
  // Déclaration de todoListItem dans le constructeur
  todoListItem = document.querySelector(".todo-list");

  // Méthode pour supprimer une tâche
  deleteTask(taskId) {
    axios
      .delete(`http://localhost:4000/todos/${taskId}`)
      .then((response) => {
        if (response.status === 200) {
          // La tâche a été supprimée avec succès, mettez à jour l'interface utilisateur
          console.log("Task deleted successfully");
          // Vous pouvez effectuer toute action nécessaire, par exemple, supprimer la tâche de l'interface utilisateur
          document.querySelector(`[data-task-id="${taskId}"]`).remove();
        } else {
          throw new Error("Failed to delete task");
        }
      })
      .catch((error) => {
        // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
        console.error(error);
      });
  }

  // Méthode pour ajouter une tâche à la liste
  appendTaskToList(task) {
    const listItem = document.createElement("li");
    listItem.dataset.taskId = task._id;
    listItem.innerHTML = `
        <div class='form-check'>
          <label class='form-check-label'>
            <span contenteditable="true" class="editable">${task.text}</span>
            <input class='checkbox' type='checkbox' ${
              task.completed ? "checked" : ""
            } />
            <i class='input-helper'></i>
          </label>
        </div>
        <span class="remove material-symbols-outlined">delete</span>
      `;

    // Ajoutez un gestionnaire d'événements pour la case à cocher
    const checkbox = listItem.querySelector(".checkbox");
    checkbox.addEventListener("change", () => {
      // Mettez à jour l'état `completed` dans la base de données lorsque la case à cocher est cochée ou décochée
      const newCompletedState = checkbox.checked;
      this.updateTaskCompletedState(task._id, newCompletedState);
    });

    // Utilisation de this.todoListItem au lieu de todoListItem
    this.todoListItem.appendChild(listItem);
  }

  // Fonction pour lister les tâches existantes
  listTasks() {
    axios
      .get("http://localhost:4000/api/todos/")
      .then((response) => {
        // Traitez la réponse du serveur et mettez à jour l'interface utilisateur
        const tasks = response.data;
        console.log(tasks);
        tasks.forEach((task) => {
          this.appendTaskToList(task); // Utilisation de this.appendTaskToList

          if (task.completed) {
            const listItem = document.querySelector(
              `[data-task-id="${task._id}"]`
            );
            if (listItem) {
              const checkbox = listItem.querySelector(".checkbox");
              checkbox.checked = true;
              listItem.classList.add("completed");
            }
          }
        });
      })
      .catch((error) => {
        // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
        console.error(error);
      });
  }

  // Fonction pour ajouter une tâche
  addTask(item) {
    axios
      .post("http://localhost:4000/todo", { item })
      .then((response) => {
        if (response.status === 201) {
          // La tâche a été créée avec succès, mettez à jour l'interface utilisateur
          return response.data;
        } else {
          throw new Error("Failed to create task");
        }
      })
      .then((data) => {
        // Mettez à jour l'interface utilisateur en conséquence
        console.log(data, "okkkkkk");
        this.appendTaskToList(data); // Utilisation de this.appendTaskToList
      })
      .catch((error) => {
        // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
        console.error(error);
      });
  }

  // Méthode pour mettre à jour l'état `completed` d'une tâche dans la base de données
  updateTaskCompletedState(taskId, completed) {
    axios
      .put(`http://localhost:4000/todos/${taskId}`, { completed })
      .then((response) => {
        if (response.status === 200) {
          if (completed === true) {
            console.log("Task completed state updated successfully");
          } else if (completed === false) {
            console.log("Task completed state removed successfully");
          } else {
            console.log("Task completed state updated successfully");
          }
        } else {
          throw new Error("Failed to update task completed state");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
