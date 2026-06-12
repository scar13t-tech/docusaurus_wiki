import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const categories = [
  {
    title: 'TrueNAS',
    description: 'Storage, apps, permissions, datasets, and virtualization.',
    link: '/docs/truenas/intro',
    image: '/img/truenas.png',
  },
  {
    title: 'Proxmox',
    description: 'VMs, LXCs, storage, networking, and homelab infrastructure.',
    link: '/docs/proxmox/intro',
    image: '/img/proxmox.png',
  },
  {
    title: 'Unraid',
    description: 'Docker, Community Apps, storage, shares, and media servers.',
    link: '/docs/unraid/intro',
    image: '/img/unraid.png',
  },
  {
    title: 'Applications',
    description: 'Prowlarr, Sonarr, Radarr, qBittorrent, Plex, and more.',
    link: '/docs/applications/intro',
    image: '/img/servarr_dark.png',
  },
  {
    title: 'Networking',
    description: 'Cloudflare, DNS, VPNs, remote access, and network security.',
    link: '/docs/networking/intro',
    image: '/img/ubiquiti-unifi.png',
  },
  {
    title: 'Home Assistant',
    description: 'Smart home integrations, dashboards, automations, and devices.',
    link: '/docs/home-assistant/intro',
    image: '/img/home-assistant.png',
  },
];

const latestGuides = [
  {
    title: 'Prowlarr',
    description: 'Indexer management for Sonarr, Radarr, and other media apps.',
    link: '/docs/applications/prowlarr',
  },
  {
    title: 'TrueNAS',
    description: 'Storage, apps, permissions, datasets, and virtualization.',
    link: '/docs/truenas/intro',
  },
  {
    title: 'Proxmox',
    description: 'VMs, LXCs, networking, and homelab infrastructure.',
    link: '/docs/proxmox/intro',
  },
];

const latestVideos = [
  {
    title: 'Latest Scar13t Tech Video',
    description: 'Watch the newest homelab guide on YouTube.',
    link: 'https://youtube.com/@Scar13tTech',
  },
  {
    title: 'TrueNAS Guides',
    description: 'TrueNAS setup, apps, storage, and troubleshooting.',
    link: 'https://youtube.com/@Scar13tTech',
  },
  {
    title: 'Homelab Tutorials',
    description: 'Self-hosting, networking, apps, and automation.',
    link: 'https://youtube.com/@Scar13tTech',
  },
];

export default function Home() {
  return (
    <Layout
      title="Scar13t Tech Docs"
      description="Homelab guides, tutorials, and documentation"
    >
      <main className={styles.homepage}>
        {/* Hero Section */}

        <section className={styles.hero}>
          <h1>Scar13t Tech Docs</h1>

          <p>
            Homelab guides, tutorials, troubleshooting notes, and application
            documentation.
          </p>

          <div className={styles.heroButtons}>
            <Link
              className={`${styles.socialButton} ${styles.youtubeButton}`}
              href="https://youtube.com/@Scar13tTech"
            >
              <img
                src="/img/youtube-light.png"
                alt="YouTube"
                className={styles.socialIcon}
              />
              YouTube
            </Link>

            <Link
              className={`${styles.socialButton} ${styles.discordButton}`}
              href="https://discord.gg/6JtMybEVEN"
            >
              <img
                src="/img/discord.png"
                alt="Discord"
                className={styles.socialIcon}
              />
              Discord
            </Link>

            <Link
              className={`${styles.socialButton} ${styles.githubButton}`}
              href="https://github.com/orgs/scar13t-tech/repositories"
            >
              <img
                src="/img/github.png"
                alt="GitHub"
                className={styles.socialIcon}
              />
              GitHub
            </Link>
          </div>
        </section>

        {/* Categories */}

        <section className={styles.categories}>
          <h2>Choose a Platform</h2>

          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <Link
                key={category.title}
                className={styles.categoryCard}
                to={category.link}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className={styles.categoryIcon}
                />

                <h3>{category.title}</h3>

                <p>{category.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Content */}

        <section className={styles.latestSection}>
          <div className={styles.latestColumn}>
            <h2>Latest Guides</h2>

            <div className={styles.carousel}>
              {latestGuides.map((guide) => (
                <Link
                  key={guide.title}
                  className={styles.latestCard}
                  to={guide.link}
                >
                  <h3>{guide.title}</h3>
                  <p>{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.latestColumn}>
            <h2>Latest Videos</h2>

            <div className={styles.carousel}>
              {latestVideos.map((video) => (
                <Link
                  key={video.title}
                  className={styles.latestCard}
                  href={video.link}
                >
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Ko-fi */}

        <section className={styles.donateBox}>
          <h2>Support Scar13t Tech</h2>

          <p>
            If these guides and videos have helped you, consider supporting the
            project so more content can be created.
          </p>

          <Link
            className={styles.kofiButton}
            href="https://ko-fi.com/YOURUSERNAME"
          >
            Support on Ko-fi
          </Link>
        </section>
      </main>
    </Layout>
  );
}