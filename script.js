document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  function updateProgress() {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.completed').length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    drawChart(progress);
  
    // Aplica o background verde apenas às tarefas concluídas
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(taskItem => {
      if (taskItem.classList.contains('completed')) {
        taskItem.style.backgroundColor = 'lightgreen';
      } else {
        taskItem.style.backgroundColor = '#f9f9f9'; // Restaura o background padrão para as tarefas não concluídas
      }
    });
  }
  

  function drawChart(progress) {
    const existingChart = Chart.getChart('progressChart');
    if (existingChart) {
      existingChart.destroy();
    }

    const progressData = {
      datasets: [{
        data: [progress, 100 - progress],
        backgroundColor: ['#007bff', '#f9f9f9'],
      }],
      labels: ['Concluídas', 'Restantes'],
    };

    const progressChart = new Chart(document.getElementById('progressChart'), {
      type: 'doughnut',
      data: progressData,
      options: {
        legend: {
          display: true,
          position: 'bottom',
        },
      },
    });
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task-item');
      taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="remove-btn">Remover</button>
        <button class="complete-btn">Tarefa Realizada</button>
      `;
      taskList.appendChild(taskItem);
      updateProgress();
      taskInput.value = '';
    }
  }

  taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  

  taskList.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('remove-btn')) {
      const taskItem = target.parentElement;
      taskItem.classList.add('removing'); // Adiciona a classe 'removing' à tarefa que está sendo removida
      taskItem.remove();
      updateProgress();
    } else if (target.classList.contains('complete-btn')) {
      const taskItem = target.parentElement;
      if (taskItem.classList.contains('completed')) {
        taskItem.classList.remove('completed'); // Remove a marcação de tarefa concluída
      } else {
        taskItem.classList.add('completed'); // Marca a tarefa como concluída
      }
      updateProgress();
    }
  });
  

  addTaskBtn.addEventListener('click', addTask);
});
