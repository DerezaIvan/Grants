<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  let {
    label,
    name,
    placeholder,
    type = 'text',
    required = false,
    maxlength,
    inputmode,
    autocomplete,
    error = '',
  }: {
    label: string;
    name: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    maxlength?: number;
    inputmode?: 'text' | 'tel' | 'email' | 'numeric' | 'url' | 'search' | 'decimal' | 'none';
    autocomplete?: HTMLInputAttributes['autocomplete'];
    error?: string;
  } = $props();
</script>

<style lang="scss">
  @use './Field.scss';
</style>

<label class="field">
  <span class="field__label">{label}</span>
  <input
    class="field__input"
    {name}
    {type}
    {placeholder}
    {required}
    {maxlength}
    {inputmode}
    {autocomplete}
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={error ? `${name}-error` : undefined}
  />
  {#if error}<span class="field__error" id={`${name}-error`} role="alert">{error}</span>{/if}
</label>
