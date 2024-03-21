import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import InputGroup from "react-bootstrap/InputGroup";
import { validPassword } from "./Rejex";
import { login, signup } from "../../actions/userActions";

function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");

  const [show, changeshow] = useState("fa fa-eye");

  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, pass1));
  };
  const showpassword = () => {
    var x = document.getElementById("pass1");

    if (x.type === "password") {
      x.type = "text";

      changeshow("fa fa-eye-slash");
    }
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Card>
                <Card.Header
                  as="h3"
                  className="text-center bg-black text-light"
                >
                  Login
                </Card.Header>
                <Card.Body>
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

                    <Form.Group className="mb-3">
                      <Form.Label>
                        <span>
                          <i className={show}></i>
                        </span>
                        Password
                      </Form.Label>

                      <InputGroup className="mb-3">
                        <InputGroup.Checkbox onClick={showpassword} />{" "}
                        <Form.Control
                          placeholder="Enter your password"
                          required
                          type="password"
                          id="pass1"
                          value={pass1}
                          onChange={(e) => setPass1(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>

                    <br />
                    <div className="d-grid gap-2">
                      <Button className="btn btn-md btn-success" type="submit">
                        Login
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
            )}
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
