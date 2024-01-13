import { Client } from "@notionhq/client";
import { Block, Page } from "lib/types";

const notion = new Client({
  auth: process.env.NOTION_INTEGRATION_SECRET,
});
const retrieveNotionDatabase = async () => {
  const db = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE!,
    sorts: [{ property: "Created", direction: "ascending" }],
  });
  return db;
};
export const retrieveNotionPages = async () => {
  const notionDb = await retrieveNotionDatabase();
  const pages = notionDb.results as unknown as Page[];
  return pages;
};

export const retrieveNotionPageById = async (pageId: string) => {
  const page = await notion.pages.retrieve({ page_id: pageId });
  return page as unknown as Page;
};

export const retrieveNotionBlocksByPageId = async (pageId: string) => {
  const blocks = await notion.blocks.children.list({ block_id: pageId });
  const res = blocks.results as unknown as Block[];
  return res;
};
export const editNotionPage = async (pageId: string, props: Partial<Block>) => {
  const res = await notion.blocks.update({
    block_id: pageId,
    ...props,
  });
  return res;
};
