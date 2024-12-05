document.addEventListener('DOMContentLoaded',()=>{
  const todoInput=document.querySelector("#todo-input");
const addTaskButton=document.querySelector("#add-task-btn");
const todoList=document.querySelector("#todo-list");

let tasks= Array.from(JSON.parse(localStorage.getItem('tasks'))) || [];
tasks.forEach(task => renderTasks(task));

// let tasks=[]
addTaskButton.addEventListener('click',()=>{
  const taskTest=todoInput.value.trim();
  if(taskTest==="")return;

  const newTask={
    id: Date.now(),
    text:taskTest,
    completed:false
  }
  tasks.push(newTask);
  saveTask();
  renderTasks(newTask);
  todoInput.value="" //cleaning the value
  // console.log(tasks);
})

function renderTasks(task){
  const li=document.createElement('li')
  li.setAttribute('data-id',task.id);
  if(task.completed) li.classList.add('completed')
  li.innerHTML=`
  <span>${task.text}</span>
  <button>Delete</button>`
  li.addEventListener('click',(e)=>{
    if(e.target.tagName=== 'BUTTON') return
    task.completed=!task.completed;
    li.classList.toggle('completed');
    saveTask();
  })

  li.querySelector('button').addEventListener('click',(e)=>{
    e.stopPropagation(); //prevent toggle of li eventlistener
    // console.log(e.target.parent);
    tasks=tasks.filter(t=>{
      t.id!==task.id;
    })
    li.remove();
    saveTask();

  })
  todoList.appendChild(li);
  // console.log(task);
}

function saveTask(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


})