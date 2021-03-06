/**
 * @title EtherDelta Token
 * @symbol EDT
 * @ethContractAddr 0xce53a179047ebed80261689367c093c90a94cc08
 * @implementation Dynamic
 * @cmcId etherdelta-token
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xce53a179047ebed80261689367c093c90a94cc08?apiKey=freekey', (error, response, body) => {
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
