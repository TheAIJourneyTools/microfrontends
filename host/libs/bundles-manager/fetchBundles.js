var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable @typescript-eslint/no-require-imports */
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hostMetadataFilePath = path.join(__dirname, 'microfront-metadata.json');
function getHostMetadata() {
    const metadata = JSON.parse(fs.readFileSync(hostMetadataFilePath, 'utf8'));
    console.log('metadata...', metadata);
    return metadata;
}
function fetchAndSaveBundle(host, bundleFileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`${host}/dist/${bundleFileName}.js`, {
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
        }
        catch (bundleError) {
            console.error(`Error fetching ${bundleFileName} from ${host}:`, bundleError);
        }
    });
}
function fetchMetadataAndBundles(hostOfMF) {
    return __awaiter(this, void 0, void 0, function* () {
        const metadataOfMFUrl = `${hostOfMF}/metadata.json`;
        try {
            const mFMetadataResponse = yield axios.get(metadataOfMFUrl);
            const mFMetadata = mFMetadataResponse.data;
            for (const bundleKey in mFMetadata) {
                yield fetchAndSaveBundle(hostOfMF, mFMetadata[bundleKey]);
            }
        }
        catch (metadataError) {
            console.error(`Error fetching metadata from ${metadataOfMFUrl}:`, metadataError);
        }
    });
}
function fetchBundles() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hostMetadata = getHostMetadata();
            for (const key in hostMetadata) {
                const hostOfMF = hostMetadata[key].host;
                yield fetchMetadataAndBundles(hostOfMF);
            }
        }
        catch (error) {
            console.error('Error fetching bundles:', error);
        }
    });
}
export { fetchBundles };
