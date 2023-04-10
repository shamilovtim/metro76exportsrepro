const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolverMainFields: ['react-native', 'main'],
    unstable_enablePackageExports: true,
    unstable_conditionNames: ['react-native', 'require', 'import'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
