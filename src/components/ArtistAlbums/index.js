import { Link } from "react-router-dom";

const ArtistAlbums = ({ album }) => {
  const tracksURL = `/album?albumId=${album.id}`;

  return (
    <Link
      to={tracksURL}
      className="p-2 rounded cursor-pointer text-reset text-decoration-none"
      style={{
        backgroundColor: "#3E464D",
        cursor: "pointer",
        height: "fit-content",
      }}
    >
      <img
        src={album.albumImage}
        alt=""
        style={{ width: "200px" }}
        className="rounded"
      />
      <div className="p-2">
        <p
          className="text-light m-0"
          style={{
            textOverflow: "ellipsis",
            width: "180px",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {album.name}
        </p>
        <p className="text-light m-0">
          {album.type} - {album.totalTracks}{" "}
          {album.totalTracks > 1 ? "tracks" : "track"}
        </p>
      </div>
    </Link>
  );
};

export default ArtistAlbums;
