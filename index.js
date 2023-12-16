//book class: Represent abook
class Book{
    constructor(title , author,isbn){
        this.author= author;
        this.title = title;
        this.isbn = isbn;
    }
}
//UI class:Handle the Tasks
class UI{
    static displayBooks(){
        const books = storage.getbooks();
        books.forEach((book)=>UI.addBook(book));
    }
    static addBook(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }
    static clearfields(){
        document.querySelector('#title').value ='';
        document.querySelector('#author').value ='';
        document.querySelector('#isbn').value ='';
    }
    static showalerts(message , className){
        const div = document.createElement('div');
        div.className =  `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(()=> document.querySelector('.alert').remove(),2000
        );
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
}


//Store class:Handles Storage
class storage{
    static getbooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addbookTo(book){
        const books = storage.getbooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removebookTo(isbn){
        const books = storage.getbooks();
        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event:Display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//event:, Add book
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const Isbn = document.querySelector('#isbn').value;
    //validate
    if(title==='' || author===''|| Isbn===''){
        UI.showalerts('Please fill the empty fields!', 'danger');
    }
    else{
        //instantiate
        const book = new Book(title, author, Isbn);
        //add book
        UI.addBook(book);
        storage.addbookTo(book);
        UI.clearfields();
        UI.showalerts('Book Added!', 'success');
    }
    
});


//evnt :remove books
 document.getElementById('book-list').addEventListener('click', (e)=>{
    UI.deleteBook(e.target);
    storage.removebookTo(e.target.parentElement.previousElementSibling.textContent); // taking the txt content isbn from book.isbn
    UI.showalerts('Book Removed!', 'success');
 })