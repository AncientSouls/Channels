import {
	IChannel,
	IChannelEventsList,
} from './channel';

function createLocalTransport(
	channel1: IChannel<IChannelEventsList>,
	channel2: IChannel<IChannelEventsList>,
) {
  channel1.on('send', ({ msg }) => channel2.got(msg));
  channel2.on('send', ({ msg }) => channel1.got(msg));

  channel1.connect();
}

export default createLocalTransport;
