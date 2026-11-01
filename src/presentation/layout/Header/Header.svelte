<script lang="ts">
  import Logo from '@/presentation/components/ui/Logo/Logo.svelte';
  import Button from '@/presentation/components/ui/Button/Button.svelte';
  import { fade, fly } from 'svelte/transition';
  import { NAV_ITEMS } from './constants';

  let open = $state(false);

  $effect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<style lang="scss">
  @use './Header.scss';
</style>

<header class="header">
  <div class="header__inner">
    <Logo light />
    <button
      class="header__toggle"
      type="button"
      aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
      aria-expanded={open}
      onclick={() => (open = !open)}
      ><span class="header__toggle-bar"></span><span class="header__toggle-bar"></span><span
        class="header__toggle-bar"
      ></span></button
    >
    <nav class="header__nav" aria-label="Основная навигация">
      {#each NAV_ITEMS as item}<a class="header__nav-link" href={item.href}>{item.label}</a>{/each}
    </nav>
    <a class="header__phone" href="tel:+79202912177">+7 920 291-21-77</a>
    <Button href="#contact" variant="lime">Проверить проект</Button>
  </div>
</header>

<svelte:window onkeydown={event => event.key === 'Escape' && (open = false)} />
{#if open}
  <div class="header__menu-overlay" transition:fade={{ duration: 200 }}>
    <div
      class="header__mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Мобильное меню"
      transition:fly={{ y: '-100%', duration: 250 }}
    >
      <div class="header__mobile-menu-top">
        <h2 class="header__mobile-menu-title">Меню</h2>
        <button
          class="header__mobile-menu-close"
          type="button"
          aria-label="Закрыть меню"
          onclick={() => (open = false)}>×</button
        >
      </div>
      <nav class="header__mobile-menu-nav" aria-label="Основная навигация">
        {#each NAV_ITEMS as item}<a
            class="header__mobile-menu-link"
            href={item.href}
            onclick={() => (open = false)}>{item.label}</a
          >{/each}
      </nav>
      <a class="header__mobile-menu-phone" href="tel:+79202912177">+7 920 291-21-77</a>
      <Button href="#contact" variant="lime" onclick={() => (open = false)}>Проверить проект</Button
      >
      <Logo light />
    </div>
  </div>
{/if}
