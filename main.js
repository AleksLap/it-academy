"use strict";
// delete element

let listOfBooks = document.getElementById('bookList');
listOfBooks.addEventListener('click', function (event) {
    if (event.target.className === 'delete'){
        const bookItem = event.target.parentElement;
        bookItem.remove();
    }
});

// add element
const addForm = document.forms['addForm'];

addForm.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.className === 'addButton'){

        const value = addForm.querySelector('input[type="text"]').value;
        const li = document.createElement('li');
        const bookName = document.createElement('p');
        const deleteBtn = document.createElement('button');

        deleteBtn.className = 'delete';

        bookName.textContent = value;
        deleteBtn.textContent = 'delete';

        li.appendChild(bookName);
        li.appendChild(deleteBtn);
        listOfBooks.appendChild(li);
    }

});

// hide element

function check() {
    let checkBox = document.getElementById('hideBooks');
    let ul = document.getElementById('bookList');
    if(checkBox.checked === true){
        ul.style.display = 'none';
    }
    else {
        ul.style.display = 'block';
    }
}

// search

let searchBook = document.getElementById('searchBook');

searchBook.addEventListener('input', function (event) {
    let searchText = document.getElementById('searchBook').value.toLowerCase();
    const books = document.querySelectorAll('ul > li > p:first-child');

        for (let i = 0; i < books.length; i++) {
            let searchInName = books[i].textContent.toLowerCase();

            if (searchInName.indexOf(searchText) === -1) {
                books[i].parentElement.style.display = 'none';
            }
            else {
                books[i].parentElement.style.display = 'block';
            }
        }
});

