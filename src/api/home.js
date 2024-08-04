import request from "@/utils/request";

// 获取小说列表
export const getNovelList = (limit, page) => {
  return request.get('/novelList', {
    params: {
      limit,
      page
    }
  })
}
// 获取分类小说
export const getNovelLibrary = (className, limit, page) => {
  return request.get('/novelList', {
    params: {
      className,
      limit,
      page
    }
  })
}
