<script lang="ts">
  import Button from '@/presentation/components/ui/Button/Button.svelte';
  import Field from '@/presentation/components/ui/Field/Field.svelte';
  import { formatMessage, sendTelegramDocument, sendTelegramMessage } from '@/shared/telegram';

  let sent = $state(false);
  let sending = $state(false);
  let failed = $state(false);
  let agreed = $state(true);
  let fileName = $state('');

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const text = formatMessage('Новая заявка с сайта', [
      ['Имя', String(data.get('name') ?? '')],
      ['Телефон', String(data.get('phone') ?? '')],
      ['Сообщение', String(data.get('message') ?? '')],
    ]);
    const file = data.get('attachment');

    sending = true;
    failed = false;
    try {
      if (file instanceof File && file.size > 0) {
        await sendTelegramDocument(file, text);
      } else {
        await sendTelegramMessage(text);
      }
      sent = true;
    } catch {
      failed = true;
    } finally {
      sending = false;
    }
  }
</script>

<style lang="scss">
  @use './Contact.scss';
</style>

<section id="contact" class="contact">
  <div class="container">
    <div class="contact__card">
      <div class="contact__intro">
        <h2 class="contact__title">
          Остались вопросы?<br class="contact__title-br" />Напишите нам
        </h2>
        <p class="contact__text">
          Можно просто прислать идею в нескольких предложениях.<br />Заявка или презентация для
          первого разговора не нужны.
        </p>
      </div>
      <form class="contact__form" onsubmit={submit}>
        <Field label="Имя" name="name" placeholder="Как к вам обращаться" required />
        <Field label="Телефон" name="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
        <Field
          label="Опишите, с чем можем вам помочь"
          name="message"
          placeholder="Напишите проблему"
        />
        <label class="contact__file"
          ><span>Заголовок</span><span class="contact__file-control"
            >{fileName || 'Загрузить с компьютера'}<b>☁</b></span
          ><input
            class="contact__file-input"
            type="file"
            name="attachment"
            onchange={event => (fileName = event.currentTarget.files?.[0]?.name || '')}
          /><small class="contact__file-hint">Максимум 25 mb</small></label
        >
        <label class="contact__agree"
          ><input
            class="contact__agree-input"
            type="checkbox"
            bind:checked={agreed}
            required
          /><span
            >Я ознакомлен(а) с <u>Политикой конфиденциальности</u> и даю согласие на обработку моих персональных
            данных</span
          ></label
        >
        {#if failed}
          <p class="contact__error">Не получилось отправить заявку. Попробуйте ещё раз.</p>
        {/if}
        <Button variant="lime" type="submit" disabled={!agreed || sending}
          >{sending ? 'Отправляем…' : sent ? 'Заявка отправлена' : 'Получить консультацию'}</Button
        >
      </form>
    </div>
  </div>
</section>
