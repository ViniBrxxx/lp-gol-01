import golLogo from "@/assets/logogol1.webp";

export function Logo({ variant = "navy" }: { variant?: "navy" | "white" }) {
  return (
    <div
      className={
        variant === "white"
          ? "inline-flex rounded-xl bg-white px-3 py-2 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.5)]"
          : "inline-flex"
      }
    >
      <img
        src={golLogo}
        alt="Gol Distribuidora"
        width={240}
        height={174}
        className={`w-auto object-contain ${variant === "white" ? "h-14" : "h-10"}`}
      />
    </div>
  );
}
