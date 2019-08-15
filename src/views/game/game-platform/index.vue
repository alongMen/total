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
        <template slot-scope="{ row }" slot="gamePlatformId">
          <span>{{ gamePlatformName(row) }}</span>
        </template>
        <template slot-scope="{ row }" slot="maintainStartTime">
          <span v-if='row.maintainStartTime'>{{ formatBeijingDate(row.maintainStartTime) }}</span>
        </template>
        <template slot-scope="{ row }" slot="maintainEndTime">
          <span v-if='row.maintainEndTime'>{{ formatBeijingDate(row.maintainEndTime) }}</span>
        </template>
        <template slot-scope="{ row }" slot="isDemo">
          <Tag :color="row.isDemo ? 'green': 'red'" >{{row.isDemo ? '是': '否'}}</Tag>
        </template>
         <template slot-scope="{ row }" slot="isGame">
          <Tag :color="row.isGame ? 'green': 'red'" >{{row.isGame ? '是': '否'}}</Tag>
        </template>
         <template slot-scope="{ row }" slot="isMaintain">
          <Tag :color="row.isMaintain ? 'green': 'red'" >{{row.isMaintain ? '是': '否'}}</Tag>
        </template>
        <template slot-scope="{ row }" slot="logo">
           <img :src='row.logo' width='50' height='50' v-if='row.logo'></img>
        </template>
        <template slot-scope="{ row,index }" slot="status">
           <i-switch
            v-model="row.status"
            size="large"
            :true-value="1"
            :false-value="2"
            @on-change="value => setState(value, row,index)"
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
        <FormItem label="logo" prop='logo'>
          <upload-button v-model="form.logo" :accept='"image/*"'/>
        </FormItem>
        <FormItem label="平台" prop='gamePlatformId'>
          <Select v-model="form.gamePlatformId">
            <Option v-for='item in game_platform' :label="item.label" :value="item.value"> </Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="createId" prop='createId'>
          <InputNumber v-model="form.createId" :min='0'></InputNumber>
        </FormItem> -->
        <FormItem label="是否试玩" prop='isDemo'>
          <i-switch v-model="form.isDemo" size='large'>
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </FormItem>
        <FormItem label="是否进入游戏" prop='isGame'>
          <i-switch v-model="form.isGame" size='large'>
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </FormItem>
        <FormItem label="是否暂停维护" prop='isMaintain'>
          <i-switch v-model="form.isMaintain" size='large'>
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </FormItem>
        <FormItem label="备注" prop='remark'>
          <Input v-model="form.remark"></Input>
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
import uploadButton from "@/components/upload-button/index";
import {game_platform} from '@/config/enum';
import {
  get_game_platform_page,
  create_game_platform,
  update_game_platform,
  set_state_game_platform
} from '@/service/index';
export default {
  name: 'game-platform',
  mixins: [mixin],
  components:{
    uploadButton
  },
  data() {
    return {
      game_platform,
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
          title: 'logo',
          slot: 'logo',
        },
        {
          title: '平台',
          slot: 'gamePlatformId',
        },
        {
          title: '状态',
          key: 'status',
          slot: 'status',
        },
        {
          title: '是否试玩',
          key: 'isDemo',
          slot: 'isDemo',
        },
        {
          title: '是否进入游戏',
          key: 'isGame',
          slot: 'isGame',
        },
        {
          title: '是否暂停维护',
          key: 'isMaintain',
          slot: 'isMaintain',
        },
        {
          title: '维护开始时间',
          key: 'maintainStartTime',
          slot: 'maintainStartTime',
        },
        {
          title: '维护停止时间',
          key: 'maintainEndTime',
          slot: 'maintainEndTime',
        },
        {
          title: '备注',
          key: 'remark',
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
        logo: [{ required: true, message: '请填写logo', trigger: 'blur' }],
        gamePlatformId: [{ required: true,type:'number', message: '请填写logo', trigger: 'change' }],
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
  },
  methods: {
    add() {
      this.form = {createId:0};
      this.title = '添加游戏平台';
      this.showModal = true;
    },
    async edit(row) {
      this.title = '编辑游戏平台';
      this.showModal = true;
      this.form = cloneDeep(row)
    },
    gamePlatformName(row){
      let name 
      this.game_platform.forEach(v=>{
        if(row.gamePlatformId === v.value){
          name = v.label
        }
      })
      return name
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
        content: `<p>是否${title}该游戏平台</p>`,
        onOk: async () => {
          this.btnLoading = true;
          const res = await set_state_game_platform(row.id, state);
          this.btnLoading = false;
          if (res.status < 400) {
            this.$Message.success(`${title}游戏平台成功`);
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
        const res = await update_game_platform(this.form.id,this.form);
        if (res.status < 400) {
          this.$Message.success('修改游戏平台成功');
        }
      } else {
        const res = await create_game_platform(this.form);
        if (res.status < 400) {
          this.$Message.success('添加游戏平台成功');
        }
      }
      this.btnLoading = false;
      this.showModal = false;
      this.page = 1;
      this.getData();
    },

    async getData() {
      this.loading = true;
      const res = await get_game_platform_page(this.page, this.limit, this.query);
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data.itemList;
        this.total = res.data.itemTotal;
      }
    },
  },
};
</script>
