Use AlloyFinger v0.1.10       
1.0.4 add transform.js          
1.0.5 fixed "toJSON" is not defined      
1.0.6 performance element cache      
1.0.7 use babel# v-finger
# v-finger
```html
<img style="position:absolute;width: 100%;"
      v-transform
      v-finger:pinch="handlePinch"
      v-finger:doubleTap="handleDoubleTap"
      v-finger:multipointStart="handleMultipointStart"
      v-finger:pressMove="handlePressMove"
      v-finger:touchEnd="handleTouchEnd"
      :src="src">
```
```JavaScript
...
handleMultipointStart(e, el) {
    console.log('event',e)
    console.log('element',el)
}
...
```