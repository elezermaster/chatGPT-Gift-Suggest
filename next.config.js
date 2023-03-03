const { i18n } = require('./next-i18next.config')

module.exports = {
    // future: {
    //     webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
    //     // Looks like backward compatibility approach.
    // },
    // webpack(config) {
    //     config.resolve.fallback = {
    //         ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
    //         // by next.js will be dropped. Doesn't make much sense, but how it is
    //         fs: false, // the solution
    //     };

    //     return config;
    // },

    // webpack: (config) => {
    //     config.resolve.fallback = { fs: false, path: false, stream: false, constants: false };
    //     return config;
    // },
    // reactStrictMode: false,
    // webpack5: true,
    // webpack: (config) => {
    //     config.resolve.fallback = {
    //         fs: false,
    //         net: false,
    //         dns: false,
    //         child_process: false,
    //         tls: false,
    //     };

    //     return config;
    // },
    i18n,
    // webpack: (config, { isServer }) => {
    //     if (!isServer) {
    //         // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
    //         config.resolve.fallback = {
    //             fs: false
    //         }
    //     }

    //     return config;
    // },

}