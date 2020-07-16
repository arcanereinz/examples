// Import AWS SDK and instantiate a variable for the AWS Secrets Manager
const AWS = require('aws-sdk');
const _ = require('lodash');
const secretsManager = new AWS.SecretsManager();

// Store the SECRETS_NAMESPACE value from the Function's environment variables
const secretsNamespace = process.env.SECRETS_NAMESPACE;

exports.handler = async (event, context) => {
    // Log the event argument for debugging and for use in local development.
    console.log(JSON.stringify(event, undefined, 2));

    // Construct paramaters to pass to AWS Secrets Manager API call
    // SecretId is a combination of the secret's namespace and the specific secret to return
    const params = {
        SecretId: secretsNamespace + 'apiKey',
    };

    // AWS Secrets Manager API call passing through params for retrieval
    const response = await secretsManager.getSecretValue(params).promise();

    // Accessing the secret's value of the response object
    const apiKey = JSON.parse(response.SecretString);

    return {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            source: 'users', // print
            event,
            apiKey,
            secret: _.get(apiKey, 'MySecret'),
        }),
        isBase64Encoded: false,
    };
};
