import { getUserInfo } from "@/api/user";
import { Snackbar } from "@varlet/ui";

// 是否登录
export async function isLogin(msg = '请登录', router = 'user') {
  const res = await getUserInfo()
  if (res.status === 401) {
    Snackbar.error(msg)
    setTimeout(() => {
      location.href = router
    }, 500)
  }
}
