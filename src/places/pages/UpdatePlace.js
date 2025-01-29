import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    creator: "u1",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/The_elegant_stone_chariot.jpg",
    title: "ಹಂಪಿ",
    description:
      "Hampi, known as Kishkindha in the Ramayana age is a town in the Vijayanagara district in the Indian state of Karnataka. Located along the Tungabhadra River in the east and center part of the state, Hampi is near the city of Hospet.",
    address: "Hampi ಹಂಪಿ Karnataka 583239 India",
    location: {
      lat: 15.23584,
      lng: 76.620629,
    },
  },
  {
    id: "p2",
    creator: "u2",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/4b/Hampi_virupaksha_temple.jpg",
    title: "ಹಂಪಿ",
    description:
      "Hampi, known as Kishkindha in the Ramayana age is a town in the Vijayanagara district in the Indian state of Karnataka. Located along the Tungabhadra River in the east and center part of the state, Hampi is near the city of Hospet.",
    address: "Hampi ಹಂಪಿ Karnataka 583239 India",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
