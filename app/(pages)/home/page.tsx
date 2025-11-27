import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {" "}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Signin with GitHub</button>
      </form>
      {JSON.stringify(session)}
    </div>
  );
}
