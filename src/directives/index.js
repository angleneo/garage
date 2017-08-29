import Title from './title'
import Goto from './goto'
import Filter from './filter'
const directives = [
  Title,
  Goto,
  Filter
]

const install = function (Vue, opts = {}) {
  directives.map(directive => {
    Vue.directive(directive.name, directive)
  })
}
export default install
