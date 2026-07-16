export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Profile Page</h1>
      <hr />
      <p className="text-lg">This is the user profile page</p>
      <span className="text-lg">User ID: {id}</span>
    </div>
  );
}
