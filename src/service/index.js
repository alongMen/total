import {API} from '@/utils/http';

/**
 * 登陆
 * @param {*} params 
 */
export const login = (params)=>{
  return API.post('/api/v1.0/Connect/token',params)
}

/**
 * 游戏类型（fish那些）
 */
export const get_geme_type = () => {
  return API.get('/api/v1.0/CGame/GameTypeList');
};

/**
 * 游戏平台类型
 */
export const get_game_platform = () => {
  return API.get('/api/v1.0/CGame/GamePlatformList');
};


/**
 * 验证码
 */
export const get_captcha = ()=>{
  return API.get('/Captcha/api/ImageCaptcha/Captcha')
}

/**
 * 银行列表
 */
export const get_banks = ()=>{
  return API.get('/api/v1.0/CDictionary/BankNameList')
}


/**
 * 获取广告列表
 *
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 */
export const get_advertise_list = (page, limit, query) => {
  return API.get(`/api/v1.0/BAdvertisement/${page}/${limit}`, query);
};





/**
 * 操作日志
 *
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 */
export const get_operation_log_list = (page,limit , query)=>{
  return API.get(`/api/v1.0/BOperationLog/${page}/${limit}`,query);
}


/**
 * 获取登录日志
 *
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 * @returns
 */
export const get_login_log_list = (page , limit , query) =>{
  return API.get(`/api/v1.0/BLoginLog/${page}/${limit}`,query)
}








/** 从现在开始是总后台的接口 */



 /**
 * 获取权限列表
 *
 */
export const get_permission_list = (type)=>{
  return API.get(`/api/v1.0/Permission`,{permissionType: type})
}



/**
 * 添加一条权限
 *
 * @param {*} params
 */
export const create_permission = (params)=>{
  return API.post(`/api/v1.0/Permission`,params);
}

/**
 * 编辑一条权限
 *
 * @param {*} id
 * @param {*} params
 * @returns
 */
export const update_permission = (id , params)=>{
  return API.put(`/api/v1.0/Permission/${id}`,params);
}

/**
 * 获取商户列表
 */
export const get_merchant_page = (page,limit,query)=>{
  return API.get(`/api/v1.0/Merchant/${page}/${limit}`,query)
}

/**
 * 获取商户信心
 */
export const get_merchant_info = (id)=>{
  return API.get(`/api/v1.0/Merchant/${id}`)
}

/**
 * 添加商户
 */
export const create_merchant = ( params)=>{
  return API.post(`/api/v1.0/Merchant`,params);
}

/**
 * 修改商户初始管理员密码
 */
export const change_merchant_init_password = ( id,params)=>{
  return API.post(`/api/v1.0/Merchant/ChangePassword/${id}`,params);
}

/**
 * 修改商户限额
 */
export const change_merchant_ChangeAmountLimit = ( Id,params)=>{
  return API.put(`/api/v1.0/Merchant/ChangeAmountLimit/${Id}`,params);
}

/**
 * 获取限额修改列表
 */
export const get_merchant_ChangeAmountLimit = (page,limit,query)=>{
  return API.get(`/api/v1.0/Merchant/FundRecord/${page}/${limit}`,query)
}


/**
 * 更新商户
 */
export const update_merchant = (id , params)=>{
  return API.put(`/api/v1.0/Merchant/${id}`,params);
}

/**
 * 更新商户
 */
export const publish_site = (id )=>{
  return API.post(`/api/v1.0/Merchant/Publish/${id}`);
}

/**
 * 设置商户状态
 */
export const set_state_merchant = (id , state)=>{
  return API.patch(`/api/v1.0/Merchant/${id}/${state}`);
}

/**
 * 获取游戏类型列表
 */
export const get_game_type_page = (page,limit,query)=>{
  return API.get(`/api/v1.0/AGameType/${page}/${limit}`,query)
}

/**
 * 添加游戏类型
 */
export const create_game_type = ( params)=>{
  return API.post(`/api/v1.0/AGameType`,params);
}

/**
 * 更新游戏类型
 */
export const update_game_type = (id , params)=>{
  return API.put(`/api/v1.0/AGameType/${id}`,params);
}

/**
 * 设置游戏类型状态
 */
export const set_state_game_type = (id , state)=>{
  return API.patch(`/api/v1.0/AGameType/${id}/${state}`);
}


/**
 * 获取游戏类型列表
 */
export const get_game_platform_page = (page,limit,query)=>{
  return API.get(`/api/v1.0/AGamePlatform/${page}/${limit}`,query)
}

/**
 * 添加游戏类型
 */
export const create_game_platform = ( params)=>{
  return API.post(`/api/v1.0/AGamePlatform`,params);
}

/**
 * 更新游戏类型
 */
export const update_game_platform = (id , params)=>{
  return API.put(`/api/v1.0/AGamePlatform/${id}`,params);
}

/**
 * 设置游戏类型状态
 */
export const set_state_game_platform = (id , state)=>{
  return API.patch(`/api/v1.0/AGamePlatform/${id}/${state}`);
}

/**
 * 获取游戏app列表
 */
export const get_game_app_page = (page,limit,query)=>{
  return API.get(`/api/v1.0/AGameApp/${page}/${limit}`,query)
}

