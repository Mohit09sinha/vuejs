// app.js
new Vue({
    el: '#app',
    data: {
      newTask: '',
      tasks: []
    },
    computed: {
      openTasks() {
        return this.tasks.filter(task => !task.completed);
      },
      completedTasks() {
        return this.tasks.filter(task => task.completed);
      }
    },
    created() {
      this.fetchTasks();
    },
    methods: {
      fetchTasks() {
        axios.get('http://localhost:3000/tasks')
          .then(response => {
            this.tasks = response.data;
          })
          .catch(error => {
            console.error('Error fetching tasks:', error);
          });
      },
      addTask() {
        if (this.newTask.trim() !== '') {
          const newTask = {
            description: this.newTask,
            completed: false,
            createdAt: new Date().toLocaleString()
          };
          axios.post('http://localhost:3000/tasks', newTask)
            .then(response => {
              this.tasks.push(response.data);
              this.newTask = '';
            })
            .catch(error => {
              console.error('Error adding task:', error);
            });
        }
      },
      completeTask(task) {
        task.completed = true;
        axios.put(`http://localhost:3000/tasks/${task.id}`, task)
          .catch(error => {
            console.error('Error completing task:', error);
          });
      }
    }
  });
  