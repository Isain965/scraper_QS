const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);

module.exports = async () => {
  let cookies = new tough.CookieJar();
  let response = await axios.get(process.env.QS_URL, {
    withCredentials: true,
    maxRedirects: 20,
    jar: cookies
  });

  const data = response.data;

  return data['data'];
}