<template>
  <div class="page">
    <div class="home-head">
      <van-icon name="arrow-left" class="van-icons" @click="prev" />
      <span>消息发布</span>
      <span class="sub" @click="formSave">发布</span>
    </div>
    <div>
      <van-cell-group>
        <van-field v-model="title" required clearable label="消息标题：" placeholder="请输入消息标题" />
        <van-field
          v-model="infotypeText"
          @click="infotypeShows"
          disabled
          required
          clearable
          label="消息类别："
          placeholder="请输入消息类别"
        />
        <br />
        <van-field v-model="issuer" disabled clearable label="发布对象：" placeholder="请输入发布对象" />
        <br />
        <van-field v-model="issuerdate" disabled clearable label="发布时间：" placeholder="请输入发布时间" />
        <div data-v-ef56a2f2 class="van-cell van-field">
          <div class="van-cell__title van-field__label">
            <span>接收类型：</span>
          </div>
          <div class="van-cell__value">
            <div class="van-field__body">
              用户&emsp;
              <van-switch
                v-model="checked"
                active-value="org"
                inactive-value="user"
                inactive-color="#025E80"
                size="20px"
                @input="onInput"
              />&emsp;机构
            </div>
          </div>
        </div>
        <van-field
          v-show="ext1Show"
          v-model="ext1Text"
          required
          clearable
          label="机构信息："
          placeholder="请选择机构信息"
          disabled
          @click="orgShows"
        />
        <van-field
          v-show="ext2Show"
          v-model="ext2Text"
          disabled
          @click="ext2ActionsShow=true"
          required
          clearable
          label="用户信息："
          placeholder="请选择用户信息"
        />
        <br />

        <van-field
          v-model="infocontent"
          required
          clearable
          rows="3"
          autosize
          label="消息内容："
          type="textarea"
          placeholder="请输入消息内容"
          show-word-limit
        />
        <br />
      </van-cell-group>
    </div>
    <!-- <van-popup v-model="popshow" :style="{ height: '70%'}" :closeable="true" :safe-area-inset-bottom="true" position="bottom">
      <div class="popTitle">
      </div>
      <div class="popContent">
        <vue-tree v-model="checkedIds" :tree-data="treeData" :options="options" @handle="someActions"></vue-tree>
      </div>
    </van-popup>-->
    <!--  -->
    <van-popup
      v-model="popshow"
      label="请选择机构信息"
      position="bottom"
      :overlay="true"
      :safe-area-inset-bottom="true"
      :style="{ height: '70%' }"
    >
      <div class="popuphead">
        <span>请选择机构信息(点击机构名称进行选中)</span>
        <!-- <span @click="treepop">&emsp;确定</span> -->
      </div>
      <div class="popupbody">
        <vue-tree
          v-model="checkedIds"
          :tree-data="treeData"
          :options="options"
          @handle="someActions"
        ></vue-tree>
      </div>
    </van-popup>
    <!--  -->
    <van-action-sheet
      v-model="infotypeShow"
      title="选择消息类别"
      :actions="actions"
      :round="false"
      @select="onSelect"
    />

    <!-- 选择信息发布对象用户信息 -->
    <van-popup
      v-model="ext2ActionsShow"
      label="选择用户信息"
      position="bottom"
      :overlay="true"
      :safe-area-inset-bottom="true"
      :style="{ height: '60%' }"
    >
      <div class="popuphead">
        <span>选择用户信息</span>
        <span @click="getUserInfo">&emsp;确定</span>
      </div>
      <div class="popupbody">
        <van-radio-group v-model="ext2Actions">
          <van-cell-group>
            <div v-for="(item, index) in List" :key="index">
              <span v-if="item.name != null">
                <van-cell clickable :title="item.chsname" :label="item.name">
                  <van-radio :name="index" slot="right-icon" shape="square" />
                </van-cell>
              </span>
              <span v-else>
                <van-cell clickable :title="item.chsname">
                  <van-radio :name="index" slot="right-icon" shape="square" />
                </van-cell>
              </span>
            </div>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Notify, Toast } from "vant";
