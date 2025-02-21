import { useTranslation } from "react-i18next";

import Icons from "@/assets/icons";
import InventoryEmpty from "@/assets/icons/item/inventory-empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInventory, useShop } from "@/hooks/react-query/useItem";
import { carrotSubscription } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/_authenticated/_dashboard/shop";

import { ShopCard } from "./shop-card";

const ItemListMapping = {
  shop: {
    title: "shop.title",
    Icon: <Icons.Store fill="#B4B4B4" height={20} width={20} />,
    ActiveIcon: <Icons.Store height={20} width={20} />,
  },
  inventory: {
    title: "inventory.title",
    Icon: <Icons.ShoppingBag fill="#B4B4B4" height={20} width={20} />,
    ActiveIcon: <Icons.ShoppingBag fill="#A9421C" height={20} width={20} />,
  },
};

const ShopList = () => {
  const { t } = useTranslation("shop");
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, isFetching } = useShop();
  const { data: inventory } = useInventory();

  const mergedData = [
    ...(Array.isArray(carrotSubscription) ? carrotSubscription : [carrotSubscription]),
    ...(data || []),
  ];

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Tabs
      defaultValue={tab}
      onValueChange={(value) => {
        navigate({
          to: "",
          search: {
            tab: value,
          },
        });
      }}
      className="w-full items-center justify-center space-y-6"
    >
      <TabsList className="flex w-full flex-row items-center justify-center border-b-0 border-neutral-100">
        {Object.entries(ItemListMapping).map(([key, { title, Icon, ActiveIcon }]) => (
          <TabsTrigger
            key={key}
            value={key}
            className={cn(
              "text-base font-medium gap-3 border-b",
              tab === key
                ? "text-primary-700 border-b-primary-700"
                : "text-neutral-200 border-b-neutral-200"
            )}
          >
            {tab === key ? ActiveIcon : Icon}
            {t(title)}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent
        value="shop"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {mergedData?.map((item) => <ShopCard key={item.id} item={item} type="shop" />)}
      </TabsContent>
      <TabsContent
        value="inventory"
        className={cn(
          inventory?.length === 0
            ? "flex flex-row items-center justify-center space-y-6"
            : "place-content-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        )}
      >
        {inventory?.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-6">
            <InventoryEmpty />
            <p className="text-wrap text-center text-body font-semibold">{t("inventory.empty")}</p>
          </div>
        ) : (
          inventory?.map((item) => <ShopCard key={item.id} item={item} type="inventory" />)
        )}
      </TabsContent>
    </Tabs>
  );
};

export { ShopList };
