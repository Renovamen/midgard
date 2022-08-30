import * as _ from "lodash";
import CreateDungeon from "@/js/create-dungeon";
import getStatic from "@/js/get-static";
import CONSTANT from "@/data/constant";
import { MapType, BlockType } from "@/types";

const blockTypes = CONSTANT.MAP_BLOCK_TYPES;

class InitMap {
  $opt: MapType;
  $data: CreateDungeon;
  hero: BlockType;

  constructor(o: MapType) {
    const opt = _.cloneDeep(o);
    this.$opt = opt;

    this.$data = opt.mapData || new CreateDungeon(opt.mapInitOption || {});

    this.hero = (() => {
      const hero = this.getBlankRandomBlock(1)[0];
      hero.blockType = blockTypes["HERO"];
      return hero;
    })();

    for (const id of (opt.chestList || []).concat(opt.eventList || [])) {
      const event = getStatic(id);
      if (!id) {
        console.warn("No Such Map Event Object:", id, opt);
        continue;
      }

      for (const block of this.getBlankRandomBlock(opt.rule[String(id)])) {
        block.event = {
          event_type: event.type || event.$type || "unknown",
          event
        };
      }
    }
  }

  getBlankRandomBlock = (size?: number): any => {
    return _.sampleSize(
      _.filter(_.flattenDeep(this.$data.mapData), (item: any) => {
        if (item.blockType != blockTypes["ROAD"] || item.event) {
          return false;
        }
        return true;
      }),
      size
    );
  };
}

export default InitMap;