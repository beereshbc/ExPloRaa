import React from "react";
import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        lable="Title"
        type="text"
        element="input"
        validators={[]}
        errorText="Enter a valid Title"
      />
    </form>
  );
};

export default NewPlace;
