<template>
  <view class="container">
    <view class="header">
      <view class="">取消</view>
      <view class="" @click="ask">发布问题</view>
    </view>
    <view class="title">
      <input type="text" placeholder="输入问题并以问号结尾" v-model="title"/>
    </view>
    
    <view class='toolbar' @tap="format" style="height: 120px;overflow-y: auto;">
    	<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
    	<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
    	<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
    	<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>
    	<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align" data-value="left"></view>
    	<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align" data-value="center"></view>
    	<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align" data-value="right"></view>
    	<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align" data-value="justify"></view>
    	<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight" data-value="2"></view>
    	<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing" data-value="2em"></view>
    	<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop" data-value="20px"></view>
    	<view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju" data-name="marginBottom" data-value="20px"></view>
    	<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
    	<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
    	<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize" data-value="24px"></view>
    	<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color"
    	 data-value="#0000ff"></view>
    	<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor" data-name="backgroundColor" data-value="#00ff00"></view>
    	<view class="iconfont icon-date" @tap="insertDate"></view>
    	<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
    	<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
    	 data-value="ordered"></view>
    	<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list" data-value="bullet"></view>
    	<view class="iconfont icon-undo" @tap="undo"></view>
    	<view class="iconfont icon-redo" @tap="redo"></view>
    
    	<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
    	<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
    	<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
    	<view class="iconfont icon-charutupian" @tap="insertImage"></view>
    	<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header" :data-value="1"></view>
    	<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script" data-value="sub"></view>
    	<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script" data-value="super"></view>
    	<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction" data-value="rtl"></view>
      <view class="iconfont icon-shanchu" @tap="clear"></view>
    
    </view>
    
    <editor id="editor" class="ql-container" :placeholder="placeholder" showImgSize showImgToolbar showImgResize @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady" @input="onEditorInput">
    </editor>
  </view>
</template>

<script>
  import { askQuestion } from '../../apis/api.js'
  export default {
    data() {
      return {
        title: '',
        desc: '',
        placeholder: '对问题补充说明，可以更快获得解答（选填）',
        readOnly: false,
        formats: {},
      };
    },
    methods: {
      onEditorReady() {
        // #ifdef APP-PLUS || H5 ||MP-WEIXIN
        uni.createSelectorQuery().select('#editor').context((res) => {
          this.editorCtx = res.context
        }).exec()
        // #endif
      },
      onEditorInput(e) {
        // 加上防抖
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          console.log(e)
          this.desc = e.detail.text
          this.desc = this.desc.slice(0, this.desc.length-1)
        }, 1000) 
      },
      ask() {
        const payload = {
          title: this.title,
          desc: this.desc
        }
        askQuestion(payload).then(res => {
          // console.log(res)
          // 成功后跳转问题页面，需要question_id
          const question_id = res.data.question_id
          uni.navigateTo({
            url: `/pages/question/question?question_id=${question_id}`
          })
        }).catch(err => console.log(err))
      },
      // editor组件函数
      readOnlyChange() {
      	this.readOnly = !this.readOnly
      },
      onEditorReady() {
      	uni.createSelectorQuery().select('#editor').context((res) => {
      		this.editorCtx = res.context
      	}).exec()
      },
      undo() {
      	this.editorCtx.undo()
      },
      redo() {
      	this.editorCtx.redo()
      },
      format(e) {
      	let {
      		name,
      		value
      	} = e.target.dataset
      	if (!name) return
      	// console.log('format', name, value)
      	this.editorCtx.format(name, value)
      },
      onStatusChange(e) {
      	const formats = e.detail
      	this.formats = formats
      },
      onEditorInput(e) {
        console.log('e', e)
        // 加上防抖
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          uni.createSelectorQuery().select('#editor').context((res) => {
          	this.editorCtx.getContents({
          	  success: res => {
          	    console.log('res', res)
                this.desc = res.html
          	  },
          	  fail: err => {
          	    console.log('err', err)
          	  }
          	})
          }).exec()
          // this.answer = this.answer.slice(0, this.answer.length-1)
        }, 800) 
      },
      // 功能函数
      removeFormat() {
      	this.editorCtx.removeFormat()
      },
      insertDate() {
      	const date = new Date()
      	const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      	this.editorCtx.insertText({
      		text: formatDate
      	})
      },
      insertImage() {
      	uni.chooseImage({
      		count: 1,
      		success: (res) => {
      			this.editorCtx.insertImage({
      				src: res.tempFilePaths[0],
      				alt: '图像',
      				success: function() {
      					console.log('insert image success')
      				}
      			})
      		}
      	})
      }
    }
  }
</script>

<style lang="scss">
@import "@/editor-icon.css";
  
.container {
  
  .header {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
  }
  
  .title {
    margin: 30rpx;
    border-bottom: 1px solid #606266;
  }
  
  .ql-container {
    min-height: 60vh;
    padding: 30rpx;
    background-color: #fff;
  }
  
  .toolbar {
    box-sizing: border-box;
    border-bottom: 0;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    background-color: #eee;
  }
    
  .iconfont {
    display: inline-block;
    padding: 8px 8px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 20px;
  }
}

page {
  background-color: #fff;
}

</style>
