// @ts-check

// This runs in Node.js - Don't use client-side code here.

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
tutorialSidebar: [
  {
    type: 'category',
    label: 'Applications',
    collapsed: false,
    items: [
      'applications/prowlarr',
    ],
  },

  {
    type: 'category',
    label: 'Operating Systems',
    collapsed: false,
    items: [
      'truenas/intro',
      'proxmox/intro',
      'unraid/intro',
    ],
  },

  {
    type: 'category',
    label: 'Infrastructure',
    collapsed: false,
    items: [
      'networking/intro',
      'home-assistant/intro',
    ],
  },
 ]
};

export default sidebars;