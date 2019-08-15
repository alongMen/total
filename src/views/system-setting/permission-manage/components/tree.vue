<template>
  <div class="tree">
    <div class="main-tree">
      <span style="width:40px;" v-for="ind in level" :key="ind"></span>
      <Button icon="md-add" size="small" @click="add"></Button>&nbsp;&nbsp;&nbsp;
      <div class="flex">
        <span>层级</span>
        <span>{{level + 1}}</span>
      </div>&nbsp;&nbsp;&nbsp;
      <div class="flex vertical" style="padding-right:10px">
        <span style="width:30px">名称</span>
        <Input v-model="data.name"/>
      </div>
      <div class="flex vertical" style="padding-right:10px">
        <span style="width:30px">标识</span>
        <Input v-model="data.code"/>
      </div>
      <div class="flex vertical" style="padding-right:10px">
        <span style="width:40px">LOGO</span>
        <Input v-model="data.logo"/>
      </div>
      <div class="flex vertical" style="padding-right:10px">
        <span style="width:80px">权限类型</span>
        <Select v-model="data.permissionMode" style="width:100px;">
          <Option
            v-for="(item, index) in permission_mode_list"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></Option>
        </Select>
      </div>
      <!-- <div class="flex vertical" >
        <span style="width:60px">使用状态</span>
        <i-switch v-model="data.usedStatus" size="large">
          <span slot="open">启用</span>
          <span slot="close">禁用</span>
        </i-switch>
      </div>-->
      <Button
        @click="confirm"
        style="position:absolute;right: 90px"
        v-if="buttonText"
        :type="buttonText === '确认' ? 'success' :'warning' "
      >{{buttonText}}</Button>

      <Button
        style="position:absolute;right: 0px"
        icon="md-remove"
        size="small"
        type="error"
        @click="remove"
        v-if="!data.ok "
      ></Button>
    </div>

    <tree
      v-for="(item, i) in data.children"
      :key="i"
      :level="level+1"
      :data="item"
      :parent="data"
      :index="i"
      :parentId="data.id"
      :permissionType="permissionType"
    />
  </div>
</template>




<script>
import { permission_type_list, permission_mode_list } from "@/config/enum";
import {
  create_permission,
  get_permission_list,
  update_permission
} from "@/service/index";
export default {
  name: "tree",
  props: {
    data: Object,
    level: {
      type: Number,
      default: 0
    },
    parent: Object,
    index: Number,
    parentId: Number,
    permissionType: Number
  },
  data() {
    return {
      permission_mode_list: permission_mode_list
    };
  },
  inject: ["getData"],
  computed: {
    buttonText() {
      const parent = this.parent;
      const data = this.data;
      const hasParent = Object.keys(parent).length > 0 ? true : false;

      if (data.ok && !hasParent) {
        return "修改";
      }
      if (data.ok) {
        return "修改";
      }
      if (!hasParent) {
        return "确认";
      } else if (hasParent && !parent.ok) {
        return "";
      } else if (hasParent && parent.ok) {
        return "确认";
      }
    }
  },
  methods: {
    add() {
      this.data.children.push({
        children: []
      });
    },
    confirm() {
      const data = {
        ...this.data,
        permissionType: this.permissionType,
        parentId: this.parentId
      };
      this.$Modal.confirm({
        // title: "Title",
        content: `确认${
          this.buttonText === "确认" ? "添加菜单吗" : "修改菜单吗"
        }?`,
        loading: true,
        onOk: async() => {
          if (data.id) {
            const res = await update_permission(data.id,data);
            if(res.status < 400 ){
              this.$Message.success('修改成功！');
              this.$Modal.remove();
              this.getData();
            }
          } else {
            const res = await create_permission(data);
            if(res.status < 400 ){
              this.$Message.success('添加成功！');
              this.$Modal.remove();
              this.getData();
            }
          }
        }
      });
    },
    //
    remove() {
      const index = this.index;
      this.parent.children.splice(index, 1);
    }
  }
};
</script>



<style lang="less">
.tree {
  position: relative;
  margin-top: 10px;
  .main-tree {
    display: flex;
    align-items: center;
  }

  .flex {
    display: flex;
  }
}
</style>
