<template>
  <div class="main-area">
    <search-area
      @search="search"
      @reset="reset"
      :defaultForm="defaultForm"
      :moreForm="moreForm"
      v-model="query"
    />
    <div class="operation">
      <Button type="primary" @click="add">添加</Button>
    </div>
    <div class="table-area">
      <Table :columns="columns" :data="data" :loading="loading">
        <template slot-scope="{ row }" slot="createTime">
          <span>{{ formatBeijingDate(row.createTime) }}</span>
        </template>
        <template slot-scope="{ row,index }" slot="status">
           <i-switch
            v-model="row.status"
            size="large"
            :true-value="1"
            :false-value="2"
            @on-change="value => setState(value, row, index)"
            :loading="btnLoading"
            v-if="!row.default"
          >
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </template>
        <template slot-scope="{ row }" slot="actions">
          <Button type="primary" @click="edit(row)">编辑</Button>
        </template>
      </Table>
      <div class="pagination">
        <Page
          :total="total"
          @on-change="pageChange"
          :current.sync="page"
          :page-size="limit"
          show-total
        />
      </div>
    </div>
    <Modal :title="title" v-model="showModal" :mask-closable="false">
      <Form ref="form" :model="form" label-position="top" :rules="rules">
        <FormItem label="名称" prop='name'>
          <Input v-model="form.name"></Input>
        </FormItem>
        <FormItem label="code" prop='code'>
          <Input v-model="form.code"></Input>
        </FormItem>
        <FormItem label="类型" prop='gameTypeId'>
          <Select v-model="form.gameTypeId">
            <Option v-for='item in game_type_list' :label="item.name" :value="item.id"> </Option>
          </Select>
        </FormItem>
        <FormItem label="平台" prop='GamePlatformId'>
          <Select v-model="form.GamePlatformId">
            <Option v-for='item in game_platform_list' :label="item.name" :value="item.id"> </Option>
          </Select>
        </FormItem>
        
      </Form>
      <div slot="footer">
        <Button  @click="showModal = false" >取消</Button>
        <Button type="primary" :loading="btnLoading" @click="ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import mixin from '@/mixins/single-form-mixin';
import { cloneDeep } from 'lodash';
import {
  get_game_app_page,
  create_game_app,
  update_game_app,
  set_state_game_app
} from '@/service/index';
export default {
  name: 'game-app',
  mixins: [mixin],
  data() {
    return {
      data: [],
      columns: [
        {
          title: '名称',
          key: 'name',
        },
        {
          title: 'code',
          key: 'code',
        },
        {
          title: '类型',
          key: 'gameType',
        },
        {
          title: '平台',
          key: 'platForm',
        },
        {
          title: '状态',
          key: 'status',
          slot: 'status',
        },
        
        {
          title: '创建时间',
          key: 'createTime',
          slot: 'createTime',
        },
        {
          title: '操作',
          slot: 'actions',
          width: 180,
        },
      ],
      rules: {
        name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        code: [{ required: true, message: '请填写code', trigger: 'blur' }],
      },
      title: '',
      form: {},
    };
  },
  computed: {
    defaultForm() {
      return [
        {
          type: 'text',
          label: '名称',
          field: 'name'
        },
        {
          type: 'radioButton',
          label: '状态',
          options: [
            {label:'开启',value:1},
            {label:'关闭',value:2},
          ],
          field: 'status'
        },
      ];
    },
    moreForm() {
      return []
    },
    game_platform_list() {
      return this.$store.state.base.game_platform_list;
    },
    game_type_list() {
      return this.$store.state.base.game_type_list;
    },
  },
  methods: {
    add() {
      this.form = {createId:0};
      this.title = '添加游戏app';
      this.showModal = true;
    },
    async edit(row) {
      this.title = '编辑游戏app';
      this.showModal = true;
      this.form = cloneDeep(row)
    },
     async setState(value,row,index){
      let state
      let title
      if(value ===1){
        state = 1
        title = '开启'
      }else{
        state = 2
         title = '关闭'
      }
      this.$Modal.confirm({
        title: `${title}`,
        loading: true,
        content: `<p>是否${title}该游戏app</p>`,
        onOk: async () => {
          this.btnLoading = true;
          const res = await set_state_game_app(row.id, state);
          this.btnLoading = false;
          if (res.status < 400) {
            this.$Message.success(`${title}游戏app成功`);
            this.$Modal.remove();
            // this.getData();
          } else {
            if (value === 1) {
              row.status = 2;
            } else {
              row.status = 1;
            }
            this.data.splice(index,1,row);
            this.$Modal.remove();
          }
        },
        onCancel: () => {
          if (value === 1) {
            row.status = 2;
          } else {
            row.status = 1;
          }
          this.data.splice(index,1,row);
        }
      });
    },
    async ok() {
      const valid = await this.$refs.form.validate();
      if (!valid) return;
      this.btnLoading = true;
      if (this.form.id) {
        const res = await update_game_app(this.form.id,this.form);
        if (res.status < 400) {
          this.$Message.success('修改游戏app成功');
        }
      } else {
        const res = await create_game_app(this.form);
        if (res.status < 400) {
          this.$Message.success('添加游戏app成功');
        }
      }
      this.btnLoading = false;
      this.showModal = false;
      this.page = 1;
      this.getData();
    },

    async getData() {
      this.loading = true;
      const res = await get_game_app_page(this.page, this.limit, this.query);
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data.itemList;
        this.total = res.data.itemTotal;
      }
    },
  },
  mounted() {
    if (this.game_platform_list.length === 0) {
      this.$store.dispatch("get_game_platform_list");
    }
     if (this.game_type_list.length === 0) {
      this.$store.dispatch("get_game_type_list");
    }
  },
};
</script>
