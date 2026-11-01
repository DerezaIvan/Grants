<script lang="ts">
  import '@/presentation/styles/global.scss';
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import {
    destroyScrollAnimations,
    initScrollAnimations,
  } from '@/shared/animations/scroll-animations';

  let { children }: { children: Snippet } = $props();

  onMount(() => {
    initScrollAnimations();
    return () => destroyScrollAnimations();
  });
</script>

{@render children()}
