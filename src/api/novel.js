import request from "@/utils/request"

// 获取小说信息
export const getNovelInfo = (novel_id) => {
  return request.get('/novelInfo', {
    params: {
      novel_id
    }
  })
}

// 获取小说目录
export const getNovelRoll = (novel_id) => {
  return request.get('/novelRoll', {
    params: {
      novel_id
    }
  })
}

// 获取小说章节
export const getNovelChapter = (roll_id) => {
  return request.get('/novelChapter', {
    params: {
      roll_id
    }
  })
}

// 获取用户收藏
export const getUserCollect = (limit = 1, page = 1) => {
  return request.get('/getCollectList', {
    params: {
      limit,
      page
    }
  })
}

// 添加收藏
export const addCollect = (novel_id) => {
  return request.get('/addCollect', {
    params: {
      novel_id
    },
  })
}

// 取消收藏
export const cancelCollect = (novel_id) => {
  return request.get('/cancelCollect', {
    params: {
      novel_id
    },
  })
}

// 获取评论
export const getComment = (novel_id, limit = 20, page = 1) => {
  return request.get('/getComment', {
    params: {
      novel_id,
      limit,
      page
    }
  })
}

// 发表评论
export const addComment = (novel_id, content) => {
  return request.post('/addComment', {
    novel_id,
    content
    },
  )
}

// 获取回复评论
export const getReplyComment = (comment_id, limit = 20, page = 1) => {
  return request.get('/getReplyComment', {
    params: {
      comment_id,
      limit,
      page
    }
  })
}

// 评论回复
export const replyComment = (comment_id, content) => {
  return request.post('replyComment', {
    comment_id,
    content
  })
}

// 添加历史记录
export const addHistory = (novel_id) => {
  return request.get('/addHistory', {
    params: {
      novel_id
    }
  })
}
