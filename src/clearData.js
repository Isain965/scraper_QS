module.exports = (university) => {

    const name = university.title;
    const score = university.score;
    const rank = (university.rank_display).match(/\d+$/)[0];
    const country = university.country;

    return {
        name,
        rank,
        score,
        country
    }
}