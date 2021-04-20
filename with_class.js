todoObjectList = [];
todoImpList = [];

class Todo_Class {
  constructor(item){
    this.ulElement =item;
  }

  add() {
    const todoInput = document.querySelector("#myInput").value;
    if (todoInput == "") {
      alert("Вы не ввели никаких символов!")
    } else {
      const todoObject = {
        id : todoObjectList.length,
        todoText : todoInput,
        isDone : false,
      }

      todoObjectList.unshift(todoObject);
      this.display();
      document.querySelector("#myInput").value = '';

    }
  }

  migration(ss) {
        const todoObject = {
          id : todoObjectList.length,
          todoText : ss,
          isDone : false,
          }
        todoObjectList.unshift(todoObject);
        this.display();
      }



  done_undone(x) {
    const selectedTodoIndex = todoObjectList.findIndex((item)=> item.id == x);
    console.log(todoObjectList[selectedTodoIndex].isDone);
    todoObjectList[selectedTodoIndex].isDone == false ? todoObjectList[selectedTodoIndex].isDone = true : todoObjectList[selectedTodoIndex].isDone = false;
    this.display();
  }

  deleteElement(z) {
    const selectedDelIndex = todoObjectList.findIndex((item)=> item.id == z);
    todoObjectList.splice(selectedDelIndex,1);

    this.display();
  }

 deleteAllElement() {
 const result = confirm("Вы действительно хотите удалить все задачи?");
 if(result){
     todoObjectList = [];

     this.display();
       while (ul.firstChild) {
         ul.removeChild(ul.firstChild);
       }
   }
   }

  impElement(ss) {
      const delBtn = document.createElement("i");

      var li = document.createElement("li");
      li.appendChild(document.createTextNode(ss));
      ul.appendChild(li);
      delBtn.setAttribute("data-id", ul);
      delBtn.classList.add("far");
      delBtn.classList.add("fa-trash-alt");
      li.appendChild(delBtn);
      delBtn.addEventListener("click", function(e) {
      myTodoList.migration(ss);
      ul.removeChild(li);
    })
  }

  changeElement(z) {

    const todoInput = document.querySelector("#editInput").value;
    const selectedDelIndex = todoObjectList.findIndex((item)=> item.id == z);
console.log(selectedDelIndex, 'БЫЛО');
if (todoInput == "") {
      alert("Вы не ввели никаких символов!");
      modal.style.display = "block";
    } else {
      const todoObject = {
              id : selectedDelIndex,
              todoText : todoInput,
            }
todoObjectList[selectedDelIndex] = todoObject;


    this.display();
    document.querySelector("#editInput").value = '';
    }
  }

  display() {
    this.ulElement.innerHTML = "";

    todoObjectList.forEach((object_item) => {
      var modal = document.getElementById("myModal");
      var close = document.getElementsByClassName("close")[0];
      var edit = document.getElementsByClassName("edit")[0];

      const liElement = document.createElement("li");
      const delBtn = document.createElement("i");
      const star = document.createElement("j");
      const pencil = document.createElement("p");

      liElement.innerText = object_item.todoText;
      liElement.setAttribute("data-id", object_item.id);

      delBtn.setAttribute("data-id", object_item.id);
      delBtn.classList.add("far");
      delBtn.classList.add("fa-trash-alt");
      star.setAttribute("data-id", object_item.id);
      star.classList.add("fas");
      star.classList.add("fa-star");
      pencil.setAttribute("data-id", object_item.id);
      pencil.classList.add("fa");
      pencil.classList.add("fa-pencil-alt");
      liElement.appendChild(delBtn);
      liElement.appendChild(star);
      liElement.appendChild(pencil);

      star.addEventListener("click", function(e) {
        const impId = e.target.getAttribute("data-id");
        myTodoList.impElement(object_item.todoText);
        myTodoList.deleteElement(impId);
      })

      pencil.addEventListener("click", function(e) {

      const changeId = e.target.getAttribute("data-id");
         modal.style.display = "block";

         close.onclick = function () {
           modal.style.display = "none";
         }
         edit.onclick = function (){
           myTodoList.changeElement(changeId);
           modal.style.display = "none";
           console.log(changeId, 'СТАЛО');
         }

      window.onclick = function (event){
       if(event.target == modal){modal.style.display = "none";}
        }

      })


      delBtn.addEventListener("click", function(e) {
        const deleteId = e.target.getAttribute("data-id");
        myTodoList.deleteElement(deleteId);
      })

      liElement.addEventListener("click", function(e) {
        const selectedId = e.target.getAttribute("data-id");
        myTodoList.done_undone(selectedId);
      })

      if (object_item.isDone) {
        liElement.classList.add("checked");
      }

      this.ulElement.appendChild(liElement);
    })
  }
}




////-----MAIN PROGRAM------------
        const listSection = document.querySelector("#myUL");

        myTodoList = new Todo_Class(listSection);
        var ul = document.getElementById("impUL");


        document.querySelector(".addBtn").addEventListener("click", function() {
           myTodoList.add()
        })


        document.querySelector("#myInput").addEventListener("keydown", function(e) {
           if (e.keyCode == 13) {myTodoList.add()}
        })



        document.querySelector('#submit').onclick = function (){
          myTodoList.deleteAllElement()
        }
