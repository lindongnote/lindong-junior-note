import AutoNav from "vite-plugin-vitepress-auto-nav";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';

// 获取一级标题的函数
function extractH1(markdownContent) {
  const ast = unified()
    .use(remarkParse)
    .parse(markdownContent);

  const h1Headings = [];
  let inH1 = false;
  let currentText = '';

  // 递归遍历 AST
  function walk(node) {
    if (node.type === 'heading' && node.depth === 1) {
      inH1 = true;
      if (node.children) {
        node.children.forEach(child => collectText(child));
      }
      h1Headings.push(currentText.trim());
      currentText = '';
      inH1 = false;
    }
    if (node.children) {
      node.children.forEach(child => walk(child));
    }
  }

  // 收集文本内容
  function collectText(node) {
    if (node.type === 'text') {
      currentText += node.value;
    } else if (node.children) {
      node.children.forEach(child => collectText(child));
    }
  }

  walk(ast);
  return h1Headings;
}

// 根据文件路径获取标题
function getTitleFromMd(filePath: string): string {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(fileContent);
    const h1Titles = extractH1(parsed.content);
    return parsed.data.title || (h1Titles.length ? h1Titles[0] : path.basename(filePath, '.md'));
  }
  return path.basename(filePath, '.md');
}

function scanDirAndGetTitles(baseDir: string, currentPath: string, itemsSetting: any) {
  const fullPath = path.join(baseDir, currentPath);
  const items = fs.readdirSync(fullPath);

  for (const item of items) {
    const itemPath = path.join(fullPath, item);
    const relativePath = path.join(currentPath, item);

    if (fs.lstatSync(itemPath).isDirectory()) {
      scanDirAndGetTitles(baseDir, relativePath, itemsSetting);
    } else if (item.endsWith('.md')) {
      let fileContent;
      let parsed;
      try {
          fileContent = fs.readFileSync(itemPath, 'utf-8'); // 读取文件内容
          parsed = matter(fileContent); // 解析文件内容
      } catch (error) {
          console.error(`无法读取或解析文件 ${itemPath}: ${error.message}`);
          return; // 继续下一个文件
      }
      const h1Titles = Array.isArray(extractH1(parsed.content)) ? extractH1(parsed.content) : []; // 提取H1标题并确保为数组
      const title = (item === 'index.md') ? (parsed.data.DirTitle || parsed.data.title) : (parsed.data.title || (h1Titles.length ? h1Titles[0] : path.basename(filePath, '.md')));
      if (item === 'index.md') {
        itemsSetting[currentPath.replace(/\\/g, '/')] = { title: title };
      } else {
        itemsSetting[relativePath.replace(/\\/g, '/')] = { title: title };
      }
    }
  }
}

function createNavSettings(rootDir: string) {
  const itemsSetting: any = {};
  scanDirAndGetTitles(rootDir, '', itemsSetting);
  return itemsSetting;
}

// 手动添加的导航项
const manualSettings = {};

const itemsSetting = createNavSettings(path.join(__dirname, '..', 'docs'));

export default AutoNav({
  itemsSetting: { ...itemsSetting, ...manualSettings }
});

// 在开发模式下动态更新导航
if (process.env.NODE_ENV === 'development') {
  const itemsSetting = createNavSettings(path.join(__dirname, '..', 'docs'));
  AutoNav({
    itemsSetting: itemsSetting
  });
}