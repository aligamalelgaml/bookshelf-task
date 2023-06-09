import React from 'react';
import { Button, Modal, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class SearchBook extends React.Component {

    state = { showModal: false, results: [], loading: false };

    fetchBooks = (title) => {
        console.log("Fetching data from API..");
        axios.get(`https://openlibrary.org/search.json?q=${title}`).then(results => this.setState({ results: results.data.docs, loading: false }));
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
        }));
    };

    debouncedBookSearch = (e) => {
        this.setState({loading: true});
        clearTimeout(this.timeout);

        const debouncedSearch = this.__debounce(this.fetchBooks);
        debouncedSearch(e.target.value);
    }

    __debounce(callback, delay = 2000) {
        return (...args) => {
            this.timeout = setTimeout(() => {callback(...args)}, delay);
        }
    }

    render() {
        console.log(this.state.results);
        return (
            <>
                <footer className='footer text-end pe-4'>
                    <div className='footer-content'>
                        <Button className='circle fs-1' variant="primary" onClick={this.toggleModal}>
                            +
                        </Button>
                    </div>
                </footer>

                <Modal show={this.state.showModal} onHide={this.toggleModal} fullscreen>
                    <Modal.Header closeButton>
                        <Modal.Title>Search Books</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input type="text" onChange={this.debouncedBookSearch} />

                        <Row className='mt-4'>
                                {this.state.loading ? (
                                    <span>Loading...</span>
                                ) : this.state.results && this.state.results.length > 0 ? (
                                    this.state.results.map(book => (
                                        <Col xs={2} key={book.key} className='mt-5'>
                                            <Card className='h-100'>
                                                <Card.Img variant="top" src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}/>
                                                <Card.Body>
                                                    <Card.Text>
                                                        <span className='fs-5 fw-bold'>{book.title}</span>

                                                        <div>
                                                            {book.author_name ? (
                                                                book.author_name.map((author, index) => {
                                                                    return <span key={index}>{author},</span>;
                                                                })
                                                            ) : (
                                                                <span>N/A</span>
                                                            )}
                                                        </div>
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <Button key={book.key} className='rounded-circle' variant="primary" onClick={this.props.addBookToCurrent.bind(this, book)}>
                                                        +
                                                    </Button>
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    ))
                                ) : (
                                    <span>No results found.</span>
                                )}
                        </Row>


                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default SearchBook;