<script setup>
import { ref, onMounted } from "vue";
import ChoreCard from "./ChoreCard.vue"


/* Hard coded JSON Data -> Now pulling instead from MongoDB  
  const chores = ref([
  { name: "Vacuuming", assigned: "Sarah", day: "Saturday", completed: false },
  { name: "Dishes", assigned: "Charlie", day: "Sunday", completed: false },
  { name: "Laundry", assigned: "Mom", day: "Monday", completed: true }
]);  */

const chores = ref([]); //stores the list of chores
const loading = ref(true); // Shows "Loading..." while fetching
const error = ref(null); // Stores any error message

async function saveChore(chore) {
    const { _id, ...choreData } = chore; // strip _id
    const res = await fetch(`http://localhost:3000/api/chores/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(choreData),
    });
    const updated = await res.json();
    const idx = chores.value.findIndex(c => c._id === updated._id);
    if (idx !== -1) chores.value[idx] = updated;
  } 



function formatDate(dateStr) {
  return dateStr?.slice(0, 10); // "2025-12-07"
}


async function updateChore(chore) {
  try {
    await fetch(`http://localhost:3000/api/chores/${chore._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chore),
    });
  } catch (err) {
    error.value = "Could not update chore";
  }
}

async function addChore() {
  try {
    const res = await fetch("http://localhost:3000/api/chores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "New Chore",
        assigned: "",
        day: "",
        completed: false,
      }),
    });
    const newChore = await res.json();
    chores.value.push(newChore);
  } catch (err) {
    error.value = "Could not add chore";
  }
}



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
  <div class="top-line">
    <h1>Household Chore Tracker</h1>
    <button type="button" @click="addChore">Insert Chore</button>
  </div>
  <!-- When loading -->
    <p v-if="loading" class="status">Loading data...</p>
    <!-- When an error occurs -->
    <p v-if="error" class="error">{{ error }}</p>
      <div class="chores-grid">
  <ChoreCard
    v-for="chore in chores"
    :key="chore._id"
    :chore="chore"
    :format-date="formatDate"
    @update="updateChore"
    @save="saveChore"
  />
</div>
    </div>
</template>

<style scoped>
.page-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 5% 10%;
  color: #333;
}

.top-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid coral;
  padding-bottom: 0.5rem;
}

.top-line h1 {
  color: coral;
  font-size: 2rem;
  margin: 0;
}

.top-line button {
  background-color: coral;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.top-line button:hover {
  background-color: #ff7f50; /* lighter coral */
}

.status, .error {
  margin-top: 1rem;
  font-weight: bold;
}
.error {
  color: crimson;
}

.chores-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* exactly 3 per row */
  gap: 1.5rem;
  margin-top: 1.5rem;
}


.container {
  padding: 1rem;
}

h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

input[type="text"], input[type="date"] {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.4rem;
  width: 100%;
  transition: border-color 0.3s ease;
}
input[type="text"]:focus, input[type="date"]:focus {
  border-color: coral;
  outline: none;
}

.assigned {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
.assigned span {
  font-weight: bold;
  margin-right: 0.5rem;
  color: coral;
}

.actions {
  margin-top: 1rem;
  text-align: right;
}
.actions button {
  background-color: coral;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.actions button:hover {
  background-color: #ff7f50;
}
</style>


<!-- // To Do List
  // Add pop up for when status, assigned, or due date has been changed.
  // Add pop for when new chore is added. 
  // Get button working with MongoDB  
  // Add a third status: late when you have date in the past or haven't checked it off
  // Need a pop-up to insert new document
  // add onClick function for add chore. Let it open up a v-if form in the middle of the page if clicked, add to mongodb, reload database 

// Top To Do List Items
  // Transfer all data to be updated in MongoDB 
  // Add button to insert new document with all editable text
--> 