let tasks= [];

const todolist=document.querySelector('.todo_list'),
    todoForm=document.querySelector('.todo_form'),
    todoInput=document.querySelector('.todo_input'),
    todoError=document.querySelector('.todo_error'),
todoNull =document.querySelector('.todo_null');
const addItemTodolist = () => {

    todolist.innerHTML = ''

    tasks.forEach((el) => {
        todolist.innerHTML += `
        <li class="todo_item" style="order: ${el.isDone ? "+1" : "0" && el.isImportant ? "-1" : "0"}">
              <div class="todo_item-left">
                  <input data-id="${el.id}" ${el.isDone ? "checked" : ""} type="checkbox" class="todo_item-done">
                  <p style="text-decoration-line: ${el.isDone ? "line-through" : ""}" class="todo_item-text">${el.text}</p>
              </div>
                <div class="todo_item-right">
                  <span data-id="${el.id}" class="todo_item-star" style="color: ${el.isImportant ? "gold" : ""}">
                      <ion-icon name="star"></ion-icon>
                  </span>
                    <span data-id="${el.id}"class="todo_item-del">
                     <ion-icon name="trash"></ion-icon">
                    </span>
                </div>
            </li>
        `
    })

    if (tasks.length !==0){
        todoNull.style.display = "none"
    } else {
       todoNull.style.display = "block"
}

    const todoChecked = document.querySelectorAll(".todo_item-done");
    Array.from(todoChecked).forEach(item => {
        item.addEventListener('change', () => {
            tasks = tasks.map(el => {
                if (el.id == item.dataset.id) {
                    return {...el, isDone: !el.isDone}
                }
                return el
            })
            addItemTodolist()
        })
    })
    const todoItemStar = document.querySelectorAll('.todo_item-star');
    Array.from(todoItemStar).forEach(item => {
        item.addEventListener('click', () => {
            tasks = tasks.map(el => {
                if (el.id == item.dataset.id) {
                return {...el, isImportant: !el.isImportant}
            }
            return el

        })
        addItemTodolist()
    })

})

 const todoItemDel = document.querySelectorAll('.todo_item-del');
   Array.from(todoItemDel).forEach(item =>{
       item.addEventListener('click',() =>{

           tasks = tasks.filter(el => {
                return el.id !== item.dataset.id

           })

           addItemTodolist();
       })
   })




todoForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    if (tasks.some(el => el.text.toUpperCase() === event.target[0].value.toUpperCase())) {
        alert('Нельзя добавить!!')
        event.target[0].value = ''
    } else {
        tasks = [...tasks, {
            id: tasks.length ? tasks.at(-1).id + 1 : 1,
            text: event.target[0].value,
            isDone: false,
            isImportant: false
        }];


        addItemTodolist()
        event.target[0].value = ''
    }

})

todoInput.addEventListener('input',(event) => {
    if (tasks.some(el => el.text.toUpperCase() === event.target.value.toUpperCase())) {
        todoError.style.display = 'block'
    } else {
        todoError.style.display = 'none'

    }
} )
}
