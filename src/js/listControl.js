(function (root) {
    /**
     * 渲染歌曲列表
     * 歌曲列表显示
     * 歌曲列表隐藏
     * 歌曲列表的选中状态
     */
    function listControl(warp, data) {
        let listArr = [];
        // 生成dom
        let list = document.createElement('div');
        let dl = document.createElement('dl');
        let dt = document.createElement('dt');
        let close = document.createElement('div');
        list.className = 'moveList';
        dt.innerHTML = '播放列表';
        dl.appendChild(dt);
        close.className = 'close';
        close.innerHTML = '关闭';
        data.forEach(ele => {
            let dd = document.createElement('dd');
            dd.innerHTML = ele.name;
            dl.appendChild(dd);
            listArr.push(dd);
        });
        list.appendChild(dl);
        list.appendChild(close);
        warp.appendChild(list);
        let disY = list.offsetHeight;
        list.style.transform = `translateY(${disY}px)`;
        close.addEventListener('touchend', listHide);
        listChange();
        /**
         * 歌曲列表显示
         */
        function listShow() {
            list.style.transition = '.2s';
            list.style.transform = 'translateY(0px)';
        }
        /**
         * 歌曲列表隐藏
         */
        function listHide() {
            list.style.transition = '.2s';
            let disY = list.offsetHeight;
            list.style.transform = `translateY(${disY}px)`;
        }
        /**
         * 重置歌曲列表选中状态
         * @param {*} index 索引值
         */
        function listChange(index = 0) {
            for (let i = 0; i < listArr.length; i++) {
                listArr[i].className = '';
            }
            listArr[index].className = 'active';
        }
        return {
            list,
            listArr,
            listShow,
            listHide,
            listChange,
        };
    

    }

    root.listControl = listControl;
})(window.player || (window.player = {}));