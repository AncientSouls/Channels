"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();
const channel_1 = require("./channel");
const channels_manager_1 = require("./channels-manager");
const create_local_transport_1 = require("./create-local-transport");
describe('AncientSouls/Channels:', () => {
    channel_1.default();
    channels_manager_1.default();
    create_local_transport_1.default();
});
//# sourceMappingURL=index.js.map