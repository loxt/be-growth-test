import React, { useState, useEffect } from "react";
import api from "./config/api";
import "./styles.scss";

import IPhoto from "./common/interfaces/photo.interface";

import mergeObjectsInUnique from "./common/utils/merge-objects-in-unique";

export default function App() {
  const [albums, setAlbums] = useState<IPhoto[]>([]);
  const [page, setPage] = useState(10);

  useEffect(() => {
    api.get("/").then((res) => {
      const data: IPhoto[] = res.data;

      setAlbums(mergeObjectsInUnique(data, "albumId"));
    });
  }, []);

  if (albums.length === 0) return <h1>CARREGANDO...</h1>;

  function nextPage() {
    if (page >= albums.length) setPage(10);
    else setPage(page + 10);
  }

  return (
    <div className="container">
      <h1 className="container-title">
        <span>Be</span> Growth | Albums
      </h1>
      <div className="albums">
        {albums &&
          albums.slice(page - 10, page).map((album) => (
            <div className="album" onClick={() => nextPage()} key={album.id}>
              <img
                src={album.thumbnailUrl}
                className="album-thumbnail"
                alt={album.title}
              />
              <h2 className="album-name">{album.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
