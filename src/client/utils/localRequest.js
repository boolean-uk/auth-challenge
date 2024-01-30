const PORT = import.meta.env.VITE_PORT;
const BASE_PATH = `http://localhost:${PORT}/`;

/**
 * @param {String} endpoint
 * @param {{}} payload
 * @returns {Promise<Object>}
 */
async function postUrl(endpoint, payload) {
  const token = localStorage.getItem("token");
  const url = BASE_PATH + endpoint;
  const options = {
    body: JSON.stringify(payload),
    method: "post",
    headers: {
      authorization: token ? `Bearer ${token}` : null,
      "content-type": "application/json",
    },
  };

  const request = await fetch(url, options);
  const response = await request.json();
  response.ok = request.ok;
  return response;
}

async function getUrl(endpoint) {
  const token = localStorage.getItem("token");
  const url = BASE_PATH + endpoint;
  const options = {
    headers: {
      authorization: token ? `Bearer ${token}` : null,
      "content-type": "application/json",
    },
  };

  const request = await fetch(url, options);
  const response = await request.json();
  response.ok = request.ok;
  return response;
}

export default { getUrl, postUrl };
