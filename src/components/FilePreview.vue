<script setup>
import axios from "axios";
import CodePreview from "@/components/CodePreview.vue";
import {getTheme, setTheme, THEMES} from "@/utils/theme";
import {getDiscordFileURL, redirectWithParams, up} from "@/utils/utils";

const urlParams = up()
const raw = urlParams.get('raw') !== null

const fileUrl = getDiscordFileURL(urlParams)
const text = await (fileUrl == null ? Promise.resolve('Please provide a file URL!') : axios.get(`https://corsbad.matyrobbrt.com?url=${encodeURIComponent(fileUrl)}`, {
  headers: {
    Accept: 'text/plain',
  },
  withCredentials: false,
  responseType: 'text'
})
    // Also replace tabs with 4 spaces while we're at it
    .then((data) => data.data.replace(/\t/g, "    "), (error) => {
      console.log(`Error while querying URL contents: ${error}`);
      return 'Encountered error querying URL contents.'
    }))
</script>

<script>
import {setupTheme, setTheme, getTheme, DEFAULT_THEME} from "@/utils/theme";
import optional from "@/utils/optional";

export default {
  data() {
    return {
      selectedTheme: DEFAULT_THEME,
      params: up(),
      lang: optional(up().get('lang'))
          .or(() => {
            const furl = getDiscordFileURL(up())
            return furl === null ? null : furl.substring(furl.lastIndexOf('.') + 1)
          })
          .or(() => 'auto')
          .get
    }
  },
  mounted() {
    setupTheme()
    this.selectedTheme = getTheme()
  },
  methods: {
    updateLang(event) {
      this.lang = document.getElementById('lang').value
    }
  }
}
</script>

<template>
  <pre v-if="raw" style="padding: 2.5px">{{text}}</pre>
  <header v-if="!raw">
    <button class="hljs" @click="redirectWithParams(params => params.set('raw', true))">View raw</button>
    <label for="themes" class="hljs" style="padding-left: 2px">Select a theme: </label>
    <select name="themes" id="themes" class="hljs" @change="setTheme($event.target.value, true)">
      <option v-for="theme in THEMES" :value="theme" class="hljs" :selected="selectedTheme === theme">{{theme}}</option>
    </select>
    <label for="lang" class="hljs" style="padding-left: 5px">Language: </label>
    <input type="text" class="hljs" v-on:keyup.enter="updateLang" id="lang"/>
  </header>
  <CodePreview :code="text" :lang="lang" v-if="!raw"/>
</template>
<style scoped>
select {
  border: 1px solid;
  border-radius: 5px;
}
input {
  border: 1px solid;
  border-radius: 5px;
}
button {
  border: 1px solid;
  border-radius: 5px;
  padding-top: 3px;
}
header {
  padding: 3px
}
</style>