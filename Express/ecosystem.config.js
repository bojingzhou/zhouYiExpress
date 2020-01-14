module.exports = {
    apps: [

        // First application
        {
            "name": "Express",
            "script": "./bin/www",
            "watch": true,
            "env": {
                "NODE_ENV": "development"
            },
            "env_production": {
                "NODE_ENV": "production"
            }
        }
    ]

};
