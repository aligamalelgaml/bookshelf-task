import React from 'react';
import { Container, Dropdown, Card, Row, Col } from 'react-bootstrap';

class Read extends React.Component {

    render() {
        return (
            <>
                <Container className="mb-4">
                    <Row>
                        <h3 className='mt-3'>To Read:</h3>
                        <hr/>

                        {this.props.readBooks.map(book => (
                            <Col xs={3} key={book.key} className='mt-4'>
                                <Card className='h-100'>
                                    <Card.Img variant="top" src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} />
                                    
                                    <Card.Title className='mt-3 ms-3'><span className='fs-5 fw-bold'>{book.title}</span></Card.Title>

                                    <Card.Body>
                                        <Card.Text>
                                            <span>
                                                {book.author_name ? (
                                                    book.author_name.map((author, index) => {
                                                        return <span key={index}>{author},</span>;
                                                    })
                                                ) : (
                                                    <span>N/A</span>
                                                )}
                                            </span>
                                        </Card.Text>
                                    </Card.Body>

                                    <Card.Footer>
                                    <Dropdown drop='down'>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Dropdown Button
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item disabled="true" href="#">Move</Dropdown.Item>
                                            <Dropdown.Item onClick={this.props.move.bind(this, book, "currentBooks", "readBooks")} href="#">Current Books</Dropdown.Item>
                                            <Dropdown.Item onClick={this.props.move.bind(this, book, "toReadBooks", "readBooks")} href="#">Want To Read Books</Dropdown.Item>
                                            <Dropdown.Item onClick={this.props.move.bind(this, book, null, "readBooks")} href="#">Remove</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>                                    
                                    </Card.Footer>

                                </Card>
                            </Col>
                        ))}

                    </Row>
                </Container>
            </>
        )
    }

}

export default Read;