<script lang="ts">
  import '@/presentation/styles/global.scss';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

{@render children()}
