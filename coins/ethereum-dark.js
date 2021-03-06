/**
 * @title Ethereum Dark
 * @symbol ETHD
 * @ethContractAddr 0xdbfb423e9bbf16294388e07696a5120e4ceba0c5
 * @implementation Dynamic
 * @cmcId ethereum-dark
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xdbfb423e9bbf16294388e07696a5120e4ceba0c5?apiKey=freekey', (error, response, body) => {
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
