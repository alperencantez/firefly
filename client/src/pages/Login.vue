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
        handleOrEmail: 'Handle or Email',
        password: 'Password',
      },
      values: {
        handleOrEmail: '',
        password: '',
      },
      isSignup: false,
      success: true,
    };
  },

  methods: {
    signIn(credentials) {
      fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handleOrEmail: credentials.handleOrEmail,
          password: credentials.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 404) {
            return (this.success = false);
          }

          localStorage.setItem('authToken', data);
          return router.push('/timeline');
        });
    },
  },
};
</script>

<template>
  <div id="this" class="h-screen pt-24">
    <div class="container mx-auto rounded-xl py-5 bg-white/50 backdrop-blur-sm">
      <h2 class="text-6xl text-center text-zinc-800">Log in</h2>
      <p class="text-3xl text-zinc-700 text-center mb-8">
        Time to pick up where you left off!
      </p>
      <div class="flex mx-auto justify-evenly">
        <AuthFormVue
          :labels="labels"
          :values="values"
          :isSignup="isSignup"
          :eventSubmit="signIn"
          :success="success"
        />

        <img src="../assets/img/login.png" class="h-96" />
      </div>

      <p class="text-2xl text-zinc-500 text-center">
        Don't have an account?
        <RouterLink to="/auth/signup" class="text-purple-800"
          >Sign up</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
#this {
  background-image: url('https://images.unsplash.com/photo-1636955860106-9eb89e576026?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
}
</style>
