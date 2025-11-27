export function LogIn() {
  return (
    <div className="p-6 bg-white rounded shadow-md w-[50%] flex flex-col gap-6">
      <h1 className="text-2xl font-semibold mb-4">Log In </h1>
      <input
        type="text"
        placeholder="Username"
        className="px-4 py-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-gray-300 rounded">
        Log In
      </button>
    </div>
  );
}
