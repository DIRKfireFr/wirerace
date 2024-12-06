import { User, Star, Square, Triangle, Circle } from "lucide-react";
import React from "react";
import Players from "@/public/players.svg";
import PlayersAges from "@/public/players age.svg";
import Image from "next/image";

export const metadata = {
  title: "WireRace - Rules",
};

export default function page() {
  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold text-[#6831E1] mb-1">Setup</h1>
      <p className="mb-5">
        First choose your game board. <br />
        Shuffle and place all the different card/components.
      </p>

      <h2 className="text-3xl font-bold text-[#6831E1] mb-1">Preconisation</h2>
      <ul className="mb-5">
        <li className="list-none flex items-center gap-3">
          <Image src={Players} /> 2 - 4 players
        </li>
        <li className="list-none flex items-center gap-3">
          <Image src={PlayersAges} /> 15+ years old
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-[#6831E1] mb-1">How to play ?</h2>
      <p className="mb-5 lg:w-1/2">
        The youngest player starts by reading the question to the next player,
        who plays to win a component. He chooses his question between two levels
        (level 1 : easy -&gt; Text or CTA button, level 2 : difficult -&gt;
        Banner or Images).
        <br />
        <br />
        If the player answer correctly, he can choose his component according to
        the level, else he have to pick a malus.
        <br />
        <br />
        The player who complete his website stop the game. You can now count
        your points.
      </p>

      <h2 className="text-3xl font-bold text-[#6831E1] mb-1">How count ?</h2>
      <p className="mb-3">
        Add up all the component points. On each component there is a icon, the
        player who has the same icon the most times wins +2 more points.
      </p>
      <ul className="mb-5">
        <li className="list-none flex items-center gap-3">
          <Star color="#63E68E" /> Banners = 6 points
        </li>
        <li className="list-none flex items-center gap-3">
          <Square color="#63E68E" /> Pictures = 4 points
        </li>
        <li className="list-none flex items-center gap-3">
          <Triangle color="#63E68E" /> Texts = 2 points
        </li>
        <li className="list-none flex items-center gap-3">
          <Circle color="#63E68E" /> CTA button = 1 point
        </li>
      </ul>

      <h2 className="text-3xl font-bold text-[#6831E1] mb-1">Demo</h2>
      <iframe
        className="w-full lg:w-1/2 h-80"
        src="https://www.youtube.com/embed/loFDTpHO74o?si=yLiwcPtZKUGOrYYv"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </main>
  );
}
