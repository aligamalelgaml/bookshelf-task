import React from 'react';
import SearchBook from './SearchBook';
import BookShelf from './BookShelf';


class Library extends React.Component {

    state = {
        currentBooks: localStorage.getItem("currentBooks") ? JSON.parse(localStorage.getItem("currentBooks")) : [],
        toReadBooks: localStorage.getItem("toReadBooks") ? JSON.parse(localStorage.getItem("toReadBooks")) : [],
        readBooks: localStorage.getItem("readBooks") ? JSON.parse(localStorage.getItem("readBooks")) : []
    };

    /**
     * Accepts a book object as well as a target string that is supposed to match to one of this.state's objects.
     * @param {*} book Book json object
     * @param {string} target String matching one of this.state's objects.
     */
    __addBook(book, target) {
        console.log("Adding: " + book.title + " to " + target);
        const bookList = this.state[target];

        const allBooks = [...this.state.currentBooks, ...this.state.toReadBooks, ...this.state.readBooks];
        
        // Check if the book already exists in any list.
        const isBookExists = allBooks.some((listBook) => listBook.key === book.key);
        if (isBookExists) {
            console.log("Book already exists in a list. Preventing addition..");
            return; // Exit the function if the book already exists
        }

        // Push the book to the bookList
        bookList.push(book);

        // Update the state and localStorage
        this.setState({ [target]: bookList });
        localStorage.setItem(target, JSON.stringify(bookList));
    }


    /**
     * Returns a promise that allows for insertion of books after removal is completely finished.
     * @param {*} book Book json object
     * @param {string} source String matching one of this.state's objects.
     * @returns A fulfilled promise once this.setState finishes updating it's statesd. 
     */
    __removeBook(book, source) {
        return new Promise((resolve, reject) => {
            console.log("Removing: " + book.title + " from " + source)
            const bookList = this.state[source];
    
            const newBookList = bookList.filter(listBook => (this.__filterID(listBook, book)))
    
            this.setState({ [source]: newBookList }, () => {
                localStorage.setItem(source, JSON.stringify(newBookList));
                resolve(); // Resolve the promise when the state is updated
            });

        })
    }

    /**
     * Simple helper function to filter books with matching ID already existing in our state objects.
     * @param {*} listBook | one of the books we are iterating over
     * @param {*} book | book we are attempting to match.
     * @returns {Array} | Array with book matched filtered out.
     */
    __filterID = (listBook, book) => {
        return listBook.key !== book.key;
    }

    
    /**
     * Main function responisble for all book object interactions.
     * @param {*} book | book to take action on.
     * @param {*} target | target string to match with one of this.state's objects that helps determine where addition will take place.
     * @param {*} source | source string to match with one of this.state's objects that helps determine where removal will take place.
     */
    moveBook = (book, target, source) => {
        if (source !== null) {
          this.__removeBook(book, source).then(() => {
            if (target !== null) {
              this.__addBook(book, target);
            }
          });
        } else if (target !== null) {
          this.__addBook(book, target);
        }
    }

    render() {
        return (
            <>
                <BookShelf shelf={this.state.currentBooks} move={this.moveBook} shelfName={"Currently Reading"}/>
                <BookShelf shelf={this.state.toReadBooks} move={this.moveBook} shelfName={"To Read"}/>
                <BookShelf shelf={this.state.readBooks} move={this.moveBook} shelfName={"Read"}/>

                <SearchBook move={this.moveBook} />
            </>
        )
    }
}

export default Library;

/* <CurrentlyReading currentBooks={this.state.currentBooks} move={this.moveBook} /> */
