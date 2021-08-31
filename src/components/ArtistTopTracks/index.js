import { useEffect, useState } from "react";
import msConverter from "../../helper/msConverter";

const ArtistTopTracks = ({ data, index, showMore }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    showMore === true ? setIsVisible(true) : setIsVisible(false);
  }, [showMore]);

  if (isVisible && index > 5) {
    return (
      <div className="d-flex justify-content-between my-3">
        <div className="d-flex align-items-center">
          <img src={data.albumImage} alt="" />
          <h2 className="text-light ms-3 fs-4 fw-normal">{data.name}</h2>
        </div>
        <p className="text-light">{msConverter(data.duration)}</p>
      </div>
    );
  }
  if (index < 5) {
    return (
      <div className="d-flex justify-content-between my-3">
        <div className="d-flex align-items-center">
          <img src={data.albumImage} alt="" />
          <h2 className="text-light ms-3 fs-4 fw-normal">{data.name}</h2>
        </div>
        <p className="text-light">{msConverter(data.duration)}</p>
      </div>
    );
  }
  return "";
};

export default ArtistTopTracks;
