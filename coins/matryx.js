/**
 * @title Matryx
 * @symbol MTX
 * @ethContractAddr 0x0af44e2784637218dd1d32a322d44e603a8f0c6a
 * @implementation Dynamic
 * @cmcId matryx
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x0af44e2784637218dd1d32a322d44e603a8f0c6a?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -18)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
