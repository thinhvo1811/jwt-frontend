import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Container, NavDropdown, Navbar, Nav } from 'react-bootstrap';
import './NavHeader.scss';
import { UserContext } from '../../context/UserContext';
import logo from '../../logo.svg';

const NavHeader = (props) => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    if ((user && user.isAuthenticated) || location.pathname === '/') {
        return (
            <>
                <div className="nav-header">
                    <Navbar bg="header" expand="lg" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="/">
                                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/" exact>
                                        Home
                                    </NavLink>
                                    <NavLink className="nav-link" to="/users">
                                        Users
                                    </NavLink>
                                    <NavLink className="nav-link" to="/projects">
                                        Projects
                                    </NavLink>
                                    <NavLink className="nav-link" to="/about">
                                        About
                                    </NavLink>
                                </Nav>
                                <Nav>
                                    <Nav.Item className="nav-link">Welcome Vincent!</Nav.Item>
                                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    } else {
        return <></>;
    }
};

export default NavHeader;
