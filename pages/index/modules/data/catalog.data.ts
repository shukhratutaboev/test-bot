import { ICatalog } from "../types/catalog.types";

export const catalogList: ICatalog[] = [
  {
    id: 1,
    imgName: "card_1",
    title: "catalog_card_1_title",
    desc: "catalog_card_1_desc",
    count: 567,
    list: [
      {
        label:
          "Бесплатное электричество и возможность продажи его в сеть по «Зеленому тарифу»",
        iconName: "Check",
      },
      {
        label: "Быстрая окупаемость от 3-х лет",
        iconName: "Check",
      },
      {
        label:
          "Снижение потребления электричества из сети до 100% с первого дня эксплуатации",
        iconName: "Check",
      },
      {
        label: "СЭС работают годами без технического обслуживания",
        iconName: "Check",
      },
    ],
    action: {
      label: "All_products_in_this_category",
      to: "/",
    },
  },
  {
    id: 2,
    imgName: "card_2",
    title: "catalog_card_2_title",
    desc: "catalog_card_2_desc",
    count: 567,
    list: [
      {
        label:
          "Бесплатное электричество и возможность продажи его в сеть по «Зеленому тарифу»",
        iconName: "Check",
      },
      {
        label: "Быстрая окупаемость от 3-х лет",
        iconName: "Check",
      },
      {
        label:
          "Снижение потребления электричества из сети до 100% с первого дня эксплуатации",
        iconName: "Check",
      },
      {
        label: "СЭС работают годами без технического обслуживания",
        iconName: "Check",
      },
    ],
    action: {
      label: "All_products_in_this_category",
      to: "/",
    },
  },
  // {
  //   imgName: "card_3",
  //   title: "catalog_card_3_title",
  //   desc: "catalog_card_3_desc",
  //   count: 567,
  //   list: [
  //     {
  //       label:
  //         "Бесплатное электричество и возможность продажи его в сеть по «Зеленому тарифу»",
  //       iconName: "Check",
  //     },
  //     {
  //       label: "Быстрая окупаемость от 3-х лет",
  //       iconName: "Check",
  //     },
  //     {
  //       label:
  //         "Снижение потребления электричества из сети до 100% с первого дня эксплуатации",
  //       iconName: "Check",
  //     },
  //     {
  //       label: "СЭС работают годами без технического обслуживания",
  //       iconName: "Check",
  //     },
  //   ],
  //   action: {
  //     label: "All_products_in_this_category",
  //     to: "/",
  //   },
  // },
];
