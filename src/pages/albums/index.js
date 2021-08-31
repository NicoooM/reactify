import { useState, useEffect, useContext } from "react";
import { TokenContext } from "../../api/SpotifyContext";
import capitalizeFirstLetter from "../../helper/capitalizeFirstLetter";
import getParamsUrl from "../../helper/getParamsUrl";
import ArtistAlbums from "../../components/ArtistAlbums";

const Albums = () => {
  const artistId = getParamsUrl("artistId");
  const [artistAlbums, setArtistAlbums] = useState([]);

  const { spotifyAPI, token } = useContext(TokenContext);

  useEffect(() => {
    spotifyAPI.setAccessToken(token);
  }, [token, spotifyAPI]);

  // Get artist albums data
  useEffect(() => {
    if (!artistAlbums) return setArtistAlbums([]);
    let cancelReq = false;
    spotifyAPI.getArtistAlbums(artistId, { limit: 18 }).then((res) => {
      if (cancelReq) return;
      setArtistAlbums(
        res.items.map((album) => {
          return {
            name: album.name,
            albumImage: album.images[1].url,
            id: album.id,
            totalTracks: album.total_tracks,
            type: capitalizeFirstLetter(album.album_type),
          };
        })
      );
    });
    return () => (cancelReq = true);
  }, [artistId, spotifyAPI, artistAlbums]);

  return (
    <div
      className="w-100 bg-dark p-4"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "auto",
        columnGap: "15px",
        rowGap: "15px",
      }}
    >
      {artistAlbums.map((album) => {
        return (
          <ArtistAlbums album={album} key={album.id} artistId={artistId} />
        );
      })}
    </div>
  );
};

export default Albums;
