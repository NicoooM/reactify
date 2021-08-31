import React, { useContext, useState, useEffect } from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { TokenContext } from "../../api/SpotifyContext";
import SearchResult from "../SearchResult";
import styles from "./Search.module.scss";

const Search = () => {
  const { spotifyAPI, token } = useContext(TokenContext);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    spotifyAPI.setAccessToken(token);
  }, [token, spotifyAPI]);

  useEffect(() => {
    if (!searchValue) return setSearchResults([]);
    let cancelReq = false;
    spotifyAPI.searchTracks(searchValue, { limit: 6 }).then((res) => {
      if (cancelReq) return;
      setSearchResults(
        res.tracks.items.map((track) => {
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumImg: track.album.images[1].url,
            duration: track.duration_ms,
            artistId: track.artists[0].id,
          };
        })
      );
    });
    return () => (cancelReq = true);
  }, [searchValue, spotifyAPI]);

  return (
    <>
      <Form
        className="d-flex py-3 justify-content-center align-items-center ouline-light"
        onSubmit={(e) => e.preventDefault()}
      >
        <InputGroup className="w-auto">
          <div className="d-flex bg-light rounded align-items-center content-center">
            <SearchOutlinedIcon className="mx-2 bg-light" />
            <FormControl
              className={[styles.form_control, "bg-transparent border-0"].join(
                " "
              )}
              aria-label="Artist or Song name"
              style={{ maxWidth: "250px", boxShadow: "none" }}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for a track..."
            />
          </div>
        </InputGroup>
      </Form>
      <div className="d-flex flex-wrap justify-content-evenly">
        {searchResults.map((result) => (
          <SearchResult result={result} key={result.uri} />
        ))}
      </div>
    </>
  );
};

export default Search;
