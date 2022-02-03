module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
    gridTemplateAreas: {
      'desktop': [
        'title spread',
        'bids-title asks-title',
        'bids-data asks-data',
      ],
      'mobile': [
        'title',
        'asks-title',
        'asks-data',
        'spread',
        'bids-data',
      ],
    },
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas'),
  ],
  variants: {
    gridTemplateAreas: ['responsive'],
  },
};
