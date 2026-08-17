const myLibrary = [];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");
const addBookBtn = document.getElementById("addBook");

addBookBtn.addEventListener("click", addBook);

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function addBook() {
  const cleanTitle = titleInput.value.trim();
  const cleanAuthor = authorInput.value.trim();
  const pageCount = Number(pagesInput.value);

  if (
    cleanTitle == "" ||
    cleanAuthor == "" ||
    pagesInput.value.trim() == "" ||
    Number.isNaN(pageCount) ||
    !Number.isInteger(pageCount) ||
    pageCount <= 0
  ) {
    alert("Please fill all fields correctly!");
    return false;
  } else {
    const book = new Book(
      cleanTitle,
      cleanAuthor,
      pageCount,
      checkInput.checked
    );
    myLibrary.push(book);
    render();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function showMessage(text) {
  const msg = document.createElement("div");
  msg.className = "alert alert-info";
  msg.textContent = text;
  document.body.prepend(msg);
  setTimeout(() => msg.remove(), 3000);
}

function render() {
  const tbody = document.querySelector("#display tbody");
  tbody.innerHTML = "";

  const length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = tbody.insertRow();
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    const changeButton = document.createElement("button");
    changeButton.className = "btn btn-success";
    wasReadCell.appendChild(changeButton);
    let readStatus;
    if (myLibrary[i].check) {
      readStatus = "Yes";
    } else {
      readStatus = "No";
    }
    changeButton.textContent = readStatus;
    changeButton.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    const deleteButton = document.createElement("button");
    deleteCell.appendChild(deleteButton);
    deleteButton.className = "btn btn-warning";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;
      myLibrary.splice(i, 1);
      render();
      showMessage(`You've deleted title: ${deletedTitle}`);
    });
  }
}
