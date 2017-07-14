# Cordova plugin xy-plugin-udisk
use android broadcast receiver to listen udisk or sd card event: mounted/unmounted/removed

## how to install

```bash
npm i xy-plugin-udisk
```
## how to use

```js
document.addEventListener('deviceready', function() {

  cordova.plugins.udisk.on('mounted', function(url) {
    console.log('mounted', url);
  });

  cordova.plugins.udisk.on('unmounted', function(url) {
    console.log('unmounted', url);
  });

  cordova.plugins.udisk.on('removed', function(url) {
    console.log('removed', url);
  });

  cordova.plugins.udisk.init();
});
```

## js-module
cordova.plugins.udisk
cordova.plugins.udisk.prototype = eventEmitter

### methods
cordova.plugins.udisk.init()
> init must after excute deviceready

cordova.plugins.udisk.on()
cordova.plugins.udisk.emit()

### events
cordova.plugins.udisk.on('mounted', (url) => {});
cordova.plugins.udisk.on('unmounted', (url) => {});
cordova.plugins.udisk.on('removed', (url) => {});

## native/android
Udisk.java

## LICENSE
Apache 2.0





