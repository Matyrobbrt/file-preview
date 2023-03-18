export function getDiscordFileURL(urlParams) {
    if (urlParams.has('url')) {
        return urlParams.get('url')
    } else if (urlParams.has('channel')) {
        return `https://cdn.discordapp.com/attachments/${urlParams.get('channel')}/${urlParams.get('message')}/${urlParams.get('file')}`
    }
    return null
}

export function up() {
    return new URLSearchParams(window.location.search.substring(1))
}

export function redirectWithParams(paramsCons) {
    const params = up()
    paramsCons(params)
    window.location = window.location.origin + '?' + params.toString()
}