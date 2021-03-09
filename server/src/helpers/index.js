const { promisify } = require('util');
const pool = require('../database');


const promise_query = promisify(pool.query).bind(pool);

const getValueEntries = (arrLength) => {
    const size = arrLength * 2;
    let res = new Array(arrLength).fill("");

    for (let i = 0; i < size; i ++) {
        res[Math.floor(i/2)] += (i+1) % 2 != 0 ? `($${i+1}` : `,$${i+1})`;
    }
    return res.join(",");
}


module.exports = {
    promise_query,
    getValueEntries
};