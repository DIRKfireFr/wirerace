import Image from "next/image";
import OR from "@/public/or.svg";
import ARGENT from "@/public/argent.svg";
import BRONZE from "@/public/bronze.svg";

const ICONS = {
  1: OR,
  2: ARGENT,
  3: BRONZE,
};

export default function LeaderBoardIcons({ index }) {
  const iconSrc = ICONS[index];

  return iconSrc ? (
    <Image src={iconSrc} alt={`Icon ${index}`} width={24} height={24} />
  ) : (
    <span>{index}</span>
  );
}
