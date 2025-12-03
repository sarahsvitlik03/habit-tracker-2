<script setup>

  import { ref } from 'vue';

  const chores = ref([
  { name: "Vacuuming", assigned: "Sarah", day: "Saturday", completed: false },
  { name: "Dishes", assigned: "Charlie", day: "Sunday", completed: false },
  { name: "Laundry", assigned: "Mom", day: "Monday", completed: true }
]); 

//const chores = ref([]);

function toggleChore(chore) {
  chore.completed = !chore.completed;
}
</script>

<template>
  <div class="page-container">
  <h1>Household Chore Tracker</h1>
  <p>
    Week of Dec. 1st - Dec. 7th 2025
  </p>
  <div class="chores-grid"> 
    <div v-for="chore in chores" :key="chore.name" class="chores-card">
  <div class="container">
    <h3>
      <input type="checkbox" v-model="chore.completed" />
      {{ chore.name }}
    </h3>
    <p>Assigned: {{ chore.assigned }}</p>
    <p>Day: {{ chore.day }}</p>
    <p>Status: {{ chore.completed ? "✅ Done" : "❌ Not yet" }}</p>
  </div>
</div>
</div>
  </div>
</template>

<style scoped>
.page-container {
  font-family: 'Courier New', Courier, monospace;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  margin-bottom: 5%;
}

.chores-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  
  gap: 1rem;  
  margin-top: 1rem;
}

.chores-card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

.chores-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}

</style>
