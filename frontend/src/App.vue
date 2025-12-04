<script setup>
/**
 * Import reactive state utilities from Vue.
 * - ref() lets variables be reactive
 * - onMounted() runs code when the component first loads
 */
import { ref, onMounted } from "vue";

/*   const chores = ref([
  { name: "Vacuuming", assigned: "Sarah", day: "Saturday", completed: false },
  { name: "Dishes", assigned: "Charlie", day: "Sunday", completed: false },
  { name: "Laundry", assigned: "Mom", day: "Monday", completed: true }
]);  */

const chores = ref([]); //stores the list of chores
const loading = ref(true); // Shows "Loading..." while fetching
const error = ref(null); // Stores any error message

function toggleChore(chore) {
  chore.completed = !chore.completed;
}


/**
 * Fetch data from the Express.js backend when component loads.
 * This calls: http://localhost:3000/api/books
 */
 onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/chores");

    // If the server sends a non-200 response
    if (!res.ok) throw new Error("Failed to fetch");

    // Convert response to JSON and store it in 'books'
    chores.value = await res.json();
  } catch (err) {
    console.error(err);
    error.value = "Could not load data from backend"; // Show error message
  } finally {
    loading.value = false; // Hide loading state no matter what
  }
});


</script>

<template>
  <div class="page-container">
  <h1>Household Chore Tracker</h1>
  <p>
    Week of Dec. 1st - Dec. 7th 2025
  </p>
      <!-- When loading -->
      <p v-if="loading" class="status">Loading data...</p>

      <!-- When an error occurs -->
      <p v-if="error" class="error">{{ error }}</p>

  <div class="chores-grid"> 
    <div v-for="chore in chores" :key="chore.name" class="chores-card">
  <div class="container">
    <h3>
      <input type="checkbox" v-model="chore.completed" />
      {{ chore.name }}
    </h3>
    <p>Assigned: {{ chore.assigned }}</p>
    <div class="date">
    <p> Due Date:</p><input type="date"/>
  </div>
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

.date {
  display: flex;
}

.date input {
  margin-left: 10px;
}
</style>
