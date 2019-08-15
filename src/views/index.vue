<template>
  <div class="index">
    <my-nav />
    <div class="index-right">
      <my-header />
      <div class="main-router">
        <route-layout />
      </div>
    </div>
  </div>
</template>

<script>
import MyNav from '@/components/my-nav/index';
import MyHeader from '@/components/my-header/index';
import RouteLayout from '@/components/route-layout/index';
export default {
  components: {
    MyNav,
    MyHeader,
    RouteLayout,
  },
};
</script>

<style lang="less">
.index {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f6f7f9;

  .index-right {
    width: calc(100% - 152px);
  }

  .main-router {
    width: 100%;
    height: calc(100% - 60px);
  }
}
</style>
