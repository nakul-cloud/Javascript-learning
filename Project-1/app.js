const myLibrary=[]


function Book(title,author,pages,read){
    this.id=crypto.randomUUID();
    this.title=title;
    this.author=author; 
    this.pages=pages;
    this.read=read;
}

Book.prototype.toggleRead=function(){
    this.read=!this.read;
}   

function addBookToLibrary(title,author,pages,read){
    const newBook= new Book(title,author,pages,read);
    myLibrary.push(newBook);
}


function displayBooks() {
  const container = document.getElementById("library");
  container.innerHTML = ""; // clear previous

  myLibrary.forEach(book => {

    const card = document.createElement("div");

    card.innerHTML = `
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <p>${book.read ? "Read" : "Not Read"}</p>

      <button onclick="removeBook('${book.id}')">Delete</button>
      <button onclick="toggleRead('${book.id}')">Toggle Read</button>
    `;

    container.appendChild(card);
  });
}

// ================================
// 6. REMOVE BOOK
// ================================
function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  myLibrary.splice(index, 1);
  displayBooks();
}


// ================================
// 7. TOGGLE READ
// ================================
function toggleRead(id) {
  const book = myLibrary.find(book => book.id === id);
  book.toggleRead();
  displayBooks();
}


// ================================
// 8. FORM HANDLING
// ================================
const form = document.getElementById("bookForm");
const btn = document.getElementById("newBookBtn");

// show form
btn.onclick = () => {
  form.style.display = "block";
};

// submit form
form.addEventListener("submit", function(e) {
  e.preventDefault(); // VERY IMPORTANT

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  displayBooks();
  form.reset();
});