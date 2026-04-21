const Button = ({ children, loading, ...props }) => (
  <button
    {...props}
    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 
    text-white font-semibold hover:from-purple-700 hover:to-indigo-700 
    transition-all disabled:opacity-60"
  >
    {loading ? "Please wait..." : children}
  </button>
);

export default Button;