const getFilter = (filter) => {
  let uri = "";
  switch (filter) {
    case "all":
      uri = "http://localhost:3000/api/memes/";
      break;
    case "bases":
      uri = "http://localhost:3000/api/bases";
      break;

    case "public":
      uri = "http://localhost:3000/api/memes/public";
      break;
    default:
      break;
  }
  return getGeneric(uri);
};

const getGeneric = (uri) => {
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error(`${res.status}: ${res.statusText}`);
          error.response = res;
          throw error;
        }
        resolve(res.json());
      })
      .catch((err) => {
        if (err.response && err.response.headers) {
          if (err.response.headers.get("Content-Type") === "application/json") {
            err.response
              .json()
              .then((x) =>
                reject({ message: err.message, details: JSON.stringify(x) })
              );
          } else {
            err.response
              .text()
              .then((x) => reject({ message: err.message, details: x }));
          }
        } else {
          reject({ message: err.message });
        }
      });
  });
};

const getLoggedUser = () => {
  return new Promise((resolve) => {
    fetch("http://localhost:3000/api/sessions/current", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          const error = new Error(`${res.status}: ${res.statusText}`);
          error.response = res;
          throw error;
        }
        resolve(res.json());
      })
      .catch(() => resolve({ name: "", id: -1 }));
  });
};

export { getGeneric, getFilter, getLoggedUser };
