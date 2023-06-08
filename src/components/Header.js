import React from 'react';
import { Container, Row } from 'react-bootstrap';



class Header extends React.Component {

  render() {
    return (
      <header className='header'>
      <Container>
        <Row className='text-center p-4'>
          <h1 className='fw-bold text-white'>MyReads</h1>
        </Row>
      </Container>
      </header>
    );
  }
}


export default Header;

