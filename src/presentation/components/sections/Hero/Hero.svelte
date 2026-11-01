<script lang="ts">
  import { asset } from '$app/paths';
  import Header from '@/presentation/layout/Header/Header.svelte';
  import Button from '@/presentation/components/ui/Button/Button.svelte';
  import ChecklistModal from '@/presentation/components/ui/ChecklistModal/ChecklistModal.svelte';

  let checklistOpen = $state(false);
</script>

<style lang="scss">
  @use './Hero.scss';
</style>

<section id="top" class="hero">
  <Header />
  <div class="container hero__content" data-anim-stagger data-anim-type="hero-line">
    <div class="hero__eyebrow">
      <span class="hero__eyebrow-icon">
        <img src={asset('/icons/shield-check.svg')} alt="" width="20" height="20" />
      </span> Привлечение финансирования
    </div>
    <h1 class="hero__title">Из идеи — в проект<br />для «Студенческого стартапа»</h1>
    <p class="hero__lead">
      Разбираем идею, проверяем рынок, собираем заявку<br class="hero__lead-break" />и готовим к
      защите на грант
    </p>
    <div class="hero__actions">
      <Button href="#quiz" variant="lime">Проверить проект</Button>
      <Button variant="purple" onclick={() => (checklistOpen = true)}
        >Получить чек лист подготовки заявки</Button
      >
    </div>
    <picture>
      <source srcset={asset('/images/hero-cards-mobile.webp')} media="(max-width: 767px)" />
      <img
        class="hero__cards"
        src={asset('/images/hero-cards.webp')}
        alt="250 млн привлечённых грантов, 2000+ подготовленных человек и 250+ команд"
        width="2789"
        height="1002"
      />
    </picture>
  </div>
  <ChecklistModal bind:open={checklistOpen} />
</section>
