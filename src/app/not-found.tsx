import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-black text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-4">Page non trouvée</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/">
        <Button>Retour à l&apos;accueil</Button>
      </Link>
    </div>
  );
}
