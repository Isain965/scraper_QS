const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const cheerio = require('cheerio');

axiosCookieJarSupport(axios);

module.exports = async (universityUrl) => {

  universityUrl = `https://www.topuniversities.com${universityUrl}`;
  console.log(">>>> URL: " + universityUrl);

  let cookies = new tough.CookieJar();
  let response = await axios.get(universityUrl, {
    withCredentials: true,
    maxRedirects: 20,
    jar: cookies
  });

  let $ = cheerio.load(response.data);

  /* Para obtener la informacion general */
  let generalInfo = $('.uni_stats .container .key');
  let resultGeneralInfo = [];
  for (let i = 0; i < generalInfo.length; i++) {
      const text = $(generalInfo[i]).text();
      resultGeneralInfo.push(text);
  }




  const info = 'https://www.topuniversities.com/qs-profiles/rank-data/ajax/294850/513/null'

  cookies = new tough.CookieJar();
  response = await axios.post(info, {
    withCredentials: true,
    maxRedirects: 20,
    jar: cookies
  });

  $ = cheerio.load(response.data);

  let criteria = $('.rank-his-y');
  console.log(criteria.length);
  // for (let i = 0; i < criteria.length; i++) {
  //   console.log(criteria[i]);
  //   const text = $(criteria[i]).text();
  //   resultGeneralInfo.push(text);
  // }


  console.log(resultGeneralInfo);

  return 1;
}