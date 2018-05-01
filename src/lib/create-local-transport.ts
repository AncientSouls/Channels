import {
	IChannel,
	IChannelEventsList,
} from './channel';

/**
 * Two-side transport for channels. `Ready` event from one side emmits getting data for other side. It looks like transport for sockets.
 */
function createLocalTransport(
	channel1: IChannel<IChannelEventsList>,
	channel2: IChannel<IChannelEventsList>,
) {
  channel1.on('ready', ({ channel }) => channel2.got(channel.get()));
  channel2.on('ready', ({ channel }) => channel1.got(channel.get()));
}

export default createLocalTransport;
