import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

class ToRead extends React.Component {

    render() {
        return (
            <>
                <Container className="mb-4">
                    <Row>
                        <h3 className='mt-3'>To Read:</h3>
                        <hr/>

                        {this.props.toReadBooks.map(book => (
                            <Col xs={3} key={book.key} className='mt-4'>
                                <Card className='h-100'>
                                    <Card.Img variant="top" src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} />
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
                                        <span>button placeholder</span>
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

export default ToRead;