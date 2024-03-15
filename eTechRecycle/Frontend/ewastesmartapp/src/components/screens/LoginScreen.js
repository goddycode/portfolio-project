import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import InputGroup from "react-bootstrap/InputGroup";
import { validPassword } from "./Rejex";
import { login } from "../../actions/userActions";

function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  //const redirect = '/'
  const location = useLocation();
  //console.log(location)
  const redirect = location.search ? location.search.split("=")[1] : "/";
  //console.log(redirect)
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  dispatch(login(email, pass1));

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header as="h3" className="text-center bg-black text-light">
                Login
              </Card.Header>
              <Card.Body>
                {message && <Message variant="danger">{message}</Message>}

                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>
                      <span>
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                      </span>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="pass1">
                    <Form.Label>
                      <span>
                        <i class=""></i>
                      </span>
                      Password
                    </Form.Label>

                    <Form.Control
                      placeholder="Enter your password"
                      required
                      type="password"
                      id="pass1"
                      value={pass1}
                      onChange={(e) => setPass1(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button className="btn btn-md btn-success" type="submit">
                      {" "}
                      Login{" "}
                    </Button>
                  </div>
                </Form>
                <Row className="py-3">
                  <Col>
                    New User?
                    <Link to="/signup">Signup</Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
