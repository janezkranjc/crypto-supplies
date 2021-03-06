/**
 * @title Waltonchain
 * @symbol WTC
 * @ethContractAddr 0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74
 * @implementation Dynamic
 * @cmcId waltonchain
 */

module.exports = (callback, request) => {
    request('http://api.ethplorer.io/getTokenInfo/0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74?apiKey=freekey', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);

            var resp = {
                t: Number(body.totalSupply) * Math.pow(10, -18)
            };

            if (typeof body.price !== 'undefined' && typeof body.price.availableSupply !== 'undefined') {
                resp.c = Number(body.price.availableSupply);
            }

            callback(resp);
        } else {
            callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
        }
    });
};
