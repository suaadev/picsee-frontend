import { useEffect } from "react";
import PhotosView from "../photos/PhotosView";
import TagsView from "../tags/TagsView";
import { useSearchParams } from "react-router-dom";

function MainView() {
  const [searchParams] = useSearchParams();

  useEffect(() => {}, []);

  return (
    <>
      <div className="container-main">
        <TagsView />
        <PhotosView tag={searchParams.get("t")} query={searchParams.get("q")} />
      </div>
    </>
  );
}

export default MainView;
