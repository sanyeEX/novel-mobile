import request from "@/utils/request";

// 发起登录请求
export const getLogin = (username, password, code) => {
  return request.post('/login', {
    username,
    password,
    code
  })
}

// 发起注册请求
export const getReg = (regInfo) => {
  return request.post('/register', regInfo)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/userInfo', )
}

// 修改用户信息
export const updateUserInfo = (nickname) => {
  return request.post('/updateUserInfo', {
    nickname,
  })
}

// 修改用户头像
export const updateAvatar = (data) => {
  return request.post('/uploadUserAvatar', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 修改用户密码
export const updatePwd = (historyPwd, password) => {
  return request.post('/changePwd', {
    historyPwd,
    password
  })
}

// 获取用户收藏
export const getUserCollect = (limit, page) => {
  return request.get('/getCollectList', {
    params: {
      limit,
      page
    }
  })
}

// 获取用户历史浏览
export const getUserHistory = (limit = 20, page = 1) => {
  return request.get('/getHistory', {
    params: {
      limit,
      page
    }
  })
}

// 发送邮箱验证码
export const sendCode = (email) => {
  return request.get('/getEmailCode', {
    params: {
      email
    }
  })
}

// 忘记密码
export const forgetPassword = (email, newPwd, emailCode) => {
  return request.post('/forget', {
    email,
    newPwd,
    emailCode
  })
}
