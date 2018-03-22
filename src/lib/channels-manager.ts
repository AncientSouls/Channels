import * as _ from 'lodash';

import {
  TClass,
  IInstance,
} from 'ancient-mixins/lib/mixins';

import {
  Manager,
  IManager,
  IManagerEventsList,
} from 'ancient-mixins/lib/manager';

import {
  Channel,
  IChannel,
  IChannelEventsList,
  IChannelPkgEventData,
  TChannel,
} from './channel';

type TChannelsManager = IChannelsManager<TChannel, IChannelsManagerEventsList>;

interface IChannelsManagerEventData extends IChannelPkgEventData {
  node?: TChannel;
  manager: TChannelsManager;
}

interface IChannelsManagerEventManagerData {
  node: TChannel;
  manager: TChannelsManager;
}

interface IChannelsManagerEventsList extends IManagerEventsList {
  connect: IChannelsManagerEventData;
  connected: IChannelsManagerEventData;
  disconnect: IChannelsManagerEventData;
  disconnected: IChannelsManagerEventData;
  got: IChannelsManagerEventData;
  send: IChannelsManagerEventData;
  pack: IChannelsManagerEventData;
  unpack: IChannelsManagerEventData;
  added: IChannelsManagerEventManagerData;
  removed: IChannelsManagerEventManagerData;
}

interface IChannelsManager
<IN extends TChannel, IEventsList extends IChannelsManagerEventsList>
extends IManager<IN, IEventsList> {}

function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class ChannelsManager extends superClass {
    public Node = Channel;
  };
}

const MixedChannelsManager: TClass<TChannelsManager> = mixin(Manager);
class ChannelsManager extends MixedChannelsManager {}

export {
  mixin as default,
  mixin,
  MixedChannelsManager,
  ChannelsManager,
  IChannelsManager,
  IChannelsManagerEventData,
  IChannelsManagerEventManagerData,
  IChannelsManagerEventsList,
  TChannelsManager,
};
