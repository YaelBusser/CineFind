<template>
  <iframe src="https://www.youtube.com/embed/Kx-XVtH3HsE?controls=0&autoplay=1&mute=1&vq=hd1080&loop=1&autohide=1&showinfo=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
  <div class="botiframe"></div>
</template>

<script>
export default {
  name: "VideoTrailer"
}
</script>

<style scoped>
.botiframe{
  margin-top: 100vh;
}
</style>