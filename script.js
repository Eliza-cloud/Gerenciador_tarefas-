const apiUrl = 'http://localhost:3000/tasks';

const form = document.getElementById ('task-form');
const tasklist = document.getElementById('task-list');

form.addEventListener ('submit', async (e) => {
    e.preventDefault();
      
      const title = document.getElementById('title').value;
      const description = document.getElementById ('description').value;

})