<script lang="ts">
  import Button from '@/presentation/components/ui/Button/Button.svelte';
  import { experts } from './constants';
</script>

<style lang="scss">
  @use './Experts.scss';
</style>

<section id="experts" class="section section--blue experts">
  <div class="container">
    <h2 class="section-title section-title--center">
      Ваш проект разбирают люди, которые<br class="experts__title-break" />сами проходили этот путь
    </h2>
    <p class="experts__lead">
      Поможем сформулировать ТЗ к договору, продумать бюджет и подготовиться к отчётности перед
      Фондом<br class="experts__lead-break" />и стартап-студией. При необходимости можно продолжить
      сопровождение исполнения гранта и отчётности.
    </p>
    <div class="experts__list">
      {#each experts as expert}
        <article class="expert">
          <img
            class="expert__photo"
            src={expert.image}
            alt={expert.name}
            width="200"
            height="200"
          />
          <div class="expert__content">
            <h3 class="expert__name">{expert.name}</h3>
            <p class="expert__text">{expert.text}</p>
            <Button href={expert.link}>Написать</Button>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
