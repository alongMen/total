import { get_banks,
  get_geme_type,
  get_game_platform } from '@/service/index';

const state = {
  bank_list: [],
  game_type_list: [],
  game_platform_list: [],
};

const mutations = {
  set_bank_list(state, data) {
    state.bank_list = data;
  },
  set_game_type_list(state, data) {
    state.game_type_list = data;
  },
  set_game_platform_list(state, data) {
    state.game_platform_list = data;
  }
};

const actions = {
  async get_bank_list({ commit }) {
    const res = await get_banks();
    if (res.status < 400) {
      commit('set_bank_list', res.data.data);
    }
  },
  async get_game_type_list({ commit }) {
    const res = await get_geme_type();
    if (res.status < 400) {
      commit('set_game_type_list', res.data);
    }
  },
  async get_game_platform_list({ commit }) {
    const res = await get_game_platform();
    if (res.status < 400) {
      commit('set_game_platform_list', res.data);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
