<template>
  <div @click="autoMove" :style="bgColor()" >
    <span :class="blockClass()">
      <i v-if="blockClass()[2]=='Chest'" class="fa fa-cube fa-lg"></i>
      <i v-else-if="blockClass()[2]=='MapDialog'" class="fa fa-question fa-lg"></i>
      <i v-else-if="blockClass()[1]=='hero'" class="fa fa-blind fa-lg"></i>
    </span>
  </div>
</template>

<script>
  import CONSTANT from '../data/constant';
  export default {
    props :[
      'block',
      'map'
    ],
    methods : {
      autoMove(){
        this.$emit('autoMove');
      },
      bgColor() {
        // indexOf("Apple")
        let gray = "#c3944e", black = "#51963d",
            opt = { 
              display: 'inline-block',
              background: black,
            },
            type = this.block.block_type,
            bt = CONSTANT.MAP_BLOCK_TYPE;
        if(type != bt.ROAD || type == bt.HERO || this.block.event){
          opt.background = gray;
        }
        return opt;
      },
      blockClass() {
        let block = this.block;
        let typeList = ['road', 'hero', 'stick', 'end'];
        let classList = ['map-block'];
        let stick = CONSTANT.MAP_BLOCK_TYPE.STICK;

        classList.push(typeList[Number(block.block_type)] || '');

        block.event && classList.push(block.event.event_type);

        // 计算圆角;
        // r-1 r-2 r-3 r-4
        let data = this.map.$data.mapData;
        let {x, y, block_type:type } = block;
        let relativePosition = [[-1,-1],[-1,1],[1,-1],[1,1]];
        for(let i=0; i<4; i++){
          let around = _.map(new Array(3), (v,k) => {
            let [up_x,up_y] = relativePosition[i];
            let [_x,_y] = [ [x + up_x, y], [x, y + up_y], [x + up_x,y + up_y] ][k];
            if(data[_x] && data[_x][_y]){
              return data[_x][_y].block_type;
            }else{
              return stick;
            }
          });
          if(type == stick){
            _.every(around, i => i != stick) && classList.push(`r-${i+1}`);
          }else{
            _.every(around.slice(0,2), i => i == stick) && classList.push(`r-${i+1}`);
          }
        }
        return classList;
      }
    }
  }
</script>

<style scoped lang="less">

  .map-block {
    display: inline-block;
    width: 40px;
    height: 40px;
    vertical-align: top;
  }

  .road:hover {
    box-shadow: 0px 0px 4px #ffffff inset;
    cursor: pointer;
  }

  .MapDialog, .Chest, .hero {
    border-radius: 4px;
  }

  .stick {
    background-color: #51963d;
  }

  .road {
    background-color: #c3944e;
  }

  .Chest {
    // background: url('../assets/fight.png') no-repeat;
    // background-size: 100%;
    background-color: #6e4633;
  }

  .MapDialog {
    background: #539ad8;
  }
  
  .hero {
    background: #886bfa;
  }

  .MapDialog .fa {
    padding: 13px;
    color: white;
  }

  .Chest .fa {
    padding: 13px 9px 10px 10px;
    color: white;
  }

  .hero .fa {
    padding: 13px 8px 11px 14px;
    color: white;
  }

  .r-1 {
    border-top-left-radius: 6px;
  }
  .r-2 {
    border-top-right-radius: 6px;
  }
  .r-3 {
    border-bottom-left-radius: 6px;
  }
  .r-4 {
    border-bottom-right-radius: 6px;
  }
</style>