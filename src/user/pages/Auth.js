import React, { useContext, useState } from "react";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const auth = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
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
    auth.login();
  };

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <div className="authentication">
      <Card>
        <h2>{isLogin ? "Login" : "Sign-Up"} Required..</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLogin && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              onInput={inputHandler}
              errorText="Enter Valid Name"
              validators={[VALIDATOR_REQUIRE()]}
            />
          )}
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
            {isLogin ? "Login" : "Sign-Up"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLogin ? "Sign-Up" : "Login"}
        </Button>
      </Card>
    </div>
  );
};

export default Auth;
