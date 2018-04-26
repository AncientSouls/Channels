import { TClass, IInstance } from 'ancient-mixins/lib/mixins';
import { INode, INodeEventsList } from 'ancient-mixins/lib/node';
export declare type TChannel = IChannel<IChannelEventsList>;
export declare enum PackageType {
    Disconnect = 1,
    Connect = 2,
    Package = 3,
}
export interface IPkgSectionChannel {
    type: PackageType;
}
export interface IPkg {
    channel: IPkgSectionChannel;
    data: any;
}
export declare type TMsg = string;
export interface IChannelPkgEventData {
    channel: TChannel;
    pkg?: IPkg;
    msg?: TMsg;
}
export interface IChannelEventsList extends INodeEventsList {
    connect: IChannelPkgEventData;
    connected: IChannelPkgEventData;
    disconnect: IChannelPkgEventData;
    disconnected: IChannelPkgEventData;
    got: IChannelPkgEventData;
    send: IChannelPkgEventData;
    pack: IChannelPkgEventData;
    unpack: IChannelPkgEventData;
}
export interface IChannel<IEventsList extends IChannelEventsList> extends INode<IEventsList> {
    isConnected: boolean;
    connect(data?: any): void;
    connected(pkg?: IPkg, msg?: TMsg): void;
    disconnect(data?: any): void;
    disconnected(pkg?: IPkg, msg?: TMsg): void;
    gotPkg(pkg?: IPkg, msg?: TMsg): void;
    got(msg?: TMsg): void;
    send(data?: any): void;
    sendMsg(pkg?: IPkg, msg?: TMsg): void;
    pack(pkg?: IPkg): {
        pkg: IPkg;
        msg: TMsg;
    };
    unpack(msg?: TMsg): {
        pkg: IPkg;
        msg: TMsg;
    };
    serialize(pkg?: IPkg): any;
    deserialize(msg?: TMsg): any;
}
export declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
export declare const MixedChannel: TClass<IChannel<IChannelEventsList>>;
export declare class Channel extends MixedChannel {
}
