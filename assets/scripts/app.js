const addBookModal = document.getElementById("add-modal");
// const addBookModal = document.querySelector("#add-modal");

const addBooksBtn = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddBookModalBtn = addBookModal.querySelector(".btn--passive");
const confirmAddBookModalBtn = cancelAddBookModalBtn.nextElementSibling;
const userInputs = addBookModal.querySelectorAll("input");
const entryText = document.getElementById("entry-text");

let books = [];

const updateUI = () => {
  if (books.length === 0) {
    entryText.style.display = "block";
  } else entryText.style.display = "none";
};

const deleteBookHandler = (bookId) => {
  let index = 0;
  for (const book of books) {
    if (book.id === bookId) break;
    else index++;
  }

  books.splice(index, 1);
  const bookList = document.getElementById("book-list");
  bookList.children[index].remove();
};

const renderBookElement = (id, title, imageUrl, rating) => {
  const newBook = document.createElement("li"); //li
  newBook.className = "book-element";
  newBook.innerHTML = `
    <div class="book-element__image">
        <img src="${imageUrl} alt="${title}"/>
    </div>
    <div class="book-element__info">
       <h2>${title}</h2>
       <p>${rating}/5</p>
    </div>
    `;
  newBook.addEventListener("click", deleteBookHandler.bind(null, id));
  const bookList = document.getElementById("book-list"); //ul
  bookList.append(newBook);
};

const addBookHandler = () => {
  const title = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const rating = userInputs[2].value;

  if (
    title.trim() === "" ||
    imageUrl.trim() === "" ||
    rating.trim() === "" ||
    rating < 1 ||
    rating > 5
  )
    alert("Enter a vaild input");

  const newBook = {
    id: Math.random().toString(),
    title: title,
    image: imageUrl,
    rating: rating,
  };

  books.push(newBook);
  updateUI();
  renderBookElement(newBook.id, newBook.title, newBook.image, newBook.rating);
  toggleBookModal();
  clearBookInputs();
};

const clearBookInputs = () => {
  for (const userInput of userInputs) userInput.value = "";
};

const toggleBookModal = () => {
  addBookModal.classList.toggle("visible");
  toggleBackDrop();
};

const toggleBackDrop = () => {
  backdrop.classList.toggle("visible");
};

const cancelAddBookModalHandler = () => {
  toggleBookModal();
};

const backdropClickHandler = () => {
  toggleBookModal();
};

addBooksBtn.addEventListener("click", toggleBookModal);
cancelAddBookModalBtn.addEventListener("click", cancelAddBookModalHandler);
backdrop.addEventListener("click", backdropClickHandler);
confirmAddBookModalBtn.addEventListener("click", addBookHandler);
