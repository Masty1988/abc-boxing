import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABC Boxing Club - Bientôt disponible",
  description: "Le nouveau site ABC Boxing Club La Rochelle arrive bientôt !",
};

export default function ComingSoon() {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>
        <div
          style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #121212 0%, #1a0a0a 50%, #121212 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: "white",
            textAlign: "center",
            padding: "20px",
          }}
        >
          {/* Gant de boxe animé */}
          <div
            style={{
              fontSize: "120px",
              marginBottom: "30px",
              animation: "bounce 2s infinite",
            }}
          >
            🥊
          </div>

          {/* Titre */}
          <h1
            style={{
              fontSize: "clamp(2rem, 8vw, 4rem)",
              fontWeight: 900,
              marginBottom: "10px",
              letterSpacing: "-2px",
            }}
          >
            <span style={{ color: "white" }}>ABC</span>{" "}
            <span style={{ color: "#ef4444" }}>BOXING</span>
          </h1>

          {/* Sous-titre */}
          <p
            style={{
              fontSize: "clamp(1rem, 4vw, 1.5rem)",
              color: "#9ca3af",
              marginBottom: "40px",
              maxWidth: "400px",
            }}
          >
            Notre nouveau site arrive bientôt !
            <br />
            <span style={{ color: "#ef4444" }}>Boxe Française • Kickboxing • La Rochelle</span>
          </p>

          {/* Barre de progression fake */}
          <div
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "8px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "4px",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "75%",
                height: "100%",
                background: "linear-gradient(90deg, #ef4444, #f97316)",
                borderRadius: "4px",
                animation: "pulse 2s infinite",
              }}
            />
          </div>
          <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "40px" }}>
            Lancement imminent...
          </p>

          {/* Contact */}
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              padding: "24px 32px",
              marginBottom: "20px",
            }}
          >
            <p style={{ color: "#9ca3af", marginBottom: "12px", fontSize: "14px" }}>
              En attendant, contactez-nous :
            </p>
            <a
              href="tel:+33546001234"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#22c55e",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              📞 05 46 00 12 34
            </a>
          </div>

          {/* Réseaux sociaux placeholder */}
          <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
            <a
              href="#"
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                textDecoration: "none",
                transition: "background 0.3s",
              }}
            >
              📘
            </a>
            <a
              href="#"
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                textDecoration: "none",
              }}
            >
              📸
            </a>
          </div>

          {/* CSS animations */}
          <style>{`
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% {
                transform: translateY(0) rotate(-10deg);
              }
              40% {
                transform: translateY(-30px) rotate(-10deg);
              }
              60% {
                transform: translateY(-15px) rotate(-10deg);
              }
            }
            @keyframes pulse {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.7;
              }
            }
          `}</style>
        </div>
      </body>
    </html>
  );
}
