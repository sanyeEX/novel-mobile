import request from "@/utils/request";

const token = localStorage.getItem('token')

// 获取小说内容
export const getChapterContent = (chapter_id) => {
  return request.get('/chapterContent', {
    params: {
      chapter_id
    },
  })
}
