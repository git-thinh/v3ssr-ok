import path from 'path';
const __dirname = path.resolve();

import express from 'express';
import {
	renderToString
} from 'vue/server-renderer';
import {
	createApp
} from './js-ssr/app.js';

const server = express();

server.get('/js-ssr/client.js', (req, res) => res.download(`${__dirname}/js-ssr/client.js`));
server.get('/js-ssr/vue-3.2.34.esm-browser.prod.js', (req, res) => res.download(
	`${__dirname}/js-ssr/vue-3.2.34.esm-browser.prod.js`));

server.get('/', (req, res) => {
	const app = createApp();

	let js = '<style type="text/css">body{display: flex;min-height: 100vh;} #__vue{flex: 1 1 auto;}</style>';
	//js += '<script type="importmap">{"imports":{"vue": "https://unpkg.com/vue@3.2.34/dist/vue.esm-browser.prod.js"}}</script>';
	js += '<script type="importmap">{"imports":{"vue": "/js-ssr/vue-3.2.34.esm-browser.prod.js"}}</script>';

	renderToString(app).then((html) => {
		res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR</title>
        ${js}
        <script type="module" src="/js-ssr/client.js"></script>
      </head>
      <body>
        <div id="__vue">${html}</div>
      </body>
    </html>
    `);
	});
});

server.use(express.static('.'));

server.listen(3000, () => {
	console.log('ready');
});
