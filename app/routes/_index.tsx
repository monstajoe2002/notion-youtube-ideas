import { Link, json, useLoaderData } from "@remix-run/react";
import { buttonVariants } from "components/ui/button";
import { retrieveNotionPages } from "data";

export const loader = async () => {
  const pages = await retrieveNotionPages();
  return json({ pages });
};
export default function Index() {
  const { pages } = useLoaderData<typeof loader>();
  return (
    <div>
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
          <p>
            {Tags.multi_select.map((tag) => (
              <span key={tag.id}>{tag.name}, </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
