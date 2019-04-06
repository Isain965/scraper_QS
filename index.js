require("dotenv").config();
const getUniversities = require('./src/getUniversities');
const getBest200Universities = require('./src/getBest200Universities');
const getInformation = require('./src/getInformation');

exports.handler = async function (event, context, callback) {
    const universities = await getUniversities();

    const best200 = await getBest200Universities(universities);

    // Get information
    let info100 = [];
    let count = 0;
    let back = await setInterval(async function(){
        const information = await getInformation(best100[count].url);
        info100.push(information);

        count += 1;
        if(count == 100){
            clearInterval(back);
        }
   }, 1000);

    info100 =  await Promise.all(info100);

    return best200;
};