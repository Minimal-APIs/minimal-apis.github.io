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
    markdown: {
      lineNumbers: true
    },
    nav: [
      {
        text: "Quickstart",
        link: "/quickstart/",
      },
      {
        text: "Tutorial",
        link: "/tutorial/",
      },
      {
        text: "Samples",
        link: "https://github.com/Minimal-APIs/documentation",
      },
      {
        text: "Microsoft Docs",
        link:
          "https://docs.microsoft.com/dotnet/core/tutorials/top-level-templates",
      },
    ],
    sidebar: {
      "/tutorial/": [
        {
          title: "Guide",
          collapsable: false,
          children: ["", "first-steps", "crud", "databases"],
        },
      ],
      "/quickstart/": [
        {
          title: "Quick Start",
          collapsable: false,
          children: ["", "quickstart","grpc", "mlnet"],
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
