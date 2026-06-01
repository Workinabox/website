import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

// Released builds set VITE_APP_VERSION from the git tag (see release.yml);
// local/dev builds fall back to the package.json version.
const version = process.env.VITE_APP_VERSION || pkg.version;

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
});
