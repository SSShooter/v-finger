import AlloyFinger from './alloy_finger.origin.js'
import Transform from './transform'

const vFingerMK42 = {
  install(app, options) {
    // hack for Property or method "toJSON" is not defined on the instance but referenced during render
    // app.config.globalProperties.toJSON = function() {}
    
    app.directive('finger-test', {
      mounted: el => {
        console.log('vFingerMK42 added')
      }
    })
    app.directive('transform', {
      mounted: el => {
        Transform(el)
      }
    })

    let elementCache = new Map()

    app.directive('finger', {
      mounted: (el, binding) => {
        let currentEl = elementCache.get(el)
        if (currentEl === undefined) {
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
