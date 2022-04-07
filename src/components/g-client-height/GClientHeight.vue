<template>
  <div class="g-scrollbox" :class="{'f-focusState':hasCss}" style="overflow-y: auto;">   
      <slot></slot>
  </div>     

</template>
<script type="text/ecmascript-6">
  export default {
    components:{},
    props: {    
      
    },
    data(){
      return {   
        hasCss:false,
        clientHeight:null
      }
    },
    mounted() {     
      
    },
    watch:{
      clientHeight(val){
          console.log(val);
          // console.log(localStorage.getItem("clientheight"));
          let bodyHeight = localStorage.getItem("clientheight")
          if(bodyHeight>val+200){
            console.log(9999999999);
            this.hasCss = true
            // document.getElementById("box").classList.add("f-focusState");
            // this.$refs.textinp.scrollIntoViewIfNeeded(true)
          }else{
            this.hasCss = false
            // document.getElementById("box").classList.remove("f-focusState");
            // this.$refs.textinp.scrollIntoViewIfNeeded(true)
          }
      }
    },
    methods: {

    },
    mounted () {
        let self = this;
        console.log(localStorage.getItem("clientheight"));
        window.onresize = function() {
            //开启实时修改页面高度值
            return (function() {
                self.clientHeight = document.body.clientHeight;
            })();
        };
    }
   
  }
</script>
<style lang="less" scoped>

</style>
