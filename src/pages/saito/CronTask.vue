<template>
  <div>
    <n-h1 prefix="bar" style="font-weight: 400; font-size: 32px">
      计划任务
      <span style="font-weight: 200; font-size: 16px">(Cron Task)</span>
      <n-popover trigger="click">
        <template #trigger>
          <n-button text style="font-size: 26px">
            <n-icon>
              <HelpIcon />
            </n-icon>
          </n-button>
        </template>
        <p>上传你开发的计划并暴露给系统</p>
      </n-popover>
    </n-h1>
  </div>
  <n-divider />
  <n-card title="计划列表">
    <div>
      <n-button
        ghost
        type="primary"
        size="large"
        style="margin: 0 10px 10px 0; width: 80px"
        @click="showModal = true"
        >新增</n-button
      >
      <n-button type="error" size="large" style="margin: 0 10px 10px 0; width: 80px"
        >删除</n-button
      >
      <n-button
        type="info"
        size="large"
        style="margin: 0 10px 10px 0; width: 120px"
        @click="reloadAll()"
        >重载计划</n-button
      >
    </div>
    <n-data-table
      :columns="columns"
      :scroll-x="1080"
      :data="dataList"
      :pagination="pagination"
      :row-key="(row) => row.task_id"
      @update:checked-row-keys="handleCheck"
    />
  </n-card>
  <n-modal v-model:show="showModal">
    <n-card style="width: 1100px" title="新增计划" :bordered="false" size="huge">
      <PluginCard type="save" :data="empty" width="width: 1000px" />
    </n-card>
  </n-modal>
</template>

<script>
import { defineComponent, reactive, h, ref } from "vue";
import { NButton, useMessage, useDialog } from "naive-ui";
import PluginCard from "../../components/PluginCard.vue";
import axios from "../../utils/request";
import {
  AlertCircleOutline as AlertIcon,
  HelpCircleOutline as HelpIcon,
} from "@vicons/ionicons5";

const creatColumns = ({ popMessage }) => {
  return [
    {
      type: "selection",
    },
    {
      type: "expand",
      renderExpand: (rowData) => {
        return h(PluginCard, {
          data: rowData,
          type: "edit",
          hoverable: true,
        });
      },
    },
    {
      title: "计划名称",
      key: "task_name",
      width: 200,
      ellipsis: true,
    },
    {
      title: "表达式",
      key: "cron",
      width: 250,
      ellipsis: true,
    },
    {
      title: "功能",
      key: "url",
      width: 200,
      ellipsis: true,
    },
    {
      title: "类型",
      key: "type",
      width: 50,
      ellipsis: true,
    },
    {
      title: "目标",
      key: "target",
      width: 200,
    },
    {
      title: "状态",
      key: "is_enabled",
      render(row) {
        return h(
          NButton,
          {
            circle: true,
            style: "margin: 0; width: 80px",
            type: row.is_enabled == 1 ? "primary" : "error",
            ghost: row.is_enabled == 1 ? true : false,
            onClick() {
              axios.delete("cron-task/" + row.task_id, row).then((result) => {
                let msg = result.data.msg;
                //let code = result.data.code
                row.is_enabled = -row.is_enabled;
                popMessage(msg, row.is_enabled);
              });
            },
          },
          {
            default: () => (row.is_enabled == 1 ? "良好" : "禁用"),
          }
        );
      },
      width: 100,
    },
    {
      title: "操作",
      render(row) {
        return h(
          NButton,
          {
            circle: true,
            style: "margin: 0; width: 80px",
            type: "info",
            ghost: true,
            disabled: row.is_enabled == 1 ? false : true,
            onClick() {
              axios.get("cron-task/reload/" + row.task_id).then((result) => {
                let msg = result.data.msg;
                popMessage(msg, result.data.code);
              });
            },
          },
          {
            default: () => "重载",
          }
        );
      },
      width: 150,
    },
  ];
};

export default defineComponent({
  setup() {
    const dialog = useDialog();
    const checkedRowKeysRef = ref([]);
    const message = useMessage();
    const paginationReactive = reactive({
      page: 1,
      pageSize: 15,
      showSizePicker: true,
      pageSizes: [10, 15, 25],
      onChange: (page) => {
        paginationReactive.page = page;
      },
      onPageSizeChange: (pageSize) => {
        paginationReactive.pageSize = pageSize;
        paginationReactive.page = 1;
      },
    });
    return {
      message,
      dialog,
      showModal: ref(false),
      pagination: paginationReactive,
      columns: creatColumns({
        popMessage(msg, type) {
          if (type == 1 || type == 200) {
            message.success(msg);
          } else {
            message.warning(msg);
          }
        },
      }),
      checkedRowKeys: checkedRowKeysRef,
      handleCheck(rowKeys) {
        checkedRowKeysRef.value = rowKeys;
      },
    };
  },
  data() {
    return {
      dataList: [],
      empty: [],
    };
  },
  mounted() {
    this.$axios.get("cron-task/findAll").then((result) => {
      this.dataList = result.data.datas;
    });
  },
  components: {
    AlertIcon,
    HelpIcon,
    PluginCard,
  },
  methods: {
    reloadAll() {
      this.dialog.warning({
        title: "警告",
        content: "确认重载所有计划吗？",
        positiveText: "是的",
        negativeText: "不确定",
        onPositiveClick: () => {
          this.$axios.get("plugin-info/loadPlugins").then((result) => {
            if (result.data.code == 200) this.message.success(result.data.msg);
            else this.message.error(result.data.msg);
          });
        },
      });
    },
  },
});
</script>

<style></style>
