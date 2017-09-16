## 0.0.0-alpha.4 (15-09-2017)
### Channel:
* Connected `Travis CI`.
* All tests for this class have been added.
* The variable `onAuthorization` is removed from the class.

## 0.0.0-alpha.3 (15-09-2017)
### Channel:
* The function `_formationPackage` is renamed to `_assemblePackage`.
* The function `_disassemblePackage` is added to unpack the request.
* Fixed bug in creating `sharedKey` key.
* Fixed bugs in the functions of `_encryption` and` _decryption`.
* Added tests for basic and simple functions.

## 0.0.0-alpha.2 (14-09-2017)
### Channel:
* The variable `channelid` is renamed to `id`.
* The variable `isAuthorization` is renamed to `onAuthorization`.
* The function `connection` is renamed to `connect`.
* The function `disconnection` is renamed to `disconnect`.
* The `connect` function can accept an optional logical parameter to control authorization.
* Refused to use the library `lodash`.
* The `handlerOutgoingPacket` function has been renamed `sendPackage` and taken to the adapter.
* The `sendPackage` function is renamed to `send`.
* Added the `_handlerError` function to handle erroneous packages.

## 0.0.0-alpha.1 (14-09-2017)
### Channel:
* First alpha release.