export function Logo({ variant = "navy" }: { variant?: "navy" | "white" }) {
  const fg = variant === "white" ? "#FFFFFF" : "#263055";
  return (
    <div className="flex items-center gap-2">
      <div
        className="grid h-9 w-9 place-items-center rounded-xl"
        style={{ background: "linear-gradient(135deg, #F37021, #F58a45)" }}
        aria-hidden
      >
        <span className="text-[15px] font-black tracking-tight text-white">G</span>
      </div>
      <div className="leading-none">
        <div className="text-[15px] font-black tracking-tight" style={{ color: fg }}>
          GOL
        </div>
        <div
          className="text-[9px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: variant === "white" ? "#FFFFFFB0" : "#7A7A7A" }}
        >
          Distribuidora
        </div>
      </div>
    </div>
  );
}
