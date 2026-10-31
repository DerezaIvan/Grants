<script lang="ts">
  import { asset } from '$app/paths';
  import Button from '@/presentation/components/ui/Button/Button.svelte';
  import Field from '@/presentation/components/ui/Field/Field.svelte';
  import { participationOptions, stageOptions } from './constants';

  let step = $state(0);
  let stage = $state('');
  let participation = $state('');
  let sent = $state(false);

  const questions = [
    'На каком этапе вы сейчас?',
    'Вы уже участвовали в грантовых конкурсах?',
    'Как с вами связаться?',
  ];

  function submit(event: SubmitEvent) {
    event.preventDefault();
    if (step < 2) {
      step += 1;
      return;
    }
    sent = true;
  }
</script>

<style lang="scss">
  @use './Quiz.scss';
</style>

<section id="quiz" class="section">
  <div class="container quiz__grid">
    <div class="quiz__intro">
      <h2 class="quiz__title">Сомневаетесь, что стоит начинать? Бесплатно оценим ваш проект</h2>
      <p class="quiz__text">
        Ответьте на 3 вопроса, и мы поможем усилить идею и подготовить её к подаче на грант
      </p>
      <img
        class="quiz__image"
        src={asset('/images/egor-isaev.png')}
        alt="Егор Исаев"
        width="400"
        height="400"
      />
    </div>
    <form class="quiz__form" onsubmit={submit}>
      <h3 class="quiz__question">{questions[step]}</h3>
      {#if step === 0}
        {#each stageOptions as option (option.value)}
          <label class:quiz__option--active={stage === option.value} class="quiz__option">
            <input
              class="quiz__radio"
              type="radio"
              name="stage"
              value={option.value}
              bind:group={stage}
              required
            />
            <span class="quiz__option-label">{option.value}</span>
          </label>
        {/each}
      {:else if step === 1}
        {#each participationOptions as option (option.value)}
          <label class:quiz__option--active={participation === option.value} class="quiz__option">
            <input
              class="quiz__radio"
              type="radio"
              name="participation"
              value={option.value}
              bind:group={participation}
              required
            />
            <span class="quiz__option-label">{option.value}</span>
          </label>
        {/each}
      {:else}
        <div class="quiz__fields">
          <Field label="Имя" name="quiz-name" placeholder="Плейсхолдер" required />
          <Field label="Телефон" name="quiz-phone" type="tel" placeholder="+7 ()  - -" required />
          <Field label="Способ связи" name="quiz-contact" placeholder="Плейсхолдер" required />
        </div>
      {/if}
      <Button
        type="submit"
        disabled={sent || (step === 0 ? !stage : step === 1 ? !participation : false)}
      >
        {sent ? 'Спасибо! Мы свяжемся с вами' : step === 2 ? 'Отправить' : 'Далее'}
      </Button>
    </form>
  </div>
</section>
