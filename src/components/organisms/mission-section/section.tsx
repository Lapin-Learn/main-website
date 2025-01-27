import { ChevronRight } from "lucide-react";
import { createContext, FC } from "react";

const ProfileContext = createContext({});

export type ProfileProps = React.HTMLAttributes<HTMLDivElement>;

const ProfileSection: FC<ProfileProps> & {
  Title: typeof Title;
  Item: typeof Item;
  Group: typeof Group;
  List: typeof List;
  ListItem: typeof ListItem;
} = ({ children, className, ...props }: ProfileProps) => {
  return (
    <ProfileContext.Provider value={{}}>
      <div className={`flex w-full flex-col gap-2 ${className}`} {...props}>
        {children}
      </div>
    </ProfileContext.Provider>
  );
};

const Title: FC<
  ProfileProps & { label: string; textClassName?: string; infoNode?: React.ReactNode }
> = ({ label, textClassName = "", infoNode, ...props }) => {
  return (
    <div className={`flex flex-row justify-between ${props.className}`}>
      <div className="flex flex-row gap-1">
        <span className={`text-title-4 text-dark font-bold ${textClassName}`}>{label}</span>
        {infoNode}
      </div>
      {props.children}
    </div>
  );
};

const Group: FC<ProfileProps> = ({ children, className }) => (
  <div className={`overflow-hidden rounded-lg ${className}`}>{children}</div>
);

const ListItem: FC<{
  label: string;
  onClick: () => void;
  rightIcon?: typeof ChevronRight;
}> = ({ label, onClick, rightIcon: Icon = ChevronRight }) => (
  <Item className="border-b border-neutral-100 p-4">
    <button onClick={onClick} className="flex w-full flex-row items-center justify-between">
      <span className="text-body font-semibold">{label}</span>
      <Icon size={24} color="#737373" />
    </button>
  </Item>
);

const List: FC<
  ProfileProps & {
    data?: { label: string; action: () => void }[];
    rightIcon?: typeof ChevronRight;
  }
> = ({ data, rightIcon, ...props }) => (
  <Group className={props.className}>
    {data?.map((item, index) => (
      <div key={index}>
        <ListItem label={item.label} onClick={item.action} rightIcon={rightIcon} />
        {index === data.length - 1 || <div className="border-t border-neutral-100" />}
      </div>
    ))}
    {props.children}
  </Group>
);

const Item: FC<ProfileProps & { label?: string; value?: string }> = ({
  label,
  value,
  className,
  children,
}) => (
  <div className={`flex flex-row gap-2 ${className}`}>
    {label && <span className="text-title-4 text-supportingText w-32 font-normal">{label}</span>}
    {value && (
      <span className="text-title-4 text-dark flex-1 truncate text-right font-normal">{value}</span>
    )}
    {children}
  </div>
);

ProfileSection.Title = Title;
ProfileSection.Item = Item;
ProfileSection.Group = Group;
ProfileSection.List = List;
ProfileSection.ListItem = ListItem;

export { ProfileSection };
