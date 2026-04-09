export const FilterModal = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] md:w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Filter Options</h2>

        {/* Example Filters */}
        <div className="space-y-3">
          <select className="w-full px-3 py-2 border rounded-lg">
            <option>Experience Level</option>
            <option>Junior</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>

          <select className="w-full px-3 py-2 border rounded-lg">
            <option>Job Type</option>
            <option>Remote</option>
            <option>Onsite</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 rounded-lg">
            Cancel
          </button>

          <button
            onClick={closeModal}
            className="px-4 py-2 bg-green-600 text-white rounded-lg">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
