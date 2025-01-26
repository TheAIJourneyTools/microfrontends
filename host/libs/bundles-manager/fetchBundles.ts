/* eslint-disable @typescript-eslint/no-require-imports */
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type HostMetadata = Record<string, { host: string }>;

const hostMetadataFilePath = path.join(__dirname, 'microfront-metadata.json');

function getHostMetadata(): HostMetadata {
  const metadata = JSON.parse(fs.readFileSync(hostMetadataFilePath, 'utf8'));
  console.log('metadata...', metadata);
  return metadata;
}

async function fetchAndSaveBundle(
  host: string,
  bundleFileName: string
): Promise<void> {
  try {
    const response = await axios.get(`${host}/dist/${bundleFileName}.js`, {
      responseType: 'arraybuffer',
    });
    const outputPath = path.join(__dirname, 'remote', `${bundleFileName}.js`);

    // Make the directory if it doesn't exist
    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    // Write the bundle to the 'remote' directory
    fs.writeFileSync(outputPath, response.data);

    console.log(`Bundle ${bundleFileName} successfully saved to remote`);
  } catch (bundleError) {
    console.error(
      `Error fetching ${bundleFileName} from ${host}:`,
      bundleError
    );
  }
}

async function fetchMetadataAndBundles(hostOfMF: string): Promise<void> {
  const metadataOfMFUrl = `${hostOfMF}/metadata.json`;
  try {
    const mFMetadataResponse: { data: Record<string, string> } =
      await axios.get(metadataOfMFUrl);
    const mFMetadata = mFMetadataResponse.data;
    for (const bundleKey in mFMetadata) {
      await fetchAndSaveBundle(hostOfMF, mFMetadata[bundleKey]);
    }
  } catch (metadataError) {
    console.error(
      `Error fetching metadata from ${metadataOfMFUrl}:`,
      metadataError
    );
  }
}

async function fetchBundles(): Promise<void> {
  try {
    const hostMetadata = getHostMetadata();

    for (const key in hostMetadata) {
      const hostOfMF = hostMetadata[key].host;
      await fetchMetadataAndBundles(hostOfMF);
    }
  } catch (error) {
    console.error('Error fetching bundles:', error);
  }
}

export { fetchBundles };
