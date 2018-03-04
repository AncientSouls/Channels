[ancient-channels](../README.md) > [Channel](../classes/channel.md)



# Class: Channel

## Type parameters
#### IEventsList :  [IChannelEventsList](../interfaces/ichanneleventslist.md)
## Hierarchy


↳  [IChannel](../interfaces/ichannel.md)

**↳ Channel**







## Indexable

\[key: `string`\]:&nbsp;`any`
## Index

### Constructors

* [constructor](channel.md#constructor)


### Properties

* [destroy](channel.md#destroy)
* [emitter](channel.md#emitter)
* [generateId](channel.md#generateid)
* [id](channel.md#id)
* [isConnected](channel.md#isconnected)
* [isDestroyed](channel.md#isdestroyed)


### Methods

* [connect](channel.md#connect)
* [connected](channel.md#connected)
* [deserialize](channel.md#deserialize)
* [disconnect](channel.md#disconnect)
* [disconnected](channel.md#disconnected)
* [emit](channel.md#emit)
* [got](channel.md#got)
* [gotPkg](channel.md#gotpkg)
* [off](channel.md#off)
* [on](channel.md#on)
* [once](channel.md#once)
* [pack](channel.md#pack)
* [send](channel.md#send)
* [sendMsg](channel.md#sendmsg)
* [serialize](channel.md#serialize)
* [unpack](channel.md#unpack)



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

*Inherited from [IChannel](../interfaces/ichannel.md).[isConnected](../interfaces/ichannel.md#isconnected)*

*Defined in [lib/channel.ts:49](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L49)*





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



*Inherited from [IChannel](../interfaces/ichannel.md).[connect](../interfaces/ichannel.md#connect)*

*Defined in [lib/channel.ts:50](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L50)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="connected"></a>

### «Static» connected

► **connected**(pkg?: *[IPkg](../interfaces/ipkg.md)*, msg?: *[TMsg](../#tmsg)*): `void`



*Inherited from [IChannel](../interfaces/ichannel.md).[connected](../interfaces/ichannel.md#connected)*

*Defined in [lib/channel.ts:51](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L51)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/ipkg.md)   |  - |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `void`





___

<a id="deserialize"></a>

### «Static» deserialize

► **deserialize**(msg?: *[TMsg](../#tmsg)*): `any`



*Inherited from [IChannel](../interfaces/ichannel.md).[deserialize](../interfaces/ichannel.md#deserialize)*

*Defined in [lib/channel.ts:61](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L61)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `any`





___

<a id="disconnect"></a>

### «Static» disconnect

► **disconnect**(data?: *`any`*): `void`



*Inherited from [IChannel](../interfaces/ichannel.md).[disconnect](../interfaces/ichannel.md#disconnect)*

*Defined in [lib/channel.ts:52](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L52)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="disconnected"></a>

### «Static» disconnected

► **disconnected**(pkg?: *[IPkg](../interfaces/ipkg.md)*, msg?: *[TMsg](../#tmsg)*): `void`



*Inherited from [IChannel](../interfaces/ichannel.md).[disconnected](../interfaces/ichannel.md#disconnected)*

*Defined in [lib/channel.ts:53](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L53)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/ipkg.md)   |  - |
| msg | [TMsg](../#tmsg)   |  - |





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

► **got**(msg?: *[TMsg](../#tmsg)*): `void`



*Inherited from [IChannel](../interfaces/ichannel.md).[got](../interfaces/ichannel.md#got)*

*Defined in [lib/channel.ts:55](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L55)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `void`





___

<a id="gotpkg"></a>

### «Static» gotPkg

► **gotPkg**(pkg?: *[IPkg](../interfaces/ipkg.md)*, msg?: *[TMsg](../#tmsg)*): `void`



*Inherited from [IChannel](../interfaces/ichannel.md).[gotPkg](../interfaces/ichannel.md#gotpkg)*

*Defined in [lib/channel.ts:54](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L54)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/ipkg.md)   |  - |
| msg | [TMsg](../#tmsg)   |  - |





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

► **pack**(pkg?: *[IPkg](../interfaces/ipkg.md)*): `object`



*Inherited from [IChannel](../interfaces/ichannel.md).[pack](../interfaces/ichannel.md#pack)*

*Defined in [lib/channel.ts:58](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L58)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/ipkg.md)   |  - |





**Returns:** `object`





___

<a id="send"></a>

### «Static» send

► **send**(data?: *`any`*): `void`



*Inherited from [IChannel](../interfaces/ichannel.md).[send](../interfaces/ichannel.md#send)*

*Defined in [lib/channel.ts:56](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L56)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `any`   |  - |





**Returns:** `void`





___

<a id="sendmsg"></a>

### «Static» sendMsg

► **sendMsg**(pkg?: *[IPkg](../interfaces/ipkg.md)*, msg?: *[TMsg](../#tmsg)*): `void`



*Inherited from [IChannel](../interfaces/ichannel.md).[sendMsg](../interfaces/ichannel.md#sendmsg)*

*Defined in [lib/channel.ts:57](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L57)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/ipkg.md)   |  - |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `void`





___

<a id="serialize"></a>

### «Static» serialize

► **serialize**(pkg?: *[IPkg](../interfaces/ipkg.md)*): `any`



*Inherited from [IChannel](../interfaces/ichannel.md).[serialize](../interfaces/ichannel.md#serialize)*

*Defined in [lib/channel.ts:60](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L60)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| pkg | [IPkg](../interfaces/ipkg.md)   |  - |





**Returns:** `any`





___

<a id="unpack"></a>

### «Static» unpack

► **unpack**(msg?: *[TMsg](../#tmsg)*): `object`



*Inherited from [IChannel](../interfaces/ichannel.md).[unpack](../interfaces/ichannel.md#unpack)*

*Defined in [lib/channel.ts:59](https://github.com/AncientSouls/Channels/blob/99cb13c/src/lib/channel.ts#L59)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| msg | [TMsg](../#tmsg)   |  - |





**Returns:** `object`





___

