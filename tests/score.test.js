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

    test('be added to', () => {
        expect(score.points()).toBe(0);

        score.add(12);

        expect(score.points()).toBe(12);
    });

    test('return overall score', () => {
        score.add(41);
        score.add(1);

        expect(score.points()).toBe(42);
    });

    test('add the correct amount to the score when a 3 tile vertical klax is scored', () => {
        const vertArr = [{}, {}, {}];
        score.pointsAmount = 10;
        score.addVerticalKlax(vertArr);

        expect(score.points()).toBe(10 + score.amounts.threeVertical);
    });

    test('add the correct amount to the score when a 4 tile vertical klax is scored', () => {
        const vertArr = [{}, {}, {}, {}];
        score.pointsAmount = 10;
        score.addVerticalKlax(vertArr);

        expect(score.points()).toBe(10 + score.amounts.fourVertical);
    });

    test('add the correct amount to the score when a 5 tile vertical klax is scored', () => {
        const verticalArr = [{}, {}, {}, {}, {}];
        score.pointsAmount = 10;
        score.addVerticalKlax(verticalArr);

        expect(score.points()).toBe(10 + score.amounts.fiveVertical);
    });

    test('add the correct amount to the score when a 3 tile horizontal klax is scored', () => {
        const horArr = [{}, {}, {}];
        score.pointsAmount = 10;
        score.addHorizontalKlax(horArr);

        expect(score.points()).toBe(10 + score.amounts.threeHorizontal);
    });

    test('add the correct amount to the score when a 4 tile horizontal klax is scored', () => {
        const horArr = [{}, {}, {}, {}];
        score.pointsAmount = 10;
        score.addHorizontalKlax(horArr);

        expect(score.points()).toBe(10 + score.amounts.fourHorizontal);
    });

    test('add the correct amount to the score when a 5 tile horizontal klax is scored', () => {
        const horArr = [{}, {}, {}, {}, {}];
        score.pointsAmount = 10;
        score.addHorizontalKlax(horArr);

        expect(score.points()).toBe(10 + score.amounts.fiveHorizontal);
    });

    test('add the correct amount to the score when a 3 tile diagonal klax is scored', () => {
        const diagonalArr = [{}, {}, {}];
        score.pointsAmount = 10;
        score.addDiagonalKlax(diagonalArr);

        expect(score.points()).toBe(10 + score.amounts.threeDiagonal);
    });

    test('add the correct amount to the score when a 4 tile diagonal klax is scored', () => {
        const diagonalArr = [{}, {}, {}, {}];
        score.pointsAmount = 10;
        score.addDiagonalKlax(diagonalArr);

        expect(score.points()).toBe(10 + score.amounts.fourDiagonal);
    });

    test('add the correct amount to the score when a 5 tile diagonal klax is scored', () => {
        const diagonalArr = [{}, {}, {}, {}, {}];
        score.pointsAmount = 10;
        score.addDiagonalKlax(diagonalArr);

        expect(score.points()).toBe(10 + score.amounts.fiveDiagonal);
    });
});
