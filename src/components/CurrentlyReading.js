import React from 'react';
import { Container, Row } from 'react-bootstrap';

class CurrentlyReading extends React.Component {

    state = JSON.parse(localStorage.getItem("currentBooks")) || {
        currentBooks: [],
    }

    render() {
        return (
            <>
            <Container>
                <Row>
                    <h3>Currently Reading:</h3>
                    <br></br>
                </Row>
            </Container>
            </>
        )
    }

}

export default CurrentlyReading;