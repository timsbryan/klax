
/* eslint-env jest */
'use strict';

import Bin from '../src/bin.js';

const config = {
    'speed': 2,
    'lanes': 5,
    'tileSize': 4
};

describe('The bin should', () => {
    let bin;

    beforeEach(() => {
        bin = new Bin(config);
    });

    test('be setup with some default', () => {
        expect(bin).toEqual({
          'bin': [
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ],
        'cols': 5,
        'config': config,
        'rows': 5,
        'tileHeight': 30,
        'tileWidth': 4
        });
    });
});