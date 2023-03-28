const path = require("path")

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@react-theming/storybook-addon",
    'storybook-addon-next'
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "typescript": { reactDocgen: false },
  webpackFinal: async (config) => {
    config.resolve.modules = [
      path.resolve(__dirname, ".."),
      "node_modules",
    ]

    // can be refactored
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/client": path.resolve(__dirname, "../src/client"),
      "@/pages": path.resolve(__dirname, "../src/pages"),
      "@/stories": path.resolve(__dirname, "../src/stories"),
      "@/public": path.resolve(__dirname, "../public"),
    }

    return config;
  }
}