<script lang="ts">
  import CheckIcon from '@/presentation/components/ui/CheckIcon/CheckIcon.svelte';
</script>

<style lang="scss">
  @use './Result.scss';
</style>

<section class="section result">
  <div class="container">
    <h2 class="section-title section-title--center">Грант получили. Что дальше?</h2>
    <div class="result__grid">
      <article class="result__card">
        <h3 class="result__card-title">
          <span class="result__card-icon"><CheckIcon /></span> Платите только за результат
        </h3>
        <p class="result__card-text">Если проект не победил — за сопровождение не платите.</p>
        <p class="result__card-text">
          Если заявка победила, то оплата составляет 3–6% от размера гранта и задела проекта.
        </p>
        <p class="result__card-text">
          Условия работы фиксируем заранее в зависимости от объёма проделанной работы.
        </p>
      </article>
      <article class="result__card">
        <h3 class="result__card-title">
          <span class="result__card-icon"><CheckIcon /></span> Поддержка после победы
        </h3>
        <p class="result__card-text">
          Поможем сформулировать ТЗ к договору, продумать бюджет и подготовиться к отчётности перед
          Фондом и стартап-студией.
        </p>
        <p class="result__card-text">
          При необходимости можно продолжить сопровождение исполнения гранта и отчётности.
        </p>
      </article>
    </div>
  </div>
</section>
