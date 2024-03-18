
let tasks = []

function addTask(){
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const priority = document.getElementById('priority').value
    const category = document.getElementById('categories').value
    const deadline = document.getElementById('deadline').value

    if(title ==="" || description ==="" || priority ==="" || category ==="" || deadline ==="")
    {
       alert("please, Fill the all input field")
    }
    else{
        const task = {
            title:title,
            description:description,
            priority:priority,
            category:category,
            deadline:deadline,
            completed:false
        }
    
        tasks.push(task)
        clearForm()
        renderData(tasks)
    }

    console.log(tasks)
}

function renderData(tasks){

    const tasklist = document.getElementById('tasklist')
    tasklist.innerHTML = ""

    tasks.forEach((task,index)=>{
        const listItem = document.createElement('li')
        
        listItem.innerHTML = `
          <strong>${task.title}</strong> - ${task.deadline} - Priority: ${task.priority}
          <button onclick="toggleCompletion(${index})" class="completeBtn">Complete</button>
          <button onclick="viewTask(${index})" class="viewDetailBtn">View Details</button>
          <button onclick="editTask(${index})" class="editBtnList">Edit</button>
          <button onclick="deleteTask(${index})" class="deleteBtn">Delete</button>
        `
        if (task.completed) {
            listItem.classList.add('completed')
        }
        tasklist.appendChild(listItem)
    })
}

function toggleCompletion(index){
    tasks[index].completed = !tasks[index].completed
    renderData(tasks)
}



//searching data

function filteredData(){
    const searchValue = document.getElementById('search').value.toLowerCase()
    console.log(searchValue)

    const filterTasks = tasks.filter((task)=>{
        const titleMatch = task.title.toLowerCase().includes(searchValue)
        const priorityMatch = task.priority.toLowerCase().includes(searchValue)
        const categoryMatch = task.category.toLowerCase().includes(searchValue)
        return titleMatch || priorityMatch || categoryMatch
    })

    displayFilteredData(filterTasks)
}

function displayFilteredData(filterTasks){
    const tasklist = document.getElementById('tasklist')
    tasklist.innerHTML = ""

    filterTasks.forEach((task,index)=>{
        const listItem = document.createElement('li')
        
        listItem.innerHTML = `
          <strong>${task.title}</strong> - ${task.deadline} - Priority: ${task.priority}
          <button onclick="toggleCompletion(${index})">Complete</button>
          <button onclick="viewTask(${index})">View Details</button>
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
        `
        if (task.completed) {
            listItem.classList.add('completed')
        }
        tasklist.appendChild(listItem)
    })
}

//filtering

function findAll(){
    displayData(tasks,'all')
}

function findPersonal() {
    const personalTasks = tasks.filter(task => task.category.toLowerCase() === 'personal');
    displayData(personalTasks,'personal');
}

function findWork() {
    const workTasks = tasks.filter(task => task.category.toLowerCase() === 'work');
    displayData(workTasks,'work');
}

function findSchool() {
    const schoolTasks = tasks.filter(task => task.category.toLowerCase() === 'school');
    displayData(schoolTasks,'school');
}

function displayData(filteredTasks,category) {
    const tasklist = document.getElementById('tasklist');
    tasklist.innerHTML = "";

    if (filteredTasks.length === 0) {
        const listItem = document.createElement('li')
        listItem.textContent = `No items found on ${category} category`
        tasklist.appendChild(listItem)
    }
    else{
        filteredTasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${task.title}</strong> - ${task.deadline} - Priority: ${task.priority}
                <button onclick="toggleCompletion(${index})">Complete</button>
                <button onclick="viewTask(${index})">View Details</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            if (task.completed) {
                listItem.classList.add('completed');
            }
            tasklist.appendChild(listItem);
        });
    }
}


//view all details of specific task on modal

function viewTask(index){
    const task = tasks[index]
    openModal()
    document.getElementById('taskTitle').innerHTML = task.title
    document.getElementById('taskDescription').innerHTML = task.description
    document.getElementById('taskDeadline').innerHTML = `Deadline: ${task.deadline}`
    document.getElementById('taskPriority').innerHTML = `Priority: ${task.priority}`
    document.getElementById('taskCategory').innerHTML = `Category: ${task.category}`

}

let close = document.getElementById('close')
let modal = document.getElementById('modal');

function openModal(){
    if (modal.style.display == 'none') { 
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
    }
    else{
        modal.style.display = "none";
    }

}
// close modal if close icon clicked
close.onclick = function() {
    modal.style.display = "none"
  }
//for close modal if click anywhere
window.onclick = function(e){
    if (e.target == modal) {
        modal.style.display = 'none'
    }
}


//deleting task
function deleteTask(index){
    tasks.splice(index,1)
    renderData(tasks)
}

let editingIndex = -1; 

function saveEditData() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('categories').value;

    if (title ==="" || description ==="" || priority ==="" || category ==="" || deadline ==="") {
        alert("please, Fill the all input field")
    }
       
     else {
        if (editingIndex === -1) {
            // Create new task
            const task = {
                title,
                description,
                deadline,
                priority,
                category,
                completed: false
            };
            tasks.push(task);
        } else {
            // Update existing task
            tasks[editingIndex].title = title;
            tasks[editingIndex].description = description;
            tasks[editingIndex].deadline = deadline;
            tasks[editingIndex].priority = priority;
            tasks[editingIndex].category = category;

            editingIndex = -1;
            document.getElementById('editbtn').style.display = 'none';
            document.getElementById('addbtn').style.display = 'block'
        }

        clearForm()

        renderData(tasks);
    }
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('deadline').value = task.deadline;
    document.getElementById('priority').value = task.priority;
    document.getElementById('categories').value = task.category;

    editingIndex = index;
    document.getElementById('editbtn').style.display = 'block';
    document.getElementById('addbtn').style.display = 'none'
    
}



//to clear form
function clearForm(){
    document.getElementById('title').value = ""
    document.getElementById('description').value = ""
    document.getElementById('priority').value = ""
    document.getElementById('categories').value = ""
    document.getElementById('deadline').value = ""
}