<template>
  <div class="tab-component">
    <Button @click="add">添加</Button>

    <Tree v-for="(item, index) in data" :key="index" :data="item" :level="1" :parent="parent" :index="index" :parentId="parentId" :permissionType="permissionType"/>
  </div>
</template>








<script>
import { permission_type_list , permission_mode_list} from '@/config/enum';
import Tree from './tree';
export default {
  components:{
    Tree
  },
  props:{
    parentId: Number,
    data: Array,
    parent: Object,
    permissionType: Number,
  },
  data(){
    return{
      form:{},
      showModal: false,
      btnLoading: false,
      title: '',
      permission_type_list: permission_type_list,
      permission_mode_list: permission_mode_list,
    }
  },
  methods:{
    //
    ok(){

    },
    //
    add(){
      this.data.push({
        permissionMode: 1,
        children:[],
      });
    },
  }

}
</script>



<style lang="less">
.tab-component{
  padding-bottom: 100px;
}
</style>
