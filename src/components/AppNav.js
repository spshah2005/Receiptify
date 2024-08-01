import React from "react"
import {Nav, Navbar, Container} from "react-bootstrap"

export default function AppNav() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Receiptify</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/signup">Sign Up/ Log In</Nav.Link>
                        <Nav.Link href="/expenses">My Expenses</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}