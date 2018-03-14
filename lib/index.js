import AlloyFinger from './alloy_finger'
import Transform from './transform'
const vFingerMK42 = {
  install(Vue, options) {
    // hack for Property or method "toJSON" is not defined on the instance but referenced during render
    Vue.prototype.toJSON = function() {}
    
    Vue.directive('finger-test', {
      inserted: el => {
        console.log('vFingerMK42 added')
      }
    })
    Vue.directive('transform', {
      inserted: el => {
        Transform(el)
      }
    })

    let elementCache = new Map()

    Vue.directive('finger', {
      inserted: (el, binding) => {
        let currentEl = elementCache.get(el)
        if (currentEl === undefined) {
          // 当前元素之前没有初始化过AlloyFinger
          elementCache.set(
            el,
            new AlloyFinger(el, {
              [binding.arg]: (e, ele) => binding.value(e, ele)
            })
          )
        } else {
          currentEl.on(binding.arg, (e, ele) => binding.value(e, ele))
        }
      }
    })
  }
}
export default vFingerMK42
