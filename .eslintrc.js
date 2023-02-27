module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "extends": [
        "eslint:recommended",
        "p5js",
        "plugin:jest/recommended",
        "plugin:jest/style"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": ["jest"],
    "rules": {
        "arrow-parens": ["error"],
        "brace-style": ["error", "1tbs"],
        "comma-dangle": ["error", "only-multiline"],
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
        "max-params": ["error", 6],
        "no-cond-assign": [2, "except-parens"],
        "eqeqeq": ["error", "smart"],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "no-use-before-define": [2, {"functions": false}],
        "new-cap": 0,
        "no-caller": 2,
        "no-undef": 2,
        "no-unused-vars": ["error", { "args": "none" }],
        "no-empty": ["error", { "allowEmptyCatch": true }],
        "no-console": "off",
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "space-before-blocks": ["error", "always"]
    },
};