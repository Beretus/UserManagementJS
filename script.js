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

let userTr = document.querySelectorAll("#table-body");
console.log(userTr);
//forms

let formFirstName = document.querySelector(".user-first");
let formSecondName = document.querySelector(".user-second");
let formPhone = document.querySelector(".user-phone");
let formEmail = document.querySelector(".user-email");

let searchUsers = document.querySelector(".search-user");

//objects

let users = [];
let id = -1;

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

function populateFromLS() {
  items = JSON.parse(localStorage.getItem("users-list"));
  // console.log(items);
  if (items != null) {
    items.forEach((user) => {
      tBody.innerHTML += `
      <tr class="user-info">
              <td id=${user.id}>${user.firstname}</td>
              <td>${user.secondname}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td>
                <button class="update">Update</button
                ><button class="delete">Delete</button>
              </td>
      </tr>
      `;
    });
  } else {
    tBody.innerHTML += `<p>Add users!</p>`;
  }

  console.log(items);
}

function addToList() {
  let users = JSON.parse(localStorage.getItem("users-list")) || [];

  let check = users.length;
  tBody.innerHTML += `
    <tr class="user-info">
      <td id=${check}>${formFirstName.value}</td>
      <td>${formSecondName.value}</td>
      <td>${formEmail.value}</td>
      <td>${formPhone.value}</td>
      <td>
        <button class="update">Update</button
        ><button class="delete">Delete</button>
      </td>
    </tr>
  `;

  users.push({
    id: check,
    firstname: formFirstName.value,
    secondname: formSecondName.value,
    email: formEmail.value,
    phone: formPhone.value,
  });

  localStorage.setItem("users-list", JSON.stringify(users));
}

let searchArray = [];
function showUsers(value) {
  //Change nodeList to array
  let children;
  searchArray = [...userTr].find((cell) => {
    if (value !== "") {
      children = [...cell.children];
      children.forEach((child) => {
        // console.log(childek.innerText);
        if (!child.innerText.slice(0, -12).includes(value)) {
          child.classList.add("is-hidden");
        } else {
          child.classList.remove("is-hidden");
        }
      });
    } else if (value === "") {
      children = [...cell.children];
      children.forEach((child) => {
        child.classList.remove("is-hidden");
      });
    }
  });
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
    addToList();
    changeMenuToSubmit();
    toggleModal();
  }
});

let children;
main.addEventListener("click", (e) => {
  if (e.target.classList.contains("update")) {
    let parent = e.target.closest("tr");
    children = parent.childNodes;
    formFirstName.value = children[1].innerText;
    formSecondName.value = children[3].innerText;
    formEmail.value = children[5].innerText;
    formPhone.value = children[7].innerText;

    //new values from Form

    changeMenuToUpdate();
    toggleModal();
  }
});

menuAdd.addEventListener("click", (e) => {
  if (e.target.classList.contains("update-btn")) {
    let users = JSON.parse(localStorage.getItem("users-list"));
    let userId = children[1].id;
    console.log(userId);
    users[userId].firstname = formFirstName.value;
    users[userId].secondname = formSecondName.value;
    users[userId].email = formEmail.value;
    users[userId].phone = formPhone.value;

    children[1].innerHTML = formFirstName.value;
    children[3].innerHTML = formSecondName.value;
    children[5].innerHTML = formEmail.value;
    children[7].innerHTML = formPhone.value;

    localStorage.setItem("users-list", JSON.stringify(users));
  }
});

main.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    // Get users from LS
    let users = JSON.parse(localStorage.getItem("users-list"));
    let elementToRemove = e.target.closest("tr");
    let userId = e.target.closest("tr").childNodes[1].id;

    // Remove the user from the list
    const filteredUsers = users.filter((user) => user.id !== parseInt(userId));

    // update remaining users ids
    for (let i = 0; i < filteredUsers.length; i++) {
      filteredUsers[i].id = i;
    }

    // set filtered users in LS
    localStorage.setItem("users-list", JSON.stringify(filteredUsers));
    elementToRemove.remove();
  }
});

let word = "";
searchUsers.addEventListener("keyup", (e) => {
  let searchValue = searchUsers.value;
  showUsers(searchValue);
});

populateFromLS();
