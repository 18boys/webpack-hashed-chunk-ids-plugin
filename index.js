"use strict";
const createHash = require("webpack/lib/util/createHash");

const validateOptions = require("schema-utils");
const path = require('path')

const schema = require("webpack/schemas/plugins/HashedModuleIdsPlugin.json");


class HashedChunkIdsPlugin {

	constructor(options) {
		if (!options) options = {};

		validateOptions(schema, options, "Hashed Chunk Ids Plugin");

		this.options = Object.assign(
			{
				context: null,
				hashFunction: "md4",
				hashDigest: "base64",
				hashDigestLength: 4
			},
			options
		);
	}

	apply(compiler) {
		const options = this.options;
		compiler.hooks.compilation.tap("HashedChunkIdsPlugin", compilation => {
			const usedIds = new Set();
			compilation.hooks.beforeChunkIds.tap(
				"HashedChunkIdsPlugin",
        chunks => {
					for (const chunk of chunks) {
						if (chunk.id === null) {
              let _chuckPath =
                (chunk.entryModule && chunk.entryModule.resource) ||
                (chunk.entryModule && chunk.entryModule.name) ||
                chunk.name
              _chuckPath = path.relative('./', _chuckPath)
              const hash = createHash(options.hashFunction);
              hash.update(_chuckPath);
              const hashId = hash.digest(options.hashDigest);
              let len = options.hashDigestLength;
              while (usedIds.has(hashId.substr(0, len))) len++;
              chunk.id = hashId.substr(0, len);
              usedIds.add(chunk.id);
						}
					}
				}
			);
		});
	}
}

module.exports = HashedChunkIdsPlugin;
