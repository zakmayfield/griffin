import { Link } from "@remix-run/react";

export default function SessionIndexPage() {
  return (
    <p>
      No session selected. {" "}
      <Link to="." className="text-blue-500 underline">
        create a new session (wip)
      </Link>
    </p>
  );
}
