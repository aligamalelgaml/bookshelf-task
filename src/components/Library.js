import React from 'react';
import CurrentlyReading from './CurrentlyReading';
import ToRead from './ToRead';
import Read from './Read';
import SearchBook from './SearchBook';


class Library extends React.Component {
    
    state = {currentBooks: localStorage.getItem("currentBooks") ? JSON.parse(localStorage.getItem("currentBooks")) : [],
             toReadBooks: localStorage.getItem("toReadBooks") ? JSON.parse(localStorage.getItem("toReadBooks")) : [],
             readBooks: localStorage.getItem("readBooks") ? JSON.parse(localStorage.getItem("readBooks")) : [] };

    addBookToCurrent = (book) => {
        console.log("Search adding current book: " + book.title)
        const bookList = this.state.currentBooks; 
        bookList.push(book);
        this.setState({currentBooks: bookList})
        localStorage.setItem("currentBooks", JSON.stringify(bookList))
    }

    addBook(book, target) {
        console.log("Adding to be read book: " + book.title + " to " + target)
        const bookList = this.state[target]; 
        bookList.push(book);
        this.setState({[target]: bookList})
        localStorage.setItem(target, JSON.stringify(bookList))
    }

    removeBook(book, source) {
        console.log("Removing: " + book.title + " from " + source)
        const bookList = this.state[source]; 

        const newBookList = bookList.filter(listBook => (this.__filterID(listBook, book)))

        this.setState({[source]: newBookList})
        localStorage.setItem(source, JSON.stringify(newBookList))
    }

    __filterID = (listBook, book) => {
        return listBook.key !== book.key; 
    }

    moveBook = (book, target, source) => {
        if (source !== null) this.removeBook(book, source);
        if (target !== null) this.addBook(book, target);
    }

    render() {
        return (
            <>
            <CurrentlyReading currentBooks={this.state.currentBooks} move={this.moveBook}/>
            <ToRead toReadBooks={this.state.toReadBooks} move={this.moveBook}/>
            <Read readBooks={this.state.readBooks} move={this.moveBook}/>
            <SearchBook addBookToCurrent={this.addBookToCurrent}/>
            </>
        )
    }
}

export default Library;