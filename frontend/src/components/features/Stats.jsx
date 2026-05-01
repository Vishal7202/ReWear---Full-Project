import { motion } from "framer-motion";
import { Recycle, Leaf, Users } from "lucide-react";

const statsData = [
  {
    title: "Items Reused",
    value: "45K+",
    icon: <Recycle size={22} />,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Waste Saved",
    value: "2,300+ kg",
    icon: <Leaf size={22} />,
    color: "from-lime-500 to-green-600",
  },
  {
    title: "Happy Users",
    value: "12K+",
    icon: <Users size={22} />,
    color: "from-teal-500 to-cyan-500",
  },
];

const Stats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {statsData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className={`bg-gradient-to-r ${item.color} text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition`}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm opacity-80">{item.title}</p>
            {item.icon}
          </div>

          <h2 className="text-3xl font-bold">{item.value}</h2>
        </motion.div>
      ))}
    </div>
  );
};

export default Stats;