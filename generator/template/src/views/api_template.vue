<template>
  <button @click="test_api">测试发送请求</button>
</template>

<script>
import templateApis from '../../apis/modules/templateApis'
export default {
  methods: {
    async test_api () {
      const params = {test: 1}
      let res = await this.$fetch(templateApis, params)
      console.log(res)
    }
  },
}
</script>

<style>

</style>