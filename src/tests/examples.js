import { assert } from 'chai';
import crypto from 'crypto';
import sinon from 'sinon';

import { Channel } from '../lib/index';

function generatorString() {
    return crypto.randomBytes(20).toString('hex');
}

export default function () {
    describe('Examples:', () => {
        describe('Two local channels:', () => {
            var channel_1 = null;
            var channel_2 = null;

            beforeEach(() => {
                channel_1 = new Channel(null, null, sinon.spy(), (pkg) => {
                    channel_2.got(pkg);
                });

                channel_2 = new Channel(null, null, sinon.spy(), (pkg) => {
                    channel_1.got(pkg);
                });

                channel_2.connect(true);
                channel_1.connect(true);
            });

            it('Connection', () => {
                assert.equal(channel_1.sharedKey, channel_2.sharedKey);
                assert.isTrue(channel_1.isConnected);
                assert.isTrue(channel_2.isConnected);
            });

            it('Disconnection', () => {
                channel_1.disconnect();
                assert.isFalse(channel_1.isConnected);
                assert.isFalse(channel_2.isConnected);
            });

            it('Data transfer', () => {
                var pkg = generatorString();
                channel_1.send(pkg);
                assert.isTrue(channel_2.gotPackage.calledWithExactly(channel_2, pkg));
            });
        });
    });
}