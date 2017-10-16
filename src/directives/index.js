import Title from './title'
import Goto from './goto'
import Money from './moneyfix'
const directives = [
  Title,
  Goto,
  Money
]

const install = function (Vue, opts = {}) {
  directives.map(directive => {
    Vue.directive(directive.name, directive)
  })
}
export default install
