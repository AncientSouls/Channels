import { assert } from 'chai';
import sinon from 'sinon';

import { Manager } from '../lib/index';

import channelConnected from './manager/channelConnected';

export default function () {
    describe('Class Manager:', () => {
        describe('Adapter registration:', () => {
            it('onConnected()', () => {
                var spy = sinon.spy();
                var manager = new Manager(spy, null, null);
                manager.onConnected();
                assert.isTrue(spy.called);
            });

            it('onDisconnected()', () => {
                var spy = sinon.spy();
                var manager = new Manager(null, spy, null);
                manager.onDisconnected();
                assert.isTrue(spy.called);
            });

            it('gotPackage()', () => {
                var spy = sinon.spy();
                var manager = new Manager(null, null, spy);
                manager.gotPackage();
                assert.isTrue(spy.called);
            });
        });

        describe('Function check:', () => {
            channelConnected();
        });
    });
}