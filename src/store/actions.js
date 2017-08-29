import {
  INIT_USER,
  USER_LOGOUT
} from './mutation-types'

export default {
  async initUserInfo ({commit, state}) {
    commit(INIT_USER)
  },
  async logoutUser ({commit, state}) {
    commit(USER_LOGOUT)
  }
}
