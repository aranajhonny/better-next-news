const BabiliPlugin = require("babili-webpack-plugin");
module.exports = {
  webpack: function(config, { dev }) {
    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== "UglifyJsPlugin";
    });
    // For the development version, we'll use React.
    // Because, it support react hot loading and so on.
    if (dev) {
      config.plugins.push(new BabiliPlugin());
      return config;
    }

    config.resolve.alias = {
      react: "preact-compat/dist/preact-compat",
      "react-dom": "preact-compat/dist/preact-compat"
    };

    return config;
  }
};
