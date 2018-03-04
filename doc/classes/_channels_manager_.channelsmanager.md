[ancient-channels](../README.md) > ["channels-manager"](../modules/_channels_manager_.md) > [ChannelsManager](../classes/_channels_manager_.channelsmanager.md)



# Class: ChannelsManager

## Type parameters
#### IN :  [TChannel](../modules/_channel_.md#tchannel)
#### IEventsList :  [IChannelsManagerEventsList](../interfaces/_channels_manager_.ichannelsmanagereventslist.md)
## Hierarchy


↳  [IChannelsManager](../interfaces/_channels_manager_.ichannelsmanager.md)

**↳ ChannelsManager**







## Indexable

\[key: `string`\]:&nbsp;`any`
## Index

### Constructors

* [constructor](_channels_manager_.channelsmanager.md#constructor)


### Properties

* [Node](_channels_manager_.channelsmanager.md#node)
* [destroy](_channels_manager_.channelsmanager.md#destroy)
* [emitter](_channels_manager_.channelsmanager.md#emitter)
* [generateId](_channels_manager_.channelsmanager.md#generateid)
* [id](_channels_manager_.channelsmanager.md#id)
* [isDestroyed](_channels_manager_.channelsmanager.md#isdestroyed)
* [nodes](_channels_manager_.channelsmanager.md#nodes)


### Methods

* [add](_channels_manager_.channelsmanager.md#add)
* [create](_channels_manager_.channelsmanager.md#create)
* [emit](_channels_manager_.channelsmanager.md#emit)
* [off](_channels_manager_.channelsmanager.md#off)
* [on](_channels_manager_.channelsmanager.md#on)
* [once](_channels_manager_.channelsmanager.md#once)
* [remove](_channels_manager_.channelsmanager.md#remove)
* [wrap](_channels_manager_.channelsmanager.md#wrap)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new ChannelsManager**(id?: *`string`*): `any`


*Inherited from INode.__new*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/node.d.ts:11*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |





**Returns:** `any`

---


## Properties
<a id="node"></a>

### «Static» Node

**●  Node**:  *`TClass`.<`IN`>* 

*Inherited from IManager.Node*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/manager.d.ts:13*





___

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

<a id="isdestroyed"></a>

### «Static» isDestroyed

**●  isDestroyed**:  *`boolean`* 

*Inherited from INode.isDestroyed*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/node.d.ts:14*





___

<a id="nodes"></a>

### «Static» nodes

**●  nodes**:  *`object`* 

*Inherited from IManager.nodes*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/manager.d.ts:14*


#### Type declaration


[id: `string`]: `IN`






___


## Methods
<a id="add"></a>

### «Static» add

► **add**(node: *`IN`*): `this`



*Inherited from IManager.add*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/manager.d.ts:17*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| node | `IN`   |  - |





**Returns:** `this`





___

<a id="create"></a>

### «Static» create

► **create**(id?: *`string`*): `IN`



*Inherited from IManager.create*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/manager.d.ts:20*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| id | `string`   |  - |





**Returns:** `IN`





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

<a id="remove"></a>

### «Static» remove

► **remove**(node: *`IN`*): `this`



*Inherited from IManager.remove*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/manager.d.ts:19*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| node | `IN`   |  - |





**Returns:** `this`





___

<a id="wrap"></a>

### «Static» wrap

► **wrap**(node: *`IN`*): `this`



*Inherited from IManager.wrap*

*Defined in /home/ubuntu/workspace/dev/packages/ancient-channels/node_modules/ancient-mixins/lib/manager.d.ts:18*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| node | `IN`   |  - |





**Returns:** `this`





___

