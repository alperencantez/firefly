<script>
export default {
  props: {
    profileIconPath: String,
    displayName: String,
    handle: String,
  },

  methods: {
    async followUser(userHandle) {
      // post request follow a user
    },
  },
};
</script>

<template>
  <div class="flex justify-between align-center">
    <div class="flex gap-8">
      <img
        :src="this.$props.profileIconPath"
        alt="profile-pic"
        class="rounded-full"
        width="80"
      />

      <div class="flex flex-col gap-2">
        <h3 class="text-3xl">{{ displayName }}</h3>
        <h3 class="text-xl text-zinc-500"><small>@</small>{{ handle }}</h3>
      </div>
    </div>

    <button
      class="text-xl px-5 text-white rounded-xl bg-purple-900 hover:bg-purple-500"
      @click="followUser(handle)"
    >
      Follow
    </button>
  </div>
</template>
