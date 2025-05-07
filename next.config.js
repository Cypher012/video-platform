/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add a rule to handle Handlebars
    config.module.rules.push({
      test: /\.handlebars$/,
      loader: 'handlebars-loader',
    });

    // Ignore the require.extensions warning
    config.ignoreWarnings = [
      { module: /node_modules\/handlebars/ },
    ];

    return config;
  },
};

module.exports = nextConfig; 