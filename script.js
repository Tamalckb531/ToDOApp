const input = document.querySelector('.input');
const addButton = document.querySelector('.addBtn');
const ul = document.querySelector('.ul');

//This function set the cursor in the end of leble when we click the edit button 
const setCursorToEnd = (element) => {
    var range = document.createRange();
    var selection = window.getSelection();
    
    range.selectNodeContents(element);
    range.collapse(false); // Collapse range to the end
    selection.removeAllRanges();
    selection.addRange(range);
}

const TodoCreator = (todo) =>{

    const joinedTodo = todo.replace(/\s/g, '');

    //* creatiing main element the li
    const li = document.createElement("li");
    li.classList.add('listContainar');

    //* creation of two div inside li
    const contentDiv = document.createElement("div");
    const buttonDiv = document.createElement("div");

    contentDiv.classList.add('content');
    buttonDiv.classList.add('buttons');

    //* creation and append of element inside content div and inserting content

    const inputBar = document.createElement('input');
    const label = document.createElement('label');

    inputBar.setAttribute('type','checkbox');
    inputBar.setAttribute('id', joinedTodo);

    label.setAttribute('for',joinedTodo);
    label.classList.add('todo');

    label.innerText = todo;

    contentDiv.append(inputBar);
    contentDiv.append(label);

    //* creation and append of element inside button div and inserting content

    const button1 = document.createElement('button');
    const button2 = document.createElement('button');

    button1.classList.add('btn','edit');
    button2.classList.add('btn','cancel');

    button1.innerText = "Edit";
    button2.innerText = "X";

    buttonDiv.append(button1);
    buttonDiv.append(button2);

    //* appending both div in li

    li.append(contentDiv);
    li.append(buttonDiv);

    //* appending li in ul

    ul.append(li);
}

//addition
addButton.addEventListener('click', (e)=>{
    let todo = input.value;
    if(todo){
        TodoCreator(todo);
    }else{
        alert("Enter some text first");
    }
    input.value = "";
    input.focus();
})

//Update, cancel and check with event delegation 
ul.addEventListener('click', (e)=>{
    if(e.target.innerText === 'X'){
        const element = e.target;
        element.parentElement.parentElement.remove();
    }else if(e.target.innerText === 'Edit'){
        const labelText = e.target.parentElement.previousElementSibling.children[1];
        labelText.setAttribute('contenteditable', 'true')
        e.target.innerText = "Done";
        labelText.focus();
        setCursorToEnd(labelText);
    }else if(e.target.innerText === "Done"){
        const labelText = e.target.parentElement.previousElementSibling.children[1];
        if(labelText.innerText){
            labelText.setAttribute('contenteditable', 'false')
            e.target.innerText = "Edit";
        }else{
            alert("Enter some text first");
            labelText.focus();
        }
    }else if(e.target.parentElement.classList.contains('content')){
        e.target.classList.toggle('cross');
    }
    if(e.target.tagName === 'INPUT'){
        if(e.target.checked){
            e.target.nextElementSibling.classList.add('cross');
        }else{
            e.target.nextElementSibling.classList.remove('cross');
        }
    }
})