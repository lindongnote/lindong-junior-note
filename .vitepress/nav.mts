import AutoNav from "vite-plugin-vitepress-auto-nav";

export default AutoNav({
    itemsSetting: {
      chinese: {
        title: "语文"
      },
      start:{
        title:"开始"
      },
      contribute:{
        title:"贡献"
      },
      other:{
        title:"其他"
      },
      "chinese/other":{
        title:"更多"
      }
    }
  })