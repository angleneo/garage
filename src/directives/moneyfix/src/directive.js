/*
/*
  * 为页面改变Title
  */

import $ from 'jquery'
export default {
  name: 'money',
  bind: function (el, binding, vnode) {
    $(el).blur(function () {
      if (!$(el).val()) $(el).val('0.00')
      else $(el).val(parseFloat($(el).val()).toFixed(2))
    })
  },
  inserted: function (el, binding, vnode) {
    // $(el).blur(function () {
    //   if (!$(el).val()) $(el).val('0.00')
    //   else $(el).val(parseFloat($(el).val()).toFixed(2))
    // })
    // $.each($(el).find('input'), function (i, e) {
    //   console.log(e)
    //   alert($(e).val())
    //   $(e).click(function () {
    //     alert(e)
    //   })
    //   $(e).click(function () {
    //     alert('test')
    //   })
      // e.onblur = function () {
      //   alert('test')
      //   if (!e.val()) e.val('0.00')
      //   else e.val(parseFloat(e.val()).toFixed(2))
      // }
    // })
    // e.ready(function () {
    //   console.log(e)
    //   if (!e.val()) e.val('0.00')
    //   else e.val(parseFloat(e.val()).toFixed(2))
    // })
  //   $(el).on('click', function () {
  //     alert('test')
  //     if (!$(el).value) $(el).value = '0.00'
  //     else $(el).value = parseFloat($(el).value).toFixed(2)
  //   })
  }
}
