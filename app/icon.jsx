import { ImageResponse } from "next/og";
import Favico from "@/app/favicon.ico";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <img src={Favico} alt="" />
    ),
    {
      ...size,
    }
  );
}