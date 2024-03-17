
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
    }

    console.log(tasks)
}