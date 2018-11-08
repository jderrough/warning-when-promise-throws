module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "parser": "babel-eslint"
    },
    "rules": {
        // allow async-await
        "generator-star-spacing": "off",
        "indent": ["error", 2],
        "semi": ["error", "never"],
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    }
};