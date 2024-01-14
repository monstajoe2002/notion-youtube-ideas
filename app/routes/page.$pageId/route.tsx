import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Checkbox } from "components/ui/checkbox";
import { Label } from "components/ui/label";
import { retrieveNotionBlocksByPageId, retrieveNotionPageById } from "data";
import invariant from "tiny-invariant";

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.pageId, "Page ID is required");
  const blocks = await retrieveNotionBlocksByPageId(params.pageId);
  const pageInfo = await retrieveNotionPageById(params.pageId);
  return json({ blocks, pageInfo });
}

export default function Page() {
  const { blocks, pageInfo } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl my-6">
        {pageInfo.properties.Name.title[0].text.content}
      </h1>
      {blocks.map((block) => (
        <div key={block.id}>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {block.heading_1?.rich_text[0]?.plain_text}
          </h1>
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">
            {block.heading_2?.rich_text[0]?.plain_text}
          </h2>
          <p>{block.paragraph?.rich_text[0]?.plain_text}</p>
          <ul className="list-disc [&>li]:mt-2 my-6 ml-6">
            {block.bulleted_list_item?.rich_text.map((item, i) => (
              <li key={i}>{item.plain_text}</li>
            ))}
          </ul>
          {/* TODO: fix list numbering issue */}
          <ol className="list-decimal list-inside">
            {block.numbered_list_item?.rich_text.map((item, i) => (
              <li key={i}>{item.plain_text}</li>
            ))}
          </ol>

          {block.to_do?.rich_text.map((task, i) => (
            <div key={i} className="flex items-center my-2">
              <Checkbox defaultChecked={block.to_do?.checked} id={`${i}`} />
              <Label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                htmlFor={`${i}`}
              >
                {task.text.content}
              </Label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
