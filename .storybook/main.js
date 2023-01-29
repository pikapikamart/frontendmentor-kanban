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
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "typescript": { reactDocgen: false },
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [
      path.resolve(__dirname, ".."),
      "node_modules",
    ]

    config.resolve.alias = {
      ...config.resolve.alias,
      "@/client": path.resolve(__dirname, "../src/client"),
      "@/server": path.resolve(__dirname, "../src/client"),
      "@/pages": path.resolve(__dirname, "../src/client"),
      "@/stories": path.resolve(__dirname, "../src/client"),
    }

    return config;
  }
}