import { useLocation } from "@tanstack/react-router";

import ProfileTabItem, { ProfileTabItemProps } from "./profile-tab-item";

const ProfileTab = ({ items }: { items: ProfileTabItemProps[] }) => {
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-4 border-r py-8">
      {items.map((item) => (
        <ProfileTabItem key={item.to} {...item} active={location.href == item.to} />
      ))}
    </nav>
  );
};

export default ProfileTab;
