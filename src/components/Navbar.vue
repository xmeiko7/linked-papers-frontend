<!-- components/Navbar.vue -->
<template>
  <nav>
    <router-link to="/">首页</router-link>
    <router-link to="/search">搜索</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
nav {
  display: flex;
  gap: 20px;
}
router-link {
  text-decoration: none;
  color: #007bff;
}
router-link:hover {
  text-decoration: underline;
}
</style>
