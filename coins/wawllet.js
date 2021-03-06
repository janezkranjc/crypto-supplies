/**
 * @title WCOIN
 * @symbol WIN
 * @ethContractAddr 0x899338b84d25ac505a332adce7402d697d947494
 * @implementation Dynamic
 * @cmcId wawllet
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x899338b84d25ac505a332adce7402d697d947494?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -8)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
