import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light py-3">
            <Container>
                <Row>
                    <Col className="text-center">
                        <Nav>
                            <Nav.Link href="https://www.facebook.com" target="_blank">
                                <i className="bi bi-facebook"></i> Facebook
                            </Nav.Link>
                            <Nav.Link href="https://wa.me/1234567890" target="_blank">
                                <i className="bi bi-whatsapp"></i> WhatsApp
                            </Nav.Link>
                            <Nav.Link href="https://www.instagram.com" target="_blank">
                                <i className="bi bi-instagram"></i> Instagram
                            </Nav.Link>
                            <Nav.Link href="mailto:contacto@example.com">
                                <i className="bi bi-envelope"></i> Contacto
                            </Nav.Link>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
