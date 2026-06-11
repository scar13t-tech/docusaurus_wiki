import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout
      title="Scar13t Tech"
      description="Homelab guides, tutorials, and documentation">
      <main style={{padding: '4rem 2rem', textAlign: 'center'}}>
        <h1>Scar13t Tech Docs</h1>
        <p>Homelab guides, tutorials, troubleshooting notes, and application documentation.</p>

        <div style={{marginTop: '2rem'}}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            View Documentation
          </Link>
        </div>
      </main>
    </Layout>
  );
}