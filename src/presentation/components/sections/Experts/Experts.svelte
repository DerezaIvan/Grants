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
      Ваш проект разбирают <br class="experts__title-break--mobile" />люди, которые
      <br class="experts__title-break" />сами проходили этот путь
    </h2>
    <p class="experts__lead">
      Поможем сформулировать <br class="experts__lead-break--mobile" />ТЗ к договору, продумать
      бюджет <br class="experts__lead-break--mobile" />и подготовиться к отчётности
      <br class="experts__lead-break--mobile" />перед Фондом
      <br class="experts__lead-break" />и стартап-студией.
      <br class="experts__lead-break--mobile" />При необходимости можно продолжить
      <br class="experts__lead-break--mobile" />сопровождение исполнения гранта
      <br class="experts__lead-break--mobile" />и отчётности.
    </p>
    <div class="experts__list" data-anim-stagger data-anim-type="fade-scale">
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
            {#if expert.mobileLines}
              <p class="expert__text expert__text--mobile">
                {#each expert.mobileLines as line, index}
                  {#if index > 0}<br />{/if}{line}
                {/each}
              </p>
            {/if}
            <Button href={expert.link}>Написать</Button>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
