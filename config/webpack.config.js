var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

var env = process.env.IONIC_ENV;

useDefaultConfig.prod.resolve.alias = {
    '@env': path.resolve(environmentPath('prod')),
};

useDefaultConfig.dev.resolve.alias = {
    '@env': path.resolve(environmentPath('dev'))
};

if (env !== 'prod' && env !== 'dev') {
    // Default to dev config
    useDefaultConfig[env] = useDefaultConfig.dev;
    useDefaultConfig[env].resolve.alias = {
        '@env': path.resolve(environmentPath(env))
    };
}

function environmentPath(env) {
    var filePath = './src/environments/environment' + (env === 'prod' ? '' : '.' + env) + '.ts';
    if (!fs.existsSync(filePath)) {
        console.log(chalk.red('\n' + filePath + ' does not exist!'));
    } else {
        return filePath;
    }
}

var alias = {
    '@core': './src/app/core',
    '@shared': './src/app/shared',
    '@pages': './src/pages/',
};

for (var key in alias) {
    useDefaultConfig.prod.resolve.alias[key] = path.resolve(alias[key]);
    useDefaultConfig.dev.resolve.alias[key] = path.resolve(alias[key]);
}

module.exports = function () {
    return useDefaultConfig;
};