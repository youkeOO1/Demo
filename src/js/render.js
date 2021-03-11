(function(root){
    /**
     * 渲染图片, 
     * 渲染高斯模糊背景图,
     * 渲染音乐信息,
     * 渲染是否喜欢,
     */
    class Render{
        constructor(data){
            this.data  = data;
            this.renderImg(data.image);
            this.MusicInfo(data);
            this.isLike(data.isLike);
        }
        /**
         * 渲染音乐
         * @param {} url 
         */
        renderImg(url){
            let img = document.querySelector('.songImg img');
            img.src = url;
            root.blurImg(url);
        }
        /**
         * 渲染歌曲信息
         * @param {*} data 
         */
        MusicInfo(data){
            let name = document.getElementsByClassName('name')[0];
            let singer = document.getElementsByClassName('singer')[0];
            let album = document.getElementsByClassName('album')[0];
            name.innerHTML = data.name || '无';
            singer.innerHTML = data.singer || '无';
            album.innerHTML = data.album || '无';
        }
        /**
         * 渲染是否喜欢
         * @param {*} status 
         */
        isLike(status = false){
            let lisBtns = document.querySelectorAll('.control li');
            lisBtns[0].className = status == true ? 'liking':'';
        }
    }
    root.render = function(data){
        return new Render(data);
    };
})(window.player || (window.player = {}));