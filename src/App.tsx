import React, { useState, useEffect } from "react";
import api from "./config/api";
import "./styles.scss";

import IPhoto from "./common/interfaces/photo.interface";

import mergeObjectsInUnique from "./common/utils/merge-objects-in-unique";

export default function App() {
  const [data, setData] = useState<IPhoto[]>([]);
  const [albums, setAlbums] = useState<IPhoto[]>([]);
  const [page, setPage] = useState(10);

  useEffect(() => {
    api.get("/").then((res) => {
      const data: IPhoto[] = res.data;

      setData(data);
      setAlbums(mergeObjectsInUnique(data, "albumId"));
    });
  }, []);

  if (albums.length === 0) return <h1>CARREGANDO...</h1>;

  function nextPage() {
    if (page >= albums.length) setPage(10);
    else setPage(page + 10);
  }

  function lastPage() {
    if (page <= 10) setPage(10);
    else setPage(page - 10);
  }

  // const images = data.slice(page - 10, page - 6).map((d, i) => {
  //   albums.filter((a, i2) => {
  //     if (d.albumId === albums[i2].albumId) {
  //       console.log(d);
  //     }
  //   });
  // });

  return (
    <div className="container">
      <h1 className="container-title">
        <span>Be</span> Growth | Albums
      </h1>

      <div className="menu">
        {page > 10 && (
          <svg
            onClick={() => lastPage()}
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
        )}

        {page < albums.length && (
          <svg
            width="30"
            onClick={() => nextPage()}
            height="28"
            viewBox="0 0 30 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.9453 13.0547L14.1875 0.246094C14.0742 0.148437 13.9297 0.09375 13.7773 0.09375H10.3203C10.0313 0.09375 9.89844 0.453125 10.1172 0.640625L23.7969 12.5156H0.9375C0.765625 12.5156 0.625 12.6562 0.625 12.8281V15.1719C0.625 15.3438 0.765625 15.4844 0.9375 15.4844H23.793L10.1133 27.3594C9.89453 27.5508 10.0273 27.9062 10.3164 27.9062H13.8906C13.9648 27.9062 14.0391 27.8789 14.0938 27.8281L28.9453 14.9453C29.0805 14.8277 29.189 14.6825 29.2633 14.5194C29.3376 14.3563 29.376 14.1792 29.376 14C29.376 13.8208 29.3376 13.6437 29.2633 13.4806C29.189 13.3175 29.0805 13.1723 28.9453 13.0547Z"
              fill="#606060"
            />
          </svg>
        )}
      </div>

      <div className="albums">
        {albums &&
          albums.slice(page - 10, page).map((album, i) => (
            <div className="album" key={album.id}>
              <div className="album-thumbnail">
                <img src={album.thumbnailUrl} alt={album.title} />
                <img src={data[album.id + 1].thumbnailUrl} alt={album.title} />
                <img src={data[album.id + 2].thumbnailUrl} alt={album.title} />
                <img src={data[album.id + 3].thumbnailUrl} alt={album.title} />
              </div>
              <h2 className="album-name">{album.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
