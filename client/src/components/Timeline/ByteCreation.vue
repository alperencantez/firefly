<script>
export default {
  data() {
    return {
      byteContent: '',
      remaining: 150,
      isDisabled: true,
    };
  },

  props: {
    userHandle: String,
    userDisplayName: String,
  },

  methods: {
    calculateRemaingChars(str) {
      const maxByteLength = 150;

      const strAsArray = str.split('');
      this.remaining = maxByteLength - strAsArray.length;

      if (this.remaining < 1) {
        this.isDisabled = true;
      } else if (this.remaining >= 1 && this.isDisabled !== false) {
        this.isDisabled = false;
      } else if (this.remaining == 150) {
        this.isDisabled = true;
      }
    },

    createByte() {
      fetch('http://localhost:5000/byte/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          content: this.byteContent,
          authorDisplayName: this.$props.userDisplayName,
        }),
      })
        .then((res) => (res.status == 201 ? (this.byteContent = '') : null))
        .then(() => this.$router.go(0));
    },
  },
};
</script>

<template>
  <span class="text-3xl text-center text-purple-700 block"
    >Logged in as <small>@</small>{{ userHandle }}</span
  >

  <div class="flex flex-col items-center">
    <textarea
      v-model="byteContent"
      @keyup="calculateRemaingChars(byteContent)"
      class="mt-6 items-center text-xl p-2 mx-auto border focus:border-2 border-slate-200 focus:border-purple-800 transition rounded-md outline-none"
      placeholder="What's on your mind?"
      cols="30"
      rows="6"
      maxlength="150"
    ></textarea>
    <span :class="[isDisabled ? 'mt-3 text-red-700' : 'mt-3']"
      >{{ remaining }} chars remaining</span
    >
    <button
      @click="createByte()"
      :disabled="isDisabled"
      :class="[
        isDisabled == false
          ? 'mt-3 text-xl bg-purple-700 hover:bg-purple-800 p-2 text-white rounded-lg outline-none'
          : 'mt-3 text-xl bg-purple-200 p-2 text-white rounded-lg',
      ]"
    >
      Drop the Byte
    </button>
  </div>
</template>
