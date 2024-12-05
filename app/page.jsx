import LeaderBoard from "@/components/LeaderBoard";
import AddScore from "@/components/AddScore";
import Image from "next/image";
import Logo from "@/public/WIRERACE.png";

export default async function Home() {
  return (
    <div className="grid items-center mt-3">
      <Image
        src={Logo}
        alt="Logo WireRace"
        height={75}
        className="mx-auto mb-3"
      />
      <h1 className="font-bold text-center text-3xl mb-1">Leaderboard</h1>
      <LeaderBoard />
      <AddScore />
    </div>
  );
}
