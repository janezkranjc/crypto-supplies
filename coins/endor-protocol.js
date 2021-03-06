/**
 * @title Endor Protocol
 * @symbol EDR
 * @ethContractAddr 0xc528c28fec0a90c083328bc45f587ee215760a0f
 * @implementation Dynamic
 * @cmcId endor-protocol
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xc528c28fec0a90c083328bc45f587ee215760a0f?apiKey=freekey', (error, response, body) => {
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
