function NcaMarked(text, options, callback){
	var result;

	marked.setOptions({
		renderer: new NcaRenderer()
	});

	result = marked(text, options, callback);

	// wrapper
	result = '<div style="font-family: malgun gothic, sans-serif; font-size: 12pt; line-height: 2em; color: #4c4d4e;">'
	+ result.replace(/[\n]/g,'')
	+ '</div>';

	return result;
}

window.onload = function(e) {
	var $markdown = document.getElementById("markdown"),
		$html = document.getElementById("html"),
		$preview = document.getElementById("preview");
	
	var state = JSON.parse(localStorage.getItem("state")) ||{
		text: "# hello",
		html: ""
	};

	$markdown.value = state.text;
	$preview.innerHTML = state.html;
	$html.value = state.html;
	
	function update(e) {
		state.text = $markdown.value;

		state.html = NcaMarked(state.text);

		$preview.innerHTML = state.html;
		$html.value = state.html;

		localStorage.setItem("state", JSON.stringify(state));
	}
	
	$markdown.addEventListener("change", update);
	$markdown.addEventListener("keyup", update);
}