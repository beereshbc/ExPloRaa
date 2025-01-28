import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";
import "./PlaceForm.css";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inpuId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inpuId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: "INPUT_CHANGE",
        isValid: isValid,
        value: value,
        inpuId: id,
      });
    },
    [dispatch]
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        lable="Title"
        type="text"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Enter a valid Title"
      />
      <Input
        id="description"
        lable="Description"
        element="textarea"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Enter Atleast 5 Words to continue"
        onInput={inputHandler}
      />
      <Input
        id="address"
        lable="address"
        type="text"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Enter a valid Address"
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
