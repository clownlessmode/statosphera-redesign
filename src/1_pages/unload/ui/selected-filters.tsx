import { PreparedFilterBlock } from "@widgets/unload/sheet/model/filters-store";
import { format, parseISO } from "date-fns";
import { FC } from "react";

interface FiltersProps {
  item: Partial<PreparedFilterBlock>;
}

interface AgeAccount {
  years: number | null;
  months: number | null;
  days: number | null;
}

export const SelectedFilters: FC<FiltersProps> = ({ item }) => {
  const toTotalDays = (value: AgeAccount) => {
    if (!value) return null;
    return (
      (value.years ?? 0) * 365 + (value.months ?? 0) * 30 + (value.days ?? 0)
    );
  };

  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px]">
      {item?.RFM?.period && <span>Период: {item?.RFM?.period}</span>}
      {item?.RFM?.rfmList && item.RFM.rfmList.length > 0 && (
        <span>Сегменты: {item.RFM?.rfmList.length} шт.</span>
      )}
      {(item.filterDate?.dateStart || item.filterDate?.dateEnd) && (
        <div className="flex flex-row gap-1">
          Дата:
          {item.filterDate?.dateStart && (
            <span>
              c {format(parseISO(item.filterDate.dateStart), "dd.MM.yyyy")}
            </span>
          )}
          {item.filterDate?.dateEnd && (
            <span>
              до {format(parseISO(item.filterDate.dateEnd), "dd.MM.yyyy")}
            </span>
          )}
        </div>
      )}
      {(item.filterTime?.timeStart || item.filterTime?.timeEnd) && (
        <div className="flex flex-row gap-1">
          Время:
          {item.filterTime?.timeStart && (
            <span>с {item.filterTime.timeStart}</span>
          )}
          {item.filterTime?.timeEnd && (
            <span>до {item.filterTime.timeEnd}</span>
          )}
        </div>
      )}
      {item.audienceId && item.audienceId.length > 0 && (
        <div className="flex flex-row gap-1">
          Аудитория: {item.audienceId.length} шт.
        </div>
      )}
      {(item.client?.ageStart || item.client?.ageEnd) && (
        <div className="flex flex-row gap-1">
          Возраст:
          {item.client?.ageStart && <span>от {item.client?.ageStart}</span>}
          {item.client?.ageEnd && <span>до {item.client?.ageEnd}</span>}
        </div>
      )}
      {(item.client?.frequency?.from || item.client?.frequency?.to) && (
        <div className="flex flex-row gap-1">
          Частота:
          {item.client?.frequency?.from && (
            <span>от {item.client?.frequency?.from}</span>
          )}
          {item.client?.frequency?.to && (
            <span>до {item.client?.frequency?.to}</span>
          )}
          {(item.client?.frequency?.from === 1 &&
            !item.client?.frequency?.to) ||
          (item.client?.frequency?.to === 1 &&
            item.client?.frequency?.to !== null)
            ? "дня"
            : "дней"}
        </div>
      )}
      {(item.client?.totalPurchase?.from || item.client?.totalPurchase?.to) && (
        <div className="flex flex-row gap-1">
          Общая выручка:
          {item.client?.totalPurchase?.from && (
            <span>от {item.client?.totalPurchase?.from}</span>
          )}
          {item.client?.totalPurchase?.to && (
            <span>до {item.client?.totalPurchase?.to}</span>
          )}
          руб.
        </div>
      )}
      {(item.client?.avg?.from || item.client?.avg?.to) && (
        <div className="flex flex-row gap-1">
          Средний чек:
          {item.client?.avg?.from && <span>от {item.client?.avg?.from}</span>}
          {item.client?.avg?.to && <span>до {item.client?.avg?.to}</span>}
          руб.
        </div>
      )}
      {(item.client?.avgCheckLen?.from || item.client?.avgCheckLen?.to) && (
        <div className="flex flex-row gap-1">
          Средняя длина чека:
          {item.client?.avgCheckLen?.from && (
            <span>от {item.client?.avgCheckLen?.from}</span>
          )}
          {item.client?.avgCheckLen?.to && (
            <span>до {item.client?.avgCheckLen?.to}</span>
          )}
        </div>
      )}
      {(item.client?.proceedPerCheck?.from ||
        item.client?.proceedPerCheck?.to) && (
        <div className="flex flex-row gap-1">
          Средний чек:
          {item.client?.proceedPerCheck?.from && (
            <span>от {item.client?.proceedPerCheck?.from}</span>
          )}
          {item.client?.proceedPerCheck?.to && (
            <span>до {item.client?.proceedPerCheck?.to}</span>
          )}
          руб.
        </div>
      )}
      {(item.client?.countBonus?.from || item.client?.countBonus?.to) && (
        <div className="flex flex-row gap-1">
          Бонусов у пользователя:
          {item.client?.countBonus?.from && (
            <span>от {item.client?.countBonus?.from}</span>
          )}
          {item.client?.countBonus?.to && (
            <span>до {item.client?.countBonus?.to}</span>
          )}
        </div>
      )}
      {item.client?.ageAccount &&
        (item.client?.ageAccount?.from.years !== null ||
          item.client?.ageAccount?.to.years !== null ||
          item.client?.ageAccount?.from.months !== null ||
          item.client?.ageAccount?.to.months !== null ||
          item.client?.ageAccount?.from.days !== null ||
          item.client?.ageAccount?.to.days !== null) && (
          <div className="flex flex-row gap-1">
            Возраст аккаунта:
            <div className="flex flex-row gap-1">
              {(item.client?.ageAccount?.from.years ||
                item.client?.ageAccount?.from.months ||
                item.client?.ageAccount?.from.days) && (
                <span>от {toTotalDays(item.client?.ageAccount?.from)}</span>
              )}
              {(item.client?.ageAccount?.to.years ||
                item.client?.ageAccount?.to.months ||
                item.client?.ageAccount?.to.days) && (
                <span>до {toTotalDays(item.client?.ageAccount?.to)}</span>
              )}
            </div>
            {(toTotalDays(item.client?.ageAccount?.from) === 1 &&
              !toTotalDays(item.client?.ageAccount?.to)) ||
            (toTotalDays(item.client?.ageAccount?.to) === 1 &&
              toTotalDays(item.client?.ageAccount?.to) !== null)
              ? "дня"
              : "дней"}
          </div>
        )}
      {item.client?.sex && item.client?.sex?.length > 0 && (
        <span>Пол: {item.client?.sex.length} шт.</span>
      )}
      {item.client?.colorsDiscount &&
        item.client?.colorsDiscount?.length > 0 && (
          <span>Цвет: {item.client?.colorsDiscount.length} шт.</span>
        )}
      {item.client?.guidDiscount && item.client?.guidDiscount?.length > 0 && (
        <span>Акции: {item.client?.guidDiscount.length} шт.</span>
      )}
      {item.client?.guidBonus && item.client?.guidBonus?.length > 0 && (
        <span>Бонусы: {item.client?.guidBonus.length} шт.</span>
      )}
      {item.store?.channel && item.store?.channel?.length > 0 && (
        <span>Канал: {item.store?.channel.length} шт.</span>
      )}
      {item.store?.storeCondition && item.store?.storeCondition?.length > 0 && (
        <span>Статус: {item.store?.storeCondition.join(", ")}</span>
      )}
      {item.store?.ageGroup && item.store?.ageGroup?.length > 0 && (
        <span>
          Период деятельности магазина: {item.store?.ageGroup.length} шт.
        </span>
      )}
      {item.store?.idManager && item.store?.idManager?.length > 0 && (
        <span>Партнеры: {item.store?.idManager.length} шт.</span>
      )}
      {item.store?.idRegion && item.store?.idRegion?.length > 0 && (
        <span>Регион: {item.store?.idRegion.length} шт.</span>
      )}
      {item.store?.idCity && item.store?.idCity?.length > 0 && (
        <span>Город: {item.store?.idCity.length} шт.</span>
      )}
      {item.store?.idStore && item.store?.idStore?.length > 0 && (
        <span>Магазин: {item.store?.idStore.length} шт.</span>
      )}
      {item.onlineStore?.isIm !== undefined &&
        item.onlineStore?.isIm !== null && (
          <span>Интернет-магазин: {item.onlineStore?.isIm ? "да" : "нет"}</span>
        )}
      {item.onlineStore?.imTypeOrder &&
        item.onlineStore?.imTypeOrder?.length > 0 && (
          <span>Тип заказа: {item.onlineStore?.imTypeOrder.join(", ")}</span>
        )}
      {item.onlineStore?.imDeliveryMethod &&
        item.onlineStore?.imDeliveryMethod?.length > 0 && (
          <span>
            Метод доставки: {item.onlineStore?.imDeliveryMethod.join(", ")}
          </span>
        )}
      {item.onlineStore?.imPaymentMethod &&
        item.onlineStore?.imPaymentMethod?.length > 0 && (
          <span>
            Метод оплаты: {item.onlineStore?.imPaymentMethod.join(", ")}
          </span>
        )}
      {item.onlineStore?.imStatusOrder &&
        item.onlineStore?.imStatusOrder?.length > 0 && (
          <span>
            Статус заказа: {item.onlineStore?.imStatusOrder.length} шт.
          </span>
        )}
      {item.onlineStore?.imReceiveInterval &&
        item.onlineStore?.imReceiveInterval?.length > 0 && (
          <span>
            Интервал: {item.onlineStore?.imReceiveInterval.length} шт.
          </span>
        )}
      {item.onlineStore?.imPromo && item.onlineStore?.imPromo?.length > 0 && (
        <span>Промо: {item.onlineStore?.imPromo.length} шт.</span>
      )}
      {item.product?.groupFranchise &&
        item.product?.groupFranchise?.length > 0 && (
          <span>
            Структура продаж: {item.product?.groupFranchise.length} шт.
          </span>
        )}
      {item.product?.directionProducts &&
        item.product?.directionProducts?.length > 0 && (
          <span>Направление: {item.product?.directionProducts.length} шт.</span>
        )}
      {item.product?.groupsEconomist &&
        item.product?.groupsEconomist?.length > 0 && (
          <span>
            Справочник экономиста: {item.product?.groupsEconomist.length} шт.
          </span>
        )}
      {item.product?.managerAuto && item.product?.managerAuto?.length > 0 && (
        <span>Менеджер автозаказа: {item.product?.managerAuto.length} шт.</span>
      )}
      {item.product?.typeProducts && item.product?.typeProducts?.length > 0 && (
        <span>Тип поставщика: {item.product?.typeProducts.length} шт.</span>
      )}
      {item.product?.ppProducts !== null && (
        <span>ПП-продукт: {item.product?.ppProducts ? "да" : "нет"}</span>
      )}
      {item.product?.seasonalityProducts &&
        item.product?.seasonalityProducts?.length > 0 && (
          <span>
            Сезонность: {item.product?.seasonalityProducts.length} шт.
          </span>
        )}
      {item.product?.idGroupMain && item.product?.idGroupMain?.length > 0 && (
        <span>Группа: {item.product?.idGroupMain.length} шт.</span>
      )}
      {item.product?.subGroups && item.product?.subGroups?.length > 0 && (
        <span>Подгруппа: {item.product?.subGroups.length} шт.</span>
      )}
      {item.product?.subSubGroups && item.product?.subSubGroups?.length > 0 && (
        <span>Подподгруппа: {item.product?.subSubGroups.length} шт.</span>
      )}
      {item.product?.idProduct && item.product?.idProduct?.length > 0 && (
        <span>Номенклатура: {item.product?.idProduct.length} шт.</span>
      )}
    </div>
  );
};
