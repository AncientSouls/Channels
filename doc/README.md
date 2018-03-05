
# Ancient Souls

#### About urgent trends
Standards, protocols and libraries are usually implemented for a specific task, taking into account the minimum required capacity in strict dependence on the situation. Because of this, the expansion and flexible application of such solutions is very expensive or impossible.

##### Reason.

If you perceive any business or project as a tree, then today usually first come up with the leaves of the project, and under them try to grow branches to the ground. This leads to the fact that if the leaves need more to do almost the full path from the top down or create crutches in the architecture.

##### Solution

Grow roots. To the extent possible, if we can add an exclusively decorative (layout, final logic, content, adapters) code to get the final product, create it. Do not create projects where basic logic will require more than 10% additional code. The process of creating root, fundamental capabilities, potential opportunities must be based on the algorithm for finding duplicate potentials, and not from the need to create any final product.

We conduct research and identify the most repetitive conceptual patterns in different modules used in one application, we study the reasons why these concepts are duplicated. We create a flexible modular implementation allowing with minimal additions to get from it the same effect with much more flexibility.

We believe that having such opportunities, we can start and create, potentially, at least 250% more end products.

#### Our mission
Creating modules with the widest possible application potential.

- If subscribing to changes, then without dependence on the method, protocol or data structure, with the ability to determine these factors is absolutely free.
- If the communication system is applicable for the transmission of any type of content, with any degree of synchronization and using any communication protocol, the same one programm interface.
- If the mounting concept, then fully reactively, without dependence to language, source type or execution platform

#### Comparison
Existing systems vs possible assemblies based on our abstractions.

- meteor.js subscribe/publish = [[Peer]]+[[Channels]]+[[Cursor]] (80%) + adapters (20%)
- webpack = [[Funicular]]+[[Cursor]] (80%) + adapters (20%)
- react = [[Funicular]]+[[Cursor]] (50%) + dom/string generator
- meteor.js minimongo = [[Cursor]] + mingo
- meteor.js methods = [[Peer]]+[[Channels]]+[[Cursor]] (95%)

#### Road

- [https://github.com/AncientSouls/Cursor](Cursor) - Abstract container of data synchronization.
- [https://github.com/AncientSouls/Channels](Channels) - Abstract modular channels concept.
  - Still need to create many adapters for popular communication protocols.
- [https://github.com/AncientSouls/Peer](Peer) - Friendly core of interaction of peers.
- [https://github.com/AncientSouls/Funicular](Funicular) - Abstract hierarchical life cycle of the mount.
  - Still need to create adapters for specific formats of executable data (js / css / html / static ... + compilatable formats as coffee / ts ...)
- Coming soon: SQL tracking of change of SELECT results, without client data meaning
- Coming soon: SQL graph store model (based on many models as nested sets and others...) with support recursives and multiparents, may be adaptive to data... may be

#### We invite you!

We are looking for those who share our values, and those who can reasonably criticize and challenge them. If you are one of these people, please write us an issue and post with any thoughts, questions and ideas.


## Index

### Enumerations

* [PackageType](enums/packagetype.md)


### Classes

* [Channel](classes/channel.md)
* [ChannelsManager](classes/channelsmanager.md)


### Interfaces

* [IChannel](interfaces/ichannel.md)
* [IChannelEventsList](interfaces/ichanneleventslist.md)
* [IChannelPkgEventData](interfaces/ichannelpkgeventdata.md)
* [IChannelsManager](interfaces/ichannelsmanager.md)
* [IChannelsManagerEventData](interfaces/ichannelsmanagereventdata.md)
* [IChannelsManagerEventsList](interfaces/ichannelsmanagereventslist.md)
* [IPkg](interfaces/ipkg.md)
* [IPkgSectionChannel](interfaces/ipkgsectionchannel.md)


### Type aliases

* [TChannel](#tchannel)
* [TChannelsManager](#tchannelsmanager)
* [TMsg](#tmsg)


### Variables

* [MixedChannel](#mixedchannel)
* [MixedChannelsManager](#mixedchannelsmanager)


### Functions

* [createLocalTransport](#createlocaltransport)
* [mixin](#mixin)



---
# Type aliases
<a id="tchannel"></a>

###  TChannel

**Τ TChannel**:  *[IChannel](interfaces/ichannel.md)[IChannelEventsList](interfaces/ichanneleventslist.md)* 

*Defined in [channel.ts:12](https://github.com/AncientSouls/Channels/blob/7f76999/src/lib/channel.ts#L12)*





___

<a id="tchannelsmanager"></a>

###  TChannelsManager

**Τ TChannelsManager**:  *[IChannelsManager](interfaces/ichannelsmanager.md)[TChannel](#tchannel), [IChannelsManagerEventsList](interfaces/ichannelsmanagereventslist.md)* 

*Defined in [channels-manager.ts:22](https://github.com/AncientSouls/Channels/blob/7f76999/src/lib/channels-manager.ts#L22)*





___

<a id="tmsg"></a>

###  TMsg

**Τ TMsg**:  *`string`* 

*Defined in [channel.ts:29](https://github.com/AncientSouls/Channels/blob/7f76999/src/lib/channel.ts#L29)*





___


# Variables
<a id="mixedchannel"></a>

### «Const» MixedChannel

**●  MixedChannel**:  *`TClass`.<[IChannel](interfaces/ichannel.md)[IChannelEventsList](interfaces/ichanneleventslist.md)>*  =  mixin(Node)

*Defined in [channel.ts:153](https://github.com/AncientSouls/Channels/blob/7f76999/src/lib/channel.ts#L153)*





___

<a id="mixedchannelsmanager"></a>

### «Const» MixedChannelsManager

**●  MixedChannelsManager**:  *`TClass`.<[TChannelsManager](#tchannelsmanager)>*  =  mixin(Manager)

*Defined in [channels-manager.ts:51](https://github.com/AncientSouls/Channels/blob/7f76999/src/lib/channels-manager.ts#L51)*





___


# Functions
<a id="createlocaltransport"></a>

###  createLocalTransport

► **createLocalTransport**(channel1: *[IChannel](interfaces/ichannel.md)[IChannelEventsList](interfaces/ichanneleventslist.md)*, channel2: *[IChannel](interfaces/ichannel.md)[IChannelEventsList](interfaces/ichanneleventslist.md)*): `void`



*Defined in [create-local-transport.ts:6](https://github.com/AncientSouls/Channels/blob/7f76999/src/lib/create-local-transport.ts#L6)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| channel1 | [IChannel](interfaces/ichannel.md)[IChannelEventsList](interfaces/ichanneleventslist.md)   |  - |
| channel2 | [IChannel](interfaces/ichannel.md)[IChannelEventsList](interfaces/ichanneleventslist.md)   |  - |





**Returns:** `void`





___

<a id="mixin"></a>

###  mixin

► **mixin**T(superClass: *`T`*): `any`



*Defined in [channel.ts:64](https://github.com/AncientSouls/Channels/blob/7f76999/src/lib/channel.ts#L64)*



**Type parameters:**

#### T :  `TClass`.<`IInstance`>
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| superClass | `T`   |  - |





**Returns:** `any`





___


