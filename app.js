// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to the list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // Create tr element
  const row = document.createElement("tr");
  // Insert cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// Delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Show alert
UI.prototype.showAlert = function(msg, className) {
  // Create a div
  const div = document.createElement("div");
  // Add class
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));
  // Get parent
  const container = document.querySelector(".container");
  // Get form
  const form = document.querySelector("#book-form");
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 2 sec
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 2000);
};

// Event listners
// Event litner for add book
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Get the form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiating a book
  const book = new Book(title, author, isbn);

  // Instantiating the UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all the fields", "error");
  } else {
    // Add book to the list
    ui.addBookToList(book);

    // Show success
    ui.showAlert("Book Added", "success");

    // Clear fields
    ui.clearFields();
  }
  e.preventDefault();
});

// Event listner for delete
document.getElementById("book-list").addEventListener("click", function(e) {
  // Instantiating the UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Show alert
  ui.showAlert("Book was deleted", "success");

  e.preventDefault();
});
