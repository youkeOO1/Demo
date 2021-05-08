<template>
  <section class="student-info-warp">
    <form action="#">
      <div>
        <input type="text" id="" placeholder="sutdent ID" itemid="sutdentID" v-model="value.sNo" />
      </div>
      <div>
        <input type="text" placeholder="username" id="name" v-model="value.name" />
      </div>
      <div class="sex-warp">
        <span>性别：</span>
        <label for="male">男</label>
        <input type="radio" name="sex" id="male" class="sex" value="0" v-model="value.sex" />
        <label for="female">女</label>
        <input type="radio" name="sex" id="female" class="sex" value="1" v-model="value.sex" />
      </div>
      <div>
        <input type="email" name="" placeholder="email" id="email" v-model="value.email" />
      </div>
      <div>
        <input type="text" placeholder="birthYear" id="birthYear"  v-model="value.birth"/>
      </div>
      <div>
        <input
          type="text"
          class="input"
          name="phone number"
          id="phoneNumber"
          placeholder="phone number"
          v-model="value.phone"
        />
      </div>
      <div>
        <input type="text" name="" id="address" placeholder="address" v-model="value.address" />
      </div>
      <div class="btn-warp">
        <input type="button" value="submit" @click.prevent="submit" class="btn">
        <input type="button" value="reset" @click.prevent="reset" class="btn">
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      value: {
        sNo: '',
        name: '',
        sex: '',
        birth: '',
        phone: '',
        address: '',
        email: '',
      },
    };
  },
  methods: {
    reset() {
      this.value = {
        sNo: '',
        name: '',
        sex: '',
        birth: '',
        phone: '',
        address: '',
        email: '',
      };
    },
    async submit() {
      try {
        const res = await this.$api.addStu(this.value);
        this.$toast(res.msg, res.status);
        if (res.msg === '添加成功') {
          setTimeout(() => {
            this.$router.push('/main/stuList');
          }, 2000);
        }
      } catch (err) {
        this.$toast(err, 'fail');
      }
    },
  },
};
</script>

<style scoped src="./stuAdd.css">
</style>
