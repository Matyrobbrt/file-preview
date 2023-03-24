<script setup>
import FilePreview from "@/pages/FilePreview.vue";
import LoadingVue from 'vue3-loading-overlay';
</script>

<template>
  <main class="hljs">
    <Suspense>
      <FilePreview/>
      <template #fallback>
        <LoadingVue :active="true" is-full-page></LoadingVue>
      </template>
    </Suspense>
  </main>
</template>