export default function ({ store, redirect }) {
  // 判断用户信息是否存在
  if (!store.state.user.userInfo) {
    return redirect('/')
  }
}
