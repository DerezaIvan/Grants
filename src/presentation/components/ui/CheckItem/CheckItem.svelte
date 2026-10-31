<script lang="ts">
  import type { Snippet } from 'svelte';
  import CheckIcon from '@/presentation/components/ui/CheckIcon/CheckIcon.svelte';

  let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<style lang="scss">
  @use './CheckItem.scss';
</style>

<div class="check-item">
  <span class="check-item__icon"><CheckIcon /></span>
  <div class="check-item__body">
    <h3 class="check-item__title">{title}</h3>
    {#if children}<div class="check-item__text">{@render children()}</div>{/if}
  </div>
</div>
