const apiUrl = 'http://localhost:3000/tasks';

const form = document.getElementById ('task-form');
const tasklist = document.getElementById('task-list');

form.addEventListener ('submit', async (e) => {
    e.preventDefault();
      
      const title = document.getElementById('title').value;
      const description = document.getElementById ('description').value;
      
      try {
       const res  = await fetch( apiUrl, {
         method: 'POST',
         headers: {'Content-type': 'application/json'}, 
         body: JSON.stringify({title,descrição})
         })

          if(!res.ok) throw new Error ("Erro ao adicionar tarefa");

          const task = await res.json();
          form.reset(); 
          addTaskToUl(task);


       }
       catch (error) {
        alert ("Erro ao salvar tarefa:" + error.message);

      }
      
}); 

function addTaskToUl(task){
  const li = document.createElement("li");
  li.className = task.completed ? "completed" : "";
  li.innerHTML =  `
   <span>${task.title} - ${task.description}</span>
     <div>  <button onclick="toglecompleted(${task.id},${task.completed})">☑️
     </button>
     
     <button onClick= "deleteTask(${ task.id})"> 🗑️</button>
     </div>
  ` ;  
    tasklist.appendChild(li); 
}

 async function loadTasks() { 
   try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error("Erro ao carregar tarefas");

    const tasks = await res.json();
    tasklist.innerHTML = "";
    tasks.forEach(addTaskToUl);

   }  catch (error) {
    alert("Erro ao carregar tarefas:" + error.message); 
   }
}

async function toglecompleted(id, completed){
  try {
    await fetch(`${apiUrl}/${id}`, { 
      method: "PUT", 
      headrs: {"content-type": "application/json"},
      body: JSON.stringify({completed: !completed})
      });

      loadTasks();
  } catch (error){  
    alert ("Erro ao atualizar tarefa:" + error.message);

  }

}