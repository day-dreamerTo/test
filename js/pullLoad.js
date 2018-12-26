function pullLoad(option) {
    this.container = document.querySelector(option.container);
    this.loadingMoreBox = this.container.lastElementChild;
    this.offset = this.loadingMoreBox.clientHeight;
    this.loadingText = option.loadingText;
    this.startY = 0;
    this.endY = 0;
    this.delay = option.delay;
    this.callback = option.callback;
    // 锁定上拉加载更多
    this.isLocked = false;
    // 上拉加载事件开关
    this.openLoadMore = false;
    this.isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);
    this.hasTouch = 'ontouchstart' in window && !this.isTouchPad;
    this.loadingText = option.loadingText;
    this.beforeLoadingText = option.beforeLoadingText;
    this.remindText = option.remindText;
}

pullLoad.prototype = {
    init: function () {
        this.addEvent(this.container, 'touchstart', this.start.bind(this));
        this.addEvent(this.container, 'touchmove', this.move.bind(this));
        this.addEvent(this.container, 'touchend', this.end.bind(this));
        this.addEvent(this.container, 'mousedown', this.start.bind(this));
        this.addEvent(this.container, 'mousemove', this.move.bind(this));
        this.addEvent(this.container, 'mouseup', this.end.bind(this));
    },
    translate: function (diff) {
        this.container.style.webkitTransform = 'translate3d(0,' + diff + 'px,0)';
        this.container.style.transform = 'translate3d(0,' + diff + 'px,0)';
    },
    setTransition: function (time) {
        this.container.style.webkitTransition = 'all ' + time + 's';
        this.container.style.transition = 'all ' + time + 's';
    },
    loadmoreBack: function () {
        this.loadingMoreBox.innerHTML = this.beforeLoadingText;
        this.isLocked = false;
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
        var even = typeof event == "undefined" ? e : event;
        this.startY = (this.hasTouch ? even.touches[0].pageY : even.pageY);
        this.endY = 0;
    },
    move: function (e) {
        var even = typeof event == "undefined" ? e : event;
        this.endY = (this.hasTouch ? even.touches[0].pageY : even.pageY);
        console.log(this.container.clientHeight, this.container.scrollTop, this.container.scrollHeight)
        if (!this.isLocked && this.endY < this.startY) {
             if (this.container.clientHeight + this.container.scrollTop == this.container.scrollHeight) {
                 this.loadingMoreBox.innerHTML = this.remindText;
                 this.openLoadMore = true;
             } else {
                  this.loadingMoreBox.innerHTML = this.beforeLoadingText;
                  this.openLoadMore = false;
             }
        }
    },
    end: function (e) {
        if (this.openLoadMore) {
            // 防止多次滑动多次请求
            this.isLocked = true
            this.openLoadMore = false;
            this.loadingMoreBox.innerHTML = this.loadingText;
            if (typeof this.callback === 'function') {
                this.callback.call(this);
            }
        }
    }
}
