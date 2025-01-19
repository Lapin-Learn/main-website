import { ShoppingBag, Store } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import InventoryEmpty from "@/assets/icons/item/inventory-empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInventory, useShop } from "@/hooks/react-query/useItem";
import { carrotSubscription } from "@/lib/consts";
import { cn } from "@/lib/utils";

import { ShopCard } from "./shop-card";

const ItemListMapping = {
  shop: {
    title: "shop.title",
    Icon: Store,
  },
  inventory: {
    title: "inventory.title",
    Icon: ShoppingBag,
  },
};

const ShopList = () => {
  const { t } = useTranslation("shop");
  const [activeTab, setActiveTab] = useState<"shop" | "inventory">("shop");
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
      defaultValue={activeTab}
      onValueChange={(value) => {
        setActiveTab(value as "shop" | "inventory");
      }}
      className="w-full items-center justify-center space-y-6"
    >
      <TabsList className="flex w-full flex-row items-center justify-center border-b-0 border-neutral-100">
        {Object.entries(ItemListMapping).map(([key, { title, Icon }]) => (
          <TabsTrigger
            key={key}
            value={key}
            className={cn(
              "text-small font-medium gap-3 border-b",
              activeTab === key
                ? "text-primary-700 border-b-primary-700"
                : "text-neutral-200 border-b-neutral-200"
            )}
          >
            <Icon className="inline-block size-4" />
            {t(title)}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="shop" className="grid grid-cols-4 space-x-5">
        {mergedData?.map((item) => <ShopCard key={item.id} item={item} />)}
      </TabsContent>
      {inventory?.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center space-y-6">
          <InventoryEmpty />
          <p className="text-wrap text-center text-body font-semibold">{t("inventory.empty")}</p>
        </div>
      ) : (
        <TabsContent value="inventory" className="grid grid-cols-4 space-x-5">
          {inventory?.map((item) => <ShopCard key={item.id} item={item} />)}
        </TabsContent>
      )}
    </Tabs>
  );
};

export { ShopList };
