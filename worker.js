import hljs from './highlight.min'
onmessage = (event) => {
    try {
        const lang = event.data[1];
        const result = lang == "auto" ? hljs.highlightAuto(event.data[0]) : hljs.highlight(event.data[0], {language: event.data[1]});
        postMessage(result.value);
    } catch (er) {
        postMessage(null)
    }
};