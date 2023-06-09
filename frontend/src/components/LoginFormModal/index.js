import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const DemoUser = e => {
    e.preventDefault();
    dispatch(sessionActions.login({
      credential: 'demo@user.io',
      password: 'password'
    }))
    closeModal();
    history.push('/');
  }

  return (
    <div className="loginModalWrapper">
      <h1 className="loginModalHead">Log In</h1>
      {errors.credential && (
          <p className="loginErr">{errors.credential}</p>
        )}
      <form  className="loginForm" onSubmit={handleSubmit}>
        <label>
          <input
          placeholder="Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {!(credential.length < 4 || password.length < 6) ?
        <button className="loginModalButton" type="submit">Log In</button> : <button className="disabledLoginModalButton" disabled={true}>Log In</button>
        }
        <div className="demo"
          onClick={DemoUser}
          >
            Demo User
          </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
