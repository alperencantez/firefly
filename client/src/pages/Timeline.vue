<script>
import Navigation from '../components/Navigation.vue';
import ByteView from '../components/Timeline/ByteView.vue';
import ByteCreation from '../components/Timeline/ByteCreation.vue';

export default {
  data() {
    return {
      currentUser: {},
    };
  },

  methods: {
    setUser(userObject) {
      this.currentUser = userObject;
    },
  },
  components: {
    Navigation,
    ByteView,
    ByteCreation,
  },

  beforeRouteEnter(to, from, next) {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      next('/auth/login');
    } else {
      fetch('http://localhost:5000/timeline', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => (res.status == 403 ? next('/auth/login') : res.json()))
        .then((data) => next((vm) => vm.setUser(data.user)));
    }
  },
};
</script>

<template>
  <div class="navbar">
    <Navigation activeTabName="timeline" />
  </div>
  <div class="container mx-auto">
    <div class="grid grid-cols-12 mt-8">
      <div class="col-span-3 border-0 border-r-2">
        <ByteCreation
          :userDisplayName="currentUser.displayName"
          :userHandle="currentUser.handle"
        />
      </div>

      <div class="col-span-6 content-center ml-8"><ByteView /></div>
    </div>
  </div>
</template>

<style>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  backdrop-filter: blur(14px);
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
