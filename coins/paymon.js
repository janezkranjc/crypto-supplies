/**
 * @title Paymon
 * @symbol PMNT
 * @ethContractAddr 0x81b4d08645da11374a03749ab170836e4e539767
 * @implementation Dynamic
 * @cmcId paymon
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x81b4d08645da11374a03749ab170836e4e539767?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -9)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
