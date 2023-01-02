<script>
/* TODO:
  --> Add functionality to send search request to server 
  from the input in this component []
*/
export default {
  data() {
    return {
      texts: ['secure', 'jovial', 'next-level'],
      search: '',
    };
  },
};
</script>

<template>
  <!-- Navbar -->
  <div class="navbar">
    <div class="container mx-auto flex items-center justify-between">
      <h3 class="text-5xl py-2 font-light">Firefly</h3>

      <div class="flex gap-3">
        <router-link to="/auth/login">
          <button
            class="text-xl rounded px-3 py-1 outline outline-1 bg-transparent hover:bg-zinc-900 text-black hover:text-white ease-in duration-100"
          >
            Log in
          </button>
        </router-link>

        <router-link to="/auth/signup/">
          <button
            class="rounded px-3 py-1 outline outline-1 bg-zinc-900 text-white text-xl"
          >
            Sign up
          </button>
        </router-link>
      </div>
    </div>
  </div>

  <!-- Hero Section -->
  <div class="container mx-auto flex justify-center gap-40 items-center">
    <div class="mt-24">
      <h1 class="text-6xl text-gray-800 font-light">
        The
        <span v-for="i in texts"
          ><p
            class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500"
          >
            {{ i }}
          </p></span
        >
        social media app we all need.
      </h1>

      <input
        v-model="search"
        type="text"
        placeholder="Search anything..."
        class="mt-8 border-2 p-1 rounded-md px-2 w-80 text-xl border-gray-200 focus:border-purple-600 outline-none"
      />
    </div>

    <img src="../assets/img/home-banner.png" class="h-96" />
  </div>

  <!-- Cards and Philosophy -->
  <div class="bg-zinc-900 mt-40 h-full">
    <div class="container mx-auto pt-8 py-16">
      <h2 class="text-6xl text-white text-center">Philosophy behind Firefly</h2>

      <!-- Cards Container -->
      <div class="flex justify-evenly mt-8">
        <div class="bg-zinc-300 rounded-2xl p-5 mt-3 text-zinc-800 w-96">
          <h2 class="text-4xl font-extrabold">Web Based</h2>
          <p class="text-2xl">
            Remember when spending time on social media was exciting and fun?
            That was when we couldn't use our phones to socialize online. So,
            that feeling is back. Firefly does not have a mobile application.
          </p>
        </div>

        <div class="bg-zinc-300 rounded-2xl p-5 mt-3 text-zinc-800 w-96">
          <h2 class="text-4xl font-extrabold">Niche</h2>
          <p class="text-2xl">
            As this application is not used by many people (yet), this is
            actually a niche community to be in that has a bright future ahead.
          </p>
        </div>

        <div class="bg-zinc-300 rounded-2xl p-5 mt-3 text-zinc-800 w-96">
          <h2 class="text-4xl font-extrabold">Open Source</h2>
          <p class="text-2xl">
            Firefly is not owned by a giant tech company. Which means anyone can
            contribute to its official repository. If you don't like something
            you fix it yourself!
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="container mx-auto py-10 text-center">
    <a
      href="https://github.com/alperencantez/firefly"
      target="_blank"
      class="text-xl text-zinc-500 hover:text-purple-800"
      >see the github repo</a
    >
    <hr class="w-96 my-2 mx-auto" />
    <p class="text-xl text-purple-900">
      {{ new Date().getFullYear() }} - open source izmir
    </p>
  </div>
</template>

<style>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  backdrop-filter: blur(14px);
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
