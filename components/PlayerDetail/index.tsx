import Image from "next/image";

interface PlayerDetailsProps {
  player: Player | null;
}

const PlayerDetails = ({ player }: PlayerDetailsProps) => {
  return (
    <div className="w-full md:w-[400px] bg-primary">
      <Image
        src={player ? "/avatar.png" : "/noplayer.jpg"}
        width={100}
        height={100}
        layout="responsive"
        className="bg-secondary"
        alt="a"
      />
      <div className="text-white text-opacity-80 text-center pb-12">
        <h2 className="text-[32px] leading-[72px]">
          {player?.operatorPlayerName || "??? ???"}
        </h2>
        <p className="text-[128px] leading-[172px]">
          {player?.fantasyPoints || 0}
        </p>
        <p className="">Points</p>
      </div>
    </div>
  );
};

export default PlayerDetails;
