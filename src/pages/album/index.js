import { useState, useEffect, useContext } from "react";
import { TokenContext } from "../../api/SpotifyContext";
import Tracks from "../../components/Tracks";
import getParamsUrl from "../../helper/getParamsUrl";

const Album = () => {
  const albumId = getParamsUrl("albumId");
  const [tracks, setTracks] = useState([]);

  const { spotifyAPI, token } = useContext(TokenContext);

  useEffect(() => {
    spotifyAPI.setAccessToken(token);
  }, [token, spotifyAPI]);

  // Get tracks album data
  useEffect(() => {
    if (!tracks) return setTracks([]);
    let cancelReq = false;
    spotifyAPI.getAlbumTracks(albumId).then((res) => {
      if (cancelReq) return;
      setTracks(
        res.items.map((track) => {
          return {
            name: track.name,
            id: track.id,
            duration: track.duration_ms,
            artists: track.artists,
          };
        })
      );
    });
    return () => (cancelReq = true);
  }, [tracks, albumId, spotifyAPI]);

  return (
    <div className="bg-dark" style={{ minHeight: "100vh" }}>
      <div className="d-flex justify-content-between mb-5 pt-5">
        <div className="ms-5">
          <h2 className="text-light">Title / Singer(s)</h2>
        </div>
        <div className="me-5">
          <h2 className="text-light">Duration</h2>
        </div>
      </div>
      {tracks.map((track) => {
        return <Tracks key={track.id} data={track} />;
      })}
    </div>
  );
};

export default Album;
