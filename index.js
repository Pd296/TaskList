
const form = document.querySelector("#task-from");
const clearBtm= document.querySelector(".clear-tasks");
const taskList=document.querySelector(".collection");
const taskInput=document.querySelector("#task");
const filter=document.querySelector("#filter");

loadEventListeners();

function loadEventListeners(){

 document.addEventListener('DOMContentLoaded',getTasks);
 form.addEventListener('submit',addTasks);
 taskList.addEventListener('click',removeTask);
 clearBtm.addEventListener('click',clearTasks);
 filter.addEventListener('keyup',filterTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li= document.createElement('li');
        li.className='collection-item';
       
        li.appendChild(document.createTextNode(task));
        const link=document.createElement('a');
        link.className='delete-item secondary-content'
        link.innerHTML= '<i class="fa fa-remove"></i>'
        li.appendChild(link);
        taskList.appendChild(li);
    })
}
// Add tasks
function addTasks(e){
    if(taskInput.value ==='')
    alert("Add tasks");
    else{
 //create li element
 const li= document.createElement('li');
 li.className='collection-item';

 li.appendChild(document.createTextNode(taskInput.value));
 const link=document.createElement('a');
 link.className='delete-item secondary-content'
 link.innerHTML= '<i class="fa fa-remove"></i>'
 li.appendChild(link);
 taskList.appendChild(li);

  //Store in Local Storage
  storeInLocalStorage(taskInput.value);
 taskInput.value='';



 e.preventDefault();
 }
}

function storeInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage( e.target.parentElement.parentElement);
        }
        
    }
}


function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[]
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task)
        tasks.splice(index,1);
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));s
}
function clearTasks(e){
    //inner Html
    // taskList.innerHTML='';

    // remove child - faster 
    while(taskList.firstChild){
        taskList.firstChild.remove();
    }

    localStorage.clear();
}

function filterTasks(e){

    const text=e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(
        function(task){
           const item=task.firstChild.textContent.toLowerCase(); 
           if(item.indexOf(text) !=-1){
                task.style.display='block';
           }else{
                task.style.display='none';
           }
        }
    )
}