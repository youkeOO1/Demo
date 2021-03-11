/**
 * 进度条
 * 进度条拖拽
 */
(function (root) {
    /**
     * 进度条类
     * 进度条移动
     * 进度条暂停移动
     * 渲染歌曲总时间
     * 歌曲当前播放的时间
     */
    class ScrolBar {

        constructor(audio) {
            this.audio = audio;
            this.endTimer = 0;
            this.timerId = null;
            this.init();
        }
        /**
         * 初始化
         */
        init() {
            this.getDom();
        }
        /**
         * 获取元素
         */
        getDom() {
            this.curTimer = document.getElementsByClassName('curtimer')[0];
            this.totalTimer = document.getElementsByClassName('totaltimer')[0];
            this.circle = document.getElementsByClassName('circle')[0];
            this.frontBg = document.getElementsByClassName('frontBg')[0];
            this.backBg = document.getElementsByClassName('backBg')[0];
        }
        /**
         * 渲染歌曲结束时间
         * @param {*} duration  歌曲结束时间
         */
        rendTime(duration) {
            this.endTimer =  duration;
            this.totalTimer.innerHTML = this.format(duration);
        }
        /**
         * 格式化时间样式
         * @param {*} timer 时间值 秒数
         * @returns m + ':' + s
         */
        format(timer) {
            timer = Math.round(timer);
            let m = Math.floor(timer / 60);
            let s = timer % 60;
            m = m >= 10 ? m : '0' + m;
            s = s >= 10 ? s : '0' + s;
            return m + ':' + s;
        }
        /**
         * 进度条移动动画
         */
        move() {
            // 清除定时器
            cancelAnimationFrame(this.timerId);
            let self = this;
            // 启动定时器
            function timeAdd() {
                console.log('定时器');
                // 获取当前播放的时间
                let nowTime = Math.round(self.audio.currentTime) || 0;
                // 计算当前播放的进度的百分数
                let time = nowTime  / self.endTimer;
                /**
                 * 当前进度大于或等于1 说明当前歌曲播放结束
                 */
                if (time < 1) {
                    // 还未播放技术
                    self.upData(time);
                    self.timerId = requestAnimationFrame(timeAdd);
                } else {
                    // 播放结束 清除定时器
                    cancelAnimationFrame(self.timerId);
                }
            }
            timeAdd();
        }
        /**
         * 更新进度条的位置
         * @param {*} percentage 
         */
        upData(percentage) {
            // 更新当前播放的时间
            this.curTimer.innerHTML = this.format(percentage * this.endTimer);
            // 进度条的长度
            this.frontBg.style.width = percentage * 100 + '%';
            // 小圆点需要平移的值
            let l = this.circle.parentNode.offsetWidth * percentage;
            // 小圆点平移
            this.circle.style.transform = `translateX(${l}px)`;
        }
        /**
         * 动画暂停
         */
        stopMove() {
            cancelAnimationFrame(this.timerId);
        }
    }
    /**
     * 实例化 
     * */
    function scrolBarControl(audio) {
        return new ScrolBar(audio);
    }
    /**
     * 进度条拖拽
     */
    class Drag {
        constructor() {
            this.startDistance = 0;
            this.moveDistance = 0;
            this.dom = document.getElementsByClassName('circle')[0];
            this.frontBg = document.getElementsByClassName('frontBg')[0];
            this.moveDistancePercentage = 0;
            this.init();
        }
        /**
         * 初始化
         * 小圆点的鼠标按下，移动，抬起事件
         */
        init() {
            let self = this;
            // 小圆点的鼠标按下事件
            this.dom.addEventListener('touchstart', function (e) {
                // 获取当前位置
                self.startDistance = e.changedTouches[0].pageX;
                // 获取当前平移值
                self.moveDistance = parseFloat(this.style.transform.split('(')[1]) || 0;
                // 回调函数
                self.start && self.start();
            });
            // 被拖拽元素的鼠标移动事件
            this.dom.addEventListener('touchmove', function (e) {
                // 获取移动距离
                let distance = e.changedTouches[0].pageX - self.startDistance;
                // 计算被拖拽元素的平移值
                let l = distance + self.moveDistance;
                /**
                 * 平移值限定
                 * 不能超出父级容器
                 */
                if (l > this.parentNode.offsetWidth) {
                    l = this.parentNode.offsetWidth;
                } else if (l < 0) {
                    l = 0;
                }
                // 计算当前进度的百分数
                self.moveDistancePercentage = l / this.parentNode.offsetWidth;
                // 平移被拖拽元素
                this.style.transform = `translateX(${l}px)`;
                // 改变进度条的宽度
                self.frontBg.style.width = self.moveDistancePercentage * 100 + '%';
                // 回调函数
                self.move && self.move(self.moveDistancePercentage);
                // 清除默认事件
                e.preventDefault();

            });
            /**
             * 被拖拽元素的鼠标抬起事件
             */
            this.dom.addEventListener('touchend', function () {
                // 回调函数
                self.end && self.end(self.moveDistancePercentage);
            });
        }
    }
    /**
     * 实例化 进度条的拖拽
     */
    function scrolDrag() {
        return new Drag();
    }
    /**
     * 导出到全局
     */
    root.scrolBar = {
        scrolBarControl,
        scrolDrag,
    };

})(window.player || (window.player = {}));