<template>
  <p>{{ greeting }} Wold!</p>
</template>

<script>
module.exports = {
  data: function () {
    return {
      greeting: 'Hello'
    }
  }
}
</script>

<style scoped lang="less">
@vue: #41B883;

p {
  color: @vue;
  font-size: 2em;
  text-align: center;
}
</style>
