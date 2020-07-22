const aws = require('aws-sdk');

const sm = new aws.SecretsManager({region: 'us-east-2'});

const getSecrets = async (SecretId) => {
    return await new Promise((resolve, reject) => {
        sm.getSecretValue({ SecretId }, (err, result) => {
            if (err)
            {
                reject(err);
            }
            else
            {
                resolve(JSON.parse(result.SecretString));
            }
        });
    });
};

exports.handler = async (event) => {
    const {apiKey} = await getSecrets('testSecretApiKey');
    return apiKey;
};
