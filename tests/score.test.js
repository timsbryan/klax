/* eslint-env jest */
'use strict';

import Score from '../src/score.js';

describe('The score should', () => {
    let score;

    beforeEach(() => {
        score = new Score();
    });

    test('be set up with no points to start with', () => {
        expect(score.points()).toBe(0);
    });

    test('be able to be added to', () => {
        expect(score.points()).toBe(0);

        score.add(12);

        expect(score.points()).toBe(12);
    });
  });
