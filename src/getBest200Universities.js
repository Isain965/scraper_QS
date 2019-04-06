module.exports = async (arrJson) => {
  let result = [];
  
  for (let i = 0; i < 200; i ++) {
      result.push(arrJson[i]);
  }
  return result;
}