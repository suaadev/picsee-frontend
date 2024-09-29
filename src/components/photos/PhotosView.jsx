/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import usePosts from "../../hooks/usePosts";
import Post from "./Post";
import sortPhotosInColumns from "../../utils/sortPhotosColumn";
import "./photosview.css";

function PhotosView({ query, tag, user, liked }) {
  const [columns, setColumns] = useState([[], [], []]);
  const [loader, setLoader] = useState(false);
  const cursor = useRef(null);
  const loadMore = useRef(false);
  const blockPhotos = useRef(null);
  const { get } = usePosts();

  const getPosts = () => {
    get(
      (data, err) => {
        setLoader(false);
        loadMore.current = false;
        if (err) {
          return alert(err);
        }
        const sort = sortPhotosInColumns(data.data.posts);
        setColumns((prev) => [
          [...prev[0], ...sort[0]],
          [...prev[1], ...sort[1]],
          [...prev[2], ...sort[2]],
        ]);

        cursor.current = data.cursor;
      },
      { query, tag, user, cursor: cursor.current, liked }
    );
  };

  const scrollHandler = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!loadMore.current) {
        loadMore.current = true;
        getPosts();
      }
    }
  };

  useEffect(() => {
    //console.count("RENDEREZIA");
    cursor.current = null;
    setLoader(true);
    setColumns([[], [], []]);
    getPosts();
    blockPhotos.current?.addEventListener("scroll", scrollHandler);
    return () => {
      blockPhotos.current?.removeEventListener("scroll", scrollHandler);
    };
  }, [tag, query, user, liked]);

  const f = (p, i) => {
    return <Post key={i} post={p} />;
  };

  return (
    <>
      <div
        ref={blockPhotos}
        className="container-main__block-photos block-photos"
      >
        <div className="block-photos__container-columns">
          <div className={`block-photos__column-1 column`}>
            {columns[0].map(f)}
          </div>
          <div className={`block-photos__column-2 column`}>
            {columns[1].map(f)}
          </div>
          <div className={`block-photos__column-3 column`}>
            {columns[2].map(f)}
          </div>
        </div>
        {loader ? (
          <span className="loader photos-main-loader"></span>
        ) : (
          (() => {
            if (columns.reduce((x, y) => x + y.length, 0) === 0) {
              return (
                <div className="container-main__info-box">
                  Parece que no hay imágenes . ¡Explora otros tags o prueba en
                  la barra de busqueda y encuentra algo genial!
                </div>
              );
            }
            return <></>;
          })()
        )}
      </div>
    </>
  );
}

export default PhotosView;
