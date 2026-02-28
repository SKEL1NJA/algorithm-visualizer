const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      <h1 className="text-xl font-bold">
        Algorithm Visualizer
      </h1>

      <div className="space-x-6">
        <button className="hover:text-blue-400">
          Sorting
        </button>

        <button className="hover:text-blue-400">
          Searching
        </button>

        <button className="hover:text-blue-400">
          Graphs
        </button>
      </div>

    </nav>
  );
};

export default Navbar;