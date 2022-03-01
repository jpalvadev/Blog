// Al crear un archivo llamado 404, le estamos diciendo que cuando haya un 404 (page not found) muestre esta página
// Por lo tanto, este se mostrará cada vez que se devuelva un 404 al usuario
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';

export default function NotFoundPage() {
  return (
    <Layout title="Página no encontrada">
      <div className="flex flex-col items-center mt-20">
        <Image
          src="/images/logo.png"
          width={70}
          height={70}
          className="bg-gray-800 rounded-2xl"
          alt="logo"
        />

        <h1 className="text-6xl my-5">404</h1>
        <h2 className="text-4xl text-gray-400 mb-5">Esta página no existe</h2>
      </div>
    </Layout>
  );
}
