import worldbuilding_tools from '../data/worldbuilding.json';
import writing_tools from '../data/writing.json';
import revising_tools from '../data/revising.json';
import publishing_tools from '../data/publishing.json';

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const categories = [
  { key: 'worldbuilding', title: 'Worldbuilding', sections: worldbuilding_tools },
  { key: 'writing',       title: 'Writing',       sections: writing_tools },
  { key: 'revising',      title: 'Revision',      sections: revising_tools },
  { key: 'publishing',    title: 'Publishing',     sections: publishing_tools },
];

// Build a flat index of all tools with metadata
const toolIndex = {};
const allTools = [];

categories.forEach((category) => {
  category.sections.forEach((section) => {
    section.tools.forEach((tool) => {
      if (!tool.title || tool.title === '') return;

      const slug = generateSlug(tool.title);
      const enrichedTool = {
        ...tool,
        slug,
        categoryKey: category.key,
        categoryTitle: category.title,
        sectionName: section.section,
      };

      toolIndex[slug] = enrichedTool;
      allTools.push(enrichedTool);
    });
  });
});

// Get all sections as a flat array with category info
const allSections = [];
categories.forEach((category) => {
  category.sections.forEach((section) => {
    const sectionSlug = generateSlug(section.section);
    const tools = section.tools
      .filter((t) => t.title && t.title !== '')
      .map((t) => ({
        ...t,
        slug: generateSlug(t.title),
        categoryKey: category.key,
        categoryTitle: category.title,
        sectionName: section.section,
      }));

    allSections.push({
      slug: sectionSlug,
      name: section.section,
      categoryKey: category.key,
      categoryTitle: category.title,
      tools,
    });
  });
});

export function getToolBySlug(slug) {
  return toolIndex[slug] || null;
}

export function getAllTools() {
  return allTools;
}

export function getRelatedTools(tool, limit = 6) {
  return allTools
    .filter((t) => t.sectionName === tool.sectionName && t.slug !== tool.slug)
    .slice(0, limit);
}

export function getToolsInCategory(categoryKey) {
  return allTools.filter((t) => t.categoryKey === categoryKey);
}

export function getAllSections() {
  return allSections;
}

export function getSectionBySlug(slug) {
  return allSections.find((s) => s.slug === slug) || null;
}

export function getCategories() {
  return categories;
}

export function getComparableTools(slug1, slug2) {
  return [toolIndex[slug1] || null, toolIndex[slug2] || null];
}

export { generateSlug };
