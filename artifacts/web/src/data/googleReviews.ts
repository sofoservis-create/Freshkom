export interface GoogleReview {
  name: string;
  text: string;
  rating: number;
  date: string;
  avatarColor: string;
}

export const GOOGLE_RATING = 4.9;
export const GOOGLE_REVIEW_COUNT = 47;

const avatarColors = [
  "#4285F4",
  "#EA4335",
  "#FBBC05",
  "#34A853",
  "#8E24AA",
  "#00897B",
];

export const googleReviews: GoogleReview[] = [
  {
    name: "Svitlana Muraško",
    text: "Všetko bolo super, sú snažliví a precízni. Sedačka vyzerá ako nová, odporúčam každému!",
    rating: 5,
    date: "pred 3 dňami",
    avatarColor: avatarColors[0],
  },
  {
    name: "Michal Šimko",
    text: "Prišli aj cez víkend, dobrá práca za super cenu. Koberec je konečne čistý, ďakujem!",
    rating: 5,
    date: "pred 1 týždňom",
    avatarColor: avatarColors[1],
  },
  {
    name: "Péter Hegedűs",
    text: "Nagyon köszönöm a szuper munkát, sokkal szebb lett a kanapé, mint vártam! Gyors és precíz munka.",
    rating: 5,
    date: "pred 2 týždňami",
    avatarColor: avatarColors[2],
  },
  {
    name: "Jana Aradská",
    text: "Dobrá práca za fajn cenu, slušný mladý muž, práca mu išla od ruky. Určite zavolám znova.",
    rating: 5,
    date: "pred 3 týždňami",
    avatarColor: avatarColors[3],
  },
  {
    name: "Katalin Varga",
    text: "Nagyon elégedett vagyok a munkával. A matrac olyan lett, mint az új. Köszönöm szépen!",
    rating: 5,
    date: "pred 1 mesiacom",
    avatarColor: avatarColors[4],
  },
  {
    name: "Tomáš Kováč",
    text: "Profesionálny prístup, rýchle schnutie a výborný výsledok. Auto interiér je ako nový.",
    rating: 5,
    date: "pred 1 mesiacom",
    avatarColor: avatarColors[5],
  },
  {
    name: "Erika Nagyová",
    text: "Okná sú žiarivo čisté, bez šmúh. Veľmi spokojná, prídu aj k rodičom.",
    rating: 5,
    date: "pred 2 mesiacmi",
    avatarColor: avatarColors[0],
  },
  {
    name: "Martin Horváth",
    text: "Dohodli sme sa rýchlo, prišli načas a odviedli skvelú prácu. Odporúčam!",
    rating: 5,
    date: "pred 2 mesiacmi",
    avatarColor: avatarColors[3],
  },
];
