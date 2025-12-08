<script setup>
//props are passing from parent to child a chore object + formatDate
const props = defineProps({  
  chore: { type: Object, required: true },
  formatDate: { type: Function, required: true }
})
// defineEmits -> allows child to notify parent when chore is updated or saved
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
        <button @click="emit('save', props.chore)">Save</button> <!-- Emit? -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.chores-card {
  background: #fff;
  border: 2px solid coral;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255,127,80,0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.chores-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(255,127,80,0.4);
}

.container {
  padding: 1rem;
}
</style>
