<script>
import AuthFormVue from '../components/AuthForm.vue';
import router from '../router';

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
      success: true,
    };
  },

  methods: {
    signUp(credentials) {
      fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle: credentials.handle,
          displayName: credentials.displayName,
          email: credentials.email,
          password: credentials.password,
        }),
      }).then((res) => {
        if (res.status == 400) {
          return (this.success = false);
        }

        return router.push('/auth/login');
      });
    },
  },
};
</script>

<template>
  <div>
    <div class="container mx-auto">
      <div class="flex flex-col items-center justify-center h-screen">
        <div>
          <h2 class="text-5xl">Sign up</h2>
          <h2 class="text-2xl text-zinc-400 mt-2">Welcome aboard!</h2>
        </div>
        <AuthFormVue
          :labels="labels"
          :values="values"
          :isSignup="isSignup"
          :eventSubmit="signUp"
          :success="success"
        />
        <p v-if="!success" class="text-2xl text-red-600 text-center">
          Such user already exists
        </p>
      </div>
    </div>
  </div>
</template>
