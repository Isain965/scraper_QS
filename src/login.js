const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);

module.exports = async () => {
  let cookies = new tough.CookieJar();
  let response = await axios.get('https://0-www-scopus-com.millenium.itesm.mx/', {
    withCredentials: true,
    maxRedirects: 20,
    jar: cookies
  });

  console.log(response.data);
}