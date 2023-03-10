import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
// from modals, not utils
import { getSession } from "~/models/session.server";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.sessionId, "sessionId not found");

  const session = await getSession(params.sessionId);
  if (!session) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ session });
}

export default function SessionDetailsPage() {
  const { session } = useLoaderData<typeof loader>();

  return (
    <div>
      <div>{session.content}</div>
    </div>
  );
}
