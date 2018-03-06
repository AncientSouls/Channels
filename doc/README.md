
# Ancient Channels

Abstract modular channels concept.

[![NPM](https://img.shields.io/npm/v/ancient-channels.svg)](https://www.npmjs.com/package/ancient-channels)
[![Build Status](https://travis-ci.org/AncientSouls/Channels.svg?branch=master)](https://travis-ci.org/AncientSouls/Channels)
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://ancientsouls.github.io/)


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

*Defined in [channel.ts:12](https://github.com/AncientSouls/Channels/blob/f1a8a5b/src/lib/channel.ts#L12)*





___

<a id="tchannelsmanager"></a>

###  TChannelsManager

**Τ TChannelsManager**:  *[IChannelsManager](interfaces/ichannelsmanager.md)[TChannel](#tchannel), [IChannelsManagerEventsList](interfaces/ichannelsmanagereventslist.md)* 

*Defined in [channels-manager.ts:22](https://github.com/AncientSouls/Channels/blob/f1a8a5b/src/lib/channels-manager.ts#L22)*





___

<a id="tmsg"></a>

###  TMsg

**Τ TMsg**:  *`string`* 

*Defined in [channel.ts:29](https://github.com/AncientSouls/Channels/blob/f1a8a5b/src/lib/channel.ts#L29)*





___


# Variables
<a id="mixedchannel"></a>

### «Const» MixedChannel

**●  MixedChannel**:  *`TClass`.<[IChannel](interfaces/ichannel.md)[IChannelEventsList](interfaces/ichanneleventslist.md)>*  =  mixin(Node)

*Defined in [channel.ts:153](https://github.com/AncientSouls/Channels/blob/f1a8a5b/src/lib/channel.ts#L153)*





___

<a id="mixedchannelsmanager"></a>

### «Const» MixedChannelsManager

**●  MixedChannelsManager**:  *`TClass`.<[TChannelsManager](#tchannelsmanager)>*  =  mixin(Manager)

*Defined in [channels-manager.ts:51](https://github.com/AncientSouls/Channels/blob/f1a8a5b/src/lib/channels-manager.ts#L51)*





___


# Functions
<a id="createlocaltransport"></a>

###  createLocalTransport

► **createLocalTransport**(channel1: *[IChannel](interfaces/ichannel.md)[IChannelEventsList](interfaces/ichanneleventslist.md)*, channel2: *[IChannel](interfaces/ichannel.md)[IChannelEventsList](interfaces/ichanneleventslist.md)*): `void`



*Defined in [create-local-transport.ts:6](https://github.com/AncientSouls/Channels/blob/f1a8a5b/src/lib/create-local-transport.ts#L6)*



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



*Defined in [channel.ts:64](https://github.com/AncientSouls/Channels/blob/f1a8a5b/src/lib/channel.ts#L64)*



**Type parameters:**

#### T :  `TClass`.<`IInstance`>
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| superClass | `T`   |  - |





**Returns:** `any`





___


