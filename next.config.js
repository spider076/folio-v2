/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    // this runs only in the producttion builds
    if (!dev) {
      // the terser plugin handles minification/console.log service
      const terserPluginIndex = config.optimization.minimizer.findIndex(
        (minimizer) => minimizer.constructor.name === "TerserPlugin"
      );

      if (terserPluginIndex > -1) {
        const terserPlugin = config.optimization.minimizer[terserPluginIndex];

        terserPlugin.options.terserOptions = {
          ...terserPlugin.options.terserOptions,
          compress: {
            ...terserPlugin.options.terserOptions?.compress,
            drop_console: true,
          },
        };
      }
    }

    return config;
  },
};

module.exports = nextConfig;
