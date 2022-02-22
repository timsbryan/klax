/* eslint-env p5js */
'use strict';

export default class Score {
  constructor() {
      this.pointsAmount = 0;

      this.amounts = {
        paddle: 5,
        threeVertical: 50,
        fourVertical: 10000,
        fiveVertical: 15000,
        threeHorizontal: 1000,
        fourHorizontal: 5000,
        fiveHorizontal: 10000,
        threeDiagonal: 5000,
        fourDiagonal: 10000,
        fiveDiagonal: 20000
      };
  }

  points() {
      return this.pointsAmount;
  }

  add(amount) {
    this.pointsAmount += amount;
  }

  addVerticalKlax(vklax) {
    if (vklax.length === 3) {
      this.add(this.amounts.threeVertical);
    } else if (vklax.length === 4) {
      this.add(this.amounts.fourVertical);
    } else if (vklax.length === 5) {
      this.add(this.amounts.fiveVertical);
    } else {
      throw new Error(`Unexpected vertical klax length: ${vklax.length}`);
    }
  }

  addHorizontalKlax(hklax) {
    if (hklax.length === 3) {
      this.add(this.amounts.threeHorizontal);
    } else if (hklax.length === 4) {
      this.add(this.amounts.fourHorizontal);
    } else if (hklax.length === 5) {
      this.add(this.amounts.fiveHorizontal);
    } else {
      throw new Error(`Unexpected horizontal klax length: ${hklax.length}`);
    }
  }

  addDiagonalKlax(dklax) {
    if (dklax.length === 3) {
      this.add(this.amounts.threeDiagonal);
    } else if (dklax.length === 4) {
      this.add(this.amounts.fourDiagonal);
    } else if (dklax.length === 5) {
      this.add(this.amounts.fiveDiagonal);
    } else {
      throw new Error(`Unexpected horizontal klax length: ${dklax.length}`);
    }
  }

  draw() {
    push();
    fill(255);
    textSize(32);
    text(this.points(), 10, 30);
    pop();
  }
}

/*
* When tile falls on to paddle, 5 points */

/* Vertical Klax
* 3 vertical tiles, 50 points
* 4 Vertical tiles, 10,000 points
* 5 Vertical tiles, 15,000 points
*/

/* Horizontal Klax
* 3 Horizontal Klax, 1,000 points.
* 4 Horizontal Klax, 5,000 points.
* 5 Horizontal Klax, 10,000 points.
*/

/* Diagonal Klax
* 3 Diagonal Klax, 5,000 points.
* 4 Diagonal Klax, 10,000 points.
* 5 Diagonal Klax, 20,000 points.
*/

/* Other Klax
* Large 'X' Klax, 80,000 points.
* Big Sandwich, 100,000 - 440,000 points.
Big Sandwich:
    G
    B
    B
    V
R Y   Y B
R Y   Y B
G G   G G
R Y B Y B
R Y B Y B

Drop all tiles off paddle in quick succession
*/

/* Warp bonuses
* Warping 5 levels, 100,000 points
* Warping 10 levels, 200,000 points
* Warping to level 50 via the X, 500,000 points
* ??? You'll generally get more points just working through the levels:
1000*(horizontals required) + 5000*(diagonals) + (points wave requirement)
is the minimum for each 5-set and on levels 1-5 the action is so slow that you can create some
pretty big combinations with a bit of thought and practice.
*/

/* End of level bonuses
* Each space left, 200 points
* Each block on belt, 25 points
* ??? If they just fell off but didn't disappear, you get points for them, too.
And you don't get a strike against you.

/* Combinations
* ??? A big key to gaining points in Klax will be combinations. These occur when
you have several klaxes at once. You can also manufacture a combination by
dropping one klax and then another while the first is matching up. The rule
for combinations is as follows:
(# of combinations up til then) * (total # of points for the klaxes)

* ??? Also you can have two klaxes happening at once, but if you drop one tile
for a klax and then drop another for what looks like a klax, the game shifts
tiles before calculating things.
*/

/* End of game
* End of game, 1,000,000 points
*/
