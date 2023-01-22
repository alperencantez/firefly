<script>
import router from '../router/index.js';

export default {
  data() {
    return {
      active:
        'text-3xl px-8 py-2 border-2 border-b-violet-700 border-t-0 border-l-0 border-r-0',
      inactive:
        'text-3xl text-gray-300 hover:text-black px-6 py-2 border-2 border-b-transparent transition ease-in-out hover:border-b-violet-700 border-t-0 border-l-0 border-r-0 text-zinc-700',
    };
  },

  props: {
    activeTabName: String,
  },

  methods: {
    logOut() {
      const token = localStorage.getItem('authToken');

      if (token) {
        localStorage.removeItem('authToken');
        router.push('/');
      }
    },
  },
};
</script>
<template>
  <div id="main">
    <div class="container mx-auto">
      <div class="p-4 grid grid-cols-12">
        <h3 class="text-4xl col-span-3">Firefly</h3>

        <div class="col-span-7 content-center">
          <RouterLink
            to="/timeline"
            :class="[activeTabName == 'timeline' ? active : inactive]"
            >Timeline</RouterLink
          >
          <RouterLink
            to="/profile"
            :class="[activeTabName == 'people' ? active : inactive]"
            >People</RouterLink
          >
          <RouterLink
            to="/trending"
            :class="[activeTabName == 'trending' ? active : inactive]"
            >Trending</RouterLink
          >
          <RouterLink
            to="/search"
            :class="[activeTabName == 'search' ? active : inactive]"
            >Search</RouterLink
          >
        </div>

        <button
          class="col-span-1 rounded text-2xl transition bg-transparent hover:bg-purple-700 px-4 py-1 text-purple-700 hover:text-white border"
          @click="logOut"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
</template>