/**
 * 添加游戏app
 */
export const create_game_app = ( params)=>{
  return API.post(`/api/v1.0/AGameApp`,params);
}

/**
 * 更新游戏app
 */
export const update_game_app = (id , params)=>{
  return API.put(`/api/v1.0/AGameApp/${id}`,params);
}

/**
 * 设置游戏app状态
 */
export const set_state_game_app = (id , state)=>{
  return API.patch(`/api/v1.0/AGameApp/${id}/${state}`);
}

/**
 * 获取游戏列表
 */
export const get_game_page = (page,limit,query)=>{
  return API.get(`/api/v1.0/AGame/${page}/${limit}`,query)
}

/**
 * 添加游戏
 */
export const create_game = ( params)=>{
  return API.post(`/api/v1.0/AGame`,params);
}

/**
 * 更新游戏
 */
export const update_game = (id , params)=>{
  return API.put(`/api/v1.0/AGame/${id}`,params);
}

/**
 * 设置游戏状态
 */
export const set_state_game = (id , state)=>{
  return API.patch(`/api/v1.0/AGame/${id}/${state}`);
}

/**
 * 设置Android状态
 */
export const set_Android_state_game = (id , state)=>{
  return API.patch(`/api/v1.0/AGame/setAndroid/${id}/${state}`);
}

/**
 * 设置IOS游戏状态
 */
export const set_IOS_state_game = (id , state)=>{
  return API.patch(`/api/v1.0/AGame/setIOS/${id}/${state}`);
}

/**
 * 设置Web游戏状态
 */
export const set_Web_state_game = (id , state)=>{
  return API.patch(`/api/v1.0/AGame/setWeb/${id}/${state}`);
}

/**
 * 设置WebApp游戏状态
 */
export const set_WebApp_state_game = (id , state)=>{
  return API.patch(`/api/v1.0/AGame/setWebApp/${id}/${state}`);
}




 

/**
 * 获取上传token
 *
 * @param {*} folder
 * @returns
 */
export const get_upload_token = (folder , fileExtension)=>{
  return API.get(`/api/v1.0/File/Token/${folder}/${fileExtension}`);
}

/**
 * 查询员工列表
 *
 * @param {*} page
 * @param {*} limit
 * @returns
 */
export const get_staff_list = (page , limit,query)=>{
  return API.get(`/api/v1.0/User/${page}/${limit}`,query);
}


/**
 * 创建员工
 *
 * @param {*} params
 * @returns
 */
export const create_staff = (params)=>{

  return API.post(`/api/v1.0/User`,params);
}


/**
 * 更改员工
 *
 * @param {*} id
 * @param {*} params
 * @returns
 */
export const update_staff = (id , params)=>{
  return API.put(`/api/v1.0/User/${id}` , params);
}

/**
 * 修改密码
 * @param {*} id 
 * @param {*} password 
 */
export const change_staff_password = (id , password)=>{
  return API.patch(`/api/v1.0/User/${id}` , {password:password});
}

/**
 * 修改当前用户密码
 * @param {*} password 
 */
export const change_current_staff_password = (param)=>{
  return API.post(`/api/v1.0/User/ChangePassword` , param)
}

/**
 * 设置员工状态
 * @param {*} id 
 * @param {*} status 
 * @returns
 */
export const set_state_staff = (id , status)=>{
  return API.patch(`/api/v1.0/User/${id}/${status}`);
}

/**
 * 获取所有权限列表
 *
 */
export const get_all_permission_list = () => {
  return API.get(`/api/v1.0/Role/Permission`);
};

/**
 * 添加一个角色
 *
 * @param {*} params
 * @returns
 */
export const create_role = params => {
  return API.post(`/api/v1.0/Role`, params);
};

/**
 * 修改角色
 *
 * @param {*} id
 * @param {*} params
 * @returns
 */
export const update_role = (id, params) => {
  return API.put(`/api/v1.0/Role/${id}`, params);
};

/**
 * 获取角色列表
 *
 * @returns
 */
export const get_role_list = () => {
  return API.get(`/api/v1.0/Role`);
};

/**
 * 获取角色权限详情
 *
 * @param {*} id
 * @returns
 */
export const get_role_permission_detail = id => {
  return API.get(`/api/v1.0/Role/RolePermission/${id}`);
};

/**
 * 设置角色权限
 *
 * @param {*} params
 * @returns
 */
export const set_role_permission = params => {
  return API.post(`/api/v1.0/Role/RolePermission`, params);
};

/**
 * 获取ip设置列表
 */
export const get_ip_setting = (page,limit,query)=>{
  return API.get(`/api/v1.0/IPWhite/${page}/${limit}`,query)
}

/**
 * 添加ip设置
 */
export const add_ip_setting = ( params)=>{
  return API.post(`/api/v1.0/IPWhite`,params);
}

/**
 * 更新ip设置
 */
export const update_ip_setting = (id , params)=>{
  return API.put(`/api/v1.0/IPWhite/${id}`,params);
}


/**
 * 更新ip设置
 */
export const del_ip_setting = (id , params)=>{
  return API.delete(`/api/v1.0/IPWhite/${id}`,params);
}
