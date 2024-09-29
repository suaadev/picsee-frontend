/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import exampleTags from "./exampleTags.json";

function PostUploadPreview({ f, deleteFile, tags_ }) {
  const [tags, setTags] = useState(tags_);

  const deleteTag = (t) => {
    const tagsFilter = tags.filter((n) => n !== t);
    setTags(tagsFilter);
    f.tags = tagsFilter;
  };

  useEffect(() => {}, []);

  return (
    <div className="block-upload_container-photo">
      <IoMdClose
        onClick={(e) => {
          e.preventDefault();
          deleteFile(f);
        }}
        size={30}
        className="block-upload__icon-delete icon-x"
      />
      <img
        className="block-upload_photo-uploaded"
        src={URL.createObjectURL(f)}
        alt="Preview"
      />
      <div className="block-upload__container-tags">
        {tags.map((t, i) => (
          <div key={i} className="block-upload__tag-closed">
            <IoMdClose
              onClick={(e) => {
                e.preventDefault();
                deleteTag(t);
              }}
              size={20}
              className="block-upload__icon-delete-tag"
            />
            {t}
          </div>
        ))}
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "," || e.key === "Enter") {
              if (e.target.value.trim() === "") {
                return alert("Tags cannot be empty");
              }
              const tagText = e.target.value.trim();
              if (tags.some((t) => t === tagText)) {
                return alert("This tag has already been added");
              }
              setTags([...tags, tagText]);
              f.tags.push(tagText);
              e.target.value = "";
              e.target.focus();
            }
          }}
          className="block-upload__input-tag"
          placeholder={(() => {
            const s = exampleTags.length - 1;
            const r = Math.floor(Math.random() * (s - 3));
            return exampleTags
              .slice(r, r + 3)
              .join(" , ")
              .concat(" ...");
          })()}
        />
      </div>
    </div>
  );
}
export default PostUploadPreview;
