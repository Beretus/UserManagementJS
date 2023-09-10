// Variables

//inputs

let inputFirstName = document.querySelector(".user-first");
let inputSecondName = document.querySelector(".user-second");
let inputPhone = document.querySelector(".user-phone");
let inputEmail = document.querySelector(".user-email");

//buttons

let addBtn = document.querySelector(".add-user");
let submitBtn = document.querySelector(".submit");
let closeBtn = document.querySelector(".close");
let updateBtn = document.querySelectorAll(".update");
let deleteBtn = document.querySelector(".delete");

// blocks

let menuAdd = document.querySelector(".menu-add");
let main = document.querySelector(".user-list");
let header = document.querySelector(".title");
let section = document.querySelector(".management");

let trInfo = document.querySelector(".user-info");
let tBody = document.querySelector("#table-body");

let menuTitle = document.querySelector(".menu-title");

//forms

let formFirstName = document.querySelector(".user-first");
let formSecondName = document.querySelector(".user-second");
let formPhone = document.querySelector(".user-phone");
let formEmail = document.querySelector(".user-email");

//functions

//show modal and blur background
function toggleModal() {
  menuAdd.classList.toggle("is-hidden");
  main.classList.toggle("is-blurred");
  header.classList.toggle("is-blurred");
  section.classList.toggle("is-blurred");
}

function changeMenuToSubmit() {
  menuTitle.innerHTML = "Add user";
  submitBtn.classList.remove("update-btn");
  submitBtn.classList.add("submit");
  submitBtn.innerHTML = "Submit";
}

function changeMenuToUpdate() {
  menuTitle.innerHTML = "Update User";
  submitBtn.classList.remove("submit");
  submitBtn.classList.add("update-btn");
  submitBtn.innerHTML = "Update";
}

//Handling buttons

addBtn.addEventListener("click", (e) => {
  changeMenuToSubmit();
  toggleModal();
});

closeBtn.addEventListener("click", () => {
  toggleModal();
});

menuAdd.addEventListener("click", (e) => {
  //Adding new user to table
  if (e.target.classList.contains("submit")) {
    trClone = trInfo.cloneNode(true);
    let children = trClone.childNodes;
    children[1].innerText = formFirstName.value;
    children[3].innerText = formSecondName.value;
    children[5].innerText = formEmail.value;
    children[7].innerText = formPhone.value;
    tBody.appendChild(trClone);
    changeMenuToSubmit();
    toggleModal();
  }
});

//Updating (need to listen on main, due to dynamic creating of users)
main.addEventListener("click", (e) => {
  if (e.target.classList.contains("update")) {
    let parent = e.target.closest("tr");
    let children = parent.childNodes;
    formFirstName.value = children[1].innerText;
    formSecondName.value = children[3].innerText;
    formEmail.value = children[5].innerText;
    formPhone.value = children[7].innerText;

    //new values from form

    changeMenuToUpdate();
    toggleModal();
    menuAdd.addEventListener("click", (e) => {
      if (e.target.classList.contains("update-btn")) {
        children[1].innerText = formFirstName.value;
        children[3].innerHTML = formSecondName.value;
        children[5].innerHTML = formEmail.value;
        children[7].innerHTML = formPhone.value;
      }
    });
  }
});
