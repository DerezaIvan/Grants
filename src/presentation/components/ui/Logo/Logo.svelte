<script lang="ts">
  import { asset } from '$app/paths';

  let { light = false }: { light?: boolean } = $props();
</script>

<style lang="scss">
  @use './Logo.scss';
</style>

<a class="logo" class:logo--light={light} href="#top" aria-label="Искра — на главную">
  <img
    class="logo__icon"
    src={asset(light ? '/icons/logo-light.svg' : '/icons/logo.svg')}
    alt=""
    width="37"
    height="37"
  />
  <span class="logo__text">Искра</span>
</a>
