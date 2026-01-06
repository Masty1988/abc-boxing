"use client";

import { Card, Button, Badge } from "@/components/ui";
import { IconCheck } from "@/components/icons";
import { Tarif } from "@/lib/types";

interface TarifCardProps {
  tarif: Tarif;
  selected?: boolean;
  onSelect?: () => void;
}

export const TarifCard: React.FC<TarifCardProps> = ({
  tarif,
  selected = false,
  onSelect,
}) => {
  const disciplineLabel = {
    "Boxe Française": "Boxe Française",
    "Kickboxing": "Kickboxing K1",
    "Boxe Française & Kickboxing": "BF + K1",
    "bf_k1": "BF + K1",
  };

  const disciplineBadge = {
    "Boxe Française": "bf" as const,
    "Kickboxing": "k1" as const,
    "Boxe Française & Kickboxing": "info" as const,
    "bf_k1": "info" as const,
  };

  return (
    <Card
      className="p-5"
      selected={selected}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge variant={disciplineBadge[tarif.discipline]} className="mb-2">
            {disciplineLabel[tarif.discipline]}
          </Badge>
          <h3 className="font-bold text-lg text-white">{tarif.name}</h3>
        </div>
        <div className="text-right">
          <span className="text-3xl font-black text-red-500">{tarif.price}€</span>
          <span className="text-gray-500 text-sm block">/saison</span>
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        {tarif.features.map((feature, i) => (
          <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
            <IconCheck className="w-4 h-4 text-green-500 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={selected ? "primary" : "secondary"}
        className="w-full"
      >
        {selected ? "Sélectionné ✓" : "Choisir cette formule"}
      </Button>
    </Card>
  );
};
