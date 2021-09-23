## legacy

Use AlloyFinger v0.1.10  

- 1.0.4 add transform.js  
- 1.0.5 fixed "toJSON" is not defined  
- 1.0.6 performance element cache  
- 1.0.7 use babel
- 2.0.3 compatible with PC
- 2.0.4 compatible with macOS

## 3.0

- 3.0.0 适配 Vue 3，Vue 2 代码在 legacy 分支
- 3.0.0 后不运行 rollup 打包，直接指定 lib/index 运行

# v-finger

```html
<img
  style="position:absolute;width: 100%;"
  v-transform
  v-finger:pinch="handlePinch"
  v-finger:doubleTap="handleDoubleTap"
  v-finger:multipointStart="handleMultipointStart"
  v-finger:pressMove="handlePressMove"
  v-finger:touchEnd="handleTouchEnd"
  :src="src"
/>
```

```JavaScript
...
handleXXX(e, el) {
    console.log('event',e)
    console.log('element',el)
    console.log("for pinch" + e.zoom)
    console.log("for pressMove" + e.deltaX + ' ' + e.deltaY);
    console.log("for swipe" + e.direction);
}
...
```
