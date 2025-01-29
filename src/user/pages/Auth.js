import React from "react";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

const Auth = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <div className="authentication">
      <Card>
        <h2>Login Required..</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            id="email"
            element="input"
            type="email"
            label="E-Mail"
            onInput={inputHandler}
            errorText="Enter valid Email Address"
            validators={[VALIDATOR_EMAIL()]}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            onInput={inputHandler}
            errorText="Enter valid password at least 8 characters"
            validators={[VALIDATOR_MINLENGTH(8)]}
          />
          <Button type="submit" inverse disabled={!formState.isValid}>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Auth;
