module.exports = {
  "extends": "standard",
  "plugins": ["standard", "jest"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest/globals": true
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "globals": {
    "p5": true,
    "assert": true,
    "expect": true,
    "sinon": true,
    "birdSprite": true,
    "pipePeakSprite": true,
    "pipeBodySprite": true,
    "Belt": true,
    "Bin": true,
    "Stacker": true,
    "Tile": true,
  },
  "extends": [
    "eslint:recommended",
    "p5js",
    "p5js/dom"
  ],
  "rules": {
    "arrow-parens": [
      "error"
    ],
    "brace-style": [
      "error",
      "1tbs"
    ],
    "comma-dangle": [
      "error",
      "only-multiline"
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "max-len": [
      "error",
      {
        "code": 100,
        "ignoreUrls": true
      },
    ],
    "max-params": [
      "error",
      6
    ],
    "no-cond-assign": [
      2,
      "except-parens"
    ],
    "eqeqeq": ["error", "smart"],
    "no-use-before-define": [
      2,
      {
        "functions": false
      }
    ],
    "new-cap": 0,
    "no-caller": 2,
    "no-undef": 2,
    "no-unused-vars": ["error", { "args": "none" }],
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "no-console": "off",
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "space-before-blocks": [
      "error",
      "always"
    ],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  },
};