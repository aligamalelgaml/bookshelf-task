import React from 'react';
import CurrentlyReading from './CurrentlyReading';
import ToRead from './ToRead';
import Read from './Read';
import SearchBook from './SearchBook';


class Library extends React.Component {
    
    state = {currentBooks: localStorage.getItem("currentBooks") ? JSON.parse(localStorage.getItem("currentBooks")) : [],
             toReadBooks: localStorage.getItem("toReadBooks") ? JSON.parse(localStorage.getItem("toReadBooks")) : [],
             readBooks: localStorage.getItem("readBooks") ? JSON.parse(localStorage.getItem("readBooks")) : [] };

    __addBook(book, target) {
        console.log("Adding: " + book.title + " to " + target)
        const bookList = this.state[target]; 
        bookList.push(book);
        this.setState({[target]: bookList})
        localStorage.setItem(target, JSON.stringify(bookList))
    }

    __removeBook(book, source) {
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
        if (source !== null) this.__removeBook(book, source);
        if (target !== null) this.__addBook(book, target);
    }

    render() {
        return (
            <>
            <CurrentlyReading currentBooks={this.state.currentBooks} move={this.moveBook}/>
            <ToRead toReadBooks={this.state.toReadBooks} move={this.moveBook}/>
            <Read readBooks={this.state.readBooks} move={this.moveBook}/>
            <SearchBook addBookToCurrent={this.moveBook}/>
            </>
        )
    }
}

export default Library;