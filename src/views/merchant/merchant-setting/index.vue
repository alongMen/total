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
        <template slot-scope="{ row, index }" slot="status">
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
          <Button type="success" size="small" @click="charge(row)"
            >限额调整</Button
          >&nbsp;
          <Button type="success" size="small" @click="chargeRecord(row)"
            >限额调整记录</Button
          >&nbsp;
          <Button type="primary" size="small" @click="edit(row)">编辑</Button
          >&nbsp;
          <Button type="primary" size="small" @click="changePassAdmin(row)"
            >修改初始管理员密码</Button
          >
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
    <Drawer :title="title" v-model="showDraw" width="70">
      <Form ref="form" :model="form" label-position="top" :rules="rules">
        <Row :gutter="40">
          <Col :span="12">
            <FormItem label="名称" prop="name">
              <Input v-model="form.name"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="手机" prop="phone">
              <Input v-model="form.phone"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="邮箱" prop="email">
              <Input v-model="form.email" type="email"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="qq" prop="qq">
              <Input v-model="form.qq"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="微信" prop="weiXin">
              <Input v-model="form.weiXin"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="logo" prop="logo">
              <upload-button
                v-model="form.logo"
                :accept="'image/*'"
                :showDelete="!form.id"
              />
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="网站协议" prop="protocolType">
              <Select v-model="form.protocolType" :disabled="form.id > 0">
                <Option label="http" :value="1"> </Option>
                <Option label="https" :value="2"> </Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="后台域名" prop="website">
              <Input v-model="form.website" :disabled="form.id > 0"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="网站名称" prop="websiteName">
              <Input v-model="form.websiteName" :disabled="form.id > 0"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="网站标题" prop="websiteTitle">
              <Input
                v-model="form.websiteTitle"
                :disabled="form.id > 0"
              ></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="管理员账号" prop="userName">
              <Input v-model="form.userName" :disabled="form.id > 0"></Input>
            </FormItem>
          </Col>
          <Col :span="12" v-if="!form.id">
            <FormItem label="管理初始密码" prop="password">
              <Input v-model="form.password"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="40">
          <Col :span="12">
            <FormItem label="appId" prop="appId">
              <Input v-model="form.appId" disabled></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="appSecret" prop="appSecret">
              <Input v-model="form.appSecret" disabled></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="scope" prop="scope">
              <Input v-model="form.scope" disabled></Input>
            </FormItem>
          </Col>
          <Col :span="12" v-if="form.id > 0">
            <FormItem label="发布">
              <Button
                type="warning"
                @click="publish(form)"
                style="margin-right:5px;"
                >发布</Button
              >
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="drawer-footer">
        <Button style="margin-right: 8px" @click="showDraw = false"
          >取消</Button
        >
        <Button type="primary" :loading="btnLoading" @click="ok">确定</Button>
      </div>
    </Drawer>
    <Modal :title="title" v-model="showModal" :mask-closable="false">
      <Form
        ref="formpassword"
        :model="form"
        label-position="top"
        :rules="rules"
      >
        <FormItem label="新密码" prop="newPassword">
          <Input v-model="form.newPassword"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="confirmPassword">
          <Input v-model="form.confirmPassword"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showModal = false">取消</Button>
        <Button type="primary" :loading="btnLoading" @click="okChange"
          >确定</Button
        >
      </div>
    </Modal>
    <Modal
      v-model="isChangeAcount"
      title="限制额度调整"
      @on-ok="changeAcountOK"
      @on-cancel="cancelChange"
    >
      <Form ref="changeForm" :model="form" label-position="top" :rules="rules">
        <FormItem label="限额" prop="changeAmountLimit">
          <Input v-model="form.changeAmountLimit"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Drawer :title="title" v-model="isChangeRecord" width="80">
      <change-record :form="form" v-if="isChangeRecord" ref="form" :merchantId='merchantId'/>
    </Drawer>
  </div>
</template>

