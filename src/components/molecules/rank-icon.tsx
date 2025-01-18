import BronzeIcon from "@/assets/icons/ranks/bronze";
import DiamondIcon from "@/assets/icons/ranks/diamond";
import GoldIcon from "@/assets/icons/ranks/gold";
import MasterIcon from "@/assets/icons/ranks/master";
import PlatinumIcon from "@/assets/icons/ranks/platinum";
import SilverIcon from "@/assets/icons/ranks/silver";
import { EnumRank } from "@/lib/enums";

type RankIconProps = {
  name: EnumRank;
  className?: string;
};

const RankIcon = ({ name, className }: RankIconProps) => {
  switch (name) {
    case EnumRank.bronze:
      return <BronzeIcon className={className} />;
    case EnumRank.silver:
      return <SilverIcon className={className} />;
    case EnumRank.gold:
      return <GoldIcon className={className} />;
    case EnumRank.platinum:
      return <PlatinumIcon className={className} />;
    case EnumRank.diamond:
      return <DiamondIcon className={className} />;
    case EnumRank.master:
      return <MasterIcon className={className} />;
    default:
      return null;
  }
};

export default RankIcon;
