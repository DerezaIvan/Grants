<script lang="ts">
  import Button from '@/presentation/components/ui/Button/Button.svelte';
  import { startCards } from './constants';
</script>

<style lang="scss">
  @use './Start.scss';
</style>

<section class="section section--soft start">
  <div class="container">
    <h2 class="section-title section-title--center" data-anim="fade-up">
      Не всегда нужен готовый <br class="start__title-break--mobile" />проект,<br
        class="start__title-break"
      />чтобы начать
    </h2>
    <div class="start__grid" data-anim-stagger data-anim-type="fade-scale">
      {#each startCards as card}
        <article class="start__card">
          <h3 class="start__card-title">{card.title}</h3>
          <p class="start__card-text">{card.text}</p>
          <Button href="#quiz">{card.action}</Button>
        </article>
      {/each}
    </div>
  </div>
</section>
