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
let updateBtn = document.querySelector(".update");
let deleteBtn = document.querySelector(".delete");

// blocks

let menuAdd = document.querySelector(".menu-add");
let main = document.querySelector(".user-list");
let header = document.querySelector(".title");
let section = document.querySelector(".management");

let trInfo = document.querySelector(".user-info");
let tBody = document.querySelector("#table-body");

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

//Handling buttons

addBtn.addEventListener("click", (e) => {
  toggleModal();
});

closeBtn.addEventListener("click", () => {
  toggleModal();
});

submitBtn.addEventListener("click", () => {
  trClone = trInfo.cloneNode(true);
  tBody.append(trClone);
  toggleModal();
});
