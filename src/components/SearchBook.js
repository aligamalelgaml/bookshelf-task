import React from 'react';
import { Button, Dropdown, Modal, Card, Row, Col, Form, InputGroup } from 'react-bootstrap';
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
        this.setState({ loading: true });
        clearTimeout(this.timeout);

        const debouncedSearch = this.__debounce(this.fetchBooks);
        debouncedSearch(e.target.value);
    }

    __debounce(callback, delay = 2000) {
        return (...args) => {
            this.timeout = setTimeout(() => { callback(...args) }, delay);
        }
    }

    render() {
        return (
            <>
                <footer className='footer'>
                    <span className='footer-content'>
                        <Button className='circle fs-1' variant="primary" onClick={this.toggleModal}>
                            +
                        </Button>
                    </span>
                </footer>

                <Modal show={this.state.showModal} onHide={this.toggleModal} fullscreen>
                    <Modal.Header>
                        <InputGroup>
                            <InputGroup.Text className='clickable'><span className='gg-chevron-left' onClick={this.toggleModal}/></InputGroup.Text>
                            <Form.Control placeholder="Enter your search here.." onChange={this.debouncedBookSearch}/>
                            <InputGroup.Text><span className='gg-search'/></InputGroup.Text>
                        </InputGroup>
                    </Modal.Header>

                    <Modal.Body>

                        <Row className='mt-4'>
                            {this.state.loading ? (
                                <span className='loader'></span>
                            ) : this.state.results && this.state.results.length > 0 ? (
                                this.state.results.map(book => (
                                    <Col xs={2} key={book.key} className='mt-5'>
                                        <Card className='h-100'>
                                            <Card.Img variant="top" src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} />
                                            <Card.Title className='mt-3 ms-3'><span className='fs-5 fw-bold'>{book.title}</span></Card.Title>

                                            <Card.Body>
                                                <Card.Text>
                                                    <span>
                                                        {book.author_name ? (
                                                            book.author_name.map((author, index) => (
                                                                <React.Fragment key={index}>
                                                                    <span className='text-grey fw-bold'>{author}</span>
                                                                    {index !== book.author_name.length - 1 && <span className='text-grey'>, </span>}
                                                                </React.Fragment>
                                                            ))
                                                        ) : (
                                                            <span>N/A</span>
                                                        )}
                                                    </span>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>

                                                <Dropdown drop='down'>
                                                    <Dropdown.Toggle className='circle-small fs-5' variant="success" id="dropdown-basic" />

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item disabled="true" href="#">Move</Dropdown.Item>
                                                        <Dropdown.Item onClick={this.props.move.bind(this, book, "toReadBooks", null)} href="#">Want To Read Books</Dropdown.Item>
                                                        <Dropdown.Item onClick={this.props.move.bind(this, book, "readBooks", null)} href="#">Read Books</Dropdown.Item>
                                                        <Dropdown.Item onClick={this.props.move.bind(this, book, "currentBooks", null)} href="#">Currently Reading</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <span className='text-center mt-5'>No results found or no input yet.</span>
                            )}
                        </Row>


                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default SearchBook;