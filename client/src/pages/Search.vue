<script>
import Navigation from '../components/Navigation.vue';
import ResultPeople from '../components/Search/ResultPeople.vue';
import ByteView from '../components/Timeline/ByteView.vue';

export default {
  data() {
    return {
      query: null,
      res: null,
    };
  },

  components: {
    Navigation,
    ResultPeople,
    ByteView,
  },

  methods: {
    async search(queryString) {
      const opt = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ query: queryString }),
      };

      const result = await fetch('http://localhost:5000/search', opt);
      const data = await result.json();

      this.$data.res = await data;
    },
  },
};
</script>

<template>
  <Navigation active-tab-name="search" />
  <div class="bg-violet-500">
    <div class="container mx-auto">
      <form
        class="flex flex-col justify-center items-center p-40 gap-8"
        @submit.prevent="search(query)"
      >
        <h1 class="text-6xl text-center text-zinc-50">
          Find whatever you're looking for...
        </h1>
        <input
          class="text-zinc-800 rounded border text-2xl px-2 py-1 w-1/2 focus:outline-none"
          type="search"
          id="searchBar"
          placeholder="Type here"
          v-model="query"
        />
      </form>
    </div>
  </div>

  <div
    v-if="res !== null && (res.users.length != 0 || res.bytes.length != 0)"
    id="results"
    class="py-6"
  >
    <div class="w-1/2 mx-auto">
      <h1 class="text-5xl py-8">People</h1>
      <div v-for="user in res.users">
        <ResultPeople
          profileIconPath="https://thispersondoesnotexist.com/image"
          :displayName="user.displayName"
          :handle="user.handle"
        />
      </div>

      <h1 class="text-5xl py-8 mt-12">Bytes</h1>
      <div v-for="byte in res.bytes" class="flex flex-col gap-8">
        <ByteView
          :content="byte.content"
          :handle="byte.author"
          :display-name="byte.authorDisplayName"
          :created-at="byte.createdAt"
          :likes="byte.likes"
          :dislikes="byte.dislikes"
        />
      </div>
    </div>
  </div>
</template>

<style>
#searchBar::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 1em;
  width: 1em;
  opacity: 0.5;
  background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg)
    no-repeat 50% 50%;
}
</style>
