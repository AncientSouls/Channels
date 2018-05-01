# Ancient Channels

Abstract modular channels concept.

[![NPM](https://img.shields.io/npm/v/ancient-channels.svg)](https://www.npmjs.com/package/ancient-channels)
[![Build Status](https://travis-ci.org/AncientSouls/Channels.svg?branch=master)](https://travis-ci.org/AncientSouls/Channels)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b78123b90d434029b9a9a6d2089b17b8)](https://www.codacy.com/app/ivansglazunov/Channels?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=AncientSouls/Channels&amp;utm_campaign=Badge_Grade)
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://ancientsouls.github.io/)

## Install

```
npm i --save ancient-channel
```
## About 

Usually channels, sockets or queries send data when it is ready. That means, when connection does not exist, data for sending need to be stacked or ignored. We divided this process by three stages:
1. `channel.ready()`. The moment when the need / possibility to send data became known. This should not necessarily means that we know what data is or sending should be triggered. If the communication architecture allows you to notify other side immediately - the second stage will start immediately. With a one-side or not stable connection, this can happen, for example, when `channel.get()` called.
2. `channel.get()` The moment when we can send some data. Transport environment asks what you can / need to send now.
3. `channe.got()` On the other side of the channel, the transport environment reports that some data has been received.

## Example

```js
import {
  Channel,
} from 'ancient-channel/lib/channel';

const start = async () => {
  const ch = new Channel();
  const data = { num: 123 };

  ch.getter = () => data;
  ch.on('get', ({ channel, data }) => data.num += data.num);

  await ch.get(); // undefined
  ch.ready();
  await ch.get(); // 246
}
start();
```