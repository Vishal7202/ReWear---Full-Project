const Stats = () => {
  return (
    <div className="grid grid-cols-3 gap-6 text-center bg-white p-6 rounded-2xl">

      <div>
        <h2 className="text-2xl font-bold text-green-600">45K+</h2>
        <p className="text-gray-500">Items Reused</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-green-600">2,300+</h2>
        <p className="text-gray-500">kg Waste Saved</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-green-600">12K+</h2>
        <p className="text-gray-500">Happy Users</p>
      </div>

    </div>
  );
};

export default Stats;