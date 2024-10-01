import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Text Mood Processor Docs',
  tagline: 'Analyze and change the tone of your text',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.text-mood-processor.live/',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Remove the "editUrl" field instead of assigning null.
          routeBasePath: '/', // Set the default route to be the docs home
        },
        blog: false, // Disable blog functionality
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/text-mood-processor-social-card.jpg',
    navbar: {
      title: 'Text Mood Processor',
      logo: {
        alt: 'Text Mood Processor Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'app', // Use 'app.md' as the intro page
          position: 'left',
          label: 'Docs',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/app', // Point to 'app.md' as the introduction
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Text Mood Processor. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;