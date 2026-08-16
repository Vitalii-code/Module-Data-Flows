let myLibrary = [];
window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");
const addBookBtn = document.getElementById("addBook");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function addBook() {
  if (
    title.value.trim() == "" ||
    author.value.trim() == "" ||
    pages.value.trim() == ""
  ) {
    alert("Please fill all fields!");
    return false;
  } else {
    let book = new Book(
      title.value,
      author.value,
      Number(pages.value),
      check.checked
    );
    myLibrary.push(book);
    render();
  }
}

addBookBtn.addEventListener("click", addBook);

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}
function render() {
  let tbody = document.querySelector("#display tbody");
  tbody.innerHTML = "";

  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = tbody.insertRow();
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    let changeButton = document.createElement("button");
    changeButton.className = "btn btn-success";
    wasReadCell.appendChild(changeButton);
    let readStatus = myLibrary[i].check ? "Yes" : "No";
    changeButton.textContent = readStatus;
    changeButton.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    let deleteButton = document.createElement("button");
    deleteCell.appendChild(deleteButton);
    deleteButton.className = "btn btn-warning";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      myLibrary.splice(i, 1);
      render();
      alert(`You've deleted title: ${myLibrary[i].title}`);
    });
  }
}
