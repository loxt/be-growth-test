import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import IPhoto from "../../common/interfaces/photo.interface";

import "./styles.scss";

export default function Photos({ location }) {
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  const history = useHistory();

  useEffect(() => {
    if (!location.state) return history.push("/");

    setPhotos(location.state.state);
  }, []);

  if (!photos) return <h1>Carregando fotos...</h1>;

  photos.map((photo) => {
    console.log(photo.title);
  });

  return (
    <div className="container">
      {photos[0] && (
        <h1 className="container-title">Fotos do álbum {photos[0].albumId}</h1>
      )}
      <div className="photos">
        {photos &&
          photos.map((photo) => (
            <div className="photo" key={photo.id}>
              <h1>{photo.title}</h1>
            </div>
          ))}
      </div>
    </div>
  );
}
