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
        
       
        <template slot-scope="{ row }" slot="isNew">
          <Tag :color="row.isNew ? 'green': 'red'" >{{row.isNew ? '是': '否'}}</Tag>
        </template>
         <template slot-scope="{ row }" slot="isRecommend">
          <Tag :color="row.isRecommend ? 'green': 'red'" >{{row.isRecommend ? '是': '否'}}</Tag>
        </template>
        
        <template slot-scope="{ row }" slot="logo">
           <img :src='row.logo' width='50' height='50' v-if='row.logo'></img>
        </template>
        <template slot-scope="{ row,index }" slot="isAndroid">
           <i-switch
            v-model="row.isAndroid"
            
            @on-change="value => setAndroidState(value, row, index)"
            :loading="btnLoading"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </template>
        <template slot-scope="{ row,index }" slot="isIOS">
           <i-switch
            v-model="row.isIOS"
            
            @on-change="value => setIOSState(value, row, index)"
            :loading="btnLoading"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </template>
        <template slot-scope="{ row,index }" slot="isWeb">
           <i-switch
            v-model="row.isWeb"
            
            @on-change="value => setWebState(value, row, index)"
            :loading="btnLoading"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </template>
        <template slot-scope="{ row,index }" slot="isWebApp">
           <i-switch
            v-model="row.isWebApp"
            
            @on-change="value => setWebAppState(value, row, index)"
            :loading="btnLoading"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </template>
        
        <template slot-scope="{ row,index }" slot="status">
           <i-switch
            v-model="row.status"
            :true-value="1"
            :false-value="2"
            @on-change="value => setState(value, row, index)"
            :loading="btnLoading"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
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
    <Drawer :title="title" v-model="showModal"  width="70">
      <Form ref="form" :model="form" label-position="top" :rules="rules" >
        <Row :gutter="40" >
          <Col :span='12'>
            <FormItem label="名称" prop='name'>
              <Input v-model="form.name"></Input>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="英文名" prop='englishName'>
              <Input v-model="form.englishName"></Input>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="code" prop='code'>
              <Input v-model="form.code"></Input>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="上级节点，默认为0" prop='parentId'>
              <InputNumber v-model="form.parentId" :min='0'></InputNumber>
            </FormItem>
          </Col>
        </Row>

        <Row :gutter="40" v-if='form.parentId===0'>
          <Col :span='12'>
            <FormItem label="logo" prop='logo'>
              <upload-button v-model="form.logo" :accept='"image/*"'/>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="手机logo" prop='miniLogo'>
              <upload-button v-model="form.miniLogo"  :accept='"image/*"'/>
            </FormItem>
          </Col>
        </Row>

        <Row :gutter="40" >
          <Col :span='12'>
            <FormItem label="类型" prop='gameTypeId'>
              <Select v-model="form.gameTypeId">
                <Option v-for='item in game_type' :label="item.label" :value="item.value"> </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="平台" prop='gamePlatformId'>
              <Select v-model="form.gamePlatformId">
                <Option v-for='item in game_platform' :label="item.label" :value="item.value"> </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="是否为新" prop='isNew'>
              <i-switch v-model="form.isNew" size='large'>
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="是否推荐" prop='isRecommend' >
              <i-switch v-model="form.isRecommend" size='large'>
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="是否Android" prop='isAndroid' >
              <i-switch v-model="form.isAndroid" size='large'>
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="是否IOS" prop='isIOS' >
              <i-switch v-model="form.isIOS" size='large'>
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="是否PC" prop='isWeb' >
              <i-switch v-model="form.isWeb" size='large'>
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="是否WAP" prop='isWebApp' >
              <i-switch v-model="form.isWebApp" size='large'>
                <span slot="open">开</span>
                <span slot="close">关</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="流行程度" prop='hotSpot'>
              <InputNumber v-model="form.hotSpot" :min='0'></InputNumber>
            </FormItem>
          </Col>
          <Col :span='12'>
            <FormItem label="备注" prop='remark'>
              <Input v-model="form.remark"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="drawer-footer">
        <Button style="margin-right: 8px"  @click="showModal = false" >取消</Button>
        <Button type="primary" :loading="btnLoading" @click="ok">确定</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import mixin from '@/mixins/single-form-mixin';
