import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
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
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  if (!identifiedPlace) {
    return <h2>Place couldn't found</h2>;
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        type="text"
        labal="Title"
        element="input"
        validator={[VALIDATOR_REQUIRE()]}
        value={identifiedPlace.title}
        isValid={true}
        onInput={() => {}}
        errorText="Enter a valid Title"
      />
      <Input
        id="description"
        labal="Description"
        element="textarea"
        validator={[VALIDATOR_MINLENGTH()]}
        value={identifiedPlace.description}
        isValid={true}
        onInput={() => {}}
        errorText="Enter a valid Description (At least 5 charactors)"
      />
      <Button type="submit" disabled={false}>
        Update place
      </Button>
    </form>
  );
};

export default UpdatePlace;
