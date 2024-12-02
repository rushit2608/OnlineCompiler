import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import "../styles/Header.css";
import { useDispatch, useSelector } from 'react-redux';
import { LanguageActions } from "../Actions/LanguageAction";


function Header() {

    const dispatch = useDispatch();
    console.log("Before dispatch");

    const [selectedLanguage,SetselectedLanguage] = useState("C++")
    const OnClickHandler = (event) => {
        try{
            const data = event.target.id.toUpperCase()
            console.log(data)
            console.log("done")
            dispatch(LanguageActions(data))
            SetselectedLanguage(event.target.id)
            // console.log(type)
        }catch(error){
          console.log(error)
        }
      }

      useEffect(()=>{
        console.log("rushi")
        dispatch(LanguageActions("PYTHON3"))
      },[])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Nav.Link className="navbar-brand" href="#">
            Compiler Buddy
          </Nav.Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <Nav.Link className="nav-link active" href="#">

                  <span className="visually-hidden">(current)</span>
                </Nav.Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  C++
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    C++
                  </a>
                  <a className="dropdown-item" href="#">
                    C++ 14
                  </a>
                  <a className="dropdown-item" href="#" onClick={OnClickHandler}>
                    C++ 17
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    C++ 20
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <Nav.Link id = "Java" className="nav-link" href="#" onClick={OnClickHandler}>
                  Java
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link id = "Python3" className="nav-link" href="#" onClick={OnClickHandler}>
                  Python3
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link id = "C" className="nav-link" href="#" onClick={OnClickHandler}>
                  C
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link id = "javascript" className="nav-link" href="#" onClick={OnClickHandler}>
                  javascript
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link id = "Rust" className="nav-link" href="#" onClick={OnClickHandler}>
                  Rust
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link  id = "PHP" className="nav-link" href="#" onClick={OnClickHandler}>
                  PHP
                </Nav.Link>
              </li>
              <li className="nav-item">
                <a id = "Ruby" className="nav-link" href="#" onClick={OnClickHandler}>
                  Ruby
                </a>
              </li>
              
            </ul>
            <ul className="navbar-nav me-auto">
                <li>
                    <a className="nav-link" href='#'>
                    Contact Us
                    </a>
                </li>
                <li>
                    <a className="nav-link" href='#'>
                    About us
                    </a>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
