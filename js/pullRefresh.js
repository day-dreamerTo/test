 function pullRefresh(option) {
     this.container = document.querySelector(option.container);
     this.loadingBox = this.container.firstElementChild;
     this.offset = this.loadingBox.clientHeight;
     this.loadingText = option.loadingText;
     this.beforeLoadingText = option.beforeLoadingText;
     this.remindText = option.remindText;
     this.startY = 0;
     this.endY = 0;
     this.delay = option.delay;
     this.callback = option.callback;
     this.isLocked = false;
     this.openPullRefresh = false;
     this.isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);
     this.hasTouch = 'ontouchstart' in window && !this.isTouchPad;
 }

 pullRefresh.prototype = {
     init: function () {
         this.translate(0 - this.offset);
         this.addEvent(this.container, 'touchstart', this.start.bind(this));
         this.addEvent(this.container, 'touchmove', this.move.bind(this));
         this.addEvent(this.container, 'touchend', this.end.bind(this));
     },
     translate: function (diff) {
         this.container.style.webkitTransform = 'translate3d(0,' + diff + 'px,0)';
         this.container.style.transform = 'translate3d(0,' + diff + 'px,0)';
     },
     setTransition: function (time) {
         this.container.style.webkitTransition = 'all ' + time + 's';
         this.container.style.transition = 'all ' + time + 's';
     },
     back: function () {
         this.translate(0 - this.offset);
         this.isLocked = false;
         this.loadingBox.innerHTML = this.beforeLoadingText;
     },
     addEvent: function (element, event_name, event_fn) {
         if (element.addEventListener) {
             element.addEventListener(event_name, event_fn, false);
         } else if (element.attachEvent) {
             element.attachEvent('on' + event_name, event_fn);
         } else {
             element['on' + event_name] = event_fn;
         }
     },
     start: function (e) {
         // 因为有可能只有start、end，没有move过程，所以endY可能取的是上一次的值
         if (!this.isLocked) {
             console.log('start')
             var even = typeof event == "undefined" ? e : event;
             this.startY = (this.hasTouch ? even.touches[0].pageY : even.pageY);
             this.endY = 0;
         }
     },
     move: function (e) {
         var even = typeof event == "undefined" ? e : event;
         this.endY = (this.hasTouch ? even.touches[0].pageY : even.pageY);
         if (!this.isLocked && this.endY > this.startY) {
             console.log('move')
             this.setTransition(0);
             this.translate(this.endY - this.startY - this.offset);
             if (this.endY - this.startY >= this.offset) {
                 this.loadingBox.innerHTML = this.remindText;
                 this.openPullRefresh = true;
             } else {
                 this.loadingBox.innerHTML = this.beforeLoadingText;
                 this.openPullRefresh = false;
             }
         }
     },
     end: function () {
         if (this.openPullRefresh) {
             console.log('end-------')
             this.isLocked = true;
             this.openPullRefresh = false;
             this.setTransition(this.delay);
             this.translate(0);
             this.loadingBox.innerHTML = this.loadingText;
             if (typeof this.callback === 'function') {
                 /* eslint-disable */
                 this.callback.call(this);
             }
         } else {
             this.setTransition(0.3);
             this.back();
         }
     }
 }