<script setup>
const props = defineProps({
  chore: { type: Object, required: true },
  formatDate: { type: Function, required: true }
})

const emit = defineEmits(["update", "save"])
</script>

<template>
  <div class="chores-card">
    <div class="container">
      <h3>
        <input
          type="checkbox"
          v-model="props.chore.completed"
          @change="emit('update', props.chore)"
        />
        <input
          type="text"
          v-model="props.chore.name"
          placeholder="Chore name"
        />
      </h3>

      <div class="assigned">
        <span>Assigned:</span>
        <input
          type="text"
          v-model="props.chore.assigned"
          placeholder="Unassigned"
        />
      </div>

      <input
        type="date"
        :value="props.formatDate(props.chore.day)"
        @input="props.chore.day = $event.target.value"
      />

      <p>Status: {{ props.chore.completed ? "Done" : "Not yet" }}</p>

      <div class="actions">
        <button @click="emit('save', props.chore)">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: reuse your coral styles or keep this empty.
   The parent styles already apply since your classes match. */
</style>
