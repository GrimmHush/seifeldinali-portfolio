// The dimensional backdrop — a gradient-mesh field with a fine grain over it.
// Pure CSS (see globals.css `.atmosphere*`): layered radial-gradients drift on
// a slow keyframe, grain is a tiled SVG noise tile. No canvas, no JS, no layout
// cost — it's fixed, behind everything, and never interactive. The drift is
// gated behind prefers-reduced-motion in CSS, so motion-sensitive users get a
// calm static field. Rendered once in the root layout.
export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden>
      <div className="atmosphere-mesh" />
      <div className="atmosphere-grain" />
    </div>
  );
}
