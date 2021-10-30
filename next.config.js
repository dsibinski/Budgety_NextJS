const withPWA = require('next-pwa');

module.exports = withPWA({
	pwa: {
		dest: 'public',
	},
	experimental: {
		esmExternals: false,
	},
});
