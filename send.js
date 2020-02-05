const fetch = require('isomorphic-unfetch');

const API = process.env.PROBOS_API || `http://localhost:8080`;

module.exports = data => {
  console.log(JSON.stringify(data, null, 4));

  return fetch(`${API}/reports`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};
