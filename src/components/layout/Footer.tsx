import { CONTACT } from "@/lib/constants";
import { IconPhone, IconMapPin } from "@/components/icons";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 py-8 pb-24">
      <div className="max-w-md mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-4">
          <h3 className="font-bold text-white">ABC Boxing Club</h3>
          
          <div className="flex items-center gap-2 text-gray-400">
            <IconMapPin className="w-4 h-4" />
            <span className="text-sm">{CONTACT.fullAddress}</span>
          </div>
          
          <a
            href={CONTACT.phoneLink}
            className="flex items-center gap-2 text-green-400 hover:text-green-300"
          >
            <IconPhone className="w-4 h-4" />
            <span className="text-sm font-medium">{CONTACT.phone}</span>
          </a>
          
          <p className="text-xs text-gray-600 mt-4">
            © {new Date().getFullYear()} ABC Boxing Club La Rochelle. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
