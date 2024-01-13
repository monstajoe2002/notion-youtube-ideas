import { cssBundleHref } from "@remix-run/css-bundle";

import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import styles from "./globals.css";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];
export const meta: MetaFunction = () => {
  return [
    { title: "Youtube Ideas" },
    {
      name: "description",
      content: "Remix App that uses Notion as a database to manage pages",
    },
  ];
};
export default function App() {
  const { state } = useNavigation();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main
          className={`flex justify-center h-screen w-screen bg-primary text-primary-foreground transition-opacity ${
            state === "loading" ? "opacity-70" : ""
          }`}
        >
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
