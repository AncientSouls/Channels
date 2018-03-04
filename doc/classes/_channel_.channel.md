[ancient-channels](../README.md) > ["channel"](../modules/_channel_.md) > [Channel](../classes/_channel_.channel.md)



# Class: Channel

## Type parameters
#### IEventsList :  [IChannelEventsList](../interfaces/_channel_.ichanneleventslist.md)
## Hierarchy


↳  [IChannel](../interfaces/_channel_.ichannel.md)

**↳ Channel**







## Indexable

\[key: `string`\]:&nbsp;`any`
## Index

### Constructors

* [constructor](_channel_.channel.md#constructor)


### Properties

* [destroy](_channel_.channel.md#destroy)
* [emitter](_channel_.channel.md#emitter)
* [generateId](_channel_.channel.md#generateid)
* [id](_channel_.channel.md#id)
* [isConnected](_channel_.channel.md#isconnected)
* [isDestroyed](_channel_.channel.md#isdestroyed)


### Methods

* [connect](_channel_.channel.md#connect)
* [connected](_channel_.channel.md#connected)
* [deserialize](_channel_.channel.md#deserialize)
* [disconnect](_channel_.channel.md#disconnect)
* [disconnected](_channel_.channel.md#disconnected)
* [emit](_channel_.channel.md#emit)
* [got](_channel_.channel.md#got)
* [gotPkg](_channel_.channel.md#gotpkg)
* [off](_channel_.channel.md#off)
* [on](_channel_.channel.md#on)
* [once](_channel_.channel.md#once)
* [pack](_channel_.channel.md#pack)
* [send](_channel_.channel.md#send)
* [sendMsg](_channel_.channel.md#sendmsg)
* [serialize](_channel_.channel.md#serialize)
* [unpack](_channel_.channel.md#unpack)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Channel**(id?: *`string`*): `any`


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

### «Static» destroy

**●  destroy**:  *`function`* 

*Inherited from INode.destroy*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/node.d.ts:15*


#### Type declaration
►(): `void`





**Returns:** `void`






___

<a id="emitter"></a>

### «Static» emitter

**●  emitter**:  *`EventEmitter`* 

*Inherited from IEvents.emitter*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/events.d.ts:5*





___

<a id="generateid"></a>

### «Static» generateId

**●  generateId**:  *`function`* 

*Inherited from INode.generateId*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/node.d.ts:13*


#### Type declaration
►(): `string`





**Returns:** `string`






___

<a id="id"></a>

### «Static» id

**●  id**:  *`string`* 

*Inherited from INode.id*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/node.d.ts:11*





___

<a id="isconnected"></a>

### «Static» isConnected

**●  isConnected**:  *`boolean`* 

*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[isConnected](../interfaces/_channel_.ichannel.md#isconnected)*

*Defined in [channel.ts:49](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L49)*





___

<a id="isdestroyed"></a>

### «Static» isDestroyed

**●  isDestroyed**:  *`boolean`* 

*Inherited from INode.isDestroyed*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/node.d.ts:14*





___


## Methods
<a id="connect"></a>

### «Static» connect

► **connect**(data?: *`any`*): `void`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[connect](../interfaces/_channel_.ichannel.md#connect)*

*Defined in [channel.ts:50](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L50)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="connected"></a>

### «Static» connected

► **connected**(pkg?: *[IPkg](../interfaces/_channel_.ipkg.md)*, msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `void`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[connected](../interfaces/_channel_.ichannel.md#connected)*

*Defined in [channel.ts:51](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L51)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/_channel_.ipkg.md)   |  - |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `void`





___

<a id="deserialize"></a>

### «Static» deserialize

► **deserialize**(msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `any`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[deserialize](../interfaces/_channel_.ichannel.md#deserialize)*

*Defined in [channel.ts:61](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L61)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `any`





___

<a id="disconnect"></a>

### «Static» disconnect

► **disconnect**(data?: *`any`*): `void`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[disconnect](../interfaces/_channel_.ichannel.md#disconnect)*

*Defined in [channel.ts:52](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L52)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="disconnected"></a>

### «Static» disconnected

► **disconnected**(pkg?: *[IPkg](../interfaces/_channel_.ipkg.md)*, msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `void`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[disconnected](../interfaces/_channel_.ichannel.md#disconnected)*

*Defined in [channel.ts:53](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L53)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/_channel_.ipkg.md)   |  - |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `void`





___

<a id="emit"></a>

### «Static» emit

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

### «Static» got

► **got**(msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `void`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[got](../interfaces/_channel_.ichannel.md#got)*

*Defined in [channel.ts:55](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L55)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `void`





___

<a id="gotpkg"></a>

### «Static» gotPkg

► **gotPkg**(pkg?: *[IPkg](../interfaces/_channel_.ipkg.md)*, msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `void`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[gotPkg](../interfaces/_channel_.ichannel.md#gotpkg)*

*Defined in [channel.ts:54](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L54)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/_channel_.ipkg.md)   |  - |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `void`





___

<a id="off"></a>

### «Static» off

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

### «Static» on

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

### «Static» once

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

### «Static» pack

► **pack**(pkg?: *[IPkg](../interfaces/_channel_.ipkg.md)*): `object`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[pack](../interfaces/_channel_.ichannel.md#pack)*

*Defined in [channel.ts:58](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L58)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/_channel_.ipkg.md)   |  - |





**Returns:** `object`





___

<a id="send"></a>

### «Static» send

► **send**(data?: *`any`*): `void`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[send](../interfaces/_channel_.ichannel.md#send)*

*Defined in [channel.ts:56](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L56)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="sendmsg"></a>

### «Static» sendMsg

► **sendMsg**(pkg?: *[IPkg](../interfaces/_channel_.ipkg.md)*, msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `void`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[sendMsg](../interfaces/_channel_.ichannel.md#sendmsg)*

*Defined in [channel.ts:57](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L57)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/_channel_.ipkg.md)   |  - |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `void`





___

<a id="serialize"></a>

### «Static» serialize

► **serialize**(pkg?: *[IPkg](../interfaces/_channel_.ipkg.md)*): `any`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[serialize](../interfaces/_channel_.ichannel.md#serialize)*

*Defined in [channel.ts:60](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L60)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/_channel_.ipkg.md)   |  - |





**Returns:** `any`





___

<a id="unpack"></a>

### «Static» unpack

► **unpack**(msg?: *[TMsg](../modules/_channel_.md#tmsg)*): `object`



*Inherited from [IChannel](../interfaces/_channel_.ichannel.md).[unpack](../interfaces/_channel_.ichannel.md#unpack)*

*Defined in [channel.ts:59](https://github.com/AncientSouls/Channels/blob/c946d43/src/lib/channel.ts#L59)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../modules/_channel_.md#tmsg)   |  - |





**Returns:** `object`





___


