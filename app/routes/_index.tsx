import { Link, json, useLoaderData } from "@remix-run/react";
import { Badge } from "components/ui/badge";
import { buttonVariants } from "components/ui/button";
import { retrieveNotionPages } from "data";

export const loader = async () => {
  const pages = await retrieveNotionPages();
  return json({ pages });
};
export default function Index() {
  const { pages } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col">
      {pages.map(({ id, properties: { Name, Flag, Tags } }) => (
        <div key={id}>
          <Link
            className={buttonVariants({
              variant: "link",
            })}
            to={`/page/${id}`}
          >
            {Name.title[0].text.content}
          </Link>
          <p>
            Status: <code>{Flag.status.name}</code>
          </p>
          {Tags.multi_select.length ? (
            <div className="my-4">
              Tags:{" "}
              {Tags.multi_select.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  style={{
                    borderColor: tag.color,
                  }}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
