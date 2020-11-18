import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import IPhoto from "../../common/interfaces/photo.interface";

import "./styles.scss";

export default function Photos({ location }) {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [openedImage, setOpenedImage] = useState({
    isOpened: false,
    url: "",
    title: "",
  });

  const history = useHistory();

  useEffect(() => {
    if (!location.state) return history.push("/");

    setPhotos(location.state.state);
  }, [history, location.state]);

  if (!photos) return <h1>Carregando fotos...</h1>;

  function navigateToAlbums() {
    history.push("/");
  }

  function changeOpenedImage(url: string = "", title: string = "") {
    setOpenedImage({
      url,
      title,
      isOpened: !openedImage.isOpened,
    });
  }

  return (
    <div className="container">
      <div className="header">
        <svg
          onClick={() => navigateToAlbums()}
          width="30"
          height="28"
          viewBox="0 0 30 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.05469 13.0547L15.8125 0.246094C15.9258 0.148437 16.0703 0.09375 16.2227 0.09375H19.6797C19.9687 0.09375 20.1016 0.453125 19.8828 0.640625L6.20312 12.5156H29.0625C29.2344 12.5156 29.375 12.6562 29.375 12.8281V15.1719C29.375 15.3438 29.2344 15.4844 29.0625 15.4844H6.20703L19.8867 27.3594C20.1055 27.5508 19.9727 27.9062 19.6836 27.9062H16.1094C16.0352 27.9062 15.9609 27.8789 15.9062 27.8281L1.05469 14.9453C0.919456 14.8277 0.811029 14.6825 0.736727 14.5194C0.662426 14.3563 0.623978 14.1792 0.623978 14C0.623978 13.8208 0.662426 13.6437 0.736727 13.4806C0.811029 13.3175 0.919456 13.1723 1.05469 13.0547Z"
            fill="#606060"
          />
        </svg>
        {photos[0] && (
          <h1 className="header-title">Fotos do álbum {photos[0].albumId}</h1>
        )}
      </div>
      <div className="photos">
        {openedImage.isOpened && (
          <div
            className="opened-container"
            onClick={() => changeOpenedImage("", "")}
          >
            <img
              src={openedImage.url}
              className="opened-container-photo"
              alt={openedImage.title}
            />
          </div>
        )}

        {photos &&
          photos.map((photo) => (
            <div className="photo" key={photo.id}>
              <img
                onClick={() => changeOpenedImage(photo.url, photo.title)}
                src={photo.url}
                alt={photo.title}
                className={"photo-thumbnail"}
              />

              <h1 className="photo-title">{photo.title}</h1>
            </div>
          ))}
      </div>
    </div>
  );
}
