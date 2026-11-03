<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { formatPhone } from '@/shared/phone';

  let {
    label,
    name,
    placeholder = '',
    type = 'text',
    required = false,
    maxlength,
    inputmode,
    autocomplete,
    error = '',
    phone = false,
    allowNickname = false,
    pattern,
  }: {
    label: string;
    name: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    maxlength?: number;
    inputmode?: 'text' | 'tel' | 'email' | 'numeric' | 'url' | 'search' | 'decimal' | 'none';
    autocomplete?: HTMLInputAttributes['autocomplete'];
    error?: string;
    /** Маска российского номера: +7 (XXX) XXX-XX-XX, ввод с «8» нормализуется */
    phone?: boolean;
    /** Для phone-полей: не маскировать, если введён @nickname */
    allowNickname?: boolean;
    pattern?: string;
  } = $props();

  function onInput(event: Event) {
    if (!phone) return;
    const input = event.currentTarget as HTMLInputElement;
    if (allowNickname && /^@?[A-Za-z_]/.test(input.value)) return;
    const formatted = formatPhone(input.value);
    if (input.value !== formatted) {
      input.value = formatted;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
</script>

<style lang="scss">
  @use './Field.scss';
</style>

<label class="field">
  <span class="field__label">{label}</span>
  <input
    class="field__input"
    {name}
    type={phone ? 'tel' : type}
    placeholder={phone ? placeholder || '+7 (___) ___-__-__' : placeholder}
    {required}
    maxlength={phone ? 18 : maxlength}
    inputmode={phone ? 'tel' : inputmode}
    autocomplete={phone ? 'tel' : autocomplete}
    {pattern}
    oninput={onInput}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={error ? `${name}-error` : undefined}
  />
  {#if error}<span class="field__error" id={`${name}-error`} role="alert">{error}</span>{/if}
</label>
