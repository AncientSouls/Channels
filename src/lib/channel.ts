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
  /**
   * Some new data have gotten.
   */
  got: { data: any; channel: TChannel; };

  /**
   * Channel is ready to to getting.
   */
  ready: { channel: TChannel; };

  /**
   * Channel asked new data.
   */
  get: { data: any; channel: TChannel; };
}

export interface IChannelGetter<result extends any> {
  (): Promise<result>|result;
}

export interface IChannel<IEventsList extends IChannelEventsList> extends INode<IEventsList> {

  /**
   * Is data ready to getting / exists some data need to be send.
   */
  isReady: boolean;

  /**
   * Function, prepears data for `get()`.
   * @example
   * ```typescript
   * 
   * import {
   *   Channel,
   * } from 'ancient-channel/lib/channel';
   * 
   * const c = new Channel();
   * c.getter = () => 123
   * await c.get(); // undefined
   * c.ready();
   * await c.get(); // 123
   * await c.get(); // undefined
   * ```
   */
  getter?: IChannelGetter<any>;

  /**
   * Emit `got` event about new data.
   */
  got(data?: Promise<any>|any): void;
  /**
   * Emit `ready` event about reading for getting.
   */
  ready(): void;
  /**
   * Emit `get` event for asking new data.
   */
  get(): Promise<any>;
}

/**
 * Mixin your Node with Channel functionality.
 * @example
 * ```typescript
 * 
 * import { mixin, TChannel } from 'ancient-channel/lib/channel';
 * import { Node } from 'ancient-mixins/lib/node';
 * import { TClass } from 'ancient-mixins/lib/mixins';
 * const MixedManager: TClass<TChannel> = mixin(Node);
 * ```
 */
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
      this.isReady = true;
      this.emit('ready', { channel: this });
    }
    
    async get() {
      let data = undefined;
      if (this.isReady) {
        data = await this.getter();
        this.isReady = false;
      }
      this.emit('get', { data, channel: this });
      return data;
    }
  };
}

export const MixedChannel: TClass<IChannel<IChannelEventsList>> = mixin(Node);
/**
 * Already mixed class. Plug and play.
 */
export class Channel extends MixedChannel {}
