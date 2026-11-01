<script lang="ts">
  import { untrack } from 'svelte';
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  let {
    question,
    answer,
    open = false,
    onToggle,
  }: { question: string; answer: string; open?: boolean; onToggle?: () => void } = $props();
  let internalExpanded = $state(untrack(() => open));
  let expanded = $derived(onToggle ? open : internalExpanded);

  function toggle() {
    if (onToggle) {
      onToggle();
    } else {
      internalExpanded = !internalExpanded;
    }
  }
</script>

<style lang="scss">
  @use './Accordion.scss';
</style>

<div class="accordion" class:accordion--open={expanded}>
  <button class="accordion__toggle" type="button" aria-expanded={expanded} onclick={toggle}>
    <span class="accordion__question">{question}</span><span
      class="accordion__sign"
      aria-hidden="true">{expanded ? '−' : '+'}</span
    >
  </button>
  {#if expanded}<p class="accordion__answer" transition:slide={{ duration: 240, easing: cubicOut }}>
      {answer}
    </p>{/if}
</div>
