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