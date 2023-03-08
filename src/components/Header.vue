<template>
  <div class="header">
    <nav>
      <img src="https://fontmeme.com/permalink/230308/1f21cf983ff5e620f00dbddf24b20df5.png" alt="netflix-font" border="0">
      <p>Accueil</p>
      <p>Films</p>
      <p>Séries</p>
    </nav>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "Header",
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border: 1px solid red;
  height: 70px;
  display: flex;
  justify-content: start;
  align-items: center;
}
nav{
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 50px;
}
nav img{
  width: 100px;
}
nav p {
  font-family: CineFind;
}
</style>