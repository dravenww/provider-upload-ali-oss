'use strict';
const OSS = require("ali-oss")

module.exports = {
    provider: 'ali-oss',
    name: 'ali-oss Storage Service',
    auth: {
        region: {
            label: 'Region',
            type: 'text'
        },
        accessKeyId: {
            label: 'Access API Token',
            type: 'text'
        },
        accessKeySecret: {
            label: 'Secret Access Token',
            type: 'text'
        },
        bucket: {
            label: 'Bucket',
            type: 'text'
        },
        prefix: {
            label: 'Prefix in your oss storage key',
            type: 'text'
        },
        cdn: {
            label: 'Whether to use cdn acceleration when uploading',
            type: 'text'
        }
    },
    init(ossConfig) {
        const prefix = ossConfig.prefix || '';
        const domain = ossConfig.cdn || `https://${ossConfig.bucket}.${ossConfig.region}.aliyuncs.com`;

        const client = new OSS({
            region: ossConfig.region,
            accessKeyId: ossConfig.accessKeyId,
            accessKeySecret: ossConfig.accessKeySecret,
            bucket: ossConfig.bucket,
        });

        return {
            upload(file) {
                return new Promise((resolve, reject) => {
                    const urlPath = `${prefix}/${file.hash}${file.ext}`;
                    client.put(urlPath, new Buffer(file.buffer, 'binary'), {}).then((result) => {
                        if (result.res.status === 200) {
                            const url = `${domain}/${urlPath}`;
                            file.url = url;
                            resolve();
                        } else {
                            reject();
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                });
            },
            uploadStream(file) {
                return new Promise((resolve, reject) => {
                    const urlPath = `${prefix}/${file.hash}${file.ext}`;
                    client.putStream(urlPath, file.stream, {}).then((result) => {
                        if (result.res.status === 200) {
                            const url = `${domain}/${urlPath}`;
                            file.url = url;
                            resolve();
                        } else {
                            reject();
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                })
            },
            delete(file) {
                return new Promise((resolve, reject) => {
                    const key = `${prefix}/${file.hash}${file.ext}`;
                    client.delete(key).then((res) => {
                        if (res.code === 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                });
            },
        };
    },
};
