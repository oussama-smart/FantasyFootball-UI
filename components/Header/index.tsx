import Image from "next/image";

const Header = () => {
  return (
    <header className="p-6 flex gap-4 flex-start items-center bg-black">
      <Image src="/football_icon.svg" width={40} height={40} alt="rukby" />
      <h1 className="text-xl font-semibold text-gray-300">Fantasy Football</h1>
    </header>
  );
};

export default Header;
