(function(root){
    /**
     * 上一首歌
     * 下一首歌
     * 获取索引
     */
    class IndexControl{
        constructor(len){
            this.len = len;
            this.index = 0;
        }
        /**
         * 上一首
         */
        prov(){
            return this.get(-1);
        }
        /**
         * 下一首
         */
        next(){
            return this.get(1);
        }
        /**
         * 计算索引值
         * @param {*} num 
         */
        get(num){
            this.index = (this.index + num + this.len) % this.len;
            return this.index; 
        }
    }
    root.indexControl = IndexControl;
})(window.player || (window.player = {}));