<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    href = '',
    variant = 'dark',
    type = 'button',
    disabled = false,
    onclick,
  }: {
    children: Snippet;
    href?: string;
    variant?: 'dark' | 'lime' | 'purple' | 'light';
    type?: 'button' | 'submit';
    disabled?: boolean;
    onclick?: () => void;
  } = $props();
</script>

<style lang="scss">
  @use './Button.scss';
</style>

{#if href}
  <a class="button button--{variant}" {href} {onclick}>{@render children()}</a>
{:else}
  <button class="button button--{variant}" {type} {disabled} {onclick}>{@render children()}</button>
{/if}
