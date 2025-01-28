import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme as ThemeConfig } from 'vitepress'
import { 
  NolebaseEnhancedReadabilitiesMenu, 
  NolebaseEnhancedReadabilitiesScreenMenu, 
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import ArticleMetadata from "./components/ArticleMetadata.vue"
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import './styles/vars.css'
import './styles/main.css'
import './styles/blur.css';
import { 
    NolebaseGitChangelogPlugin 
  } from '@nolebase/vitepress-plugin-git-changelog/client'
  
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
  
import update from "./components/update.vue"
import {  
    NolebaseHighlightTargetedHeading,  
  } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
export const Theme: ThemeConfig = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 为较宽的屏幕的导航栏添加阅读增强菜单
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu), 
      // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu), 
      'layout-top': () => [ 
        h(NolebaseHighlightTargetedHeading), 
      ], 
    })
  },
  enhanceApp({app}) {
    // 其他的配置...
    app.use(NolebaseGitChangelogPlugin),
    app.component('update' , update),
    app.component('ArticleMetadata' , ArticleMetadata)
  
  },
}

export default Theme
