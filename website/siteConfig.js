// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const users = require('./data/users');

const siteConfig = {
  title: 'Buckaroo',
  tagline: 'Decentralized C/C++ Package Manager',
  url: 'https://docs.buckaroo.pm',
  baseUrl: '/', 

  // Used for publishing and more
  projectName: 'buckaroo',
  organizationName: 'loopperfect',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'installation', label: 'Docs'},
    {page: 'users', label: 'Users'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/logo.svg',
  footerIcon: 'img/logo.svg',
  favicon: 'img/favicon/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#ff3c67',
    secondaryColor: '#ff3c67',
  },

  copyright: `Copyright © ${new Date().getFullYear()} Buckaroo`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
    repoUrl: 'https://github.com/loopperfect/buckaroo',
};

module.exports = siteConfig;
