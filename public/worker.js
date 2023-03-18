import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/es/highlight.min.js'
onmessage = (event) => {
    try {
        const lang = event.data[1];
        const result = lang == "auto" ? hljs.highlightAuto(event.data[0]) : hljs.highlight(event.data[0], {language: event.data[1]});
        postMessage(result.value);
    } catch (er) {
        postMessage(null)
    }
};