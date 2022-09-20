<template>
  <view>
    <view class="header">
      <view class="" @click="cancel">取消</view>
      <view class="" @click="publish">发布</view>
    </view>
    <view class="title">{{question.title}}</view>
    
    <view class='toolbar' @tap="format" style="height: 160px;overflow-y: auto;">
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
    	<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header" :data-value="1"></view>
    	<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script" data-value="sub"></view>
    	<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script" data-value="super"></view>
    	<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction" data-value="rtl"></view>
      <view class="iconfont icon-shanchu" @tap="clear"></view>
      <view class="iconfont icon-charutupian" @tap="insertImage" v-if="!hasOnePic"></view>
    </view>

    <editor id="editor" class="ql-container" placeholder="填写回答内容..." showImgSize showImgToolbar showImgResize @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady" @input="onEditorInput">
    </editor>
  </view>
</template>

<script>
  import { getQuestions, answerQuestion } from '../../apis/api.js'

  export default {
    data() {
      return {
        question_id: '',
        questions: [],
        question: {},
        answer: '',
        timer: undefined,
        readOnly: false,
        formats: {},
        tempFilePaths: [],
        hasOnePic: false  // 已上传一张图片，多张图片后端逻辑没写
      };
    },
    onLoad(options) {
      console.log(options)
      this.question_id = options.question_id
      this.getData()
    },
    methods: {
      getData() {
        getQuestions().then(res => {
          this.questions = res.data
          this.question = this.questions.filter(q => q.question_id === this.question_id)[0]
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
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          uni.createSelectorQuery().select('#editor').context((res) => {
          	this.editorCtx.getContents({
          	  success: res => {
          	    console.log('onEditorInput res', res)
                this.answer = res.html
          	  },
          	  fail: err => {
          	    console.log('err', err)
          	  }
          	})
          }).exec()
        }, 500) 
      },
      publish() { 
        // 上传图片
        if (this.tempFilePaths.length > 0) {
          console.log(this.tempFilePaths.length)
          this.uploadFile(this.tempFilePaths)
        }
        
        
        const userInfo = uni.getStorageSync('userInfo')
        const { nickName, avatarUrl } = userInfo
        const payload = {
          question_id: this.question_id,
          answer: this.answer, //answer无法获取到uploadFile返回的值
          nickName,
          avatarUrl
        }
        answerQuestion(payload).then(res => {
          console.log(res)
          uni.navigateTo({
            url: `/pages/question/question?question_id=${this.question_id}`
          })
        }).catch(err => {
          console.log(err)
          uni.showToast({
            title: `${err}`.slice(11),
            icon: 'none',
            duration: 1500
          })
          setTimeout(() => {
            uni.navigateBack({
              delta: 1
            })
          }, 1600)
        })
        
      },
      cancel() {
        uni.navigateBack({
          delta:1
        })
      },
      
      insertDivider() {
      	this.editorCtx.insertDivider({
      		success: function() {
      			console.log('insert divider success')
      		}
      	})
      },
      clear() {
      	this.editorCtx.clear({
      		success: function(res) {
      			console.log("clear success")
      		}
      	})
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
        if (!this.hasOnePic) {
          const self = this
          uni.chooseImage({
          	count: 9,
          	success: (res) => {
              console.log(res, this.editorCtx)
          		this.editorCtx.insertImage({
          			src: res.tempFilePaths[0],
          			alt: '图像',
          			success: function() {
          				console.log('insert image success')
                  self.hasOnePic = true
          			},
          		})
              console.log('chooseImage res', res)
              this.tempFilePaths = res.tempFilePaths
              
          	},
            fail: function() {
              console.log('choose image fail')
            }
          })
        } else {
          // console.log('hasOnePic')
          return
        }
      },
      uploadFile(tempFilePaths) {
        for (let i = 0; i < tempFilePaths.length; i++) {
          // 上传
          uni.uploadFile({
            // url: 'https://localhost:8081/upload', 
            url: 'https://www.twivbas.com:8081/upload',
            filePath: tempFilePaths[i],
            name: 'file',
            formData: {
              question_id: this.question_id,
              answer: this.answer
            },
            success: (uploadFileRes) => {
              console.log('upload', uploadFileRes.data)
              // this.answer = uploadFileRes.data.answer
            },
            fail: err => {
              console.log('err', err)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
@import "@/editor-icon.css";

.header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 20rpx;
}

.title {
  background-color: #fff;
  padding: 30rpx;
}

.ql-container {
  min-height: calc(100vh - 252px);
  padding: 30rpx;
  background-color: #fff;
}

.toolbar {
  box-sizing: border-box;
  border-bottom: 0;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}
  
.iconfont {
  display: inline-block;
  padding: 8px 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 20px;
}
</style>
