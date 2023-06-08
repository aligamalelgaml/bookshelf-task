import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

// TODO: Debounce bookSearch method, format results into cards, save selected books to localstorage.


class SearchBook extends React.Component {

    state = { showModal: false, results: [], loading: false };

    fetchBooks(title) {
        axios.get(`https://openlibrary.org/search.json?q=${title}`).then(results => this.setState({ results: results.data.docs })).finally(() => this.setState({ loading: false }));;
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
        }));
    };


    bookSearch = (e) => {
        this.setState({loading: true});
        this.fetchBooks(e.target.value);
    }


    render() {
        console.log(this.state.results);
        return (
            <>
                <footer className='footer text-end pe-4'>
                    <Button className='rounded-circle fs-4' variant="primary" onClick={this.toggleModal}>
                        +
                    </Button>
                </footer>

                <Modal show={this.state.showModal} onHide={this.toggleModal} fullscreen>
                    <Modal.Header closeButton>
                        <Modal.Title>Search Books</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" onChange={this.bookSearch} />

                        <div className='bookResults text-center'>
                            {this.state.loading ? (
                                <p>Loading...</p>
                            ) : this.state.results && this.state.results.length > 0 ? (
                                this.state.results.map(book => (
                                    <div key={book.key}>
                                        <h4>{book.title}</h4>
                                        <p>{book.author_name}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No results found.</p>
                            )}
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default SearchBook;