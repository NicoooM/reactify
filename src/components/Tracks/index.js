import { Link } from "react-router-dom";
import msConverter from "../../helper/msConverter";

const Tracks = ({ data }) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="ms-5 mb-4">
        <h2 className="text-light fs-4 fw-normal m-0">{data.name}</h2>
        <div>
          {data.artists.map((artist) => {
            const artistURL = `/artist?artistId=${artist.id}`;
            return (
              <p className="d-inline text-light" key={artist.id}>
                <Link to={artistURL} className="text-light">
                  {artist.name}
                </Link>{" "}
              </p>
            );
          })}
        </div>
      </div>
      <p className="text-light me-5">{msConverter(data.duration)}</p>
    </div>
  );
};

export default Tracks;
