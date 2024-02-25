
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

  function activateAlarm(task) {
    if (task && task.alarm) {
      const alarmTime = new Date(task.alarm);
      const now = new Date();
      const timeUntilAlarm = alarmTime - now;
  
      if (timeUntilAlarm > 0) {
        setTimeout(() => {
          const taskElement = document.getElementById(`task-${id}`);
          if (taskElement) {
            taskElement.style.color = 'red';
          }
        }, timeUntilAlarm);
      } else {
        console.log('Alarm time is in the past.');
      }
    } else {
      console.log('You have done nothing exceptionally.');
    }
  }
  
  
// This puts my list of tasks on screen and uses innerHtml for adding buttons to the page.
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
        <button onclick="undoCompletedTask(${task.id})" style="display: none;">Undo</button>
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
  
      // this shows the undo button only after a task is completed.
      const floatingMenu = taskElement.querySelector('.floating-menu');
      const undoButton = floatingMenu.querySelector('button:last-child');
      if (undoButton) {
        undoButton.style.display = 'inline-block';
      }
    }
  }
  
  function undoCompletedTask(id) {
    const taskElement = document.getElementById(`task-${id}`);
    if (taskElement) {
      const label = taskElement.querySelector('label');
      label.style.color = '';
      label.style.textDecoration = '';
  
      // This hides the undo button afterwards. It was a b*tch getting this to work right
      const floatingMenu = taskElement.querySelector('.floating-menu');
      const undoButton = floatingMenu.querySelector('button:last-child');
      if (undoButton) {
        undoButton.style.display = 'none';
      }
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
    "Learnable is Fun... but the shege is real. – Nixx",
    "Bring more jobs! Nah the money wey we dey find – Canice"
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  message.innerText = quotes[randomIndex];
}

updateMessage();
setInterval(updateMessage, 5000);

// Do pardon the mess in the css. I'm not very good at it 