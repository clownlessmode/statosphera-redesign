import { Button } from "@shared/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { BookMarked } from "lucide-react";

export const InfoModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BookMarked className="w-4 h-4" />
          <span className="hidden md:block">Руководство</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="md:min-w-[800px] max-md:h-[80vh] max-md:overflow-y-auto scrollbar-hide"
      >
        <div className="md:grid md:grid-cols-[200px_1fr] gap-8 md:h-[80vh]">
          {/* Левая колонка: Навигация */}
          <nav className="sticky top-0 border-r pr-4 pt-4 max-md:hidden">
            <div className="flex flex-col gap-4 items-start">
              <a
                href="#info-main"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Основная информация
              </a>
              <a
                href="#info-clients"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Клиенты
              </a>
              <a
                href="#info-stores"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Магазины
              </a>
              <a
                href="#info-products"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Продукты
              </a>
              <a
                href="#info-im"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Интернет-магазин
              </a>
            </div>
          </nav>

          {/* Правая колонка: Контент с прокруткой */}
          <div className="md:overflow-y-auto scroll-smooth scrollbar-hide text-sm text-muted-foreground">
            {/* Основная информация */}
            <h2
              id="info-main"
              className="text-2xl font-semibold text-foreground pb-4"
            >
              Основная информация
            </h2>
            <div className="space-y-2 pl-4">
              <h3 className="text-base font-medium text-foreground">
                Сегменты и период
              </h3>
              <p>
                <strong>RFM‑сегментация (по квантилям)</strong> — это способ
                разделить клиентов на группы по их активности и ценности,
                используя три показателя: давность последней покупки (
                <strong>Recency</strong>), частоту покупок (
                <strong>Frequency</strong>) и сумму трат (
                <strong>Monetary</strong>).
              </p>
              <p>
                В отличие от фиксированных порогов, квантильный подход
                основывается на распределении данных: каждое значение делится на
                равные части — квантильные группы. Для каждого клиента
                определяется, в каком квантиле он находится по каждому из трёх
                параметров. Чем свежее последняя покупка, тем выше его оценка по
                Recency; чем чаще он покупает, тем выше Frequency; чем больше он
                тратит, тем выше Monetary. Каждый параметр принимает значение от{" "}
                <strong>1 до 3</strong>, где{" "}
                <strong>1 — лучшие показатели</strong>, а{" "}
                <strong>3 — худшие</strong>. Таким образом, каждому клиенту
                присваивается трёхзначный RFM‑код, например <strong>231</strong>
                , который отражает его положение относительно других
                покупателей. Клиенты с высокими оценками по всем трём измерениям
                (например <strong>111</strong>) считаются самыми ценными и
                формируют сегмент лояльных и активных покупателей с крупными
                чеками. Средние (<strong>2</strong>) значения характеризуют
                клиентов с потенциалом роста, а низкие (<strong>3</strong>) —
                тех, кто редких или потерянных. Квантильное деление делает такой
                анализ гибким и адаптивным: сегменты автоматически
                распределяются пропорционально размеру клиентской базы, а
                критерии остаются актуальными при изменении объёмов продаж и
                поведения покупателей.
              </p>
              <p>
                <strong>Период</strong> (в контексте RFM‑сегментации) — это
                временной промежуток, в пределах которого измеряется поведение
                клиента, определяющее его принадлежность к тому или иному
                сегменту. В текущей модели применяется деление на три
                последовательных трёхмесячных периода:{" "}
                <strong>М0, М‑3 и М‑6</strong>.
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong>Период М0</strong> охватывает последние три месяца —
                  от текущей даты минус три месяца по сегодняшний день.
                </li>
                <li>
                  <strong>Период М‑3</strong> представляет собой предыдущий
                  трёхмесячный интервал (от -6 до -3 месяцев от текущей даты).
                </li>
                <li>
                  <strong>Период М‑6</strong> — ещё более ранний этап (от -9 до
                  -6 месяцев от текущей даты).
                </li>
              </ul>
              <p>
                Такое трёхуровневое деление формирует скользящее временное окно
                в прошлое, позволяя анализировать развитие клиентской базы.
              </p>

              <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-destructive">
                <p className="font-semibold">ВНИМАНИЕ!</p>
                <p>
                  При выборе периода, "Промежуток даты" автоматически
                  ограничивается промежутком выбранного периода.
                </p>
              </div>

              <h3 className="text-base font-medium text-foreground pt-2">
                Промежуток даты
              </h3>
              <p>
                Выбранный промежуток дат задаёт временные границы, внутри
                которых производится поиск и анализ пользователей. Это позволяет
                сфокусироваться на конкретном временном срезе, исключая
                неактуальные данные. В этом окне времени оцениваются все
                параметры, за исключением "Аудитория", "Возраст", "Пол" и "Время
                жизни Аккаунта".
              </p>
              <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-destructive">
                <p className="font-semibold">ВНИМАНИЕ!</p>
                <p>
                  При выборе Периода (М0, М-3, М-6) "Промежуток даты"
                  автоматически ограничивается, однако позволяет выбрать даты
                  уже внутри этого периода.
                </p>
                <p className="mt-1">
                  <strong>Пример:</strong> Сегодня 14.11.2025. Мы выбрали период
                  М0. Промежуток даты ограничивается 14.08.2025 – 14.11.2025. В
                  этот момент вы можете выбирать всё, что между этими датами,
                  например, 01.09.2025 - 01.10.2025.
                </p>
              </div>

              <h3 className="text-base font-medium text-foreground pt-2">
                Промежуток времени
              </h3>
              <p>
                Промежуток времени указывает на часы и минуты суток, в которые
                учитывается активность пользователей. Это позволяет ограничить
                выборку клиентами, совершавшими покупки в определённое время
                дня.
              </p>
              <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-destructive">
                <p className="font-semibold">ВНИМАНИЕ!</p>
                <p>
                  Промежуток времени указывается строго в виде возрастания!
                  Например, 00:00 – 23:55, но не 23:55 – 00:00.
                </p>
              </div>

              <h3 className="text-base font-medium text-foreground pt-2">
                Аудитория
              </h3>
              <p>
                Аудитории – сформированные ранее и сохранённые группы
                пользователей. При использовании этого фильтра можно исключать
                или включать те или иные группы.
              </p>
              <p className="mt-1">
                <strong>Пример:</strong> Ранее была сохранена аудитория
                «Пользователи, которые за период 01.10.2025 – 01.11.2025
                совершали только интернет-покупки». Мы можем использовать данную
                аудиторию, а не формировать её заново.
              </p>
              <h3 className="text-base font-medium text-foreground pt-2">
                События
              </h3>
              <p>
                События – это набор условий и фильтров, на основании которых
                формируются аудитории пользователей для выгрузки.
              </p>
              <p>
                Каждое событие описывает определённое действие или
                характеристику, по которой система отбирает клиентов,
                соответствующих заданным критериям. При наличии нескольких
                событий пользователи выбираются только те, кто удовлетворяет
                всем условиям одновременно — происходит пересечение аудиторий.
              </p>
              <p className="mt-1">
                <strong>Пример:</strong>
                <br />
                Условие 1 собрало аудиторию [A, Б, В, Г, Д]
                <br />
                Условие 2 — [A, В, С, Е, Ш]
                <br />
                Итоговый результат выгрузки будет содержать только тех
                пользователей, которые присутствуют в обеих выборках, то есть
                [A, В].
              </p>
              <p>
                Такой механизм позволяет формировать точные и релевантные
                аудитории, объединяя пользователей по нескольким параметрам
                поведения или характеристик.
              </p>

              <h3 className="text-base font-medium text-foreground pt-2">
                Кроме
              </h3>
              <p>
                Кроме – это дополнительный список событий и фильтров, с помощью
                которых из выгрузки исключаются определённые категории
                пользователей.
              </p>
              <p>
                Каждое условие в этом блоке формирует аудиторию, полностью
                вырезаемую из итогового результата.
              </p>
              <p className="mt-1">
                <strong>Пример:</strong>
                <br />
                В блоке События: Условие 1 дало аудиторию [A, Б, В, Г, Д]
                <br />
                В блоке Кроме: Условие 1 определило пользователей [A, Г, С, Я]
                <br />
                Из исходной выборки будут исключены A и Г, а итоговая аудитория
                составит [Б, В, Д].
              </p>
              <p>
                Такой принцип обеспечивает гибкость и точность формирования
                выборок: сначала собирается целевая аудитория по заданным
                событиям, а затем из неё исключаются пользователи, которые не
                соответствуют критериям выгрузки или подпадают под нежелательные
                сценарии.
              </p>
            </div>

            {/* Клиенты */}
            <h2
              id="info-clients"
              className="text-2xl font-semibold text-foreground py-4"
            >
              Клиенты
            </h2>
            <div className="space-y-2 pl-4">
              <h3 className="text-base font-medium text-foreground">Возраст</h3>
              <p>
                Фильтр для ограничения выборки клиентов по их возрастным рамкам.
              </p>
              <h3 className="text-base font-medium text-foreground">
                Количество покупок
              </h3>
              <p>
                Ограничивает выборку по числу совершённых покупок за выбранный
                период.
              </p>
              <h3 className="text-base font-medium text-foreground">
                Общая выручка пользователя
              </h3>
              <p>
                Суммарный объём денежных средств, который клиент потратил за
                выбранный период.
              </p>
              <h3 className="text-base font-medium text-foreground">
                Сумма чека
              </h3>
              <p>
                Денежный объём одной покупки клиента. Фильтр позволяет выделить
                покупателей с мелкими или крупными транзакциями.
              </p>
              <p className="mt-1">
                <strong>Пример:</strong> Пользователь А совершил за месяц 3
                покупки на 500, 1000 и 1500 рублей. При фильтре от 1200 до
                10000, он попадает в выборку. Если фильтр будет до 700 рублей,
                он также попадет в выборку.
              </p>
              <h3 className="text-base font-medium text-foreground">
                Средняя длина чека
              </h3>
              <p>
                Среднее количество товаров или позиций, которые клиент
                приобретает в одной покупке.
              </p>
              <h3 className="text-base font-medium text-foreground">
                Средний чек
              </h3>
              <p>
                Отношение общей выручки пользователя к количеству совершённых им
                покупок за выбранный период.
              </p>
              <h3 className="text-base font-medium text-foreground">
                Бонусов у пользователя
              </h3>
              <p>
                Ограничивает выборку по текущему количеству накопленных бонусов,
                независимо от периода.
              </p>
              <h3 className="text-base font-medium text-foreground">
                Потрачено бонусов за период
              </h3>
              <p>
                Ограничивает выборку по количеству бонусов, потраченных за
                выбранный временной промежуток.
              </p>
              <h3 className="text-base font-medium text-foreground">
                Заработано бонусов за период
              </h3>
              <p>
                Определяет количество бонусов, полученных клиентом за заданный
                период.
              </p>
              <h3 className="text-base font-medium text-foreground">Пол</h3>
              <p>
                Позволяет ограничивать выборку по половому признаку. При
                отсутствии выбора система включает всех клиентов.
              </p>
              <h3 className="text-base font-medium text-foreground">
                Цвет (акций)
              </h3>
              <p>
                Определяет, с акциями какого цвета связан пользователь. При
                выборе значения «Все» фильтрация по цвету не применяется.
              </p>
              <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-destructive">
                <p className="font-semibold">ВНИМАНИЕ!</p>
                <p>
                  При выборе «Все», не используются какие-либо фильтры по цвету
                  акции. Все акции, независимо от их цвета, можно выбрать только
                  при выборе «Остальные» и «Оранжевый».
                </p>
              </div>
              <h3 className="text-base font-medium text-foreground">Акция</h3>
              <p>
                Ограничивает пользователей, участвовавших в определённых
                маркетинговых акциях.
              </p>
              <h3 className="text-base font-medium text-foreground">Бонус</h3>
              <p>
                Аналогично фильтру по акциям, но применяется для бонусных
                программ.
              </p>
            </div>

            {/* Магазины */}
            <h2
              id="info-stores"
              className="text-2xl font-semibold text-foreground py-4"
            >
              Магазины
            </h2>
            <div className="space-y-2 pl-4">
              <h3 className="text-base font-medium text-foreground">Канал</h3>
              <p>
                Ограничивает выборку по каналам продаж или типам торговых
                площадок.
              </p>
              <h3 className="text-base font-medium text-foreground">Статус</h3>
              <p>
                Фильтр по статусу открытия магазина (действующие, закрытые).
              </p>
              <h3 className="text-base font-medium text-foreground">
                Период деятельности магазина
              </h3>
              <p>Ограничивает выборку по времени работы магазина.</p>
              <h3 className="text-base font-medium text-foreground">
                Партнёры, Регионы, Города, Магазины
              </h3>
              <p>
                Фильтры по партнёрам, регионам, городам и конкретным торговым
                точкам для географического и точечного анализа.
              </p>
            </div>

            {/* Продукты */}
            <h2
              id="info-products"
              className="text-2xl font-semibold text-foreground py-4"
            >
              Продукты
            </h2>
            <div className="space-y-2 pl-4">
              <h3 className="text-base font-medium text-foreground">
                Группа, Подгруппа, Подподгруппа
              </h3>
              <p>
                Фильтры для анализа ассортимента на разных уровнях детализации.
              </p>
              <h3 className="text-base font-medium text-foreground">
                Номенклатура
              </h3>
              <p>
                Фильтр по конкретным позициям ассортимента для детального
                анализа продаж.
              </p>
            </div>

            {/* Интернет-магазин */}
            <h2
              id="info-im"
              className="text-2xl font-semibold text-foreground py-4"
            >
              Интернет-магазин
            </h2>
            <div className="space-y-2 pl-4">
              <h3 className="text-base font-medium text-foreground">Тип</h3>
              <p>
                Фильтр для включения/исключения заказов из интернет-магазина:
                «Все», «Только ИМ», «Кроме ИМ».
              </p>
              <h3 className="text-base font-medium text-foreground">
                Источник заказа
              </h3>
              <p>
                Различает, через какой канал был оформлен заказ: приложение,
                сайт или иные.
              </p>
              <h3 className="text-base font-medium text-foreground">
                Способ доставки
              </h3>
              <p>
                Ограничивает выборку по варианту получения заказа: «Курьер»,
                «Самовывоз», «Сбермаркет».
              </p>
              <h3 className="text-base font-medium text-foreground">
                Способ оплаты
              </h3>
              <p>
                Разделяет выборку по методам оплаты: «Онлайн», «Офлайн», «Картой
                курьеру».
              </p>
              <h3 className="text-base font-medium text-foreground">
                Статус заказа
              </h3>
              <p>Ограничивает выборку по текущему состоянию заказов.</p>
              <h3 className="text-base font-medium text-foreground">
                Интервал
              </h3>
              <p>
                Фильтр по временному промежутку оформления или выполнения
                заказов.
              </p>
              <h3 className="text-base font-medium text-foreground">Промо</h3>
              <p>Определяет участие заказов в промоакциях.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