import { cloneDeep } from 'lodash';
import {game_mode,openGameType,game_type,game_platform} from '@/config/enum';
import uploadButton from "@/components/upload-button/index";
import {
  get_game_page,
  create_game,
  update_game,
  set_state_game,
  set_Android_state_game,
  set_IOS_state_game,
  set_Web_state_game,
  set_WebApp_state_game,
  get_game_app_page
} from '@/service/index';
export default {
  components:{
    uploadButton
  },
  name: 'game',
  mixins: [mixin],
  data() {
    return {
      src: '',
      game_mode,
      openGameType,
      data: [],
      game_type,
      game_platform,
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
          key: 'logo',
           slot: 'logo',
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
          slot: 'status',
        },
        {
          title: '为新',
          slot: 'isNew',
        },
        {
          title: '推荐',
          slot: 'isRecommend',
        },
        {
          title: 'Android',
          slot: 'isAndroid',
        },
        {
          title: 'IOS',
          slot: 'isIOS',
        },
        {
          title: 'PC',
          slot: 'isWeb',
        },
        {
          title: 'WAP',
          slot: 'isWebApp',
        },
        
        {
          title: '上级节点',
          key: 'parentId',
        },
        {
          title: '创建时间',
          slot: 'createTime',
        },
        {
          title: '操作',
          slot: 'actions',
        },
      ],
      rules: {
        name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        englishName: [{ required: true, message: '请填写英文名称', trigger: 'blur' }],
        code: [{ required: true, message: '请填写code', trigger: 'blur' }],
        logo: [{ required: true, message: '请上传logo', trigger: 'blur' }],
        miniLogo: [{ required: true, message: '请上传手机logo', trigger: 'blur' }],
      },
      title: '',
      game_app_list:[],
      form: {},
    };
  },
  computed: {
    defaultForm() {
      return [
        {
          type: 'select',
          label: '游戏类型',
          options: this.game_type,
          field: 'GameTypeId'
        },
        {
          type: 'text',
          label: '名称',
          field: 'name'
        },
        {
          type: 'select',
          label: '平台',
          options: this.game_platform,
          field: 'gamePlatformId'
        }
      ];
    },
    moreForm() {
      return [
        {
          type: 'text',
          label: '上级节点',
          field: 'parentId'
        },
        {
          type: 'select',
          label: '打开类型',
          options:openGameType,
          field: 'openGameType'
        },
      ]
    },
  },
  methods: {
    add() {
      this.form = {
        parentId:0,
        isIOS:false,
        isAndroid:false,
        isWeb:false,
        isWebApp:false,
      };
      this.title = '添加游戏';
      this.showModal = true;
    },
    async edit(row) {
      this.title = '编辑游戏';
      this.showModal = true;
      this.form = cloneDeep(row)
    },
     async setAndroidState(value,row,index){
          let state
          if(value === true){
            state = true
          }else{
            state =  false
          }
          this.btnLoading = true;
          const res = await set_Android_state_game(row.id, state);
          this.btnLoading = false;
          if (res.status < 400) {
            return false
          } else {
            if (value === true) {
              row.isAndroid = false;
            } else {
              row.isAndroid = true;
            }
            this.data.splice(index,1,row);
          }
    },
    async setIOSState(value,row,index){
      let state
          if(value === true){
            state = true
          }else{
            state =  false
          }
          this.btnLoading = true;
          const res = await set_IOS_state_game(row.id, state);
          this.btnLoading = false;
          if (res.status < 400) {
            return false
          } else {
            if (value === true) {
              row.isIOS = false;
            } else {
              row.isIOS = true;
            }
            this.data.splice(index,1,row);
          }
    },
    async setWebState(value,row,index){
      let state
          if(value === true){
            state = true
          }else{
            state =  false
          }
          this.btnLoading = true;
          const res = await set_Web_state_game(row.id, state);
          this.btnLoading = false;
          if (res.status < 400) {
            return false
          } else {
            if (value === true) {
              row.isWeb = false;
            } else {
              row.isWeb = true;
            }
            this.data.splice(index,1,row);
          }
    },
    async setWebAppState(value,row,index){
      let state
          if(value === true){
            state = true
          }else{
            state =  false
          }
          this.btnLoading = true;
          const res = await set_WebApp_state_game(row.id, state);
          this.btnLoading = false;
          if (res.status < 400) {
            return false
          } else {
            if (value === true) {
              row.isWebApp = false;
            } else {
              row.isWebApp = true;
            }
            this.data.splice(index,1,row);
          }
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
        content: `<p>是否${title}该游戏</p>`,
        onOk: async () => {
          this.btnLoading = true;
          const res = await set_state_game(row.id, state);
          this.btnLoading = false;
          if (res.status < 400) {
            this.$Message.success(`${title}游戏成功`);
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
      if(this.form.parentId>0){
        this.form.openGameType === 0
      }
      this.btnLoading = true;
      if (this.form.id) {
        const res = await update_game(this.form.id,this.form);
        if (res.status < 400) {
          this.$Message.success('修改游戏成功');
        }
      } else {
        const res = await create_game(this.form);
        if (res.status < 400) {
          this.$Message.success('添加游戏成功');
        }
      }
      this.btnLoading = false;
      this.showModal = false;
      this.page = 1;
      this.getData();
    },

    async getData() {
      this.loading = true;
      // console.log(this.query);
      const res = await get_game_page(this.page, this.limit, this.query);
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data.itemList;
        this.total = res.data.itemTotal;
      }
    },
  },
  async mounted() {
    
  },
};
</script>
