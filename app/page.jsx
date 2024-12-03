import LeaderBoard from "@/components/LeaderBoard";
import AddScore from "@/components/AddScore";
import Image from "next/image";
import Logo from "@/public/WIRERACE.png";
import { getLeaderBoard } from "@/components/LeaderBoard.action";

export default async function Home() {
  const data = await getLeaderBoard();

  return (
    <main className="grid items-center">
      <Image
        src={Logo}
        alt="Logo WireRace"
        height={75}
        className="mx-auto mb-3"
      />
      <h1 className="font-bold text-center text-3xl mb-1">Leaderboard</h1>
      <LeaderBoard data={data ?? []} />
      {/* <AddScore /> */}
    </main>
  );
}
