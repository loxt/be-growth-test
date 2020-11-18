import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../config/api";

import "./styles.scss";

import IPhoto from "../../common/interfaces/photo.interface";

import mergeObjectsInUnique from "../../common/utils/merge-objects-in-unique";

export default function Albums() {
  const [data, setData] = useState<IPhoto[]>([]);
  const [albums, setAlbums] = useState<IPhoto[]>([]);
  const [favorites, setFavorites] = useState<IPhoto[]>([]);

  const [page, setPage] = useState(10);

  const history = useHistory();

  useEffect(() => {
    api.get("/").then((res) => {
      const responseData: IPhoto[] = res.data;

      setData(responseData);

      const newData = mergeObjectsInUnique(responseData, "albumId");
      let localFavorites: IPhoto[] = mergeObjectsInUnique(
        JSON.parse(localStorage.getItem("favorites") as string),
        "id"
      );

      localFavorites.map((lf) => {
        newData.map((nd) => {
          if (lf.albumId === nd.albumId) {
            nd.favorite = true;
          }
        });
      });

      setAlbums(newData);
    });
  }, []);

  function nextPage() {
    if (page >= albums.length) setPage(10);
    else setPage(page + 10);
  }

  function lastPage() {
    if (page <= 10) setPage(10);
    else setPage(page - 10);
  }

  async function navigateToAlbum(_album: IPhoto) {
    const album = data.filter((a) => a.albumId === _album.albumId);
    await history.push("/album", {
      state: album,
    });
  }

  function setFavorite(_album: IPhoto) {
    const exist = albums.find((a) => a.id === _album.id);

    if (exist === undefined) return;

    exist.favorite = !exist.favorite;

    setAlbums([...albums, exist]);

    let localFavorites: IPhoto[] = [];
    if (localStorage.hasOwnProperty("favorites")) {
      localFavorites = mergeObjectsInUnique(
        JSON.parse(localStorage.getItem("favorites") as string),
        "id"
      );
    }

    const existInLocal = localFavorites.find((f) => f.id === exist.id);
    if (!existInLocal) {
      localFavorites.push(exist);
      localStorage.setItem("favorites", JSON.stringify(localFavorites));
      setFavorites(localFavorites);
    } else {
      let removedArray: IPhoto[] = [];
      localFavorites.map((fav) => {
        if (fav.albumId !== exist.albumId) {
          removedArray.push(fav);
        }
      });

      localStorage.setItem("favorites", JSON.stringify(removedArray));
      setFavorites(removedArray);
    }
  }

  if (albums.length === 0) return <h1>CARREGANDO...</h1>;

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

      <main className="albums">
        {albums &&
          albums.slice(page - 10, page).map((album) => (
            <div className="album" key={album.id}>
              <svg
                width="864"
                height="774"
                viewBox="0 0 864 774"
                xmlns="http://www.w3.org/2000/svg"
                className={"album-favorite album-favorite-active"}
                fill={album.favorite ? "gold" : "gray"}
                onClick={() => setFavorite(album)}
              >
                <path d="M843 158.6C829.596 127.564 810.269 99.4389 786.1 75.8C761.913 52.0906 733.396 33.2491 702.1 20.3C669.648 6.81928 634.841 -0.080911 599.7 -2.95347e-05C550.4 -2.95347e-05 502.3 13.5 460.5 39C450.5 45.1 441 51.8 432 59.1C423 51.8 413.5 45.1 403.5 39C361.7 13.5 313.6 -2.95347e-05 264.3 -2.95347e-05C228.8 -2.95347e-05 194.4 6.79997 161.9 20.3C130.5 33.3 102.2 52 77.9 75.8C53.6997 99.4122 34.3678 127.544 21 158.6C7.1 190.9 0 225.2 0 260.5C0 293.8 6.8 328.5 20.3 363.8C31.6 393.3 47.8 423.9 68.5 454.8C101.3 503.7 146.4 554.7 202.4 606.4C295.2 692.1 387.1 751.3 391 753.7L414.7 768.9C425.2 775.6 438.7 775.6 449.2 768.9L472.9 753.7C476.8 751.2 568.6 692.1 661.5 606.4C717.5 554.7 762.6 503.7 795.4 454.8C816.1 423.9 832.4 393.3 843.6 363.8C857.1 328.5 863.9 293.8 863.9 260.5C864 225.2 856.9 190.9 843 158.6V158.6ZM432 689.8C432 689.8 76 461.7 76 260.5C76 158.6 160.3 76 264.3 76C337.4 76 400.8 116.8 432 176.4C463.2 116.8 526.6 76 599.7 76C703.7 76 788 158.6 788 260.5C788 461.7 432 689.8 432 689.8Z" />
              </svg>
              <div
                className="album-thumbnail"
                onClick={() => navigateToAlbum(album)}
              >
                <img src={album.thumbnailUrl} alt={album.title} />
                <img src={data[album.id + 1].thumbnailUrl} alt={album.title} />
                <img src={data[album.id + 2].thumbnailUrl} alt={album.title} />
                <img src={data[album.id + 3].thumbnailUrl} alt={album.title} />
              </div>
              <h2 className="album-name">{album.title}</h2>
            </div>
          ))}
      </main>
    </div>
  );
}
