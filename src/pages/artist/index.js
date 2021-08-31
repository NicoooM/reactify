import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../../api/SpotifyContext";
import ArtistTopTracks from "../../components/ArtistTopTracks";
import ArtistAlbums from "../../components/ArtistAlbums";
import numberWithSpaces from "../../helper/numberWithSpaces";
import capitalizeFirstLetter from "../../helper/capitalizeFirstLetter";
import getParamsUrl from "../../helper/getParamsUrl";
import { Link } from "react-router-dom";

const Artist = () => {
  const artistId = getParamsUrl("artistId");
  const albumURL = `/albums?artistId=${artistId}`;

  const { spotifyAPI, token } = useContext(TokenContext);
  const [artistData, setArtistData] = useState({});
  const [artistTopTracksData, setArtistTopTracksData] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    spotifyAPI.setAccessToken(token);
  }, [token, spotifyAPI]);

  // Get artist data
  useEffect(() => {
    let cancelReq = false;
    spotifyAPI.getArtist(artistId).then((artist) => {
      if (cancelReq) return;
      setArtistData({
        name: artist.name,
        image: artist.images[1].url,
        uri: artist.uri,
        followers: numberWithSpaces(artist.followers.total),
      });
    });
    return () => (cancelReq = true);
  }, [artistId, spotifyAPI]);

  // Get artist top tracks data
  useEffect(() => {
    if (!artistTopTracksData) return setArtistTopTracksData([]);
    let cancelReq = false;
    spotifyAPI.getArtistTopTracks(artistId, "FR", { limit: 5 }).then((res) => {
      if (cancelReq) return;
      setArtistTopTracksData(
        res.tracks.map((track) => {
          return {
            name: track.name,
            albumImage: track.album.images[2].url,
            id: track.id,
            duration: track.duration_ms,
          };
        })
      );
    });
    return () => (cancelReq = true);
  }, [artistId, spotifyAPI, artistTopTracksData]);

  // Get artist albums data
  useEffect(() => {
    if (!artistAlbums) return setArtistAlbums([]);
    let cancelReq = false;
    spotifyAPI.getArtistAlbums(artistId, { limit: 5 }).then((res) => {
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
    <div className="ww-100 bg-dark p-5">
      <div className="d-flex">
        <img
          src={artistData.image}
          alt=""
          className="rounded-circle"
          style={{ width: "250px", height: "250px" }}
        />
        <div className="w-100 p-5">
          <h1 className="text-light">{artistData.name}</h1>
          <p className="text-light">{artistData.followers} Followers</p>
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-light">Top tracks</h2>
        {artistTopTracksData.map((trackData, index) => {
          return (
            <ArtistTopTracks
              data={trackData}
              key={trackData.id}
              index={index}
              showMore={showMore}
            />
          );
        })}
        <button
          className="p-0 border-0 bg-transparent text-light"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore === false ? "Show more" : "Show less"}
        </button>
      </div>
      <div>
        <div className="d-flex justify-content-between">
          <h2 className="text-light">Albums</h2>
          <Link to={albumURL} className="text-decoration-none text-light">
            See all
          </Link>
        </div>
        <div className="d-flex align-items-center justify-content-between my-4">
          {artistAlbums.map((album) => {
            return (
              <ArtistAlbums album={album} key={album.id} artistId={artistId} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Artist;
