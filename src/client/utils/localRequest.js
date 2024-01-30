const PORT = import.meta.env.VITE_PORT;
const BASE_PATH = `http://localhost:${PORT}/`;

const token = localStorage.getItem("token");

/**
 * @param {String} endpoint
 * @param {{}} payload
 * @returns {Promise<Object>}
 */
async function postUrl(endpoint, payload) {
  const url = BASE_PATH + endpoint;
  const options = {
    body: JSON.stringify(payload),
    method: "post",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  };

  const request = await fetch(url, options);
  const response = await request.json();
  response.ok = request.ok;
  return response;
}

export default { postUrl };
