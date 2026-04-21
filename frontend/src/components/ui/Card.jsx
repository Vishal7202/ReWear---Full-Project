const Card = ({ children }) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
    {children}
  </div>
);

export default Card;