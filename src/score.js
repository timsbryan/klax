/* eslint-env p5js */
'use strict';

export default class Score {
  constructor() {
      this.pointsAmount = 0;
  }

  points() {
      return this.pointsAmount;
  }

  add(amount) {
    this.pointsAmount += amount;
  }
}