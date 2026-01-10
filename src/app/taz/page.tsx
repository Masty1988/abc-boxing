// src/app/taz/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageManager } from "@/components/admin/ImageManager";

// Types
interface Adherent {
  id: string;
  nom: string;
  prenom: string;
  email?: string;
  telephone?: string;
  photo?: string;
  numeroLicence?: string;
  categorie: "ADULTE" | "ENFANT";
  discipline: "BF" | "K1" | "BF_K1";
  formule: "LOISIR" | "COMPETITION";
  combattant: boolean;
  paye: boolean;
  montant?: number;
  methodePaiement?: string;
  datePaiement?: string;
  dateInscription: string;
}

interface Stats {
  total: number;
  payes: number;
  enAttente: number;
  combattants: number;
  revenus: number;
}

// Icônes
const IconUsers = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconPhoto = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconLogout = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const IconCheck = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const IconCash = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconPlus = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const IconCalendar = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"licences" | "photos" | "evenements">("licences");
  const [adherents, setAdherents] = useState<Adherent[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "paye" | "attente">("all");
  const [showModal, setShowModal] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Rediriger si non connecté
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/taz/login");
    }
  }, [status, router]);

  // Charger les adhérents
  useEffect(() => {
    if (status === "authenticated") {
      fetchAdherents();
    }
  }, [status, filter]);

  const fetchAdherents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter === "paye") params.set("paye", "true");
      if (filter === "attente") params.set("paye", "false");

      const res = await fetch(`/api/adherents?${params}`);
      const data = await res.json();
      
      setAdherents(data.adherents || []);
      setStats(data.stats || null);
    } catch (error) {
      console.error("Erreur chargement adhérents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidatePayment = async (id: string, methode: string) => {
    try {
      const res = await fetch(`/api/adherents/${id}/validate-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ methode }),
      });

      if (res.ok) {
        setShowModal(null);
        fetchAdherents();
      }
    } catch (error) {
      console.error("Erreur validation:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-slate-100">
                <Image
                  src="/images/abc-boxing.jpg"
                  alt="ABC Boxing"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="font-bold text-slate-800">Dashboard</h1>
                <p className="text-xs text-slate-500">Bienvenue, {session?.user?.name}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/taz/login" })}
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-red-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <IconLogout />
              <span className="hidden sm:inline text-sm">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("licences")}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "licences"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <IconUsers />
              Licences
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "photos"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <IconPhoto />
              Photos
            </button>
            <button
              onClick={() => setActiveTab("evenements")}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "evenements"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <IconCalendar />
              Événements
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-2xl mb-1">👥</div>
              <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
              <div className="text-xs text-slate-500">Total adhérents</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-2xl mb-1">✅</div>
              <div className="text-2xl font-bold text-green-600">{stats.payes}</div>
              <div className="text-xs text-slate-500">Payés</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-2xl mb-1">⏳</div>
              <div className="text-2xl font-bold text-orange-500">{stats.enAttente}</div>
              <div className="text-xs text-slate-500">En attente</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="text-2xl mb-1">🥊</div>
              <div className="text-2xl font-bold text-purple-600">{stats.combattants}</div>
              <div className="text-xs text-slate-500">Compétiteurs</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm col-span-2 lg:col-span-1">
              <div className="text-2xl mb-1">💰</div>
              <div className="text-2xl font-bold text-slate-800">{stats.revenus}€</div>
              <div className="text-xs text-slate-500">Revenus</div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "licences" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="px-4 sm:px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-bold text-slate-800">Gestion des Licences</h2>
              <div className="flex items-center gap-3">
                {/* Filtres */}
                <div className="flex bg-slate-100 rounded-lg p-1">
                  {[
                    { id: "all", label: "Tous" },
                    { id: "paye", label: "Payés" },
                    { id: "attente", label: "En attente" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id as typeof filter)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        filter === f.id
                          ? "bg-white text-slate-800 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                {/* Bouton Ajouter */}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <IconPlus />
                  <span className="hidden sm:inline">Ajouter</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left">Adhérent</th>
                    <th className="px-4 sm:px-6 py-3 text-left hidden sm:table-cell">Formule</th>
                    <th className="px-4 sm:px-6 py-3 text-left">Statut</th>
                    <th className="px-4 sm:px-6 py-3 text-left hidden md:table-cell">Montant</th>
                    <th className="px-4 sm:px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {adherents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                        Aucun adhérent trouvé
                      </td>
                    </tr>
                  ) : (
                    adherents.map((adherent) => (
                      <tr key={adherent.id} className="hover:bg-slate-50">
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">
                              {adherent.prenom[0]}{adherent.nom[0]}
                            </div>
                            <div>
                              <div className="font-medium text-slate-800">
                                {adherent.prenom} {adherent.nom}
                              </div>
                              <div className="text-xs text-slate-500 sm:hidden">
                                {adherent.formule} - {adherent.discipline}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium w-fit ${
                              adherent.formule === "COMPETITION"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-slate-100 text-slate-700"
                            }`}>
                              {adherent.formule}
                            </span>
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium w-fit ${
                              adherent.discipline === "K1"
                                ? "bg-orange-100 text-orange-700"
                                : adherent.discipline === "BF_K1"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                              {adherent.discipline.replace("_", " + ")}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            adherent.paye
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}>
                            {adherent.paye ? <><IconCheck /> Payé</> : "⏳ En attente"}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                          <span className="font-medium text-slate-800">{adherent.montant}€</span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          {!adherent.paye && (
                            <button
                              onClick={() => setShowModal(adherent.id)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg transition-colors"
                            >
                              <IconCash />
                              <span className="hidden sm:inline">Valider</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "photos" && <PhotosTab />}
        {activeTab === "evenements" && <EventsTab />}
      </main>

      {/* Modal Validation Paiement */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Valider le paiement</h3>
            <p className="text-slate-600 mb-6">
              Choisissez le mode de paiement :
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {["ESPECES", "CHEQUE", "VIREMENT"].map((methode) => (
                <button
                  key={methode}
                  onClick={() => handleValidatePayment(showModal, methode)}
                  className="px-4 py-3 bg-slate-100 hover:bg-green-100 hover:text-green-700 rounded-xl text-sm font-medium transition-colors"
                >
                  {methode === "ESPECES" && "💵 Espèces"}
                  {methode === "CHEQUE" && "📝 Chèque"}
                  {methode === "VIREMENT" && "🏦 Virement"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowModal(null)}
              className="w-full px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Modal Ajout Adhérent */}
      {showAddModal && (
        <AddAdherentModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchAdherents();
          }}
        />
      )}
    </div>
  );
}

// =============================================================================
// Modal Ajout Adhérent
// =============================================================================
function AddAdherentModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    categorie: "ADULTE",
    discipline: "BF",
    formule: "LOISIR",
    combattant: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/adherents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || "Erreur lors de la création");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full my-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Nouvel adhérent</h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Prénom *</label>
              <input
                type="text"
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom *</label>
              <input
                type="text"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
            <input
              type="tel"
              value={form.telephone}
              onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
              <select
                value={form.categorie}
                onChange={(e) => setForm({ ...form, categorie: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
              >
                <option value="ADULTE">Adulte</option>
                <option value="ENFANT">Enfant</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Discipline</label>
              <select
                value={form.discipline}
                onChange={(e) => setForm({ ...form, discipline: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
              >
                <option value="BF">Boxe Française</option>
                <option value="K1">Kickboxing K1</option>
                <option value="BF_K1">BF + K1</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Formule</label>
            <select
              value={form.formule}
              onChange={(e) => setForm({ ...form, formule: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
            >
              <option value="LOISIR">Loisir</option>
              <option value="COMPETITION">Compétition</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="combattant"
              checked={form.combattant}
              onChange={(e) => setForm({ ...form, combattant: e.target.checked })}
              className="w-4 h-4 text-red-500 border-slate-300 rounded focus:ring-red-500"
            />
            <label htmlFor="combattant" className="text-sm text-slate-700">
              Combattant (participe aux compétitions)
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium rounded-lg transition-colors"
            >
              {loading ? "Création..." : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =============================================================================
// Onglet Photos
// =============================================================================
function PhotosTab() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="font-bold text-slate-800 mb-4">Gestion des Photos du Site</h2>
      <ImageManager />
    </div>
  );
}

// =============================================================================
// Onglet Événements
// =============================================================================
function EventsTab() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    date: "",
    lieu: "",
    prix: "",
    imageUrl: "",
    lienReservation: "",
    publie: true,
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await fetch("/api/events?admin=true");
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Erreur chargement événements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingEvent
        ? `/api/events/${editingEvent.id}`
        : "/api/events";
      const method = editingEvent ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          prix: formData.prix ? parseFloat(formData.prix) : null,
        }),
      });

      if (res.ok) {
        await loadEvents();
        resetForm();
      }
    } catch (error) {
      console.error("Erreur sauvegarde:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet événement ?")) return;

    try {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
      await loadEvents();
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      titre: event.titre,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 16),
      lieu: event.lieu || "",
      prix: event.prix?.toString() || "",
      imageUrl: event.imageUrl || "",
      lienReservation: event.lienReservation || "",
      publie: event.publie,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      titre: "",
      description: "",
      date: "",
      lieu: "",
      prix: "",
      imageUrl: "",
      lienReservation: "",
      publie: true,
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isPastEvent = (date: string | Date) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header avec bouton */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Gestion des Événements</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <IconPlus />
              Nouvel événement
            </button>
          )}
        </div>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            {editingEvent ? "Modifier l'événement" : "Nouvel événement"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Titre *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
                value={formData.titre}
                onChange={(e) =>
                  setFormData({ ...formData, titre: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description *
              </label>
              <textarea
                required
                rows={3}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date et heure *
                </label>
                <input
                  type="datetime-local"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Lieu
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
                  value={formData.lieu}
                  onChange={(e) =>
                    setFormData({ ...formData, lieu: e.target.value })
                  }
                  placeholder="Gymnase Descartes"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Prix (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
                  value={formData.prix}
                  onChange={(e) =>
                    setFormData({ ...formData, prix: e.target.value })
                  }
                  placeholder="Laisser vide si gratuit"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  URL Image
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Lien de réservation
              </label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-red-500"
                value={formData.lienReservation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lienReservation: e.target.value,
                  })
                }
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="publie-event"
                checked={formData.publie}
                onChange={(e) =>
                  setFormData({ ...formData, publie: e.target.checked })
                }
                className="w-4 h-4 text-red-500 border-slate-300 rounded focus:ring-red-500"
              />
              <label htmlFor="publie-event" className="text-sm text-slate-700">
                Publié (visible sur le site)
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium rounded-lg transition-colors"
              >
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des événements */}
      {events.length === 0 && !showForm ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
          <p className="text-slate-500 mb-4">Aucun événement pour le moment</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Créer le premier événement
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 ${
                isPastEvent(event.date) ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-slate-800">
                      {event.titre}
                    </h3>
                    {!event.publie && (
                      <span className="px-2 py-1 text-xs bg-slate-200 text-slate-600 rounded">
                        Non publié
                      </span>
                    )}
                    {isPastEvent(event.date) && (
                      <span className="px-2 py-1 text-xs bg-slate-200 text-slate-600 rounded">
                        Passé
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mb-2">
                    📅 {formatDate(event.date)}
                  </p>
                  {event.lieu && (
                    <p className="text-sm text-slate-500 mb-2">
                      📍 {event.lieu}
                    </p>
                  )}
                  <p className="text-slate-700 mb-3">{event.description}</p>
                  {event.prix && (
                    <p className="text-red-500 font-bold">{event.prix}€</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="px-3 py-1.5 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="px-3 py-1.5 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface Event {
  id: string;
  titre: string;
  description: string;
  date: Date | string;
  lieu?: string | null;
  prix?: number | null;
  imageUrl?: string | null;
  lienReservation?: string | null;
  publie: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
