# Ancient Channels

[![GitHub Release](https://img.shields.io/github/release/AncientSouls/Channels.svg)](https://github.com/AncientSouls/Channels/releases)
[![npm](https://img.shields.io/npm/v/ancient-channels.svg)](https://www.npmjs.com/package/ancient-channels)
[![Build Status](https://travis-ci.org/AncientSouls/Channels.svg?branch=master)](https://travis-ci.org/AncientSouls/Channels)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/372ee79bd9a442fbaa6c090d2731e1ad)](https://www.codacy.com/app/valentineus/Channels)
[![Codacy Coverage Badge](https://api.codacy.com/project/badge/Coverage/372ee79bd9a442fbaa6c090d2731e1ad)](https://www.codacy.com/app/valentineus/Channels/files)

Constructor of communication channel with universal API.

## Installation

You can download the installation package:

* [NPM package manager](https://www.npmjs.com/package/ancient-channels);
* [GitHub Releases](https://github.com/AncientSouls/Channels/releases);
* [Compilation from the source code](#build);

## Build

To perform a self-assembly project or add your own turbo add-on, follow these simple steps:

* Clone the repository and prepare it for work:
```bash
git clone https://github.com/AncientSouls/Channels.git ancient-channels
cd ./ancient-channels
NODE_ENV=development npm install
```

* In this step, make the necessary changes to the code, if required.

* After making the changes, perform the code check with the parser:
```bash
npm run check
```

* Perform functional testing of the code:
```bash
npm run test
```

* After successfully passing the tests, compile the source code:
```bash
npm run build
```

* Done!
If required, create a package to install and distribute your version:
```bash
npm pack
```

## License

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/eslint/eslint)

[MIT](LICENSE.md).
Copyright (c)
[AncientSouls](https://ancientsouls.github.io/).