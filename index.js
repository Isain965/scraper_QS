require("dotenv").config();
const getUniversities = require('./src/getUniversities');
const clearData = require('./src/clearData');

exports.handler = async function (event, context, callback) {
    const universities = await getUniversities();

    let uniInfo = [];

    universities.forEach(uni => {
        uniInfo.push(clearData(uni));
    });

    return uniInfo;
};