import React, { useContext, useState } from "react";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
    } else {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/signin", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Something went wrong");
      }
    }
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

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <div className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>
  );
};

export default Auth;
