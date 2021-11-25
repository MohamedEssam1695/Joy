import React from "react";
import { Navbar, Container} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom"
import NavBar from "./Home/NavBar";
import HeroSection from "./Home/HeroSection";
export default function Home() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Joy </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
             <Link to="/login" className="mx-5"> Login </Link>
             <Link to="/signup"> Sign Up </Link>
             <Link to="/contact"  className="mx-5"> Contact Us </Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <NavBar />
      <HeroSection/>

    </>
  );
}
