/*
  * 为页面改变Title
  */

import $ from 'jquery'
export default {
  name: 'goto',
  inserted: function (el, binding, vnode) {
    $(el).click(function () {
      if (binding.value === 'worklist') {
        window.location.href = '/worklist/workupdate?orderid=' + el.dataset.value
      } else {
        let params = '{"' + el.dataset.key + '": "' + el.dataset.value + '"}'
        console.log(params)
        params = JSON.parse(params)
        console.log(params)
        vnode.context.$router.push({name: binding.value, params: params})
      }
    })
  }
}
