"use client";

import Image from "next/image";

export default function ComingSoon() {
  return (
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
      {/* Logo grand format */}
      <div
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          overflow: "hidden",
          marginBottom: "40px",
          border: "4px solid rgba(239, 68, 68, 0.3)",
          boxShadow: "0 0 40px rgba(239, 68, 68, 0.2)",
          animation: "pulse-glow 3s infinite",
        }}
      >
        <Image
          src="/images/abc-boxing.jpg"
          alt="ABC Boxing Club"
          width={200}
          height={200}
          className="object-cover"
          priority
        />
      </div>

      {/* Sous-titre */}
      <p
        style={{
          fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
          color: "#ffffff",
          fontWeight: 600,
          marginBottom: "15px",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        ABC Boxing 
      </p>

      <p
        style={{
          fontSize: "clamp(1rem, 3vw, 1.3rem)",
          color: "#9ca3af",
          marginBottom: "40px",
          maxWidth: "500px",
        }}
      >
        <span style={{ color: "#ef4444" }}>Boxe Française</span> •{" "}
        <span style={{ color: "#ef4444" }}>Kickboxing</span> •{" "}
        <span style={{ color: "#ef4444" }}>La Rochelle</span>
      </p>

      {/* Barre de progression */}
      <div
        style={{
          width: "100%",
          maxWidth: "350px",
          height: "10px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "5px",
          overflow: "hidden",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "100%",
            background: "linear-gradient(90deg, #ef4444, #f97316)",
            borderRadius: "5px",
            animation: "pulse-bar 2s infinite",
          }}
        />
      </div>
      <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "50px", fontWeight: 500 }}>
        Nouveau site en cours de développement...
      </p>

      {/* Contact */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "2px solid rgba(239, 68, 68, 0.3)",
          borderRadius: "20px",
          padding: "30px 40px",
          marginBottom: "30px",
          backdropFilter: "blur(10px)",
        }}
      >
        <p style={{ color: "#9ca3af", marginBottom: "15px", fontSize: "15px" }}>
          Nous contacter :
        </p>
        <a
          href="tel:+33546001234"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            color: "#22c55e",
            fontSize: "1.8rem",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          📞 06 32 72 85 41
        </a>
      </div>

      {/* Réseaux sociaux */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <a
          href="#"
          style={{
            width: "56px",
            height: "56px",
            background: "rgba(59, 89, 152, 0.2)",
            border: "2px solid rgba(59, 89, 152, 0.4)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            textDecoration: "none",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(59, 89, 152, 0.4)";
            e.currentTarget.style.transform = "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(59, 89, 152, 0.2)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          📘
        </a>
        <a
          href="#"
          style={{
            width: "56px",
            height: "56px",
            background: "rgba(193, 53, 132, 0.2)",
            border: "2px solid rgba(193, 53, 132, 0.4)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            textDecoration: "none",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(193, 53, 132, 0.4)";
            e.currentTarget.style.transform = "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(193, 53, 132, 0.2)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          📸
        </a>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(239, 68, 68, 0.2);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 60px rgba(239, 68, 68, 0.4);
            transform: scale(1.02);
          }
        }
        @keyframes pulse-bar {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
