# provider-upload-ali-oss


# Installation
```bash
$ npm install provider-upload-ali-oss --save
```

or

```bash
$ yarn add provider-upload-ali-oss --save
```

# Usage


### Strapi v4

The lastest version of the provider supports v4 by default. See example below for ```./config/plugins.js```:

```javascript
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'provider-upload-ali-oss', // full package name is required
      providerOptions: {
          accessKeyId: env('ALI_ACCESS_KEY_ID', ''),
          accessKeySecret: env('ALI_ACCESS_KEY_SECRET', ''),
          region: env('ALI_REGION', ''),
          bucket: env('ALI_BUCKET', ''),
          prefix: env('ALI_PREFIX', ''),
          cdn: env('ALI_CDN_URL', ''),
      },
    },
  },
});
```

