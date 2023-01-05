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
  <FormKit
    v-if="isSignup"
    type="form"
    @submit="eventSubmit"
    submit-label=" "
    form-class="flex flex-col gap-6 w-1/3"
    message-class="text-xl text-red-600 text-center"
  >
    <FormKit
      :label="labels.handle"
      label-class="text-4xl"
      input-class="bg-white/60 mt-2 p-2 w-full text-xl border focus:border-purple-800 transition ease-in-out duration-300 rounded outline-none"
      message-class="text-xl text-red-600 mt-2"
      name="handle"
      type="text"
      placeholder="Enter a handle"
      validation="required"
      :validation-messages="{
        required: 'This cannot be blank',
      }"
    />

    <FormKit
      :label="labels.displayName"
      label-class="text-4xl"
      input-class="bg-white/60 mt-2 p-2 w-full text-xl border focus:border-purple-800 transition ease-in-out duration-300 rounded outline-none"
      message-class="text-xl text-red-600 mt-2"
      name="displayName"
      type="text"
      placeholder="What should people call you?"
      validation="required"
      :validation-messages="{
        required: 'This field is required',
      }"
    />

    <FormKit
      :label="labels.email"
      label-class="text-4xl"
      input-class="bg-white/60 mt-2 p-2 w-full text-xl border focus:border-purple-800 transition ease-in-out duration-300 rounded outline-none"
      message-class="text-xl text-red-600 mt-2"
      name="email"
      type="email"
      placeholder="your@mail.com"
      validation="required|email"
      :validation-messages="{
        required: 'This field is required',
        email: 'I don\'t think that is a valid email address',
      }"
    />

    <FormKit
      :label="labels.password"
      label-class="text-4xl"
      input-class="bg-white/60 mt-2 p-2 w-full text-xl border focus:border-purple-800 transition ease-in-out duration-300 rounded outline-none"
      message-class="text-xl text-red-600 mt-2"
      name="password"
      type="password"
      placeholder="Those magical word(s)"
      validation="required|length:4"
      :validation-messages="{
        required: 'Emptying a password?! Are you okay?',
        length: 'Your password must be at least 4 characters long',
      }"
    />

    <FormKit
      type="submit"
      input-class="bg-purple-800 text-3xl py-2 px-14 text-white font-bold rounded-md flex mx-auto"
      >Sign up</FormKit
    >

    <p class="text-xl text-zinc-500 text-center">
      Already have an account?
      <RouterLink to="/auth/login" class="text-purple-800">Sign in</RouterLink>
    </p>
  </FormKit>

  <FormKit
    v-else
    type="form"
    @submit="eventSubmit"
    form-class="flex flex-col gap-8 w-1/3"
    submit-label=" "
    submit-class="text-2xl"
    message-class="text-xl text-red-700"
  >
    <FormKit
      :label="labels.handleOrEmail"
      label-class="text-4xl text-zinc-800"
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

    <FormKit
      :label="labels.password"
      label-class="text-4xl text-zinc-800"
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
