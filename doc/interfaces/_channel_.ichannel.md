[ancient-channels](../README.md) > ["channel"](../modules/_channel_.md) > [IChannel](../interfaces/_channel_.ichannel.md)



# Interface: IChannel

## Type parameters
#### IEventsList :  [IChannelEventsList](_channel_.ichanneleventslist.md)
## Hierarchy


 `INode`.<`IEventsList`>

**↳ IChannel**

↳  [Channel](../classes/_channel_.channel.md)










## Indexable

\[key: `string`\]:&nbsp;`any`

## Constructors
<a id="constructor"></a>


### ⊕ **new IChannel**(id?: *`string`*): `any`


*Inherited from INode.__new*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/node.d.ts:11*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |





**Returns:** `any`

---


## Properties
<a id="destroy"></a>

###  destroy

**●  destroy**:  *`function`* 

*Inherited from INode.destroy*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/node.d.ts:15*


#### Type declaration
►(): `void`





**Returns:** `void`






___

<a id="emitter"></a>

###  emitter

**●  emitter**:  *`EventEmitter`* 

*Inherited from IEvents.emitter*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/events.d.ts:5*





___

<a id="generateid"></a>

###  generateId

**●  generateId**:  *`function`* 

*Inherited from INode.generateId*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/node.d.ts:13*


#### Type declaration
►(): `string`





**Returns:** `string`






___

<a id="id"></a>

###  id

**●  id**:  *`string`* 

*Inherited from INode.id*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/node.d.ts:11*





___

<a id="isconnected"></a>

###  isConnected

**●  isConnected**:  *`boolean`* 

*Defined in [channel.ts:49](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L49)*





___

<a id="isdestroyed"></a>

###  isDestroyed

**●  isDestroyed**:  *`boolean`* 

*Inherited from INode.isDestroyed*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/node.d.ts:14*





___


## Methods
<a id="connect"></a>

###  connect

► **connect**(data?: *`any`*): `void`



*Defined in [channel.ts:50](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L50)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="connected"></a>

###  connected

► **connected**(pkg?: *[IPkg](_channel_.ipkg.md)*, msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `void`



*Defined in [channel.ts:51](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L51)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](_channel_.ipkg.md)   |  - |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `void`





___

<a id="deserialize"></a>

###  deserialize

► **deserialize**(msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `any`



*Defined in [channel.ts:61](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L61)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `any`





___

<a id="disconnect"></a>

###  disconnect

► **disconnect**(data?: *`any`*): `void`



*Defined in [channel.ts:52](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L52)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="disconnected"></a>

###  disconnected

► **disconnected**(pkg?: *[IPkg](_channel_.ipkg.md)*, msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `void`



*Defined in [channel.ts:53](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L53)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](_channel_.ipkg.md)   |  - |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `void`





___

<a id="emit"></a>

###  emit

► **emit**IE(eventName: *`string`*, data: *`IEventsList[IE]`*): `this`



*Inherited from IEvents.emit*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/events.d.ts:6*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| data | `IEventsList[IE]`   |  - |





**Returns:** `this`





___

<a id="got"></a>

###  got

► **got**(msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `void`



*Defined in [channel.ts:55](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L55)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `void`





___

<a id="gotpkg"></a>

###  gotPkg

► **gotPkg**(pkg?: *[IPkg](_channel_.ipkg.md)*, msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `void`



*Defined in [channel.ts:54](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L54)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](_channel_.ipkg.md)   |  - |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `void`





___

<a id="off"></a>

###  off

► **off**IE(eventName: *`string`*, listener: *`function`*): `this`



*Inherited from IEvents.off*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/events.d.ts:9*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| listener | `function`   |  - |





**Returns:** `this`





___

<a id="on"></a>

###  on

► **on**IE(eventName: *`string`*, listener: *`function`*): `this`



*Inherited from IEvents.on*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/events.d.ts:7*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| listener | `function`   |  - |





**Returns:** `this`





___

<a id="once"></a>

###  once

► **once**IE(eventName: *`string`*, listener: *`function`*): `this`



*Inherited from IEvents.once*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/events.d.ts:8*



**Type parameters:**

#### IE :  `keyof IEventsList`
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| eventName | `string`   |  - |
| listener | `function`   |  - |





**Returns:** `this`





___

<a id="pack"></a>

###  pack

► **pack**(pkg?: *[IPkg](_channel_.ipkg.md)*): `object`



*Defined in [channel.ts:58](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L58)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](_channel_.ipkg.md)   |  - |





**Returns:** `object`





___

<a id="send"></a>

###  send

► **send**(data?: *`any`*): `void`



*Defined in [channel.ts:56](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L56)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="sendmsg"></a>

###  sendMsg

► **sendMsg**(pkg?: *[IPkg](_channel_.ipkg.md)*, msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `void`



*Defined in [channel.ts:57](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L57)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](_channel_.ipkg.md)   |  - |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `void`





___

<a id="serialize"></a>

###  serialize

► **serialize**(pkg?: *[IPkg](_channel_.ipkg.md)*): `any`



*Defined in [channel.ts:60](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L60)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](_channel_.ipkg.md)   |  - |





**Returns:** `any`





___

<a id="unpack"></a>

###  unpack

► **unpack**(msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `object`



*Defined in [channel.ts:59](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L59)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `object`





___


