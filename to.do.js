
const tasksContainer = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const newAlarmInput = document.getElementById('new-alarm');
const message = document.getElementById('message');

let tasks = [];

function addTask() {
  const taskName = newTaskInput.value.trim();
  const alarmTime = newAlarmInput.value.trim();

  let alarm = null;
  if (alarmTime) {
    alarm = new Date(`2000-01-01T${alarmTime}`);
  }

  if (taskName !== '') {
    const task = {
      id: Date.now(),
      name: taskName,
      alarm: alarm,
    };

    tasks.push(task);
    newTaskInput.value = '';
    newAlarmInput.value = '';

    renderTask(task);
  }
}
document.getElementById('new-task').addEventListener('keyup', function(event) {
    //I almost forgot to make the enter button work for me.
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
    }
  });

function checkAlarms() {
  const now = new Date();
  tasks.forEach(task => {
    if (task.alarm && task.alarm <= now) {
      const audioElement = document.getElementById('alarmSound');
      if (audioElement && audioElement.paused) {
        audioElement.play();
      }
    }
  });
}

function activateAlarm(task) {
  if (task && task.alarm) {
    const alarmTime = new Date(task.alarm);
    const now = new Date();
    const timeUntilAlarm = alarmTime - now;

    if (timeUntilAlarm > 0) {
      setTimeout(() => {
        executeAlarm(task);

        const taskElement = document.getElementById(`task-${task.id}`);
        if (taskElement) {
          taskElement.style.color = 'red';
        }
      }, timeUntilAlarm);
    } else {
      console.log('Alarm time is in the past.');
    }
  } else {
    console.log('No task or alarm set.');
  }
}

function executeAlarm(task) {
  const alarmSound = document.getElementById('alarmSound');
  if (alarmSound && alarmSound.paused) {
    alarmSound.play();
  }
}

function renderTask(task) {
  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  taskElement.id = `task-${task.id}`;
  let alarmString = '';
  if (task.alarm instanceof Date) {
    alarmString = task.alarm.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  } else if (task.alarm) {
    alarmString = task.alarm; // Display the alarm string as it is
  }
  taskElement.innerHTML = `
    <label for="chk-${task.id}">${task.name} | ${alarmString}</label>
    <div class="floating-menu">
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">x</button>
      <button onclick="completedTask(${task.id})">&#x2713;</button>
      <button onclick="undoCompletedTask(${task.id})">Undo</button>
    </div>
  `;

  tasksContainer.appendChild(taskElement);
}

function completedTask(id) {
  const taskElement = document.getElementById(`task-${id}`);
  if (taskElement) {
    const label = taskElement.querySelector('label');
    label.style.color = 'green';
    label.style.textDecoration = 'line-through';
  }
}

function undoCompletedTask(id) {
  const taskElement = document.getElementById(`task-${id}`);
  if (taskElement) {
    const label = taskElement.querySelector('label');
    label.style.color = '';
    label.style.textDecoration = '';
  }
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    const newName = prompt('Enter new task name:', task.name);
    if (newName) {
      task.name = newName;
      const label = document.querySelector(`label[for="chk-${id}"]`);
      label.innerText = `${task.name} | ${task.alarm}`;
    }
    const newTime = prompt('Enter new alarm time (HH:MM):', task.alarm || '');
    if (newTime) {
      const [hours, minutes] = newTime.split(':');
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      task.alarm = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const label = document.querySelector(`label[for="chk-${id}"]`);
      label.innerText = `${task.name} | ${task.alarm}`;
    }
  }
}

function deleteTask(id) {
  const taskElement = document.getElementById(`task-${id}`);
  if (taskElement) {
    taskElement.style.textDecoration = 'line-through';
    setTimeout(() => {
      taskElement.remove();
      tasks = tasks.filter(task => task.id !== id);
    }, 500);
  }
}


function updateClock() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const time = `${hours}:${minutes}:${seconds}`;
  document.getElementById('clock').innerText = time;
}

updateClock();
setInterval(updateClock, 1000);

function updateMessage() {
  const quotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "With the new day comes new strength and new thoughts. – Eleanor Roosevelt",
    "The secret of getting ahead is getting started. – Mark Twain",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "We're alcohol's problem. – Somtuzy",
    "Learnable is Fun... but the shege is real. – Nixx"
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  message.innerText = quotes[randomIndex];
}

updateMessage();
