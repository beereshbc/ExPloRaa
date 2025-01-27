import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

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
const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedCity = DUMMY_PLACES.filter((places) => places.creator === userId);
  return <PlaceList items={loadedCity} />;
};

export default UserPlaces;
