import React from "react"
import {Nav, Navbar, Container, Button} from "react-bootstrap"
import { useAuth } from "../context/AuthContext";

export default function AppNav() {
    const { currentUser, logout} = useAuth()

    return (
        <Navbar expand="lg" style={{ backgroundColor: "#add8e6" }}>
        <Container>
            <Navbar.Brand href="/">Receiptify</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {currentUser ? (
                        <Button variant="link" href="/login" onClick={logout}
                        style={{textDecoration:"none", color:"black"}}>Log Out</Button>
                        ) : (
                        <Nav.Link href="/login">Log In</Nav.Link>
                    )}
                    <Nav.Link href="/expenses">My Expenses</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}