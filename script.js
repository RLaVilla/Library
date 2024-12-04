const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.info = function () {
        return {
            title: this.title,
            author: this.author,
            pages: this.pages,
            status: this.status
        };
    };
}

function addBookToLibrary (title, author, pages, status) {
    let newBook = new Book(title, author, pages, status);
    
    myLibrary.push(newBook);
}

addBookToLibrary("John", "Larry", 234, "Read");

function displayBooks () {
        const container = document.getElementById("library-container");
        container.innerHTML= '';

        myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute('data-index', index);

        const bookTitle = document.createElement("h3");
        bookTitle.textContent = book.title;
        bookTitle.classList.add("bookTitle");

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = `Author: ${book.author}`;
        bookAuthor.classList.add("bookAuthor");

        const bookPages = document.createElement("p");
        bookPages.textContent = `Length: ${book.pages} pages`;
        bookPages.classList.add("bookPages");

        const bookStatus = document.createElement("p");
        bookStatus.textContent = `Status: ${book.status}`;
        bookStatus.classList.add("bookStatus");

        const buttonCont = document.createElement("div");
        buttonCont.classList.add("buttonCont");


        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("removeButton");
        removeButton.setAttribute('data-index', index);


        const statusButton = document.createElement("button");
        if (book.status === "Read") {
            statusButton.textContent = "Unread?";
        } else {
            statusButton.textContent = "Read?";
        }
        statusButton.classList.add("statusButton");
        statusButton.setAttribute('data-index', index);
        


        bookTitle.style.textAlign = "center";
        bookAuthor.style.textAlign = "left";
        bookStatus.style.textAlign = "left";
        bookPages.style.textAlign = "left";

        buttonCont.appendChild(statusButton);
        buttonCont.appendChild(removeButton);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookStatus);
        bookCard.appendChild(buttonCont);

        container.appendChild(bookCard);
        console.log("index:", index);
    });

    attachRemoveListeners();
    attachStatusListeners();
}
    window.onload = displayBooks;

    function attachStatusListeners() {
        const statusButtons = document.querySelectorAll(".statusButton");
        statusButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const bookIndex = event.target.getAttribute('data-index');
                const book = myLibrary[bookIndex];
                if (book.status === "Read") {
                    book.status = "Unread"
                } else {
                    book.status = "Read"
                }
                displayBooks();
            });
        });
    }

    function attachRemoveListeners() {
        const removeButtons = document.querySelectorAll('.removeButton');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const bookIndex = event.target.getAttribute('data-index');
                myLibrary.splice(bookIndex, 1);
                displayBooks();
            });
        });
    }

    const newButton = document.getElementById("newButton");
    const form = document.getElementById("form-container");
    newButton.addEventListener('click', () => {
        form.classList.add("show");
        newButton.disabled = true;
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const status = document.querySelector('input[name="status"]:checked')?.value;

    if (!status) {
        alert("Please select the status (Read or Unread)");
        return;
    }

    addBookToLibrary(title, author, pages, status);

    const input = document.getElementById("bookForm");
    input.reset();

    displayBooks();

    });

    const closeButton = document.getElementById("closeButton");
        closeButton.addEventListener('click', () => {
            form.classList.remove("show");
            newButton.disabled = false;
        });

