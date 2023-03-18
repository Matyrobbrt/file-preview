// importScripts("https://cdn.jsdelivr.net/npm/highlightjs-line-numbers.js@2.8.0/dist/highlightjs-line-numbers.min.js")
import hljs from "highlight.js"
onmessage = (event) => {
    try {
        const lang = event.data[1];
        const result = lang == "auto" ? hljs.highlightAuto(event.data[0]) : hljs.highlight(event.data[0], {language: event.data[1]});
        postMessage(result.value);
    } catch (er) {
        postMessage(null)
    }
};