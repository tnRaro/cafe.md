function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/ /g, '&nbsp;')
    .replace(/'/g, '&#39;');
}

var monospace = 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace';

function NcaRenderer(options){
	this.options = options || {};
}

NcaRenderer.prototype = Object.create(new marked.Renderer());

NcaRenderer.prototype.code = function(code, lang, escaped){
	if(this.options.highlight){
		var out = this.options.highlight(code, lang);

		if(out != null && out !== code) {
			escaped = true;
			code = out;
		}
	}

	if(!lang) {
		return '<div style="padding: 0.4em 0; margin: 1em 0; background-color: #f2f2f2;">'
		+ (code.split(/\n/).map(function(line){
			return '<div style="padding: 0 10px; line-height: 1.5em; font-family: ' + monospace + ';">'
			+ (escaped ? line : escape(line, true))
			+ '</div>';
		}).join(""))
		+ '</div>';
	}

	/* TODO: code highlight */
	return '<div style="padding: 0.4em 0; margin: 1em 0; background-color: #f2f2f2;">'
	+ (code.split(/\n/).map(function(line){
		return '<div style="padding: 0 10px; line-height: 1.5em; font-family: ' + monospace + ';">'
		+ (escaped ? line : escape(line, true))
		+ '</div>';
	}).join(""))
	+ '</div>';
}

NcaRenderer.prototype.blockquote = function(quote) {
	return '<blockquote style="font-family: ' + monospace + '; padding: 0 0.5em; margin: 0; border-left: 4px solid #cbcccd;">'
	+ quote
	+ '</blockquote>'
}

NcaRenderer.prototype.list = function(body, ordered) {
	var type = ordered ? 'ol' : 'ul';

	return '<' + type + ' style="line-height: 1.5em;">'
	+ body
	+ '</' + type + '>';
}

NcaRenderer.prototype.listitem = function(text) {
	return '<li style="font-family: inherit; font-size: inherit;">' + text + '</li>';
}

NcaRenderer.prototype.table = function(header, body) {
	return '<table style="padding: 0; margin: 1em 0;">'
	+ '<thead>'
	+ header
	+ '</thead>'
	+ '<tbody>'
	+ body
	+ '</tbody>'
	+ '</table>';
}

NcaRenderer.prototype.tablerow = function(content) {
	return '<tr>' + content + '</tr>';
}

NcaRenderer.prototype.tablecell = function(content, flags) {
	var type = flags.header ? 'th' : 'td';

	var tag = flags.align
	? '<' + type + ' style="text-align"' + flags.align + '">'
	: '<' + type + '>';

	return tag + content + '</' + type + '>';
}

NcaRenderer.prototype.codespan = function(text) {
	return '<code style="font-family: ' + monospace + '; background-color: #f2f2f2; padding: 0 3px;">' + text + '</code>'
}

NcaRenderer.prototype.paragraph = function(text) {
	return '<p style="padding: 0; margin: 1em 0;">'
	+ text
	+ '</p>';
}
