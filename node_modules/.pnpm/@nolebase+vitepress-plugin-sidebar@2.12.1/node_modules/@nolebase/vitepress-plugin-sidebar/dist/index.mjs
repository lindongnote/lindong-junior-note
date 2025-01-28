import { cwd } from 'node:process';
import { globSync } from 'tinyglobby';

function listPages(options) {
  const { targets = [], ignore = [] } = options;
  const files = globSync(`**/*.md`, {
    cwd: cwd(),
    ignore: [
      "_*",
      "dist",
      "node_modules",
      ...ignore
    ],
    onlyFiles: true
  });
  files.sort();
  return files.filter((file) => {
    return targets.some((target) => file.startsWith(folderNameFromTargetConfig(target)));
  });
}
function folderNameFromTargetConfig(target) {
  return typeof target === "string" ? target : target.folderName;
}
function separateFromTargetConfig(target) {
  return typeof target === "string" ? false : target.separate;
}
function addRouteItem(indexes, path, base) {
  const suffixIndex = path.lastIndexOf(".");
  const nameStartsAt = path.lastIndexOf("/") + 1;
  const title = path.slice(nameStartsAt, suffixIndex);
  const item = {
    index: title,
    text: title,
    link: `/${path.slice(0, suffixIndex)}`
  };
  let linkItems = item.link.split("/");
  linkItems = linkItems.slice(1);
  if (linkItems.length === 1)
    return;
  if (base) {
    const baseItems = base.split("/").filter(Boolean);
    linkItems = linkItems.slice(baseItems.length);
  }
  indexes = addRouteItemRecursion(indexes, item, linkItems);
}
function addRouteItemRecursion(indexes, item, path, upgradeIndex = false) {
  if (path.length === 1) {
    indexes.push(item);
    return indexes;
  } else {
    const onePath = path.shift();
    if (!onePath)
      return indexes;
    let obj = indexes.find((obj2) => obj2.index === onePath);
    if (!obj) {
      obj = { index: onePath, text: onePath, collapsed: true, items: [] };
      indexes.push(obj);
    } else if (!obj.items) {
      obj.collapsed = true;
      obj.items = [];
    }
    if (path.length === 1 && path[0] === "index") {
      obj.link = item.link;
    } else {
      obj.items = addRouteItemRecursion(obj.items ?? [], item, path, upgradeIndex);
    }
    return indexes;
  }
}
function processSidebar(docs, base) {
  const sidebar = [];
  docs.map(async (docPath) => {
    addRouteItem(sidebar, docPath, base);
  });
  return sidebar;
}
function articleTreeSort(articleTree) {
  articleTree.sort((itemA, itemB) => {
    return itemA.text.localeCompare(itemB.text);
  });
  return articleTree;
}
function sidebarSort(sidebar, folderTop = true) {
  let _sideBar;
  if (folderTop) {
    const files = articleTreeSort(sidebar.filter((item) => {
      return !item.items || item.items.length === 0;
    }));
    const folders = articleTreeSort(sidebar.filter((item) => {
      return item.items && item.items.length > 0;
    }));
    _sideBar = [...folders, ...files];
  } else {
    _sideBar = articleTreeSort(sidebar);
  }
  for (const articleTree of _sideBar) {
    if (articleTree.items && articleTree.items.length > 0)
      articleTree.items = sidebarSort(articleTree.items, folderTop);
  }
  return _sideBar;
}
function mergeSidebar(targets, docs, base) {
  let sidebar = processSidebar(docs, base);
  sidebar = sidebarSort(sidebar, true);
  if (sidebar.length === 1 && targets.some((item) => {
    const folderName = folderNameFromTargetConfig(item);
    return base ? folderName.endsWith(sidebar[0].text) : folderName === sidebar[0].text;
  })) {
    return sidebar[0].items ?? [];
  }
  const basePrefix = base ? `/${base}` : "";
  const sidebarMultiple = { [`${basePrefix}/`]: sidebar };
  for (const target of targets) {
    const folderName = folderNameFromTargetConfig(target);
    if (separateFromTargetConfig(target)) {
      const targetName = base ? folderName.split("/").pop() : folderName;
      const matchedSidebarFolders = sidebar.filter((item) => item.text === targetName);
      if (matchedSidebarFolders.length > 0) {
        sidebarMultiple[`${basePrefix}/${targetName}/`] = matchedSidebarFolders[0]?.items || [];
        sidebar.splice(sidebar.findIndex((item) => item.text === targetName), 1);
      } else {
        sidebarMultiple[`${basePrefix}/${targetName}/`] = [];
      }
    }
  }
  return sidebarMultiple;
}
function calculateSidebar(targets = ["\u7B14\u8BB0"], base) {
  const docs = listPages({ targets });
  return mergeSidebar(targets, docs, base);
}

export { calculateSidebar };
