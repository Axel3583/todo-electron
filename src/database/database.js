const Datastore = require('nedb');
const path = require('path');

// Utilisez le chemin absolu du fichier de base de données
const databaseFile = path.join(__dirname, 'local-tasks.db');

const db = new Datastore({ filename: databaseFile, autoload: true });
module.exports = {
  // Fonction pour ajouter une tâche
  addTask: (task) => {
    return new Promise((resolve, reject) => {
      db.insert(task, (err, newTask) => {
        if (err) {
          reject(err);
        } else {
          resolve(newTask);
        }
      });
    });
  },

  // Fonction pour lister les tâches existantes
  listTasks: () => {
    return new Promise((resolve, reject) => {
      db.find({}, (err, tasks) => {
        if (err) {
          reject(err);
        } else {
          resolve(tasks);
        }
      });
    });
  },

  // Fonction pour mettre à jour l'état `completed` d'une tâche
  updateTaskCompletedState: (taskId, completed) => {
    return new Promise((resolve, reject) => {
      db.update({ _id: taskId }, { $set: { completed } }, {}, (err, numUpdated) => {
        if (err) {
          reject(err);
        } else {
          resolve(numUpdated > 0);
        }
      });
    });
  },

  // Autres fonctions de gestion de base de données local selon vos besoins
};
