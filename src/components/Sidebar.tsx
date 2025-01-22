import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-purple-700 text-white h-screen">
      <div className="p-4 text-2xl font-bold">Fanation</div>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium bg-purple-800 rounded-lg"
            >
              Peças
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium hover:bg-purple-800 rounded-lg"
            >
              Visualização
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium hover:bg-purple-800 rounded-lg"
            >
              Clientes
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
