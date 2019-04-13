const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);

module.exports = async () => {
  let cookies = new tough.CookieJar();
  let response = await axios.get('https://www.topuniversities.com/sites/default/files/qs-rankings-data/397863.txt?_=1552422625494', {
    withCredentials: true,
    maxRedirects: 20,
    jar: cookies
  });

  const data = response.data;

  return data['data'];
}