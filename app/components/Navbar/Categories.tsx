"use client";

import Container from "../Container";

import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Sahil",
    icon: TbBeach,
    description: "Bu mülk kumsala yakın.",
  },
  {
    label: "Yel değirmenleri",
    icon: GiWindmill,
    description: "Bu mülkte yel değirmeni var.",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Bu mülk modern.",
  },
  {
    label: "Kırsal",
    icon: TbMountain,
    description: "Bu mülk kırsalda.",
  },
  {
    label: "Havuzlu",
    icon: TbPool,
    description: "Bu mülkte havuz var.",
  },
  {
    label: "Adalar",
    icon: GiIsland,
    description: "Bu mülk adada.",
  },
  {
    label: "Göl kenarı",
    icon: GiBoatFishing,
    description: "Bu mülk göl kenarında.",
  },
  {
    label: "Kayak",
    icon: FaSkiing,
    description: "Bu mülkte kaya aktiviteleri var.",
  },
  {
    label: "Şatolar",
    icon: GiCastle,
    description: "Bu mülk bir şato.",
  },
  {
    label: "Kamp",
    icon: GiForestCamp,
    description: "Bu mülkte kamp yeri var.",
  },
  {
    label: "Kuzey Kutbu",
    icon: BsSnow,
    description: "Bu mülk kuzey kutbunda.",
  },
  {
    label: "Mağaralar",
    icon: GiCaveEntrance,
    description: "Bu mülk mağaranın içinde.",
  },
  {
    label: "Çöl",
    icon: GiCactus,
    description: "Bu mülk çölün içinde.",
  },
  {
    label: "Ambarlar",
    icon: GiBarn,
    description: "Bu mülk bir ambar.",
  },
  {
    label: "Lüks",
    icon: IoDiamond,
    description: "Bu lüks bir mülk.",
  },
];

function Categories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;
