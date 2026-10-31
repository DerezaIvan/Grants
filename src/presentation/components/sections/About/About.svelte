<script lang="ts">
  import { asset } from '$app/paths';
  import CheckItem from '@/presentation/components/ui/CheckItem/CheckItem.svelte';
  import { steps } from './constants';
</script>

<style lang="scss">
  @use './About.scss';
</style>

<section id="about" class="about">
  <div class="container">
    <div class="about__intro">
      <h2 class="about__intro-title">
        <span class="about__intro-desktop"
          >Погружаемся в ваш продукт<br />и помогаем получить грант<br />для проекта на любой стадии<br
          />развития.</span
        >
        <span class="about__intro-mobile"
          >Погружаемся<br />в ваш продукт<br />и помогаем получить грант<br />для проекта на любой<br
          />стадии развития.</span
        >
      </h2>
      <div class="about__desktop-copy">
        <p class="about__copy-text">
          Разбираем технологию, рынок, ценность продукта и экономику. Проверяем слабые места,
          собираем логику проекта, готовим документы и репетируем защиту.
        </p>
        <p class="about__copy-text">
          У вас остаётся не только заявка на грант, а стартап-проект, который вы понимаете сами и
          можете развивать дальше.
        </p>
      </div>
    </div>
    <div class="about__mobile-copy">
      <p class="about__copy-text">
        Разбираем технологию, рынок, ценность продукта<br />и экономику. Проверяем слабые места,
        собираем логику проекта, готовим документы и репетируем защиту.
      </p>
      <p class="about__copy-text">
        У вас остаётся не только заявка на грант,<br />а стартап-проект, который вы понимаете сами и
        можете развивать дальше.
      </p>
    </div>
    <h2 class="section-title about__title">
      Упакуем вашу идею или проект<br class="about__title-break" />для получения гранта или субсидии
    </h2>
    <div class="about__grid">
      <div>
        <div class="about__steps">
          {#each steps as step}<CheckItem title={step.title}>{step.text}</CheckItem>{/each}
        </div>
      </div>
      <div class="about__photo">
        <img
          class="about__image"
          src={asset('/images/about-person.webp')}
          alt="Денис Балдов, эксперт по грантам"
          width="1493"
          height="1855"
        />
      </div>
    </div>
  </div>
</section>
