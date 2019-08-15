<template>
  <div class="draw-setting">
    <h3>限额调整记录：</h3>
    <br />
    <search-area
      @search="search"
      @reset="reset"
      :defaultForm="defaultForm"
      :moreForm="moreForm"
      v-model="query"
    />
    <Table :data="changeData" :columns="columns" :loading="loading">
      <template slot-scope="{ row }" slot="amount">
        {{ parsePrice(row.amount) }}
      </template>
      <template slot-scope="{ row }" slot="balance">
        {{ parsePrice(row.balance) }}
      </template>
      <template slot="fundStatus" slot-scope="{ row }">
        <Tag color="blue" v-if="row.fundStatus === 1">处理中</Tag>
        <Tag color="green" v-else-if="row.fundStatus === 2">成功</Tag>
        <Tag color="red" v-else>失败</Tag>
      </template>
      <template slot="fundMode" slot-scope="{ row }">
        <Tag color="volcano" v-if="row.fundMode === 1">Member</Tag>
        <Tag color="cyan" v-else>Merchant</Tag>
      </template>
      <template slot-scope="{ row }" slot="fundType">
        <span
          v-for="(item, index) in fundType"
          :key="index"
          v-if="row.fundType === item.value"
          >{{ item.label }}</span
        >
      </template>
      <template slot-scope="{ row }" slot="currency">
        <span
          v-for="(item1, index) in currency"
          :key="index"
          v-if="row.currency === item1.value"
          >{{ item1.label }}</span
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
</template>

<script>
import { cloneDeep } from 'lodash';
import { get_merchant_ChangeAmountLimit } from '@/service/index';
import mixin from '@/mixins/single-form-mixin';
import { fundType, currency } from '@/config/enum';
export default {
  name: 'changeRecord',
  mixins: [mixin],
  props: {
    form: Object,
    merchantId: Number
  },
  data() {
    return {
      btnLoading: false,
      loading: false,
      changeData: [],
      fundType,
      currency,
      columns: [
        {
          title: '会员ID',
          key: 'memberId',
          align: 'center',
        },
        {
          title: '限额',
          slot: 'amount',
          align: 'center',
        },
        {
          title: '余额',
          slot: 'balance',
          align: 'center',
        },
        {
          title: '钱包类型',
          slot: 'currency',
          align: 'center',
        },
        {
          title: '状态',
          slot: 'fundStatus',
          align: 'center',
        },
        {
          title: '类型',
          slot: 'fundType',
          align: 'center',
        },
        {
          title: '会员/商户',
          slot: 'fundMode',
          align: 'center',
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center',
        },
      ],
    };
  },
  computed: {
    defaultForm() {
      return [
        {
          label: '时间段',
          type: 'timeRange',
          field: 'date',
        },
        // {
        //   type: 'text',
        //   label: '商户ID',
        //   field: 'MerchantId',
        // },
      ];
    },
    moreForm() {
      return [];
    },
  },
  methods: {
    async getData() {
      const query = {
        merchantId: this.merchantId,
        startTime: this.query.date[0],
        endTime: this.query.date[1],
      };
      this.btnLoading = true;
      const res = await get_merchant_ChangeAmountLimit(
        this.page,
        this.limit,
        query,
      );
      this.btnLoading = false;
      if (res.status === 200) {
        const data = res.data;
        this.changeData = data.itemList;
        this.total = data.itemTotal;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.draw-setting {
  margin-left: 30px;
  margin-right: 30px;
  background: #fff;
  padding: 30px;
}
.borderbto {
  border-bottom: 1px solid #efefef;
  margin-bottom: 10px;
  padding: 10px;
  .textr {
    text-align: right;
    padding-right: 20px;
  }
}
</style>
