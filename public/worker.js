onmessage = (event) => {
    importScripts('./highlight.min.js');
    try {
        const lang = event.data[1];
        const result = lang == "auto" ? self.hljs.highlightAuto(event.data[0]) : self.hljs.highlight(event.data[0], {language: event.data[1]});
        postMessage(result.value);
    } catch (er) {
        postMessage(null)
    }
};