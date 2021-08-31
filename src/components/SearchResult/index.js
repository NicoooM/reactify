import { Link } from "react-router-dom";
import msConverter from "../../helper/msConverter";

const SearchResult = ({ result }) => {
  const artistURL = `/artist?artistId=${result.artistId}`;
  return (
    <div
      className="d-flex m-3 rounded p-3"
      style={{ width: "600px", backgroundColor: "#3E464D" }}
    >
      <img
        src={result.albumImg}
        alt=""
        className="rounded"
        style={{ width: "150px" }}
      />
      <div className="p-3">
        <h2 className="text-light fs-5">{result.title}</h2>
        <Link className="text-light fs-6 fw-normal" to={artistURL}>
          By {result.artist}
        </Link>
        <p className="text-light fs-6 fw-light">
          {msConverter(result.duration)}
        </p>
      </div>
    </div>
  );
};

export default SearchResult;
