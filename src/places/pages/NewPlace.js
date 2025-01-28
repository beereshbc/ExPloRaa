import React from "react";
import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        lable="Title"
        type="text"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid Title"
      />
    </form>
  );
};

export default NewPlace;
