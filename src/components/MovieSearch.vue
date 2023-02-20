<template>
  <div class="formMovieSearch">
    <input type="text" placeholder="Recherchez vos films...">
    <button>Rechercher</button>
  </div>
</template>
<style scoped>
input {
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.44);
  border-radius: 10px 10px 10px 10px;
  outline: none;
}
button{
  border: 1px solid rgba(0, 0, 0, 0.44);
  outline: none;
}
.formMovieSearch{
  display: flex;
  gap: 10px;
}
</style>