import request from "@/utils/request"

// 筛选小说
export const getLibraryNovel = (query) => {
  return request.get('/novelList', {
    params: query
  })
}
