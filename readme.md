

# webpack-hashed-chunk-id-plugin

This plugin will cause hashes to be based on the relative path of the chunk, generating a four character string as the module id. Suggested for use in production.

## Install

```shell
$ npm i webpack-hashed-chunk-ids-plugin --save
```

## Options

- context: The context directory (absolute path) for creating names.
- hashFunction: The hashing algorithm to use, defaults to 'md4'. All functions from Node.JS' crypto.createHash are supported.
- hashDigest: The encoding to use when generating the hash, defaults to 'base64'. All encodings from Node.JS' hash.digest are supported.
- hashDigestLength: The prefix length of the hash digest to use, defaults to 4. Note that some generated ids might be longer than specified here, to avoid module id collisions.
Usage

## Usage

Here's an example of how this plugin might be used:

maybe you can use with no options:
```js
const HashedChunkIdsPlugin = require('webpack-hashed-chunk-ids-plugin')

 plugins: [
    new HashedChunkIdsPlugin()
  ]
```

or with some options

```js
const HashedChunkIdsPlugin = require('webpack-hashed-chunk-ids-plugin')

 plugins: [
    new HashedChunkIdsPlugin({
      context: __dirname,
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    })
  ]
```



