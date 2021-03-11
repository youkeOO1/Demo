(function(root){
    /**
     * 加载音乐，
     * 播放音译
     * 暂停音乐
     * 音乐播放结束
     * 跳转播放
     */
    class Music{
        constructor(){
            this.status = 'pause';
            this.audio = new Audio();
        }
        /**
         * 加载音乐
         * @param {*} src 
         */
        loadMusic(src){
            this.audio.src =src;
            this.audio.load();
        }
        /**
         * 播放音乐
         */
        play(){
            this.status = 'play';
            this.audio.play();
            // this.audio.playbackRate = 16;
        }
        /**
         * 暂停播放
         */
        pause(){
            this.status = 'pause';
            this.audio.pause();
        }
        
        /**
         * 跳转播放
         * @param {*} timer 
         */
        playTo(timer){
            this.audio.currentTime =timer;
        }
        /**
         * 播放结束
         * @param {*} fn 
         */
        end(fn){
            this.audio.onended = fn;
        }
    }
    root.music = new Music();
})(window.player || (window.player = {}));