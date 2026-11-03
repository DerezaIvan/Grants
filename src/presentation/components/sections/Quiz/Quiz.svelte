<script lang="ts">
  import { asset } from '$app/paths';
  import Button from '@/presentation/components/ui/Button/Button.svelte';
  import Field from '@/presentation/components/ui/Field/Field.svelte';
  import { participationOptions, stageOptions } from './constants';
  import { formatMessage, sendTelegramMessage } from '@/shared/telegram';
  import { clearFieldError, validateFields } from '@/shared/validation';

  let step = $state(0);
  let stage = $state('');
  let participation = $state('');
  let sent = $state(false);
  let sending = $state(false);
  let failed = $state(false);
  let errors: Record<string, string> = $state({});

  const questions = [
    'На каком этапе вы сейчас?',
    'Вы уже участвовали в грантовых конкурсах?',
    'Как с вами связаться?',
  ];

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    if (step < 2) {
      step += 1;
      return;
    }
    const data = new FormData(event.currentTarget as HTMLFormElement);
    errors = validateFields(data, {
      'quiz-name': { type: 'name', required: true },
      'quiz-phone': { type: 'phone', required: true },
      'quiz-contact': { type: 'contact', required: true },
    });
    if (Object.keys(errors).length > 0) return;

    const text = formatMessage('Новая заявка из квиза', [
      ['Этап', stage],
      ['Участие в конкурсах', participation],
      ['Имя', String(data.get('quiz-name') ?? '')],
      ['Телефон', String(data.get('quiz-phone') ?? '')],
      ['Способ связи', String(data.get('quiz-contact') ?? '')],
    ]);

    sending = true;
    failed = false;
    try {
      await sendTelegramMessage(text);
      sent = true;
    } catch {
      failed = true;
    } finally {
      sending = false;
    }
  }
</script>

<style lang="scss">
  @use './Quiz.scss';
</style>

<section id="quiz" class="section quiz">
  <div class="container quiz__grid" data-anim-stagger data-anim-type="fade-right">
    <div class="quiz__intro">
      <h2 class="quiz__title">
        Сомневаетесь, <br class="quiz__title-break--mobile" />что стоит начинать?
        <br class="quiz__title-break--mobile" />Бесплатно оценим
        <br class="quiz__title-break--mobile" />ваш проект
      </h2>
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
    <form
      class="quiz__form"
      data-anim="fade-left"
      novalidate
      onsubmit={submit}
      oninput={event => clearFieldError(event, errors)}
    >
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
          <Field
            label="Имя"
            name="quiz-name"
            placeholder="Введите ваше имя"
            autocomplete="name"
            maxlength={60}
            error={errors['quiz-name']}
            required
          />
          <Field
            label="Телефон"
            name="quiz-phone"
            phone
            autocomplete="tel"
            error={errors['quiz-phone']}
            required
          />
          <Field
            label="Способ связи"
            name="quiz-contact"
            placeholder="Telegram, WhatsApp или телефон"
            maxlength={100}
            error={errors['quiz-contact']}
            required
          />
        </div>
      {/if}
      <Button
        type="submit"
        disabled={sent || sending || (step === 0 ? !stage : step === 1 ? !participation : false)}
      >
        {sending
          ? 'Отправляем…'
          : sent
            ? 'Спасибо! Мы свяжемся с вами'
            : step === 2
              ? 'Отправить'
              : 'Далее'}
      </Button>
      {#if failed}
        <p class="quiz__error">Не получилось отправить заявку. Попробуйте ещё раз.</p>
      {/if}
    </form>
  </div>
</section>
