const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');

const FEED_URL =
  'https://www.youtube.com/feeds/videos.xml?playlist_id=UUDdEg4Yi5_ZS1ztxg9P38jA';

const OUTPUT_FILE = './src/data/latestVideos.json';

async function main() {
  const response = await fetch(FEED_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube feed: ${response.status}`);
  }

  const xml = await response.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });

  const data = parser.parse(xml);

  const entries = data.feed?.entry
    ? Array.isArray(data.feed.entry)
      ? data.feed.entry
      : [data.feed.entry]
    : [];

  const videos = entries.slice(0, 6).map((entry) => {
    const videoId =
      entry['yt:videoId'] ||
      entry.videoId ||
      entry.id?.replace('yt:video:', '');

    return {
      title: entry.title,
      link: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      published: entry.published,
    };
  });

  fs.mkdirSync('./src/data', { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(videos, null, 2));

  console.log(`Saved ${videos.length} YouTube videos to ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});