export default {
  data() {
    return {
      popshow: false,
      title: "",
      infotype: "message",
      infotypeText: "信息",
      issuer: "",
      issuerdate: "",
      executiontype: "user",
      ext1: "9727bbb1835243109fe5f2fca39c2bbd20190423083711836443584064750926",
      List: [], //用户信息集合
      msg: "",
      ext1Text: "董事会",
      ext2: "",
      ext1Show: false,
      ext2Show: true,
      infocontent: "",
      userInfo: "", //登录用户
      infotypeShow: false,
      actionss: {
        信息: "message",
        新闻: "news",
        公告: "notice",
        学习栏: "study",
        党群建设: "construction"
      },
      actions: [
        { name: "信息" },
        { name: "新闻" },
        { name: "公告" },
        { name: "学习栏" },
        { name: "党群建设" }
      ],
      checked: true,
      ext2Text: "",
      ext2Actions: "",
      ext2ActionsShow: false,
      // 复选ids,可传入id数组作为初始选中状态,如[3,4,8]
      checkedIds: [],
      // tree数据
      treeData: [
        {
          children: [
            {
              children: [
                {
                  id:
                    "0da199047558484db2174fc4f2a806d120191112094745611004754228585177",
                  text: "审计委员会"
                },
                {
                  id:
                    "3343a4afbba243f78dd3b944e6869b9c20191112094810364767676327930461",
                  text: "投资委员会"
                },
                {
                  id:
                    "53d1744bea8e4ddcbd0d3a1084e4cee820191112094714699478016384493784",
                  text: "督查办"
                },
                {
                  children: [
                    {
                      children: [
                        {
                          id:
                            "0a1005078f1f476a9542ae1a59f2056820191112102025329188870446759922",
                          text: "合审中心"
                        },
                        {
                          children: [
                            {
                              id:
                                "7688cede6f254d688dee74bbb531acbe20191112165944020136832188076864",
                              text: "档案馆项目"
                            },
                            {
                              id:
                                "9454a86e37ec4d66bf34ed19675775fb20191112165914595260698140387765",
                              text: "小林项目"
                            },
                            {
                              id:
                                "b35b71f19acc48afa56daffc10e9088d20191112170152452659477965959921",
                              text: "农产品项目"
                            },
                            {
                              id:
                                "c932c045f1db48b292af9d66a2b87afb20191112170239960256778961616527",
                              text: "唐家小学项目"
                            },
                            {
                              id:
                                "f920e21c2013437d9390521fb7cd666c20191112170013189367762256210647",
                              text: "世纪新城项目"
                            }
                          ],
                          id:
                            "1a6ef3e216384365bc9656281fe141ab20191112102843754564740646473366",
                          text: "项目部"
                        },
                        {
                          id:
                            "37eee28fe4da48c085e45abc8c1735b020191112102344679892024067442845",
                          text: "集招部"
                        },
                        {
                          id:
                            "41420d7ed2c74a6280c5218e7f78b40120190428164945753823295677831540",
                          text: "财税部"
                        },
                        {
                          id:
                            "52d53e4a14ad4c5a8c6acbcfb8be99e420191112102217873923809934873653",
                          text: "质安部"
                        },
                        {
                          id:
                            "72e9d4e079fd4fdbbb7051fa62b8857020190428164509229575344094719490",
                          text: "行政部"
                        },
                        {
                          id:
                            "800b2a0dd7164c97b89b10b86761f56d20190428164909571012632746157804",
                          text: "人力资源部"
                        },
                        {
                          id:
                            "81d4f7c1d79a457891abfd0afb4bec2d20191112101707762160094373429668",
                          text: "市场部"
                        },
                        {
                          id:
                            "8783740ef24a4ebd8cf95587a7db8b9f20191112102553849347565586508768",
                          text: "工会委员会"
                        },
                        {
                          id:
                            "8f0125f87e584e479bb4b73aff75af8b20191112101728859266568642038589",
                          text: "技术中心"
                        },
                        {
                          id:
                            "cadcd04b115a4593a1f002a19b0d476320191112101938515868573100568172",
                          text: "工管中心"
                        },
                        {
                          id:
                            "cde1624ceec14cdbbd1cd85c6b203e2020191112102411794236894541883279",
                          text: "支部委员会"
                        },
                        {
                          id:
                            "e091a3e2eec842c9bc8781dd59a671fc20191112102821541942554232051297",
                          text: "安保部"
                        },
                        {
                          id:
                            "eeb8c6dec78a4e86b1467c2f875d6d5920191112102149994351096882309533",
                          text: "资产部"
                        }
                      ],
                      id:
                        "2ab307997073496c801ec0b26091a6a720190423085912792069653233966222",
                      text: "职能部门"
                    },
                    {
                      id:
                        "469835cfe8c244e095034857794a63e120191112095748119602184094765627",
                      text: "法务办"
                    },
                    {
                      id:
                        "975aade2db564be6b90b08935cd5507d20191112095710798801922908147893",
                      text: "应急办"
                    },
                    {
                      children: [
                        {
                          id:
                            "063151fd6282464fa86c9dea2da1e7a220191112100749360731572220545046",
                          text: "大恒置业公司"
                        },
                        {
                          id:
                            "480f60ec8d564901b6f5d84b9603178f20191112101055503471366835279557",
                          text: "福业科技公司"
                        },
                        {
                          id:
                            "5962e6645f174330a9a3916449c054cb20191112100706782007918216216909",
                          text: "大恒餐饮公司"
                        },
                        {
                          id:
                            "5d22412be34c44b4a650d7b367c9998320190428164029672617749063814522",
                          text: "广拓机械公司"
                        },
                        {
                          id:
                            "7fa0ff3c81cc4d9ab66ae6ca80268b0c20190428164048286238429226843602",
                          text: "恒玺建材公司"
                        },
                        {
                          id:
                            "c1a41a7b75e24d509e380a63c00bde6a20191112100611817723438426530571",
                          text: "大恒金属公司"
                        },
                        {
                          id:
                            "eb1d418d7a0c4cb1b0c7e8550dd70de820190428163926545915350754785513",
                          text: "大恒建材公司"
                        }
                      ],
                      id:
                        "a63b6a73ce2746ef9daff0c2f2acebb620190423085902686528268416364689",
                      text: "对外投资"
                    },
                    {
                      children: [
                        {
                          id:
                            "074ec772ab7e422d8dfb8ac15cd7113020190428171632029997264837399981",
                          text: "中山公司"
                        },
                        {
                          id:
                            "67724e628a174b46b73b9380dc46421220191112100339784285041639247632",
                          text: "高新区分公司"
                        },
                        {
                          id:
                            "c6e81dced5a849a7b432915bb724e27e20190428171549180392810732168537",
                          text: "广州分公司"
                        }
                      ],
                      id:
                        "c35225cea3fe490a847ebb97a39ac10620190423085959097480669879963753",
                      text: "分支机构"
                    },
                    {
                      id:
                        "ed08312c871f46c1b6770430b6fa966720191112100138260806390819144225",
                      text: "质安委员会"
                    }
                  ],
                  id:
                    "a837c796f21b4b5aaf837c081faa010220190423083805717606088115414394",
                  text: "总裁办"
                }
              ],
              id:
                "90238445fac845bd8c7a205ec19aedc220190423083740992058527930160006",
              text: "董事办"
            }
          ],
          id:
            "9727bbb1835243109fe5f2fca39c2bbd20190423083711836443584064750926",
          text: "董事会"
        }
      ],
      // 设置项
      options: {
        // String,节点显示字段
        label: "text",
        // Boolean,是否显示添加子节点按钮
        addItem: true,
        // Boolean,是否显示选择框
        checkbox: false,
        // Array,初始化时选中id (v2.1以后不推荐使用，v3.0将废弃),替代方法见'#使用示例'章节
        checkedIds: [],
        // Boolean,选中时是否展开节点
        checkedOpen: true,
        // Boolean,目录是否加粗显示
        folderBold: true,
        // String,展开按钮(默认依赖font-awesome)
        openClass: "fa fa-plus-square text-info",
        // String,收缩按钮(默认依赖font-awesome)
        closeClass: "fa fa-minus-square text-danger",
        // String,添加节点按钮(默认依赖font-awesome)
        addClass: "fa fa-plus text-danger",
        // Boolean,是否显示编辑按钮
        showEdit: true,
        // Boolean,是否显示删除按钮
        showDelete: true,
        // String,编辑按钮(默认依赖font-awesome)
        editClass: "fa fa-edit",
        // String,删除按钮(默认依赖font-awesome)
        deleteClass: "fa fa-trash-o",
        // (v2.1新增) Boolean,获取复选项目是否包含目录,默认`true`,如果只获取叶子节点设置为`false`
        idsWithParent: false,
        // (v2.1新增) Number,初始化时展开层级,根节点为0,默认0
        depthOpen: 100
      }
    };
  },
  created() {},
  updated() {
    if (this.ext2Actions.length > 0 && this.ext2Text == "") {
      console.log("ext2actions:", this.ext2Actions);
      this.ext2Text = this.ext2Actions[0].name;
      this.ext2 = this.ext2Actions[0].subname;
    }
  },
  beforeMount() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.issuer = this.userInfo.chsname;
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    this.issuerdate = year + seperator1 + month + seperator1 + strDate;

    //获取用户信息
    this.getList();
    //获取机构信息
    this.geOrgTree();
  },
  mounted() {
    console.log("机构信息org：", this.treeData);
  },
  beforeDestroy() {},
  methods: {
    prev() {
      this.$router.go(-1); // 返回上一层
    },
    someActions(item) {
      console.log("handle", item);
      this.ext1Text = item.text;
      this.ext1 = item.id;
      this.popshow = false;
    },
    getUserInfo() {
      if (this.ext2Actions.length != 0) {
        this.ext2Text = this.List[this.ext2Actions].chsname;
        this.ext2 = this.List[this.ext2Actions].id;
        this.ext2ActionsShow = false;
      } else {
        this.$toast("请至少选中一位用户信息");
      }
    },
    treepop() {
      this.popshow = false;
      console.log("选中的树形集合：", this.checkedIds);
    },
    onInput(checked) {
      //切换选中的用户
      this.executiontype = checked;
      if (checked == "org") {
        this.ext1Show = true;
        this.ext2Show = false;
      } else {
        this.ext1Show = false;
        this.ext2Show = true;
      }
    },
    infotypeShows() {
      this.infotypeShow = true;
    },
    orgShows() {
      this.popshow = true;
    },
    onSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.infotypeShow = false;
      this.infotypeText = item.name;
      this.infotype = this.actionss[item.name];
    },
    onSelectExt2(item) {
      console.log("item:", item);
      this.ext2ActionsShow = false;
      this.ext2Text = item.name;
      this.ext2 = item.subname;
    },
    formSave() {
      if (!this.title) {
        Notify({ type: "primary", message: "请输入标题!" });
        return;
      }
      if (!this.infocontent) {
        Notify({ type: "primary", message: "请输入内容!" });
        return;
      }
      const toast = Toast.loading({
        mask: true,
        message: "发布中...",
        duration: 0
      });
      var url = this.GLOBA.serverSrc + "infoissue/formSave";
      let param = new URLSearchParams();
       ;
      param.append("title", this.title);
      param.append("infotype", this.infotype);
      param.append("issuer", this.issuer);
      param.append("issuerdate", this.issuerdate);
      param.append("executiontype", this.executiontype);
      if (this.executiontype == "org") {
        param.append("ext1", this.ext1);
      } else {
        param.append("ext2", this.ext2);
      }
      param.append("infocontent", this.infocontent);
      console.log(param.toString());
      this.$http
        .post(url, param)
        .then(response => {
          toast.clear();
          console.log("发布：", response);
          if (response.data != null) {
            if (response.data.status) {
              Toast.success("发布成功");
              this.title = "";
              this.infocontent = "";
            } else {
              Toast.fail("发布失败");
            }
          } else {
            Toast.fail("发布失败");
          }
        })
        .catch(error => {
          toast.clear();
          if (error.message.indexOf("timeout") != -1) {
            Toast.fail("请求超时!请更换网络!");
          } else {
            Toast.fail("连接异常!");
          }
        });
    },
    getList() {
      const toast = Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0
      });
      //获取用户信息
      var url = this.GLOBA.serverSrc + "userinfo/rosterListLoad";
      let param = new URLSearchParams();
      this.$http
        .post(url, param)
        .then(response => {
          toast.clear();
          console.log("用户信息：", response);
          if (response.data != null && response.data.total > 0) {
            this.List = response.data.rows;
            if (this.List.length > 15) {
              this.msg = "没有更多";
            } else {
              this.msg = "";
            }
          } else {
            this.List = [];
            this.msg = "暂无日志";
          }
        })
        .catch(error => {
          toast.clear();
          if (error.message.indexOf("timeout") != -1) {
            Notify({ type: "warning", message: "请求超时!请更换网络!" });
          } else {
            Notify({ type: "danger", message: "连接异常!" });
          }
        });
    },
    geOrgTree() {
      var url = this.GLOBA.serverSrc + "org/tree";
      let param = new URLSearchParams();
      param.append("pid", this.userInfo.ownerprojectid);
       ;
      this.$http
        .post(url, param)
        .then(response => {
          console.log("机构信息：", response);
        })
        .catch(error => {
          if (error.message.indexOf("timeout") != -1) {
            Toast.fail("请求超时!请更换网络!");
          } else {
            Toast.fail("连接异常!");
          }
        });
    }
  }
};
</script>
<style scoped lang="less">
.page {
  height: 100%;
  width: 100%;
  background-color: #f5f6f7;
  margin-top: 56px;
  .home-head {
  }
  .van-icons {
    margin-right: 20px;
    position: absolute;
    top: 19px;
    left: 10px;
    font-size: 18px;
  }
  .sub {
    margin-right: 20px;
    position: absolute;
    right: 10px;
  }
  .van-cell-group {
    background-color: #f5f6f7;
  }
  .popuphead {
    width: 100%;
    line-height: 40px;
    font-size: 14px;
    background-color: #fff;
    display: flex;
    position: fixed;
    z-index: 100;
    justify-content: space-between;
    :nth-child(1) {
      color: #323233;
      margin-left: 15px;
    }
    :nth-child(2) {
      color: #1989fa;
      margin-right: 15px;
    }
  }
  .popupbody {
    margin-top: 40px;
  }
}
</style>
