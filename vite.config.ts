import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import topLevelAwait from 'vite-plugin-top-level-await';
import viteCompression from "vite-plugin-compression";
import { visualizer } from 'rollup-plugin-visualizer';
import  replace  from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import {terser} from 'rollup-plugin-terser'

import { getFileList } from './tools/get_file_list';

const publicDir = path.resolve(__dirname, './public');
const getPublicFileList = async (targetPath: string) => {
  const filePaths = await getFileList(targetPath);
  const publicFiles = filePaths
    .map((filePath) => path.relative(publicDir, filePath))
    .map((filePath) => path.join('/', filePath));

  return publicFiles;
};

export default defineConfig(async () => {
  const videos = await getPublicFileList(path.resolve(publicDir, 'videos'));

  return {
    build: {
      assetsInlineLimit: 20480,
      cssCodeSplit: true,
      // cssTarget: 'es6',
      minify: false,
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 40960,
        },
        plugins: [
          visualizer({
            open: true,
            filename: 'dist/stats.html',
            gzipSize: true,
            brotliSize: true,
          }),
          replace({'process.env.NODE_ENV': JSON.stringify('production')}),
          commonjs(),
          terser()
        ],
      },
      target: 'modules',
      sourcemap: false,
    },
    plugins: [
      react(),
      topLevelAwait(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
        videos,
      }),
      splitVendorChunkPlugin(),
      viteCompression()
    ],
    css: {
      postcss: {
        map: false,
      },
    },
  };
});
