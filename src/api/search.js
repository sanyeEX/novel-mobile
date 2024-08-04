import request from "@/utils/request"

// 搜索小说
export const getNovelSearch = (name, limit = 10, page = 1) => {
  return request.get('/novelSearch', {
    params: {
      name,
      limit,
      page
    }
  })
}
