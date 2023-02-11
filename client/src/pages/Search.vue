<script>
import Navigation from '../components/Navigation.vue';
import ResultPeople from '../components/Search/ResultPeople.vue';

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
  },

  methods: {
    async search(queryString) {
      // make the request here "res" is the returned data
    },
  },
};
</script>

<template>
  <Navigation active-tab-name="search" />
  <div class="bg-violet-500">
    <div class="container mx-auto">
      <div class="flex flex-col justify-center items-center p-40 gap-8">
        <h1 class="text-6xl text-center text-zinc-50">
          Find whatever you're looking for...
        </h1>
        <input
          class="text-zinc-800 rounded border text-2xl px-2 py-1 w-1/2 focus:outline-none"
          type="text"
          placeholder="Type here"
          v-model="query"
          @click="search(query)"
        />
      </div>
    </div>
  </div>

  <div v-if="res !== null" id="results" class="py-6">
    <div class="w-1/2 mx-auto">
      <h1 class="text-5xl py-8">People</h1>
      <ResultPeople
        profileIconPath="https://thispersondoesnotexist.com/image"
        screenName="Alp"
        handle="alperencantez"
      />
    </div>
  </div>
</template>

<style></style>
