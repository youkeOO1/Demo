(function (root) {
    class MusicPlayer {
        constructor(warp) {
            this.warp = warp;
            this.curIndex = 0;
            this.timer = null;
            this.init();
        }
        /**
         * 初始化
         */
        init() {
            /**
             * 获取元素
             * 获取数据
             */
            this.getDom();
            this.getData('../mock/data.json');

        }
        /**
         * 获取元素
         */
        getDom() {
            /**
             * 小圆点
             * 喜欢 上一首 播放与暂停 下一首 歌曲菜单
             * 歌曲图片
             */
            this.circle = document.getElementsByClassName('circle')[0];
            this.listBtn = document.querySelectorAll('.control li');
            this.songImg = document.querySelector('.songImg img');
        }
        /**
         * 请求数据
         * @param {*} url 
         */
        async ajax(url) {
            return await fetch(url).then(a => a.json());
        }
        /**
         * 获取数据
         */
        async getData(url) {
            // 接受数据
            this.data = await this.ajax(url);
            // 索引值
            this.indexObj = new root.indexControl(this.data.length);
            // 加载音乐
            this.loadMusic(this.indexObj.index);
            // 音乐控制
            this.musicControl();
            // 歌曲列表
            this.musicList();
        }

        /**
         * 加载音乐
         * @param {*} index 
         */
        loadMusic(index) {
            // 渲染
            root.render(this.data[index]);
            // 加载音乐
            root.music.loadMusic(this.data[index].audioSrc);
            // 进度条
            this.scrolControl(this.data[index].duration);
            // 进度条拖拽
            this.progressBarDrag();
            /**
             * 第一首歌默认暂停状态
             * 当切歌时判断是否播放
             * 当切歌前处于播放状态切歌后自动播放
             * 当切歌前处于暂停状态，切歌后继续播放
             */
            if (root.music.status === 'play') {
                this.listBtn[2].className = 'playing';
                root.music.play();
                // 图片旋转回到初始位置
                this.rotateImg(0);
                // 开启进度条移动
                this.scrolBar.move();

            } else {
                // 停止播放
                root.music.pause();
                this.listBtn[2].className = '';
                // this.scrolBar.status();
            }
            let self = this;
            /**
             * 播放结束后切换到下一首
             */
            root.music.end(() => {
                // 切歌前，清除当前歌曲进度条移动动画的定时器
                self.scrolBar.stopMove();
                // 加载下一首歌曲
                self.loadMusic(self.indexObj.next());

            });

        }
        /**
         * 音乐控制
         */
        musicControl() {
            /**
             * 上一首
             * 下一首
             * 开始与暂停
             */
            let self = this;
            /**
             * 上一首
             */
            this.listBtn[1].addEventListener('touchend', () => {
                root.music.status = 'play';
                root.music.play();
                // 播放上一首前，清除当前歌曲进度条移动动画的定时器
                this.scrolBar.stopMove();
                // 加载上一首
                this.loadMusic(this.indexObj.prov());
                // 为其歌曲列表重置选中样式
                this.list.listChange(this.indexObj.index);

            });
            /**
             * 播放与暂停
             */
            this.listBtn[2].addEventListener('touchend', function () {
                if (root.music.status === 'play') {
                    // 此时正在播放，此时触发单击事件为暂停
                    root.music.pause();
                    this.className = '';
                    // 暂停时清除该歌曲的图片旋转的定时器
                    self.imgStop();
                    // 暂停时清除当前歌曲进度条移动动画的定时器
                    self.scrolBar.stopMove();
                } else if (root.music.status === 'pause') {
                    // 此时处于暂停状态，此时触发单击事件为播放
                    root.music.play();
                    this.className = 'playing';
                    // 获取之前的旋转角度
                    let deg = parseFloat(self.songImg.style.transform.split('(')[1]) || 0;
                    // 添加图片旋转
                    self.rotateImg(deg);
                    // 开启进度条移动动画
                    self.scrolBar.move();
                }
            });
            /**
             * 下一首
             */
            this.listBtn[3].addEventListener('touchend', () => {
                root.music.status = 'play';
                root.music.play();
                // 播放下一首前将清除当前歌曲进度条移动动画的定时器
                this.scrolBar.stopMove();
                // 加载上一首歌曲
                this.loadMusic(this.indexObj.next());
                // 为其歌曲列表重置选中样式
                this.list.listChange(this.indexObj.index);

            });
        }
        /**
         * 图片的旋转与暂停
         */
        rotateImg(deg = 0) {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                deg += 0.1;
                this.songImg.style.transform = `rotate(${deg}deg)`;
                this.songImg.dataset.rotate = deg;
            }, 1000 / 60);
        }
        /**
         * 图片停止旋转
         */
        imgStop() {
            clearInterval(this.timer);


        }
        /**
         * 歌曲列表
         */
        musicList() {
            this.list = root.listControl(this.warp, this.data);
            /**
             * 为歌曲列表中的歌曲名添加单击事件
             * 当单击当前播放歌曲的名字时，直接隐藏歌曲列表
             * 单击其他歌曲名进行切歌
             */
            this.listBtn[4].addEventListener('touchend', this.list.listShow);
            this.list.listArr.forEach((ele, index) => {
                ele.addEventListener('touchend', () => {
                    /**当为当前歌曲直接隐藏歌曲列表 */
                    if (index === this.indexObj.index) {
                        this.list.listHide();
                        return;
                    }
                    /**
                     * 单击其他歌曲进行切歌
                     */
                    // 改变播放歌曲的索引值
                    this.indexObj.index = index;
                    // 清除当前歌曲进度条移动动画的定时器
                    if (root.music.status === 'play') {
                        this.scrolBar.stopMove();
                    }
                    // 播放音乐
                    root.music.play();
                    // 加载音乐
                    this.loadMusic(index);

                    // 修改播放按钮的样式
                    this.listBtn[2].className = 'playing';
                    // 重置歌曲列表的选中样式
                    this.list.listChange(index);
                    // 隐藏歌曲列表
                    this.list.listHide();
                });
            });
        }
        /**
         * 进度条
         */
        scrolControl(duration) {
            // 初始化
            this.scrolBar = root.scrolBar.scrolBarControl(root.music.audio);
            // 渲染歌曲结束时间
            this.scrolBar.rendTime(duration);
        }
        /**
         * 进度条拖拽动画
         */
        progressBarDrag() {
            // 初始化
            this.drag = root.scrolBar.scrolDrag();
            let self = this;
            /**
             * 当进度条中的小圆点被触发鼠标按下时的回调函数
             * 鼠标按下清除当前歌曲进度条移动动画的定时器
             */
            this.drag.start = function () {
                self.scrolBar.stopMove();
            };
            /**
             * 当进度条中的小圆点被触发鼠标移动时的回调函数
             * 更新进度条--- 让进度条中的小圆点与进度条移动到鼠标的的位置
             * 但不能超出父级容器
             */
            this.drag.move = function (percentage) {
                self.scrolBar.upData(percentage);

            };
            /**
             * 当进度条中的小圆点被触发鼠标回弹时的回调函数
             * 计算当前应该播放到多少秒
             * 跳转播放
             * 开启播放
             * 修改播放按钮的样式
             * 开启进度条移动动画的定时器
             */
            this.drag.end = function (percentage) {
                // 计算当前应该播放到多少秒
                let time = self.data[self.indexObj.index].duration * percentage;
                // 跳转播
                root.music.playTo(time);
                // 开启播放
                if (root.music.status === 'pause') {
                    // 获取之前的旋转角度
                    let deg = parseFloat(self.songImg.style.transform.split('(')[1]) || 0;
                    // 添加图片旋转
                    self.rotateImg(deg);
                }
                root.music.play();
                // 修改播放按钮的样式
                self.listBtn[2].className = 'playing';
                // 开启进度条移动动画的定时器
                self.scrolBar.move();
            };
        }

    }
    // 导入到全局
    root.musicPlayer = new MusicPlayer(document.getElementById('warp'));
})(window.player || (window.player = {}));

