import Layout from '@/components/Layout';

export default function AboutPage() {
  return (
    <Layout title="Sobre Mi Blog">
      <h1 className="text-5xl border-b-4 pb-5 font-bold">About</h1>

      <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
        <h3 className="text-2xl-mb-5">Juan Pablo Alvarez Blog</h3>
        <p className="mb-3">
          Este es un blog hecho con Next.js - GrayMatter - Framer Motion -
          Tailwind
        </p>
        <span className="font-bold">Version: 1.0.0</span>
      </div>
    </Layout>
  );
}
