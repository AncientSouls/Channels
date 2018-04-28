import {
  TClass,
  IInstance,
} from 'ancient-mixins/lib/mixins';

import {
  Node,
  INode,
  INodeEventsList,
} from 'ancient-mixins/lib/node';

export type TChannel = IChannel<IChannelEventsList>;

export interface IChannelEventsList extends INodeEventsList {
  got: { data: any; channel: TChannel; };
  ready: { channel: TChannel; };
  get: { data: any; channel: TChannel; };
}

export interface IChannelGetter<result extends any> {
  (): Promise<result>|result;
}

export interface IChannel<IEventsList extends IChannelEventsList> extends INode<IEventsList> {
  isReading: boolean;
  getter?: IChannelGetter<any>;

  got(data?: Promise<any>|any): void;
  ready(): void;
  get(): Promise<any>;
}

export function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class Channel extends superClass {
    getter = () => undefined;
    
    async got(data?)  {
      const _data = await data;
      this.emit('got', { data: _data, channel: this });
    }
    
    ready() {
      this.isReading = true;
      this.emit('ready', { channel: this });
    }
    
    async get() {
      let data = undefined;
      if (this.isReading) {
        data = await this.getter();
        this.isReading = false;
      }
      this.emit('get', { data, channel: this });
      return data;
    }
  };
}

export const MixedChannel: TClass<IChannel<IChannelEventsList>> = mixin(Node);
export class Channel extends MixedChannel {}
