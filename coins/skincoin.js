/**
 * @title SkinCoin
 * @symbol SKIN
 * @ethContractAddr 0x2bdc0d42996017fce214b21607a515da41a9e0c5
 * @implementation Dynamic
 * @cmcId skincoin
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x2bdc0d42996017fce214b21607a515da41a9e0c5?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -6)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
