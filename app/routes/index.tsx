import { Link } from "@remix-run/react";
import mic from "~/images/mic.jpg";

import { useOptionalUser } from "~/utils";

export default function Index() {
  // useOptionalUser will allow auth and no auth users to read our / index page.
  // we can use useOptionalUser to render a link on the screen that directs the user to a desired route i.e. /sessions
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src={mic}
                alt="50's style microphone with a blurry background of lights"
              />
              {/* css overlay using mix-blend-mode // similar to photoshop image adjustment */}
              <div className="absolute inset-0 bg-[color:rgba(27,167,254,0.5)] mix-blend-multiply" />
            </div>

            {/* styles go from mobile (default) -> large breakpoints */}
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-7xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-blue-200 drop-shadow-md">
                  AMA Stack
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                {user ? (
                  <span>Head over to the sessions.</span>
                ) : (
                  <span>
                    Log in to view sessions
                  </span>
                )}
              </p>

              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/sessions"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                  >
                    {/* this isn't good logic beacuse first names can contain several spaces -- for testing this will do */}
                    Hello, {user.name.split(" ")[0]}. View sessions.
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
