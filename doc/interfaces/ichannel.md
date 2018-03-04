[ancient-channels](../README.md) > [IChannel](../interfaces/ichannel.md)



# Interface: IChannel

## Type parameters
#### IEventsList :  [IChannelEventsList](ichanneleventslist.md)
## Hierarchy


 `any`

**↳ IChannel**








## Properties
<a id="isconnected"></a>

###  isConnected

**●  isConnected**:  *`boolean`* 

*Defined in [lib/channel.ts:49](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L49)*





___


## Methods
<a id="connect"></a>

###  connect

► **connect**(data?: *`any`*): `void`



*Defined in [lib/channel.ts:50](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L50)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="connected"></a>

###  connected

► **connected**(pkg?: *[IPkg](ipkg.md)*, msg?: *[TMsg](../#tmsg)*): `void`



*Defined in [lib/channel.ts:51](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L51)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](ipkg.md)   |  - |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `void`





___

<a id="deserialize"></a>

###  deserialize

► **deserialize**(msg?: *[TMsg](../#tmsg)*): `any`



*Defined in [lib/channel.ts:61](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L61)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `any`





___

<a id="disconnect"></a>

###  disconnect

► **disconnect**(data?: *`any`*): `void`



*Defined in [lib/channel.ts:52](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L52)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="disconnected"></a>

###  disconnected

► **disconnected**(pkg?: *[IPkg](ipkg.md)*, msg?: *[TMsg](../#tmsg)*): `void`



*Defined in [lib/channel.ts:53](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L53)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](ipkg.md)   |  - |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `void`





___

<a id="got"></a>

###  got

► **got**(msg?: *[TMsg](../#tmsg)*): `void`



*Defined in [lib/channel.ts:55](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L55)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `void`





___

<a id="gotpkg"></a>

###  gotPkg

► **gotPkg**(pkg?: *[IPkg](ipkg.md)*, msg?: *[TMsg](../#tmsg)*): `void`



*Defined in [lib/channel.ts:54](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L54)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](ipkg.md)   |  - |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `void`





___

<a id="pack"></a>

###  pack

► **pack**(pkg?: *[IPkg](ipkg.md)*): `object`



*Defined in [lib/channel.ts:58](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L58)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](ipkg.md)   |  - |





**Returns:** `object`





___

<a id="send"></a>

###  send

► **send**(data?: *`any`*): `void`



*Defined in [lib/channel.ts:56](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L56)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="sendmsg"></a>

###  sendMsg

► **sendMsg**(pkg?: *[IPkg](ipkg.md)*, msg?: *[TMsg](../#tmsg)*): `void`



*Defined in [lib/channel.ts:57](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L57)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](ipkg.md)   |  - |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `void`





___

<a id="serialize"></a>

###  serialize

► **serialize**(pkg?: *[IPkg](ipkg.md)*): `any`



*Defined in [lib/channel.ts:60](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L60)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](ipkg.md)   |  - |





**Returns:** `any`





___

<a id="unpack"></a>

###  unpack

► **unpack**(msg?: *[TMsg](../#tmsg)*): `object`



*Defined in [lib/channel.ts:59](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L59)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `object`





___


