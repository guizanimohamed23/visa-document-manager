import { Badge } from "@/components/ui/badge";
import type { VisaType, VisaPurpose } from "@/types/dossier";

const typeStyles: Record<VisaType, string> = {
  primo: "bg-primo text-primo-foreground",
  vise: "bg-vise text-vise-foreground",
};

const purposeStyles: Record<VisaPurpose, string> = {
  familiale: "bg-familiale text-familiale-foreground",
  touristique: "bg-touristique text-touristique-foreground",
};

const typeLabels: Record<VisaType, string> = {
  primo: "Primo",
  vise: "Visé",
};

const purposeLabels: Record<VisaPurpose, string> = {
  familiale: "Familiale",
  touristique: "Touristique",
};

export function CategoryBadges({ visaType, visaPurpose }: { visaType: VisaType; visaPurpose: VisaPurpose }) {
  return (
    <div className="flex items-center gap-1.5">
      <Badge className={`${typeStyles[visaType]} text-[10px] px-1.5 py-0 font-medium border-0`}>
        {typeLabels[visaType]}
      </Badge>
      <Badge className={`${purposeStyles[visaPurpose]} text-[10px] px-1.5 py-0 font-medium border-0`}>
        {purposeLabels[visaPurpose]}
      </Badge>
    </div>
  );
}
