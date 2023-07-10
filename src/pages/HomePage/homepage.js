import React, { useEffect, useState } from "react";
import { xor } from "lodash";
import axios from "axios";
import Header from "../../components/Header/header";
import Forward from "../../components/Button/Forward";
import Previous from "../../components/Button/Previous";
import BreedSelect from "../../components/Select/Breed/BreedSelect";
import Filters from "../../components/Filters/Filters";
import MatchedDog from "../../components/Modals/MatchedDog/MatchedDog";
import LoginSnackbar from "../../components/Snackbar/Login/Login";
import Dogs from "../../components/Custom/Dogs/Container/Dogs";

const HomePage = (props) => {
  const [data, setData] = useState({
    prevLink: null,
    currentLink: "/dogs/search",
    nextLink: null,
    resultIds: [],
  });
  const [breeds, setBreeds] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [dogs, setDogs] = useState(null);
  const [matchedDog, setMatchedDog] = useState(null);
  const [matchedDogModalOpen, setMatchedDogModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(true);
  const { appState, setAppState } = props;

  const handleNext = () => {
    setData((prevData) => ({
      ...prevData,
      currentLink: prevData.nextLink,
    }));
  };

  const handlePrev = () => {
    setData((prevData) => ({
      ...prevData,
      currentLink: prevData.prevLink,
    }));
  };

  const handleFavourites = (id) => {
    const newFavourites = xor(favourites, [id]);
    setFavourites(newFavourites);
  };

  //Fetch resultIds when selected breeds or sort order changes
  useEffect(() => {
    const fetchDogsData = async () => {
      const queryParameters = new URLSearchParams();
      breeds.forEach((breed) => queryParameters.append("breeds", breed));
      queryParameters.append("size", 100);
      queryParameters.append(
        "sort",
        `breed:${sortOrder === true ? "asc" : "desc"}`
      );
      const url = `https://frontend-take-home-service.fetch.com/dogs/search?${queryParameters}`;
      try {
        const res = await axios.get(url, {
          withCredentials: true,
        });
        setData((prevData) => ({
          ...prevData,
          prevLink: res.data.prev ? res.data.prev : "",
          nextLink: res.data.next ? res.data.next : "",
          resultIds: res.data.resultIds,
        }));
      } catch (err) {
        setAppState((prevAppState) => ({
          ...prevAppState,
          error: true,
          message: `Tried to GET ${url} and an error occured.`,
        }));
        console.error(err);
      }
    };
    fetchDogsData();
  }, [breeds, sortOrder]);

  // Fetch resultIds when the current link changes, user goes previous or forward
  useEffect(() => {
    const fetchDogsData = async () => {
      const url = `https://frontend-take-home-service.fetch.com${data.currentLink}`;
      try {
        const res = await axios.get(url, {
          withCredentials: true,
        });
        setData((prevData) => ({
          ...prevData,
          prevLink: res.data.prev ? res.data.prev : "",
          nextLink: res.data.next ? res.data.next : "",
          resultIds: res.data.resultIds,
        }));
      } catch (err) {
        setAppState((prevAppState) => ({
          ...prevAppState,
          error: true,
          message: `Tried to GET ${url} and an error occured.`,
        }));
        console.error(err);
      }
    };
    fetchDogsData();
  }, [data.currentLink]);

  // Fetch dogs when resultIds change.
  useEffect(() => {
    const fetchDogs = async () => {
      const url = "https://frontend-take-home-service.fetch.com/dogs";
      try {
        const res = await axios.post(url, data.resultIds.slice(0, 100), {
          withCredentials: true,
        });
        res;
        setDogs(res.data);
      } catch (err) {
        setAppState((prevAppState) => ({
          ...prevAppState,
          error: true,
          message: `Tried to POST ${url} and an error occured.`,
        }));
        console.error(err);
      }
    };
    fetchDogs();
  }, [data.resultIds, breeds]);

  return (
    <>
      <Header setAppState={setAppState} />
      <BreedSelect
        breeds={breeds}
        BreedSetter={setBreeds}
        setAppState={setAppState}
      ></BreedSelect>
      <Filters
        breeds={breeds}
        sortOrder={sortOrder}
        favourites={favourites}
        setSortOrder={setSortOrder}
        setMatchedDog={setMatchedDog}
        setMatchedDogModalOpen={setMatchedDogModalOpen}
        setFavourites={setFavourites}
        setAppState={setAppState}
      ></Filters>
      <Dogs
        dogs={dogs}
        favourites={favourites}
        favouritesHandler={handleFavourites}
      ></Dogs>
      {data.prevLink && <Previous handlePrev={handlePrev}></Previous>}
      {data.nextLink && <Forward handleNext={handleNext}></Forward>}
      <LoginSnackbar
        snackbarOpen={appState.firstVisit}
        setAppState={setAppState}
      ></LoginSnackbar>
      {matchedDog && (
        <MatchedDog
          open={matchedDogModalOpen}
          dog={matchedDog}
          setOpen={setMatchedDogModalOpen}
        ></MatchedDog>
      )}
    </>
  );
};
export default HomePage;
