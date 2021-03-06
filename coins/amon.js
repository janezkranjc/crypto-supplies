/**
 * @title Amon
 * @symbol AMN
 * @ethContractAddr 0x737f98ac8ca59f2c68ad658e3c3d8c8963e40a4c
 * @implementation Dynamic
 * @cmcId amon
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x737f98ac8ca59f2c68ad658e3c3d8c8963e40a4c?apiKey=freekey', (error, response, body) => {
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
