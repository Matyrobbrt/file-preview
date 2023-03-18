function variants(variants, obj = {}) {
    obj.variants = variants;
    return obj;
}

const loghljs = (hljs) => {
    return {
        name: 'Minecraft Logs',
        case_insensitive: false,
        contains: [
            {
                className: 'string',
                begin: /(?<=\/)(TRACE|DEBUG|INFO)(?=])/
            },
            {
                className: 'section',
                begin: /(?<=\/)(WARN)(?=])/
            },
            {
                className: 'literal',
                begin: /(?<=\/)(ERROR)(?=])/
            },
            {
                className: 'variable',
                begin: /(?<=\[)[^\[]+(?=\/\w*]: )/
            },

            // EXCEPTIONS
            {
                className: 'literal',
                begin: /(?<=ERROR]: ).+/
            },
            {
                className: 'literal',
                begin: /(?<=Caused by: ).+/
            },
        ],
    }
}

onmessage = (event) => {
    importScripts('./highlight.min.js');
    self.hljs.registerLanguage('log', loghljs)
    try {
        const lang = event.data[1];
        const result = lang == "auto" ? self.hljs.highlightAuto(event.data[0]) : self.hljs.highlight(event.data[0], {language: event.data[1]});
        postMessage(result.value);
    } catch (er) {
        postMessage(null)
    }
};