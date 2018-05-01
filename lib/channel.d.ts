import { TClass, IInstance } from 'ancient-mixins/lib/mixins';
import { INode, INodeEventsList } from 'ancient-mixins/lib/node';
export declare type TChannel = IChannel<IChannelEventsList>;
export interface IChannelEventsList extends INodeEventsList {
    got: {
        data: any;
        channel: TChannel;
    };
    ready: {
        channel: TChannel;
    };
    get: {
        data: any;
        channel: TChannel;
    };
}
export interface IChannelGetter<result extends any> {
    (): Promise<result> | result;
}
export interface IChannel<IEventsList extends IChannelEventsList> extends INode<IEventsList> {
    isReady: boolean;
    getter?: IChannelGetter<any>;
    got(data?: Promise<any> | any): void;
    ready(): void;
    get(): Promise<any>;
}
export declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
export declare const MixedChannel: TClass<IChannel<IChannelEventsList>>;
export declare class Channel extends MixedChannel {
}
