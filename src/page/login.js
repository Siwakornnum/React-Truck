import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import "./login.css";

// export default Login;

export default function Login({ Login, error }) {
  const [details, setdetails] = useState({ username: "", password: "" });

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // function validateForm()
  // {
  //     return username.length > 0 && password.length > 0;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    Login(details);
  };

  // function handleSubmit(event)
  // {
  //     event.preventDefault();
  // }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <h1>Truck Rent</h1>
        <h2>Admin</h2>
        <Form.Group size="lg">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            id="username"
            value={details.username}
            onChange={(e) =>
              setdetails({ ...details, username: e.target.value })
            }
          />
        </Form.Group>
        <br />
        <Form.Group size="lg" className="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="form-control1"
            type="password"
            id="password"
            value={details.password}
            onChange={(e) =>
              setdetails({ ...details, password: e.target.value })
            }
          />
        </Form.Group>
        {/* <Button className="buttomLogin" block size="lg" href="" >
                    Login
                </Button> */}

        <input type="submit" value="LOGIN" />
      </Form>
    </div>
  );
}
