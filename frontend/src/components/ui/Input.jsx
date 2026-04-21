const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 
    bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 
    text-gray-800 dark:text-white transition"
  />
);

export default Input;