/* eslint-disable vue/no-unused-vars */
<template>
  <div class="submit-warp">
    <div class="write-text">
      <textarea name="" id="" cols="30" rows="10" placeholder="填写答案" v-model="value"></textarea>
    </div>
    <div class="submit-item">
      <div class="submit-imgs">
        <div class="item-right">提交做作业截图</div>
        <div class="item-left">
          <label for="imgs">点击提价作业截图</label>
          <input
            type="file"
            name="img"
            id="imgs"
            capture="camera"
            multiple="multiple"
            accept="image/*"
            @change="select($event)"
          />
        </div>
      </div>
      <ul class="item-show item-show-imgs">
        <li v-for="(images, index) in showImgArr" :key="images.id">
          <div class="show-warp">
            <div class="show-img">
              <img :src="images.result" />
            </div>
            <div class="show-mask">
              <div class="show-line img-show-line"></div>
            </div>
            <div class="close" @click="close('image', index)"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="submit-item">
      <div class="submit-blogs">
        <div class="item-right">提交做作业包</div>
        <div class="item-left">
          <label for="blogs"> 点击提价作业包</label>
          <input type="file" name="" id="blogs" capture="camera" @change="select($event)" />
        </div>
      </div>
      <ul class="item-show item-show-zips">
        <li v-for="(zips, index) in showZipArr" :key="zips.id">
          <div class="show-warp ">
            <div class="show-img show-warp-zip">
              <i></i>
            </div>
            <div class="show-mask">
              <div class="show-line zip-show-line"></div>
            </div>
            <div class="close " @click="close('zip', index)"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="submit-item">
      <div class="submit-video">
        <div class="item-right">提交提交短视频</div>
        <div class="item-left">
          <label for="videos">点击提交短视频</label>
          <input
            type="file"
            name=""
            id="videos"
            capture="camera"
            accept=".mp4,.MP4,.mov,.MOV"
            @change="select($event)"
          />
        </div>
      </div>
      <ul class="item-show">
          <li v-for="(videos, index) in showVideoArr" :key="videos.id">
            <div class="show-warp">
              <div class="show-img show-warp-video">
                <i></i>
              </div>
              <div class="show-mask">
                <div class="show-line video-show-line"></div>
              </div>
              <div class="close " @click="close('video', index )"></div>
            </div>
          </li>
      </ul>
    </div>
    <button @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      showImgArr: [],
      showZipArr: [],
      showVideoArr: [],
    };
  },
  methods: {
    select(e) {
      const file = e.target.files;
      for (let i = 0; i < file.length; i += 1) {
        const fileItem = file[i];
        const type = fileItem.type.split('/')[0];
        this.renderDom(type, fileItem);
      }
    },
    renderDom(type, file) {
      if (!file) return;
      const render = new FileReader();
      if (type === 'image' || type === 'video') {
        render.readAsDataURL(file);
      } else {
        render.readAsArrayBuffer(file);
      }
      const self = this;
      // eslint-disable-next-line func-names
      // eslint-disable-next-line space-before-function-paren
      render.onload = function(e) {
        if (type === 'image') {
          self.showImgArr.push({
            id: new Date().getTime(),
            result: e.target.result,
          });
        } else if (type === 'video') {
          self.showVideoArr.push({
            id: new Date().getTime(),
            result: e.target.result,
          });
        } else {
          self.showZipArr.push({
            id: new Date().getTime(),
            result: e.target.result,
          });
        }
      };
    },
    close(type, index) {
      if (type === 'video') {
        this.showVideoArr.splice(index, 1);
      } else if (type === 'image') {
        this.showImgArr.splice(index, 1);
      } else {
        this.showZipArr.splice(index, 1);
      }
    },
    submit() {
      if (this.value !== ''
      || this.showImgArr.length > 0
      || this.showZipArr.length > 0
      || this.showVideoArr.length > 0) {
        this.$Message({
          message: '提交成功',
          type: 'success',
        });
        this.value = '';
        this.showImgArr = [];
        this.showZipArr = [];
        this.showVideoArr = [];
      } else {
        this.$Message({
          message: '警告未选择提价文件',
          type: 'warning',
        });
      }
    },
  },
};
</script>

<style scoped src="./submit.css"></style>
