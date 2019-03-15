require("dotenv").config();
const getUniversities = require('./src/getUniversities')

exports.handler = async function (event, context, callback) {
    // await scrape.getBest100Universities();

    const universities = await getUniversities();
    console.log(universities);
};