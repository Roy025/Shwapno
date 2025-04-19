import React from "react";
import "../index.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CiBarcode } from "react-icons/ci";

export const NavBar = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("email");
  const logOut = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("email");
    navigate("/");
    console.log("Logged Out");
  };

  return (
    <Navbar collapseOnSelect bg="color" variant="dark" sticky="top" expand="sm">
      <Container className="navbar-con">
        <Navbar.Brand href="/">
          <div className="name">
            <CiBarcode className="logo" />
            <h2 className="mb-0 mx-2"> Kanban Board</h2>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto d-flex flex-row gap-3 align-items-center">
            {currentUser ? (
              <Nav.Link
                as={Link}
                to="/"
                onClick={logOut}
                className="text-light"
              >
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/api/users/" className="text-light">
                  SignUp
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/api/users/login"
                  className="highlight-btn text-light"
                >
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
