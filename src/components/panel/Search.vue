<template>
  <div class="search-box">
    <div class="search-bar" :class="{'search-bar_focusing': !isCancel || currentValue}">
      <form class="search-bar__form">
        <div class="vux-search-mask" @click="touch" v-show="!isFixed && !isFocus"></div>
        <div class="search-bar__box">
          <i class="icon-search"></i>
          <input type="search" class="search-bar__input" :placeholder="placeholder" autocomplete="off" :required="required" v-model="currentValue" ref="input"
          @focus="onFocus"
          @blur="onBlur"/>
          <a href="javascript:" class="icon-clear" @click="clear" v-show="currentValue"></a>
        </div>
        <label class="search-bar__label" v-show="!isFocus">
          <i class="icon-search"></i>
          <span>搜索</span>
        </label>
      </form>
      <a href="javascript:" class="search-bar__cancel-btn" @click="cancel">取消</a>
      <slot name="right"></slot>
    </div>
    <div class="cells vux-search_show" v-show="isFixed">
      <slot></slot>
      <div class="cell cell_access" v-for="item in results" @click="handleResultClick(item)" v-on:touchmove.prevent>
        <div class="cell__bd cell_primary">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    results: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    clear () {
      //输入框X号点击事件
      this.currentValue = ''
      this.isFocus = true
      this.setFocus()
      if (!this.isFixed) {
        this.isFixed = true
      }
    },
    cancel () {
      //点击取消按钮
      this.isCancel = true
      this.currentValue = ''
      this.isFixed = false
      this.$emit('on-cancel')
    },
    handleResultClick (item) {
      this.$emit('result-click', item) // just for compatibility
      this.$emit('on-result-click', item)
      this.isCancel = true
      this.isFixed = false
    },
    touch () {
      console.log("touch")
      this.isCancel = false
      this.isFixed = true
      this.$emit('on-touch')
    },
    setFocus () {
      console.log("touch")
      this.$refs.input.focus()
    },
    onFocus () {
      this.isFocus = true
      this.touch()
    },
    onBlur () {
      console.log("onBlur")
      this.isFocus = false
      this.isCancel = true
      this.isFixed = false
      this.currentValue = ''
    }
  },
  data () {
    return {
      currentValue: '',
      isCancel: true,
      isFocus: false,
      isFixed: false,
    }
  },
  watch: {
    isFixed (val) {
      if (val === true) {
        this.setFocus()
        this.isFocus = true
      } else {}
    },
  }
}
</script>

<style lang="less" scoped>
.search-box{
    width: 100%;
    .search-bar{
        position: relative;
        padding: 8px 10px;
        display: flex;
        box-sizing: border-box;
        background-color: #f8f8f8;
        border-bottom: 1px solid #e5e5e5;
        .search-bar__form{
            position: relative;
            -webkit-box-flex: 1;
            flex: auto;
            background-color: #f8f8f8;
        }
        .search-bar__form:after{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 200%;
            height: 200%;
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            border-radius: 10px;
            border: 1px solid #E6E6EA;
            box-sizing: border-box;
            background: #FFFFFF;
        }
        .vux-search-mask{
            position: absolute;
            left: 0;
            top: 0;
            width: 90%;
            height: 100%;
            z-index: 5;
        }
        .search-bar__box{
            position: relative;
            padding-left: 30px;
            padding-right: 30px;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            z-index: 1;
        }
        .icon-search{
            position: absolute;
            left: 10px;
            top: 0;
            line-height: 28px;
        }
        .search-bar__input{
            padding: 4px 0;
            width: 100%;
            height: 1.42857143em;
            border: 0;
            font-size: 14px;
            line-height: 1.42857143em;
            box-sizing: content-box;
            background: transparent;
        }
        .icon-clear{
            position: absolute;
            top: 0;
            right: 0;
            padding: 0 10px;
            line-height: 28px;
        }
        .search-bar__label{
            position: absolute;
            top: 1px;
            right: 1px;
            bottom: 1px;
            left: 1px;
            z-index: 2;
            border-radius: 3px;
            text-align: center;
            color: #9B9B9B;
            background: #dbdbdb;
            span{
                display: inline-block;
                font-size: 14px;
                vertical-align: middle;
            }
        }
        .icon-search{
            margin-right: 5px;
            color: #B2B2B2;
            font-size: 14px;
        }
        .search-bar__cancel-btn{
            display: none;
            margin-left: 10px;
            line-height: 28px;
            color: #FF9900;
            white-space: nowrap;
        }
        &.search-bar_focusing{
            .search-bar__cancel-btn{
                display: block;
            }
        }
    }
}
</style>