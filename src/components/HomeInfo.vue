<template>
  <div class="home-info">
    <div class="hero-info">
      <div class="basic-info">
        <div class="avatar" @click="showCheatInput()">
          <img src="/hero.svg" />
        </div>
        <div class="name">
          <input
            v-show="isCheating"
            v-model="cheatCode"
            class="cheatInput"
            @keyup.enter="checkCheatCode()"
          />
          去找简历吧勇士
        </div>
      </div>
      <div class="resume">
        <div class="left">
          <div
            class="label-name"
            :class="{ collect: isCollected }"
            @click="exchange()"
          >
            {{ collectTip }}
          </div>
          <PackageItem
            class="resume1"
            position-type="$resumes"
            :position-index="0"
            :item="store.state.hero.$resumes[0]"
          />
          <PackageItem
            class="resume2"
            position-type="$resumes"
            :position-index="1"
            :item="store.state.hero.$resumes[1]"
          />
        </div>
        <div class="right">
          <template v-for="(item, index) in store.state.hero.$resumes">
            <PackageItem
              v-if="index > 1"
              :key="`resume-item-${index}`"
              class="item"
              position-type="$resumes"
              :item="item"
              :position-index="index"
            />
          </template>
        </div>
      </div>
    </div>
    <div class="attr-info">
      <div class="left">
        <div class="label-name">梦想</div>
      </div>
      <div class="right">
        <div class="attr">{{ store.state.hero.$hp.toFixed(1) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import createGame from "@/js/create-game";
import PackageItem from "@/components/PackageItem.vue";

export default defineComponent({
  name: "HomeInfo",
  components: {
    PackageItem
  },
  setup() {
    const store = useStore();

    watch(
      () => store.state.hero.UPDATE,
      () => {
        checkCollect();
      }
    );

    const state = reactive({
      isCollected: false,
      collectTip: "收集",
      isCheating: false,
      cheatCode: ""
    });

    // 集齐了所有简历碎片（且 hp > 0），则可以兑换完整版简历
    const checkCollect = () => {
      const resumes = store.state.hero.$resumes;
      let flag = 0;

      for (let resume of resumes) {
        if (resume == 0 || resume == null) flag = 1;
      }

      if (flag == 0) {
        state.isCollected = true;
        state.collectTip = "兑换";
      } else {
        state.isCollected = false;
        state.collectTip = "收集";
      }
    };

    // 兑换完整版简历
    const exchange = () => {
      if (state.isCollected === true)
        window.open("https://zxh.io/files/cv/full/en.pdf");
    };

    // 作弊码弹窗
    const showCheatInput = () => {
      if (state.isCheating) {
        state.isCheating = false;
        state.cheatCode = "";
      } else state.isCheating = true;
    };

    const checkCheatCode = () => {
      if (state.cheatCode == "xiaohanzouissocool") createGame(true);
      else state.cheatCode = "作弊码错误！";
    };

    checkCollect();

    return {
      ...toRefs(state),
      store,
      showCheatInput,
      checkCheatCode,
      exchange
    };
  }
});
</script>

<style scoped lang="stylus">
@require '../styles/palette.styl'
.home-info
  word-spacing -4px
  display table
  width 276px
  height 280px
  padding 6px
  .left
    display inline-block
    vertical-align top
    width 60px
  .right
    display inline-block
    vertical-align top
    width 192px
  .label-name
    height 40px
    line-height 40px
    width 60px
    background $bg-label-color
    color white
    text-align center
    border-radius 2px
  .collect
    background $text-color-red
    &:hover
      box-shadow $hover-shadow
  .basic-info
    margin-bottom 4px
    .avatar
      display inline-block
      width 40px
      height 40px
      background-color $bg-label-color
      border-radius 2px
      vertical-align top
      position relative
      img
        display inline-block
        width 40px
        height 40px
      &:hover
        box-shadow $hover-shadow-small
    .name
      background-color $bg-label-color
      border-radius 2px
      color white
      display inline-block
      width 194px
      height 40px
      line-height 40px
      margin-left 10px
      padding 0px 20px
      font-size 22px
      text-align center
      max-width 202px
      text-overflow ellipsis
    .cheatInput
      position absolute
      width 180px
      height 30px
      margin-left -13px
      margin-top 5px
      background-color $bg-label-color
      color white
      outline none
      border 1px solid white
      border-radius 5px
      padding-left 4px

  .resume
    .right
      padding 5px
    .left
      padding-top 5px
    .resume1
      margin-top 8px
      margin-left 16px
    .resume2
      margin-top 4px
      margin-left 16px
    .item
      margin 0px 1px 4px 0px

  .attr-info
    .right
      padding-left 3px
      .attr
        width 63px
        padding 6px 2px
        margin-bottom 4px
        font-size 18px
        display block
        margin-left 4px
        margin-top -2px
        color $text-color-red

.home-info.right-info
  height 168px
  width 520px
  .hero-info, .attr-info
    width 280px
    display inline-block
    margin-left 7px
  .attr-info
    vertical-align top
    width 150px
    .attr
      padding 12px 2px
</style>