<script>
import mixin from '@/mixins/single-form-mixin';
import { validMobile, validDomain } from '@/utils/validate';
import { cloneDeep } from 'lodash';
import uploadButton from '@/components/upload-button/index';
import ChangeRecord from './components/changeRecord';
import {
  get_merchant_page,
  create_merchant,
  update_merchant,
  set_state_merchant,
  get_merchant_info,
  change_merchant_init_password,
  publish_site,
  change_merchant_ChangeAmountLimit,
} from '@/service/index';
export default {
  name: 'merchant-setting',
  mixins: [mixin],
  components: {
    uploadButton,
    ChangeRecord,
  },
  data() {
    const validRepassword = (rule, value, cb) => {
      if (this.form.newPassword && value !== this.form.newPassword) {
        cb(new Error('两次密码不同'));
      } else {
        cb();
      }
    };
    return {
      merchantId:0,
      isChangeAcount: false,
      isChangeRecord: false,
      data: [],
      columns: [
        {
          title: '名称',
          key: 'name',
        },
        {
          title: '手机',
          key: 'phone',
        },
        {
          title: '邮箱',
          key: 'email',
        },
        {
          title: '后台站点',
          key: 'website',
        },

        {
          title: '转账时使用',
          key: 'limitAmount',
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
          width: 400,
        },
      ],
      rules: {
        name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        phone: [
          { validator: validMobile, trigger: 'blur' },
          { required: true, message: '请填写手机', trigger: 'blur' },
        ],
        website: [
          { required: true, message: '请填写后台域名', trigger: 'blur' },
          { validator: validDomain, trigger: 'blur' },
        ],
        protocolType: [
          {
            required: true,
            type: 'number',
            message: '请选择协议',
            trigger: 'change',
          },
        ],
        appId: [{ required: true, message: '请填写appId', trigger: 'blur' }],
        appSecret: [
          { required: true, message: '请填写appSecret', trigger: 'blur' },
        ],
        scope: [{ required: true, message: '请填写scope', trigger: 'blur' }],
        websiteName: [
          { required: true, message: '请填写网站名称', trigger: 'blur' },
        ],
        websiteTitle: [
          { required: true, message: '请填写网站标题', trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请填写密码', trigger: 'blur' },
        ],
        confirmPassword: [{ validator: validRepassword, trigger: 'blur' }],
      },
      showDraw: false,
      title: '',
      id: 0,
      form: {},
    };
  },
  computed: {
    defaultForm() {
      return [
        {
          type: 'text',
          label: '名称',
          field: 'name',
        },
        {
          type: 'text',
          label: '手机',
          field: 'phone',
        },
        {
          type: 'text',
          label: 'email',
          field: 'email',
        },
      ];
    },
    moreForm() {
      return [
        {
          type: 'text',
          label: 'qq',
          field: 'qq',
        },
        {
          type: 'text',
          label: '微信',
          field: 'weiXin',
        },
      ];
    },
  },
  methods: {
    add() {
      this.form = {
        appId: 'af5abc198d9b400c83d7997bdc6c8cb9',
        appSecret: '746dcddf11f741acb86bec4624e9d0e9',
        scope: 'default',
      };
      this.title = '添加商户';
      this.showDraw = true;
    },
    charge(row) {
      this.isChangeAcount = true;
      this.form.changeAmountLimit = row.limitAmount;
      this.form.changeID = row.id;
    },
    async changeAcountOK() {
      // if(!this.form.changeAmountLimit) return false;
      this.btnLoading = true;
      const res = await change_merchant_ChangeAmountLimit(
        this.form.changeID,
        this.form,
      );
      this.btnLoading = false;
      if (res.status < 400) {
        this.$Message.success('修改限额成功！');
        this.$Modal.remove();
        this.getData();
      }
    },
    cancelChange() {
      this.isChangeAcount = false;
      this.$Modal.remove();
    },
    chargeRecord(row) {
      this.merchantId = row.id
      this.isChangeRecord = true;
    },
    async publish(form) {
      this.$Modal.confirm({
        title: `提示`,
        loading: true,
        content: `<p>是否发布？</p>`,
        onOk: async () => {
          this.btnLoading = true;
          const res = await publish_site(form.websiteId);
          this.btnLoading = false;
          if (res.status < 400) {
            this.$Message.success(`发布成功！`);
            this.$Modal.remove();
          } else {
            this.$Message.success(`发布失败！`);
            this.$Modal.remove();
          }
        },
      });
    },
    async edit(row) {
      this.title = '编辑商户';
      this.showDraw = true;
      const res = await get_merchant_info(row.id);
      if (res.status < 400) {
        this.form = res.data;
        this.form.id = row.id;
        this.form.appSecret = '746dcddf11f741acb86bec4624e9d0e9';
      }
    },
    changePassAdmin(row) {
      this.showModal = true;
      this.form = {};
      this.id = row.id;
    },
    async okChange() {
      const valid = await this.$refs.formpassword.validate();
      if (!valid) return;
      this.btnLoading = true;
      const res = await change_merchant_init_password(this.id, this.form);
      this.btnLoading = false;
      if (res.status < 400) {
        this.showModal = false;
        this.$Message.success(`修改成功`);
      }
    },
    async setState(value, row, index) {
      let state;
      let title;
      if (value === 1) {
        state = 1;
        title = '开启';
      } else {
        state = 2;
        title = '关闭';
      }
      this.$Modal.confirm({
        title: `${title}`,
        loading: true,
        content: `<p>是否${title}该商户</p>`,
        onOk: async () => {
          const valid = await this.$refs.changeForm.validate();
          if (!valid) return;
          this.btnLoading = true;
          const res = await set_state_merchant(row.id, state);
          this.btnLoading = false;
          if (res.status < 400) {
            this.$Message.success(`${title}商户成功`);
            this.$Modal.remove();
            // this.getData();
          } else {
            if (value === 1) {
              row.status = 2;
            } else {
              row.status = 1;
            }
            this.data.splice(index, 1, row);
            this.$Modal.remove();
          }
        },
        onCancel: () => {
          if (value === 1) {
            row.status = 2;
          } else {
            row.status = 1;
          }
          this.data.splice(index, 1, row);
        },
      });
    },
    async ok() {
      const valid = await this.$refs.form.validate();
      if (!valid) return;
      this.btnLoading = true;
      if (this.form.id) {
        const res = await update_merchant(this.form.id, this.form);
        if (res.status < 400) {
          this.$Message.success('修改商户成功');
        }
      } else {
        const res = await create_merchant(this.form);
        if (res.status < 400) {
          this.$Message.success('添加商户成功');
        }
      }
      this.btnLoading = false;
      this.showDraw = false;
      this.page = 1;
      this.getData();
    },

    async getData() {
      this.loading = true;
      const res = await get_merchant_page(this.page, this.limit, this.query);
      this.loading = false;
      if (res.status < 400) {
        this.data = res.data.itemList;
        this.total = res.data.itemTotal;
      }
    },
  },
};
</script>
