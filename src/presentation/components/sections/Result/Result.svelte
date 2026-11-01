<script lang="ts">
  import CheckIcon from '@/presentation/components/ui/CheckIcon/CheckIcon.svelte';
</script>

<style lang="scss">
  @use './Result.scss';
</style>

<section class="section result">
  <div class="container">
    <h2 class="section-title section-title--center" data-anim="fade-up">
      Грант получили. <br class="result__break--mobile" />Что дальше?
    </h2>
    <div class="result__grid" data-anim-stagger data-anim-type="fade-scale">
      <article class="result__card">
        <h3 class="result__card-title">
          <span class="result__card-icon"><CheckIcon /></span> Платите только за результат
        </h3>
        <p class="result__card-text">
          Если проект не победил — <br class="result__break--mobile" />за сопровождение не платите.
        </p>
        <p class="result__card-text">
          Если заявка победила, то оплата <br class="result__break--mobile" />составляет 3–6%
          <br class="result__break--mobile" />от размера гранта и задела
          <br class="result__break--mobile" />проекта.
        </p>
        <p class="result__card-text">
          Условия работы фиксируем заранее <br class="result__break--mobile" />в зависимости от
          объёма <br class="result__break--mobile" />проделанной работы.
        </p>
      </article>
      <article class="result__card">
        <h3 class="result__card-title">
          <span class="result__card-icon"><CheckIcon /></span> Поддержка после победы
        </h3>
        <p class="result__card-text">
          Поможем сформулировать <br class="result__break--mobile" />ТЗ к договору, продумать бюджет
          <br class="result__break--mobile" />и подготовиться к отчётности
          <br class="result__break--mobile" />перед Фондом и стартап-студией.
        </p>
        <p class="result__card-text">
          При необходимости можно <br class="result__break--mobile" />продолжить сопровождение
          <br class="result__break--mobile" />исполнения гранта и отчётности.
        </p>
      </article>
    </div>
  </div>
</section>
