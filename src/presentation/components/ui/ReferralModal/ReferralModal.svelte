<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { tick } from 'svelte';
  import Button from '@/presentation/components/ui/Button/Button.svelte';
  import ConsentField from '@/presentation/components/ui/ConsentField/ConsentField.svelte';
  import Field from '@/presentation/components/ui/Field/Field.svelte';
  import { formatMessage, sendTelegramMessage } from '@/shared/telegram';
  import { clearFieldError, validateFields } from '@/shared/validation';

  let { open = $bindable(false) } = $props();

  let sending = $state(false);
  let sent = $state(false);
  let failed = $state(false);
  let agreed = $state(true);
  let errors: Record<string, string> = $state({});
  let cardEl: HTMLDivElement | undefined = $state();

  function close() {
    open = false;
  }

  function onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) close();
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') close();
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    errors = validateFields(data, {
      name: { type: 'name', required: true },
      phone: { type: 'phone', required: true },
      student: { type: 'contact', required: true },
      comment: { type: 'text' },
    });
    if (Object.keys(errors).length > 0) return;

    const text = formatMessage('Рекомендация студента', [
      ['Имя', String(data.get('name') ?? '')],
      ['Телефон', String(data.get('phone') ?? '')],
      ['Контакт студента', String(data.get('student') ?? '')],
      ['Проект/Идея', String(data.get('comment') ?? '')],
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

  $effect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    sent = false;
    failed = false;
    errors = {};
    agreed = true;
    window.addEventListener('keydown', onKeydown);
    void tick().then(() => {
      cardEl?.querySelector('input')?.focus();
    });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeydown);
    };
  });
</script>

<style lang="scss">
  @use './ReferralModal.scss';
</style>

{#if open}
  <div
    class="referral-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="referral-modal-title"
    tabindex="-1"
    transition:fade={{ duration: 180 }}
    onclick={onOverlayClick}
    onkeydown={onKeydown}
  >
    <div class="referral-modal__card" transition:fly={{ y: 24, duration: 240 }} bind:this={cardEl}>
      <button class="referral-modal__close" type="button" aria-label="Закрыть" onclick={close}>
        <svg class="referral-modal__close-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
      <h2 class="referral-modal__title" id="referral-modal-title">
        {sent
          ? 'Заявка отправлена'
          : 'Знаете студента, которому может подойти «Студенческий стартап»?'}
      </h2>
      {#if sent}
        <p class="referral-modal__success">Спасибо! Мы свяжемся со студентом и вернёмся к вам.</p>
      {:else}
        <form
          class="referral-modal__form"
          novalidate
          onsubmit={submit}
          oninput={event => clearFieldError(event, errors)}
        >
          <Field
            label="Имя"
            name="name"
            placeholder="Введите ваше имя"
            autocomplete="name"
            maxlength={60}
            error={errors.name}
            required
          />
          <Field
            label="Телефон"
            name="phone"
            type="tel"
            placeholder="Введите номер телефона"
            inputmode="tel"
            autocomplete="tel"
            maxlength={25}
            error={errors.phone}
            required
          />
          <Field
            label="Контакт"
            name="student"
            placeholder="Телефон или @username студента"
            maxlength={100}
            error={errors.student}
            required
          />
          <Field
            label="Проект/Идея"
            name="comment"
            placeholder="Кратко опишите проект или идею"
            maxlength={2000}
            error={errors.comment}
          />
          <ConsentField bind:checked={agreed} />
          {#if failed}
            <p class="referral-modal__error">
              Не получилось отправить рекомендацию. Попробуйте ещё раз.
            </p>
          {/if}
          <Button variant="lime" type="submit" disabled={!agreed || sending}>
            {sending ? 'Отправляем…' : 'Оставить контакт'}
          </Button>
        </form>
      {/if}
    </div>
  </div>
{/if}
