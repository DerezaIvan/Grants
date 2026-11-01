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
      email: { type: 'email', required: true },
      telegram: { type: 'telegram', required: true },
    });
    if (Object.keys(errors).length > 0) return;

    const text = formatMessage('Заявка на чек-лист', [
      ['Имя', String(data.get('name') ?? '')],
      ['Email', String(data.get('email') ?? '')],
      ['Телеграм', String(data.get('telegram') ?? '')],
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
  @use './ChecklistModal.scss';
</style>

{#if open}
  <div
    class="checklist-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="checklist-modal-title"
    tabindex="-1"
    transition:fade={{ duration: 180 }}
    onclick={onOverlayClick}
    onkeydown={onKeydown}
  >
    <div class="checklist-modal__card" transition:fly={{ y: 24, duration: 240 }} bind:this={cardEl}>
      <button class="checklist-modal__close" type="button" aria-label="Закрыть" onclick={close}>
        <svg class="checklist-modal__close-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
      <h2 class="checklist-modal__title" id="checklist-modal-title">
        {sent ? 'Заявка отправлена' : 'Получить чек лист подготовки заявки'}
      </h2>
      {#if sent}
        <p class="checklist-modal__success">Чек-лист уже летит к вам. Проверьте Telegram.</p>
      {:else}
        <form
          class="checklist-modal__form"
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
            label="Email"
            name="email"
            type="email"
            placeholder="Введите ваш email"
            inputmode="email"
            autocomplete="email"
            maxlength={254}
            error={errors.email}
            required
          />
          <Field
            label="Телеграм"
            name="telegram"
            placeholder="Введите @username"
            autocomplete="off"
            maxlength={33}
            error={errors.telegram}
            required
          />
          <ConsentField bind:checked={agreed} />
          {#if failed}
            <p class="checklist-modal__error">
              Не получилось отправить заявку. Попробуйте ещё раз.
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
