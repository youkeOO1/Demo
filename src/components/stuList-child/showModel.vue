<template>
  <section class="model-warp">
    <div class="model-mask" @click="setModeShow(false)"></div>
    <div class="model-content">
      <h2>编辑表单</h2>
      <form action="#" id="edit-student-form">
        <div>
          <input
            type="text"
            @input="edit('name', $event.target.value)"
            placeholder="username"
            id="name"
            :value="activeList.name"
          />
        </div>
        <div class="sex-warp">
          <span>性别：</span>
          <label for="male">男</label>
          <input
          type="radio"
          name="sex"
          @input="edit('sex', '0')"
          :checked="activeList.sex == 0"
          id="male"
          class="sex" />
          <label for="female">女</label>
          <input
          type="radio"
          name="sex"
          @input="edit('sex', '1')"
          :checked="activeList.sex == 1"
          id="female"
          class="sex" />
        </div>
        <div>
          <input
            type="email"
            name=""
            @input="edit('email', $event.target.value)"
            placeholder="email"
            id="email"
            :value="activeList.email"
          />
        </div>
        <div>
          <input
            type="text"
            id=""
            @input="edit('sNo', $event.target.value)"
            placeholder="sutdent ID"
            itemid="sutdentID"
            :value="activeList.sNo"
          />
        </div>
        <div>
          <input
            type="text"
            @input="edit('birth', $event.target.value)"
            placeholder="birthYear"
            id="birthYear"
            :value="activeList.birth"
          />
        </div>
        <div>
          <input
            type="text"
            class="input"
            name="phone number"
            id="phoneNumber"
            placeholder="phone number"
            @input="edit('phone', $event.target.value)"
            :value="activeList.phone"
          />
        </div>
        <div>
          <input
            type="text"
            name=""
            @input="edit('address', $event.target.value)"
            id="address"
            placeholder="address"
            :value="activeList.address"
          />
        </div>
        <div class="btn-warp">
          <input type="button" value="submit" class="btn" @click="submit" />
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      newData: {},
    };
  },
  computed: {
    ...mapState(['modeShow', 'activeList']),
  },
  methods: {
    ...mapMutations(['setModeShow']),
    edit(key, value) {
      this.newData[key] = value;
    },
    async submit() {
      const date = { ...this.activeList, ...this.newData };
      try {
        const { msg, status: type } = await this.$api.updateStu(date);
        this.$toast(msg, type);
        // this.setModeShow(false);
      } catch (error) {
        // console.log(error, 'model-updataStu');
        this.$toast('添加错误', 'fail');
      }
    },
  },
};
</script>
<style scoped>
.model-warp {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  /* display: none; */
}
.model-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.model-content {
  width: 500px;
  height: 600px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
}
h2 {
  text-align: left;
  padding-left: 20px;
}
.btn-warp {
  display: flex;
  justify-content: center;
}
input {
  color: #000;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  width: 300px;
  padding: 15px;
  box-sizing: border-box;
  margin-bottom: 10px;
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.2), 0 1px 1px rgba(255, 255, 255, 0.2);
  -webkit-transition: box-shadow 0.5s ease;
  -moz-transition: box-shadow 0.5s ease;
  -o-transition: box-shadow 0.5s ease;
  -ms-transition: box-shadow 0.5s ease;
  transition: box-shadow 0.5s ease;
}

input:hover {
  box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.4), 0 1px 1px rgba(255, 255, 255, 0.2);
}
.sex-warp {
  text-align: left;
  margin-bottom: 10px;
}
.sex-warp span {
  margin-right: 15px;
}
.sex {
  width: 15px;
  border: none;
  box-shadow: none;
  margin: 0 5px;
}
.btn-warp {
  width: 300px;
  display: flex;
  /* justify-content: space-between; */
}
.btn {
  width: 148px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  background-image: linear-gradient(top, #6eb6de, #4a77d4);
  background-image: -moz-linear-gradient(top, #6eb6de, #4a77d4);
  background-image: -ms-linear-gradient(top, #6eb6de, #4a77d4);
  background-image: -o-linear-gradient(top, #6eb6de, #4a77d4);
  background-image: -webkit-linear-gradient(top, #6eb6de, #4a77d4);
}
.btn:hover {
  filter: none;
  background-image: linear-gradient(top, #4a77d4, #4a77d4);
  background-image: -moz-linear-gradient(top, #4a77d4, #4a77d4);
  background-image: -ms-linear-gradient(top, #4a77d4, #4a77d4);
  background-image: -o-linear-gradient(top, #4a77d4, #4a77d4);
  background-image: -webkit-linear-gradient(top, #4a77d4, #4a77d4);
}
</style>
