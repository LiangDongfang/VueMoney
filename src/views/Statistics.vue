<template>
  <Layout>
    <Tab class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <!-- <Tab class-prefix="interval" :data-source="intervalList" :value.sync="interval" /> -->
    <ol v-if="groupList.length>0">
      <li v-for="(group,index) in groupList" :key="index">
        <h3 class="title">
          <span>{{beautify(group.title)}}</span>
          <span>￥{{group.total}}</span>
        </h3>
        <ol>
          <li v-for="item in group.item" :key="item.id" class="record">
            <span class="tag">{{tgaString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">没有相关记录</div>
  </Layout>
</template>

<script lang='ts'>
import Tab from "@/components/Tab.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import intervalList from "@/constants/intervalList.ts";
import recordTypeList from "@/constants/recordTypeList.ts";
import dayjs from "dayjs";
import clone from "@/lib/clone.ts";

@Component({
  components: { Tab }
})
export default class Statistics extends Vue {
  tgaString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map(item => item.name).join(",");
  }
  beautify(data: string) {
    const now = dayjs();
    const day = dayjs(data);
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  get recordList() {
    return (this.$store.state as rootState).recordList;
  }
  get groupList() {
    const { recordList } = this;
    const newList = clone(recordList)
      .filter(item => item.type === this.type)
      .sort(
        (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }

    type Result = {
      title: string;
      total?: number;
      item: RecordItem[];
    }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createAt).format("YYYY-MM-DD"),
        item: [newList[0]]
      }
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(current.createAt).isSame(dayjs(last.title), "day")) {
        last.item.push(current);
      } else {
        result.push({
          title: dayjs(current.createAt).format("YYYY-MM-DD"),
          item: [current]
        });
      }
    }
    result.map(group => {
      group.total = group.item.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: #ffffff;
    &.selected {
      background: #c4c4c4;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
}
.record {
  background: #ffffff;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #c4c4c4;
}
.noResult {
  text-align: center;
  color: #c4c4c4;
  padding: 50px;
}
</style>