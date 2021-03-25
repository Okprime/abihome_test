// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require("@babel/register")({
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "14"
                }
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        ["@babel/transform-runtime"]
    ]
});

// Import the rest of the application.
module.exports = require('./index.js');

