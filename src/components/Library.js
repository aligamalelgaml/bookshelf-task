import React from 'react';
import CurrentlyReading from './CurrentlyReading';
import ToRead from './ToRead';
import SearchBook from './SearchBook';


class Library extends React.Component {
    state = {currentBooks: localStorage.getItem("currentBooks") ? JSON.parse(localStorage.getItem("currentBooks")) : [],
             toReadBooks: localStorage.getItem("toReadBooks") ? JSON.parse(localStorage.getItem("toReadBooks")) : [],
             readBooks: localStorage.getItem("readBooks") ? JSON.parse(localStorage.getItem("readBooks")) : [] };

    addBookToCurrent = (book) => {
        console.log("Adding.. + " + book.title)
        const bookList = this.state.currentBooks; 
        bookList.push(book);
        this.setState({currentBooks: bookList})
        localStorage.setItem("currentBooks", JSON.stringify(bookList))
    }

    render() {
        return (
            <>
            <CurrentlyReading currentBooks={this.state.currentBooks}/>
            <ToRead toReadBooks={this.state.toReadBooks}></ToRead>
            <SearchBook addBookToCurrent={this.addBookToCurrent}/>
            </>
        )
    }
}

export default Library;