"use strict";

var sampleText = "# An exhibit of Markdown\r\rThis note demonstrates some of what [Markdown][1] is capable of doing.\r\r## Basic formatting\r\rParagraphs can be written like so. A paragraph is the basic block of Markdown. A paragraph is what text will turn into when there is no reason it should become anything else.\r\rParagraphs must be separated by a blank line. Basic formatting of *italics* and **bold** is supported. This *can be **nested** like* so.\r\r## Lists\r\r### Ordered list\r\r1. Item 1\r2. A second item\r3. Number 3\r4. Ⅳ\r\r*Note: the fourth item uses the Unicode character for [Roman numeral four][2].*\r\r### Unordered list\r\r* An item\r* Another item\r* Yet another item\r* And there's more...\r\r## Paragraph modifiers\r\r### Code block\r\r```\rCode blocks are very useful for developers and other people who look at code or other things that are written in plain text. As you can see, it uses a fixed-width font.\r```\r\rYou can also make `inline code` to add code into other things.\r\r### Quote\r\r> Here is a quote. What this is should be self explanatory. Quotes are automatically indented when they are used.\r\r## Headings\r\rThere are six levels of headings. They correspond with the six levels of HTML headings. You've probably noticed them already in the page. Each level down uses one more hash character.\r\r### Headings *can* also contain **formatting**\r\r### They can even contain `inline code`\r\rOf course, demonstrating what headings look like messes up the structure of the page.\r\rI don't recommend using more than three or four levels of headings here, because, when you're smallest heading isn't too small, and you're largest heading isn't too big, and you want each size up to look noticeably larger and more important, there there are only so many sizes that you can use.\r\r## URLs\r\rURLs can be made in a handful of ways:\r\r* A named link to [MarkItDown][3]. The easiest way to do these is to select what you want to make a link and hit `Ctrl+L`.\r* Another named link to [MarkItDown](http://www.markitdown.net/)\r* Sometimes you just want a URL like <http://www.markitdown.net/>.\r\r## Horizontal rule\r\rA horizontal rule is a line that goes across the middle of the page.\r\r---\r\rIt's sometimes handy for breaking things up.\r\r## Images\r\rMarkdown can also contain images. I'll need to add something here sometime.\r\r## Finally\r\rThere's actually a lot more to Markdown than this. See the official [introduction][4] and [syntax][5] for more information. However, be aware that this is not using the official implementation, and this might work subtly differently in some of the little things.\r\r  [1]: http://daringfireball.net/projects/markdown/\r  [2]: http://www.fileformat.info/info/unicode/char/2163/index.htm\r  [3]: http://www.markitdown.net/\r  [4]: http://daringfireball.net/projects/markdown/basics\r  [5]: http://daringfireball.net/projects/markdown/syntax";

marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: true,
	pedantic: true,
	sanitize: true,
	smartLists: true,
	smartypants: true
});

// Define components
var EditorContainer = React.createClass({
	displayName: "EditorContainer",

	getInitialState: function getInitialState() {
		return { markdown: sampleText,
			parsed: marked(sampleText.toString()) };
		},
		parseMarkdown: function parseMarkdown(newMarkdown) {
			console.log(newMarkdown.toString());
			this.setState({
				markdown: newMarkdown,
				parsed: marked(newMarkdown.toString())
			});
		},
		render: function render() {
			return React.createElement(
				"div",
				{ id: "container" },
				React.createElement(
					"div",
					{ id: "left" },
					React.createElement(ComponentTitle, { text: "Markdown Source" }),
					React.createElement(Editor, { text: this.state.markdown, onChange: this.parseMarkdown })
				),
				React.createElement(
					"div",
					{ id: "right" },
					React.createElement(ComponentTitle, { text: "Compiled Markdown" }),
					React.createElement(Preview, { parsed: this.state.parsed })
				)
			);
		}
	});

	// Subtitles
	var ComponentTitle = React.createClass({
		displayName: "ComponentTitle",

		render: function render() {
			return React.createElement(
				"h2",
				{ className: "titles" },
				this.props.text
			);
		}
	});

	// Textarea and change handler
	var Editor = React.createClass({
		displayName: "Editor",

		handleChange: function handleChange(event) {
			this.props.onChange(event.target.value);
		},
		render: function render() {
			return React.createElement(
				"textarea",
				{ id: "inputArea", onChange: this.handleChange },
				this.props.text
			);
		}
	});

	// Auto-update
	var Preview = React.createClass({
		displayName: "Preview",

		render: function render() {
			return React.createElement("div", { id: "preview", className: "markdown-body", dangerouslySetInnerHTML: { __html: this.props.parsed } });
		}
	});

	ReactDOM.render(React.createElement(EditorContainer, null), document.getElementById('previewer'));

	// Auto resize textarea to fit content
	autosize(document.getElementById("inputArea"));

	$("#view").change(function () {
		if ($(this).is(":checked")) {
			$("#left").css("display", "none");
			$("#right").css("display", "block");
		} else {
			$("#right").css("display", "none");
			$("#left").css("display", "block");
		}
	});