const usePosts = () => {
  const url = import.meta.env.VITE_API_URL;

  return {
    get: async (cb, querys) => {
      try {
        let q = [];
        for (const i in querys) {
          if (querys[i]) {
            q.push(`${i}=${querys[i]}`);
          }
        }
        const token = window.sessionStorage.getItem("session")
          ? JSON.parse(window.sessionStorage.getItem("session")).token
          : undefined;
        const resp = await fetch(
          url + `post${q.length > 0 ? "?" + q.join("&") : ""}`,
          { headers: token ? { auth: token } : {} }
        );
        const data = await resp.json();
        if (resp.ok) {
          cb(data);
        }
      } catch (error) {
        cb(undefined, error.message);
      }
    },
    like: async (callback, postId) => {
      try {
        const token = JSON.parse(
          window.sessionStorage.getItem("session")
        )?.token;
        const resp = await fetch(url + `post/${postId}/like`, {
          method: "POST",
          headers: { auth: token },
        });
        if (resp.status != 429 && resp.status != 204) {
          callback(undefined, "Failed to save like");
        }
      } catch (error) {
        callback(error.message);
      }
    },
    getRelevant: async (callback) => {
      try {
        const resp = await fetch(url + `post?query=relevant`, {
          method: "GET",
        });
        if (resp.status != 429 && resp.status != 200) {
          callback(undefined, "Failed to retrieve latest posts");
        }
        const data = await resp.json();
        callback(data);
      } catch (error) {
        callback(error.message);
      }
    },
    upload: async (callback, files) => {
      try {
        const form = new FormData();
        const tags = [];
        for (let i = 0; i < files.length; i++) {
          form.append("photos", files[i]);
          if (files[i].tags.length > 0) {
            tags.push(files[i].tags);
          }
        }
        form.append("tags", JSON.stringify(tags));
        const token = JSON.parse(
          window.sessionStorage.getItem("session")
        ).token;
        const resp = await fetch(url + "post", {
          method: "POST",
          headers: { auth: token },
          body: form,
        });

        if (resp.status !== 204) {
          const data = await resp.json();
          callback(undefined, data.error.details);
        } else {
          return callback();
        }
      } catch (e) {
        callback(undefined, e.message);
      }
    },
  };
};

export default usePosts;