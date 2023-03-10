import { Form, Link, NavLink, useLoaderData, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { getAllSessions } from "~/models/session.server";
import { useOptionalUser } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const sessions = await getAllSessions();

  if (!sessions) {
    throw new Response("No sessions found", { status: 404 });
  }

  return json({ sessions });
}

export default function SessionsPage() {
  const { sessions } = useLoaderData<typeof loader>();
  const user = useOptionalUser();

  return (
    <div>
      {/* this is an interesting layout, this acts as a navbar of sorts */}
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Sessions</Link>
        </h1>
        {user && <p>{user.email}</p>}
        {user && (
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Logout
            </button>
          </Form>
        )}
      </header>

      {/* this acts a container for the children of /sessions, such as the children jsx (list of sessions) and children routes rendered with <Outlet /> */}
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          {/* route to new to add new session if user is logged in i believe */}
          <Link to="." className="block p-4 text-xl text-blue-500">
            + New session (not functioning)
          </Link>

          <hr />

          {sessions.length === 0 ? (
            <p className="p-4">No sessions found</p>
          ) : (
            <ol>
              {sessions.map((session) => (
                <li key={session.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={session.id}
                  >
                    📝 {session.content}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
