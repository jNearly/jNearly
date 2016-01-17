import marked from 'marked';
import nunjucks from 'nunjucks';
import through from 'through2';
import File from 'vinyl';

export function parseDocBlock(docblock) {
	let markdown = docblock.replace(/^ *\*(?: |$)/gm, '');
	return marked(markdown);
}

export function docsFromCode(code) {
	return code
			.split('/**')
			.filter((block) => block.trim())
			.map(function (block) {
				block = block.split('*/\n');
				return {
					docs: parseDocBlock(block[0].trim()),
					code: block[1]
				}
			});
}

export default function generateDocs() {
	let blocks = [];

	function populateBlocks(file, enc, cb) {
		blocks.push({
			path: file.path.split('/src/')[1],
			docs: docsFromCode(file.contents.toString(enc))
		});

		cb();
	}

	function generateHtml(cb) {
		let html = nunjucks.render('templates/docs.tmpl.html', { blocks });

		this.push(new File({
			path: 'index.html',
			contents: new Buffer(html)
		}));

		cb();
	}

	return through.obj(populateBlocks, generateHtml);
}