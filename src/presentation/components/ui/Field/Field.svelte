<script lang="ts">
  let {
    label,
    name,
    placeholder,
    type = 'text',
    required = false,
  }: {
    label: string;
    name: string;
    placeholder: string;
    type?: string;
    required?: boolean;
  } = $props();
</script>

<style lang="scss">
  @use './Field.scss';
</style>

<label class="field">
  <span class="field__label">{label}</span>
  <input class="field__input" {name} {type} {placeholder} {required} />
</label>
