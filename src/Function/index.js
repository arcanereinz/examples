// Import AWS SDK and instantiate a variable for the AWS Secrets Manager
const _ = require('lodash');
const secrets = require('secrets');

exports.handler = async (event, context) => {
    // Log the event argument for debugging and for use in local development.
    console.log(JSON.stringify(event, undefined, 2));

    return {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            source: 'users', // print
            event,
            apiKey: secrets.getSecrets('apiKey'),
        }),
        isBase64Encoded: false,
    };
};
