import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all entries to ensure they are all processed by Vite
function getEntries(dir) {
    const entries = {};
    function walk(currentDir) {
        const files = fs.readdirSync(currentDir);
        for (const file of files) {
            // Skip node_modules, build output, or hidden git directories
            if (file === 'node_modules' || file === 'dist' || file.startsWith('.') || file === 'assets') continue;

            const fullPath = path.join(currentDir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                walk(fullPath);
            } else if (file.endsWith('.html')) {
                // Create an entry name based on its relative path without extension
                const name = path.relative(dir, fullPath).replace(/\\/g, '/').replace(/\.html$/, '');
                entries[name] = resolve(currentDir, file);
            }
        }
    }
    walk(dir);
    return entries;
}

// This plugin removes the crossorigin attribute from scripts and links
function removeCrossoriginPlugin() {
    return {
        name: 'remove-crossorigin',
        transformIndexHtml(html) {
            return html.replace(/(<(?:script|link)[^>]*?)\s+crossorigin(?:=(?:""|''|"[^"]*"|'[^']*'))?([^>]*?>)/gi, '$1$2');
        }
    };
}

function copyRawAssetsPlugin() {
    return {
        name: 'copy-raw-assets',
        closeBundle() {
            const destDist = path.resolve(__dirname, 'dist');
            const scriptsSrc = path.resolve(__dirname, 'scripts');
            const styleSrc = path.resolve(__dirname, 'style');

            if (fs.existsSync(scriptsSrc)) {
                fs.cpSync(scriptsSrc, path.resolve(destDist, 'scripts'), { recursive: true });
            }
            if (fs.existsSync(styleSrc)) {
                fs.cpSync(styleSrc, path.resolve(destDist, 'style'), { recursive: true });
            }
        }
    };
}

export default defineConfig({
    plugins: [removeCrossoriginPlugin(), copyRawAssetsPlugin()],
    // Use relative paths so the built output can be opened directly from the folder
    base: './',
    build: {
        outDir: 'dist',
        target: 'esnext',
        minify: false,
        rollupOptions: {
            input: getEntries(__dirname),
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]'
            }
        }
    }
});
