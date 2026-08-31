<script setup>
import { ref, onMounted } from "vue";

/* Hard coded JSON Data -> Now pulling instead from MongoDB  
  const chores = ref([
  { name: "Vacuuming", assigned: "Sarah", day: "Saturday", completed: false },
  { name: "Dishes", assigned: "Charlie", day: "Sunday", completed: false },
  { name: "Laundry", assigned: "Mom", day: "Monday", completed: true }
]);  */

const chores = ref([]); //stores the list of chores
const loading = ref(true); // Shows "Loading..." while fetching
const error = ref(null); // Stores any error message

function addChore () {
  // inserts a completely blank chore that you can fill in. 
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
    <button type="button"> Insert Chore</button>
  </div>
  <div v-if="loading" class="loader-wrap" role="status" aria-live="polite">
    <div class="spinner" aria-hidden="true">
      <span class="spinner-ring"></span>
      <span class="spinner-ring inner"></span>
      <span class="spinner-dot"></span>
    </div>
    <p class="status">Loading chores...</p>
  </div>
    <p v-else-if="error" class="error">{{ error }}</p>
  <div v-else class="chores-grid"> 
    <div v-for="chore in chores" :key="chore.name" class="chores-card">
    <div class="container">
    <h3>
      <input type="checkbox" v-model="chore.completed" />
      {{ chore.name }} <!--- add editable text here-->
    </h3>
    <div class="assigned">
      <span> Assigned: </span>
      <p v-if="chore.assigned" contenteditable="true">{{ chore.assigned }}</p>
      <p v-else contenteditable="">Unassigned</p>
  </div>
  <div class="date">
    <p> Due Date:</p><input type="date"/>
  </div>
    <p>Status: {{ chore.completed ? "Done" : "Not yet" }}</p>
  </div>
  </div>
 </div>
</div>
</template>

<style scoped>
.page-container {
  font-family: 'Courier New', Courier, monospace;
  color: #111;
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
.assigned .span {
  margin-left: 10px;
}
.top-line {
  display: flex;
}
.top-line button {
  margin-left: 61.5%;
}
.date input {
  margin-left: 10px;
}
.loader-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 240px;
  gap: 1.35rem;
}
.spinner {
  position: relative;
  width: 64px;
  height: 64px;
}
.spinner-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.08);
  border-top-color: #222;
  border-right-color: #555;
  animation: spin 0.9s cubic-bezier(0.5, 0.15, 0.5, 0.85) infinite;
}
.spinner-ring.inner {
  inset: 10px;
  border-width: 3px;
  border-top-color: transparent;
  border-right-color: #888;
  border-bottom-color: #222;
  animation-duration: 1.25s;
  animation-direction: reverse;
}
.spinner-dot {
  position: absolute;
  top: -3px;
  left: 50%;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  border-radius: 50%;
  background: #222;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.08);
  animation: orbit 0.9s cubic-bezier(0.5, 0.15, 0.5, 0.85) infinite;
  transform-origin: 5px 35px;
}
.status {
  margin: 0;
  letter-spacing: 0.04em;
  color: #444;
  animation: pulse 1.4s ease-in-out infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes orbit {
  to { transform: rotate(360deg); }
}
@keyframes pulse {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
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