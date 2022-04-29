const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "Minimal APIs",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "Building APIs in C#",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#d9C5C1" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],
  plugins: [
    ['@vuepress/plugin-google-analytics', { ga: 'G-1JBB6MLLED' }],
  ],

  markdown: {
    lineNumbers: true,
  },

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "",
    editLinks: false,
    docsDir: "",
    editLinkText: "",
    lastUpdated: false,
    logo: "logo.png",
    smoothScroll: true,
    sidebar: 'auto',
    nav: [
      {
        text: "Hello Minimal",
        link: "/hello-minimal/",
      },
      {
        text: "Getting Started",
        link: "/quickstart/",
      },
      {
        text: "Tutorials",
        link: "/tutorials/",
      },
      {
        text: "Samples",
        link: "https://github.com/Minimal-APIs/samples",
      },
      {
        text: "Microsoft Docs",
        link:
          "https://docs.microsoft.com/aspnet/core/fundamentals/minimal-apis",
      },
    ],
    sidebar: {
      "/tutorials/": [
        {
          title: "Tutorials",
          collapsable: false,
          children: ["", "first-steps", "crud", "databases", "secure-your-app"],
        },
        
      ],
      "/hello-minimal/": [
        {
          title: "Examples",
          collapsable: false,
          children: [""],
        },
        
      ],
      "/quickstart/": [
        {
          title: "Quickstart",
          collapsable: true,
          children: ["", "quickstart", "openapi" ],
        },
      ],
      "/guide/": [
        {
          title: "Guide",
          collapsable: true,
          children: ["", "routing", "parameter-binding" ],
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    "@vuepress/plugin-active-header-links",
    {
      sidebarLinkSelector: ".sidebar-link",
      headerAnchorSelector: ".header-anchor",
    },
  ],
};
