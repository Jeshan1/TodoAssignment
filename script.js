
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
        renderData()
    }

    console.log(tasks)
}

function renderData(){

    const tasklist = document.getElementById('tasklist')
    tasklist.innerHTML = ""

    tasks.forEach((task,index)=>{
        const listItem = document.createElement('li')
        
        listItem.innerHTML = `
          <strong>${task.title}</strong> - ${task.deadline} - Priority: ${task.priority}
          <button onclick="toggleCompletion(${index})">Complete</button>
          <button onclick="deleteTask(${index})">View Details</button>
          <button onclick="deleteTask(${index})">Delete</button>
        `
        if (task.completed) {
            listItem.classList.add('completed')
        }
        tasklist.appendChild(listItem)
    })
}

function toggleCompletion(index){
    tasks[index].completed = !tasks[index].completed
    renderData()
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
          <button onclick="deleteTask(${index})">View Details</button>
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
    renderData()
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
                <button onclick="viewDetails(${index})">View Details</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            if (task.completed) {
                listItem.classList.add('completed');
            }
            tasklist.appendChild(listItem);
        });
    }
}



//deleting task
function deleteTask(index){
    tasks.splice(index,1)
    renderData()
}












function clearForm(){
    document.getElementById('title').value = ""
    document.getElementById('description').value = ""
    document.getElementById('priority').value = ""
    document.getElementById('categories').value = ""
    document.getElementById('deadline').value = ""
}