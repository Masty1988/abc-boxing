import Image from "next/image";
import { Card, Badge } from "@/components/ui";
import { getImages } from "@/lib/get-images";
import { Post } from "@/lib/types";

export default async function ActualitesPage() {
  const IMAGES = await getImages();

  const posts: Post[] = [
    {
      id: 1,
      pinned: true,
      tag: "Solidarité",
      tagColor: "info",
      title: "Octobre Rose : 400€ récoltés !",
      excerpt: "Ensemble contre le cancer du sein. Un immense merci à tous les participants de cette belle journée solidaire !",
      image: IMAGES["entrainement-groupe-1"], // Photo action associative
      date: "Il y a 2 jours",
      likes: 89,
    },
    {
      id: 2,
      tag: "Compétition",
      tagColor: "success",
      title: "Bravo à nos championnes !",
      excerpt: "Victoire éclatante aux championnats régionaux. Trois ceintures ramenées à La Rochelle !",
      image: IMAGES["combat-champion-1"], // Photo championnes
      date: "Il y a 5 jours",
      likes: 124,
    },
    {
      id: 3,
      tag: "Fédération",
      tagColor: "warning",
      title: "Stage national des officiels",
      excerpt: "Notre équipe présente au rassemblement fédéral. Formation arbitrage et développement.",
      image: IMAGES["entrainement-coach"], // Photo coach/formation
      date: "Il y a 1 semaine",
      likes: 45,
    },
  ];
  return (
    <div className="min-h-screen bg-[#121212] text-white pb-24">
      <div className="h-32 bg-gradient-to-b from-blue-900/30 to-transparent flex items-end px-6 pb-4">
        <h1 className="text-3xl font-black">Actualités</h1>
      </div>

      <div className="px-4 py-6 space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className={`overflow-hidden ${post.pinned ? "ring-2 ring-blue-500/50" : ""}`}>
            <div className="h-48 relative">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
              {post.pinned && (
                <div className="absolute top-3 left-3">
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">📌 Épinglé</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant={post.tagColor}>{post.tag}</Badge>
                <span className="text-xs text-gray-500">{post.date}</span>
              </div>
              <h3 className="font-bold text-lg mb-1">{post.title}</h3>
              <p className="text-sm text-gray-400">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-400 transition-colors">
                  ❤️ {post.likes}
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  💬 Commenter
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-green-400 transition-colors ml-auto">
                  ↗️ Partager
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
