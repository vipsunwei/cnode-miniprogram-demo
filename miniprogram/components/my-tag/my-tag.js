// components/my-tag/my-tag.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cur: {
      type: Object,
      value: {},
      observer: '_curChange'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tag: {},
    tags: {
      top: {
        text: '置顶',
        bgColor: '#fff0f6',
        textColor: '#eb2f96',
        bdColor: '#ffadd2'
      },
      good: {
        text: '精华',
        bgColor: '#f0f5ff',
        textColor: '#2f54eb',
        bdColor: '#adc6ff'
      },
      ask: {
        text: '问答',
        bgColor: '#f6ffed',
        textColor: '#52c41a',
        bdColor: '#b7eb8f'
      },
      share: {
        text: '分享',
        bgColor: '#f9f0ff',
        textColor: '#722ed1',
        bdColor: '#d3adf7'
      },
      job: {
        text: '招聘',
        bgColor: '#e6fffb',
        textColor: '#13c2c2',
        bdColor: '#87e8de'
      },
      dev: {
        text: '测试',
        bgColor: '#fcffe6',
        textColor: '#a0d911',
        bdColor: '#eaff8f'
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _curChange: function (newVal, oldVal) {
      // console.log(newVal, ':new-----------old:', oldVal);
      let top = newVal.top;
      let good = newVal.good;
      let tab = newVal.tab;
      let tag = top ? this.data.tags.top : good ? this.data.tags.good : tab ? this.data.tags[tab] : this.data.tag;
      this.setData({ tag });
    }
  }
})
