import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { logIn } from "../utilities";
import {useOutletContext, useNavigate} from 'react-router-dom'

const LogInPage = () => {
  const [show, setShow] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser, user} = useOutletContext()
  const navigate = useNavigate()

  const logInOrReg = async (e) => {
    e.preventDefault();
    let response = await logIn(email, password, register);
    setUser(response)
  };

  useEffect(()=>{
    if (user){
        navigate('/')
    }
  },[user])

  return (
    <>
      <h1>{register ? "Register" : "Log In"}</h1>
      <Form onSubmit={(e) => logInOrReg(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Check me out"
            onChange={(e) => setShow(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="warning" onClick={() => setRegister(!register)}>
          {register ? "Already have an account" : "Don't have an account?"}
        </Button>
      </Form>
    </>
  );
};

export default LogInPage;
