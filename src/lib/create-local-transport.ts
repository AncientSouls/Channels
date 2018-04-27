import {
	IChannel,
	IChannelEventsList,
} from './channel';

function createLocalTransport(
	channel1: IChannel<IChannelEventsList>,
	channel2: IChannel<IChannelEventsList>,
) {
  channel1.on('send', ({ channel }) => channel2.got(channel.get()));
  channel2.on('send', ({ channel }) => channel1.got(channel.get()));
}

export default createLocalTransport;
