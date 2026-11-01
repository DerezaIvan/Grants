<script lang="ts">
  let { checked = $bindable(true) }: { checked?: boolean } = $props();
</script>

<style lang="scss">
  @use './ConsentField.scss';
</style>

<label class="consent-field">
  <input class="consent-field__input" type="checkbox" bind:checked required />
  <span class="consent-field__label">Согласен(а) на обработку персональных данных</span>
</label>
