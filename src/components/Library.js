import React from 'react';
import CurrentlyReading from './CurrentlyReading';
import SearchBook from './SearchBook';


class Library extends React.Component {

    render() {
        return (
            <>
            <CurrentlyReading/>
            <SearchBook/>
            </>
        )
    }
}

export default Library;