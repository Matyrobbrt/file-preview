export const LOCAL_STORAGE_THEME = "theme"
export const THEMES = ["a11y-dark", "a11y-light", "agate", "an-old-hope", "androidstudio", "arduino-light", "arta", "ascetic", "atom-one-dark-reasonable", "atom-one-dark", "atom-one-light", "base16", "brown-paper", "brown-papersq.png", "codepen-embed", "color-brewer", "dark", "default", "devibeans", "docco", "far", "felipec", "foundation", "github-dark-dimmed", "github-dark", "github", "gml", "googlecode", "gradient-dark", "gradient-light", "grayscale", "hybrid", "idea", "intellij-light", "ir-black", "isbl-editor-dark", "isbl-editor-light", "kimbie-dark", "kimbie-light", "lightfair", "lioshi", "magula", "mono-blue", "monokai-sublime", "monokai", "night-owl", "nnfx-dark", "nnfx-light", "nord", "obsidian", "paraiso-dark", "paraiso-light", "pojoaque", "purebasic", "qtcreator-dark", "qtcreator-light", "rainbow", "routeros", "school-book", "shades-of-purple", "srcery", "stackoverflow-dark", "stackoverflow-light", "sunburst", "tokyo-night-dark", "tokyo-night-light", "tomorrow-night-blue", "tomorrow-night-bright", "vs", "vs2015", "xcode", "xt256"]
export const DEFAULT_THEME = "night-owl"

const ls_selectedTheme = "selectedTheme"

export function setupTheme() {
    const urlParams = new URLSearchParams(window.location.search.substring(1))
    if (urlParams.has('theme')) {
        setTheme(urlParams.get('theme'), false)
    } else {
        setTheme(localStorage.getItem(LOCAL_STORAGE_THEME), false)
    }
}

export function setTheme(theme, updatels = false) { // TODO - at some point we should look into making this use local css
    if (theme === null) {
        theme = DEFAULT_THEME
    }
    if (!THEMES.includes(theme)) return

    const oldLink = document.head.getElementsByClassName("hljs-theme")
    if (oldLink.length > 0) document.head.removeChild(oldLink.item(0))
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${theme}.min.css`
    link.classList.add('hljs-theme')
    document.head.insertBefore(link, document.head.firstChild);

    if (updatels) {
        localStorage.setItem(LOCAL_STORAGE_THEME, theme)
    }
    localStorage.setItem(ls_selectedTheme, theme)
}

export function getTheme() {
    const ls = localStorage.getItem(ls_selectedTheme)
    return ls === null ? DEFAULT_THEME : ls
}