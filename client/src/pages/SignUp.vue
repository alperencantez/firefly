<script>
import AuthFormVue from '../components/AuthForm.vue';

export default {
  components: {
    AuthFormVue,
  },

  data() {
    return {
      labels: {
        handle: 'Handle',
        displayName: 'Display Name',
        email: 'Email',
        password: 'Password',
      },

      values: {
        handle: '',
        displayName: '',
        email: '',
        password: '',
      },

      isSignup: true,
    };
  },
};
</script>

<template>
  <div>
    <AuthFormVue :labels="labels" :values="values" :isSignup="isSignup" />
  </div>
</template>
