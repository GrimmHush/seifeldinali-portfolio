import { ImageResponse } from "next/og";

// Apple touch icon: the same "S" monogram, sized and rounded for iOS home screens.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08080b",
          color: "#7c83ff",
          fontSize: 132,
          fontWeight: 800,
          borderRadius: 40,
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
