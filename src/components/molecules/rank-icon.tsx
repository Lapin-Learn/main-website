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
  const icons = {
    [EnumRank.bronze]: BronzeIcon,
    [EnumRank.silver]: SilverIcon,
    [EnumRank.gold]: GoldIcon,
    [EnumRank.platinum]: PlatinumIcon,
    [EnumRank.diamond]: DiamondIcon,
    [EnumRank.master]: MasterIcon,
  };

  const IconComponent = icons[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};

export default RankIcon;
