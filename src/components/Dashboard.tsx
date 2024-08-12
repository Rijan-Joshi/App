import UploadButton from "./UploadButton";

const Dashboard = () => {
  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="flex pb-5 justify-between gap-5 items-start flex-col sm:flex-row sm:items-center border-b-2">
        <h1 className="font-semibold text-4xl text-gray-500">My Files</h1>
        <UploadButton />
      </div>

      {/* All user files */}
    </main>
  );
};

export default Dashboard;
