<template>
  <div class="main-area">
    <Form :label-width="100">
      <FormItem label="权限类型">
        <Select v-model="permissionType" @on-change="getData" style="width:200px;">
          <Option label="总后台" :value="1">

          </Option>
          <Option label="商户后台" :value="2">

          </Option>
        </Select>
      </FormItem>
    </Form>



    <div class="operation">
      <Button type="primary" @click="addRoot">添加根菜单</Button>
    </div>
    <Spin v-if="loading" ></Spin>
    <div class="table-area" v-else>
      <Tabs v-model="activeIndex">
          <TabPane :label="item.name" :name="index + ''" v-for="(item, index) in data" :key="index">
            <tab-component :parentId="item.id" :data="item.children" :parent="item" :permissionType="permissionType"/>
          </TabPane>
          <Button slot="extra" @click="edit" v-show="data.length > 0">编辑当前菜单</Button>
      </Tabs>
    </div>
    <Modal :title="title" v-model="showModal" :mask-closable="false">
      <Form ref="form" :model="form">
        <FormItem label="名称">
          <Input v-model="form.name"></Input>
        </FormItem>
        <FormItem label="标识">
          <Input v-model="form.code"></Input>
        </FormItem>
        <FormItem label="logo">
          <Input v-model="form.logo"></Input>
        </FormItem>
        <FormItem label="权限类型">
          <Select v-model="form.permissionMode">
            <Option v-for="(item, index) in permission_mode_list" :key="index" :label="item.label" :value="item.value">

            </Option>
          </Select>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showModal = false">取消</Button>
        <Button type="primary" :loading="btnLoading" @click="ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>







<script>
import {create_permission , get_permission_list , update_permission} from '@/service/index';
import { permission_type_list , permission_mode_list} from '@/config/enum';
import TabComponent from './components/tab-component';
import {cloneDeep} from 'lodash';
export default {
  components:{
    TabComponent
  },
  data(){
    return{
      permissionType: 2,//1 总后台。 2 商户
      data:[],
      showModal: false,
      permission_type_list: permission_type_list,
      permission_mode_list: permission_mode_list,
      form:{},//根菜单obj
      btnLoading: false,
      title: '',
      loading: true,
      activeIndex: '0',
    }
  },

  provide(){
    return{
      getData: this.getData,
    }
  },
  methods:{
    edit(){
      const index = +this.activeIndex;
      this.form = cloneDeep(this.data[index]);
      this.title = '编辑根菜单';
      this.showModal = true;
    },


    //添加跟菜单
    async addRoot(){
      this.title = '添加根菜单';
      this.form = {};
      this.showModal = true;

    },
    //确认添加跟菜单
    async ok(){
      const data = {
        permissionType:this.permissionType,
        ...this.form,
      };
      this.btnLoading = true;
      if(this.form.id){
        const res = await update_permission(this.form.id , data);
        if(res.status < 400 ){
          this.$Message.success('编辑根菜单成功!');
          this.showModal = false;
          this.getData();
        }
      }else{
        const res = await create_permission(data);
        if(res.status < 400 ){
          this.$Message.success('添加根菜单成功!');
          this.showModal = false;
          this.getData();
        }
      }
      this.btnLoading = false;
    },
    //
    async getData(){
      this.loading = true;
      const res = await get_permission_list(this.permissionType);
      this.loading = false;
      if(res.status < 400 ){
        let result = [];
        getTreedata(result , res.data);
        this.data = result;
      }
    }
  },
  mounted(){
    this.getData();
  }
}



const getTreedata = (result, treeList) => {

  if (result.length === 0) {
    treeList.forEach(value => {
      if (value.parentId === 0) {
        result.push({...value,children:[],ok: true,});
      }
    });
		if (result.length === 0) {
			return;
		}
    getTreedata(result, treeList);
  } else {
    result.forEach(value => {
      value.children = [];
      treeList.forEach(v => {
        if (value.id === v.parentId) {
          value.children.push({...v,ok:true });
          getTreedata(value.children, treeList);
        }
      });
    });
  }
};
</script>




