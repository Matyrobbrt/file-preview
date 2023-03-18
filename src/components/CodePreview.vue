<script>
import {toast} from "vue3-toastify";

function splitLines(text) {
  return text.split(/\r\n|\n/)
}

export default {
  data() {
    return {
      highlightHtml: null
    }
  },
  props: {
    code: String,
    lang: String
  },
  computed: {
    lines() {
      const lines = splitLines(this.code)
      return this.highlightHtml = lines
    }
  },
  mounted() {
    this.updateHighlight(this.lang)
  },
  methods: {
    updateHighlight(language, onerr = () => {}) {
      if (language === 'kts') {
        language = 'kt'
      }
      if (language === 'txt' || language === 'log') {
        this.highlightHtml = this.lines
      } else {
        const worker = new Worker('./worker.js', {type: 'module'});
        worker.onmessage = (event) => {
          if (event.data === null) {
            onerr()
          } else {
            const lns = splitLines(event.data)
            for (let i = 0; i < lns.length; i++) {
              this.highlightHtml[i] = lns[i]
            }
          }
        }
        worker.postMessage([this.code, language])
      }
    },
  },
  watch: {
    lang(val) {
      this.updateHighlight(val, () => {
        toast.error(`Unknown language: ${val}`, {rtl: true})
      })
    }
  }
}
</script>

<template>
  <table class="hljs-ln hljs" cellspacing="0">
    <tbody>
    <tr v-for="(item, index) in lines" :id="'L' + (index + 1)">
      <td class="hljs-ln-numbers"><a :href="'#L' + (index + 1)">{{ index + 1 }}</a></td>
      <td class="hljs-ln-line">
        <pre class="code" v-html="highlightHtml[index]"></pre>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
.hljs-ln-numbers {
  text-align: center;
  padding-right: 3.5px;
  border-right: 1px solid #CCC;
}

.hljs-ln-line {
  padding-left: 4px !important;
  padding-right: 4px !important;
}

table {
  border-spacing: 3px;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>