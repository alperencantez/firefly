<script>
import { FormKit } from '@formkit/vue';

export default {
  props: {
    labels: Object,
    values: Object,
    isSignup: Boolean,
    success: Boolean,
    eventSubmit: Function,
  },

  components: {
    FormKit,
  },
};
</script>

<template>
  <form v-if="isSignup">
    <h3 class="text-4xl">{{ labels.handle }}</h3>
    <input v-bind="values.handle" type="text" placeholder="Enter a handle" />

    <h3 class="text-4xl">{{ labels.displayName }}</h3>
    <input
      v-bind="values.displayName"
      type="text"
      placeholder="What should people call you"
    />

    <h3 class="text-4xl">{{ labels.email }}</h3>
    <input v-bind="values.handle" type="text" placeholder="your@mail.com" />

    <h3 class="text-4xl">{{ labels.password }}</h3>
    <input
      v-bind="values.password"
      type="text"
      placeholder="Enter those magical words"
    />
  </form>

  <FormKit
    v-else
    type="form"
    @submit="eventSubmit"
    form-class="flex flex-col gap-8 w-1/3"
    submit-label=" "
    submit-class="text-2xl"
    message-class="text-xl text-red-700"
  >
    <div>
      <h3 class="text-4xl text-zinc-800">{{ labels.handleOrEmail }}</h3>
      <FormKit
        input-class="bg-white/60 mt-2 p-2 w-full text-xl border focus:border-purple-800 transition ease-in-out duration-300 rounded outline-none"
        message-class="text-xl text-red-600 mt-2"
        name="handleOrEmail"
        type="text"
        placeholder="Either one works"
        validation="required"
        :validation-messages="{
          required: 'This field is required',
        }"
      />
    </div>

    <div>
      <h3 class="text-4xl text-zinc-800">{{ labels.password }}</h3>
      <FormKit
        type="password"
        name="password"
        placeholder="We're not looking at it..."
        message-class="text-xl text-red-600 mt-2 mb-5"
        validation="required|length:4"
        :validation-messages="{
          required: 'This field is required too',
          length: 'Your password cannot be this short',
        }"
        input-class="bg-white/60 mt-2 p-2 w-full text-xl border focus:border-purple-800 transition ease-in-out duration-300 rounded outline-none"
      />
    </div>

    <FormKit
      type="submit"
      input-class="bg-purple-800 text-3xl py-2 text-white font-bold rounded-md w-1/2 mx-auto"
    >
      Log in
    </FormKit>
    <p v-if="!success" class="text-2xl text-red-700">
      Oops, invalid credentials. Please retry
    </p>
  </FormKit>
</template>
