<template>
  <div>
    <img
      :src="'http://106.15.183.147:8989/user/avatars/'+user.avatar"
      width="40px"
      height="40px"
      style="object-fit: cover;"
    />
    <span>{{user.nickname||user.author}}</span>
  </div>
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style>
</style>
