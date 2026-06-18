import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

import latestGuides from '../data/latestGuides.json';
import latestVideos from '../data/latestVideos.json';

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

function getGuideType(link) {
  if (link.includes('/applications/')) return 'Applications';
  if (link.includes('/proxmox/')) return 'Virtualization';
  if (link.includes('/truenas/')) return 'Storage';
  if (link.includes('/unraid/')) return 'Storage';
  if (link.includes('/networking/')) return 'Networking';
  if (link.includes('/home-assistant/')) return 'Automation';

  return 'Guide';
}

export default function Home() {
  return (
    <Layout
      title="Scar13t Tech Docs"
      description="Homelab guides, tutorials, and documentation"
    >
      <main className={styles.homepage}>
        <section className={styles.hero}>
          <h1>Scar13t Tech Docs</h1>

          <p>
            Homelab guides, tutorials, troubleshooting notes, and application
            documentation.
          </p>

          <div className={styles.heroButtons}>
            <Link
              className={`${styles.socialButton} ${styles.youtubeButton}`}
              href="https://youtube.com/@Scar13t_Tech"
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

        <section className={styles.categories}>
          <h2>Documentation Categories</h2>

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

        <section className={styles.latestSection}>
          <div className={styles.latestColumn}>
            <h2>Latest Guides</h2>

            <div className={styles.carousel}>
              {latestGuides.map((guide) => (
                <Link
                  key={guide.link}
                  className={`${styles.latestCard} ${styles.contentCard}`}
                  to={guide.link}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{guide.title}</h3>

                    <span className={styles.updatedBadge}>
                      Updated{' '}
                      {guide.updated
                        ? new Date(guide.updated).toLocaleDateString()
                        : 'Recently'}
                    </span>
                  </div>

                  <p>{guide.description}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.cardType}>
                      {getGuideType(guide.link)}
                    </span>

                    <span className={styles.cardArrow}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.latestColumn}>
            <h2>Latest Videos</h2>

            <div className={styles.carousel}>
              {latestVideos.length > 0 ? (
                latestVideos.map((video) => (
                  <Link
                    key={video.link}
                    className={`${styles.latestCard} ${styles.contentCard} ${styles.videoCard}`}
                    href={video.link}
                  >
                    <div className={styles.videoContent}>
                      <h3>{video.title}</h3>

                      <span className={styles.videoDate}>
                        {video.published
                          ? new Date(video.published).toLocaleDateString()
                          : 'Watch on YouTube'}
                      </span>
                    </div>

                    {video.thumbnail && (
                      <div className={styles.videoThumbnailWrapper}>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className={styles.videoThumbnail}
                        />
                      </div>
                    )}
                  </Link>
                ))
              ) : (
                <div className={`${styles.emptyCard} ${styles.contentCard}`}>
                  <h3>No Videos Yet</h3>

                  <p>
                    Videos will appear here automatically once they are
                    published on Scar13t Tech.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className={styles.donateBox}>
          <h2>Support Scar13t Tech</h2>

          <p>
            If these guides and videos have helped you, consider supporting the
            project so more content can be created.
          </p>

          <Link
            className={styles.kofiButton}
            href="https://ko-fi.com/scar13t"
          >
            Support on Ko-fi
          </Link>
        </section>
      </main>
    </Layout>
  );
}