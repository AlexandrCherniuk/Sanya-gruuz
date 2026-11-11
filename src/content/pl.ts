// Wersja polska. Ta sama struktura i fakty co ua.ts, napisane pod polskiego klienta:
// firmy i osoby prywatne wysyłające towar z Polski do Ukrainy i z powrotem, po Europie,
// a także firmy potrzebujące transportu na terenie Ukrainy. Ceny w Ukrainie w UAH,
// w Europie w EUR. Stawki orientacyjne (z rynku), Oleksandr je poprawi.
import type { LangContent } from './types'

export const pl: LangContent = {
  ui: {
    skip: 'Przejdź do formularza',
    menu: 'Menu',
    nav: { ukraine: 'Po Ukrainie', international: 'Międzynarodowy', prices: 'Cennik', contacts: 'Kontakt' },
    cta: 'Wycena transportu',
    ctaShort: 'Wycena',
    call: 'Zadzwoń',
    write: 'Napisz',
    breadcrumbHome: 'Strona główna',
    city: 'Kijów',
    location: "Ukraina · Polska · Słowenia",
    from: 'od',
    more: 'Szczegóły',
    allServices: 'Wszystkie usługi',
    perKm: 'UAH/km',
    orderVehicle: 'Zamów',
    footerAbout:
      'Transport towarów po Ukrainie i za granicę: od busa po TIR-a, ładunki ponadgabarytowe, autolawety, HDS i dźwigi. Transport z Chin morzem i samolotem.',
    footerNote: 'Ceny na stronie są orientacyjne. Dokładną kwotę podajemy po zapytaniu i wpisujemy do zlecenia transportowego.',
    rights: 'Wszelkie prawa zastrzeżone.',
    notFound: {
      title: 'Nie znaleziono strony',
      text: 'Możliwe, że została przeniesiona. Zacznij od strony głównej albo od razu wyślij zapytanie o transport.',
    },
    routesHead: { route: 'Trasa', km: 'Odległość', bus: 'Bus do 2 t', fura: 'TIR 22 t' },
    langSwitch: 'Język strony',
    units: { km: 'km', uah: 'UAH' },
  },

  blocks: {
    trustStrip: [
      { title: 'Od busa po niskopodwoziówkę', text: 'Auto dobrane do wagi i objętości' },
      { title: 'Ukraina, Europa, Chiny, USA', text: 'Drogą, morzem, samolotem' },
      { title: 'Cena w zleceniu', text: 'Ustalona przed załadunkiem' },
      { title: 'Jeden opiekun', text: 'Od zapytania do rozładunku' },
    ],
    directions: {
      eyebrow: 'Usługi',
      title: 'Przewieziemy każdy ładunek',
      sub: 'Transport krajowy w całej Ukrainie, przewozy do i z Europy, import z Chin.',
    },
    transport: {
      eyebrow: 'Flota',
      title: 'Auto pod Twój ładunek',
      sub: 'Typowe parametry nadwozi. Do konkretnego zlecenia dobieramy auto o odpowiedniej ładowności, objętości i sposobie załadunku.',
    },
    steps: {
      eyebrow: 'Jak pracujemy',
      title: 'Cztery kroki do dostawy',
      sub: 'Od pierwszego telefonu do rozładunku transport prowadzi jeden logistyk.',
      items: [
        { title: 'Zapytanie', text: 'Wypełnij formularz, zadzwoń lub napisz na komunikatorze: skąd, dokąd i co wieziemy.' },
        { title: 'Wycena i zlecenie', text: 'Logistyk dobiera auto i trasę, podaje cenę. Warunki zapisujemy w zleceniu transportowym.' },
        { title: 'Podstawienie auta', text: 'Auto przyjeżdża na załadunek o umówionej godzinie. Kierowca zapewnia solidne zabezpieczenie ładunku.' },
        { title: 'Dostawa', text: 'Regularnie informujemy, gdzie jest teraz ładunek. Jesteśmy w kontakcie zawsze, o każdej porze, żeby szybko rozwiązać każdą sytuację awaryjną i każdy problem.' },
      ],
      note: 'Pełna płatność przy rozładunku. Przy rezerwacji auta może być potrzebna przedpłata.',
    },
    why: {
      eyebrow: 'Dlaczego z nami spokojnie',
      title: 'Ładunek pod kontrolą',
      sub: 'Bez pustych obietnic: oto co konkretnie robimy, żeby transport przebiegł bez niespodzianek.',
      items: [
        { icon: 'contract', title: 'Cena nie zmieni się w trasie', text: 'Trasę, terminy i koszt wpisujemy do zlecenia jeszcze przed załadunkiem.' },
        { icon: 'chat', title: 'Logistyk zawsze pod telefonem', text: 'Telefon, Viber, Telegram, WhatsApp. Powiemy, gdzie jest auto i kiedy dojedzie.' },
        { icon: 'truck', title: 'Nie przepłacasz za przestrzeń', text: 'Dobieramy nadwozie do ładunku, a dla małych partii proponujemy doładunek.' },
        { icon: 'clock', title: 'Auto od ręki', text: 'W 95% zleceń przewozu ładunku po drodze auto przyjeżdża na miejsce w ciągu 2 godzin. Z logistykiem skontaktujesz się o każdej porze: pracujemy całą dobę.' },
        { icon: 'shield', title: 'Ubezpieczenie ładunku', text: 'Ubezpieczamy ładunek od uszkodzenia przez sprawdzonych partnerów, na kwotę do 1 000 000 €.' },
        { icon: 'docs', title: 'Dokumenty na granicę', text: 'CMR, dokumenty przewozowe, odprawa celna przez agencję celną na trasach międzynarodowych.' },
        { icon: 'route', title: 'Od drzwi do drzwi', text: 'Odbieramy i dowozimy pod wskazane adresy, bez przeładunków po drodze.' },
      ],
    },
    routes: {
      eyebrow: 'Ceny orientacyjne',
      title: 'Popularne trasy z Kijowa',
      sub: 'Wyliczenie według minimalnej stawki za auto na wyłączność. Doładunek wychodzi taniej.',
      note: 'Orientacyjnie według stawki „od”. Na cenę wpływają waga, objętość, załadunek i obłożenie kierunku. Dokładną kwotę poda logistyk.',
      list: [
        { from: 'Kijów', to: 'Lwów', km: 540 },
        { from: 'Kijów', to: 'Odessa', km: 475 },
        { from: 'Kijów', to: 'Dniepr', km: 480 },
        { from: 'Kijów', to: 'Charków', km: 480 },
        { from: 'Kijów', to: 'Winnica', km: 270 },
        { from: 'Kijów', to: 'Równe', km: 330 },
        { from: 'Kijów', to: 'Czerniowce', km: 530 },
        { from: 'Kijów', to: 'Użhorod', km: 790 },
      ],
    },
    faq: { eyebrow: 'Pytania', title: 'Najczęstsze pytania' },
    clients: {
      eyebrow: 'Z kim pracujemy',
      title: 'Powierzają nam transport',
      sub: 'Wozimy dla firm każdej wielkości i dla klientów prywatnych. Do każdego zadania własne auto i własny plan.',
      logosTitle: 'Wśród naszych klientów',
      items: [
        { icon: 'business', title: 'Małe i średnie firmy', text: 'Regularne dostawy, towar na paletach, dostawy do klientów w Ukrainie.' },
        { icon: 'store', title: 'JDG i sklepy internetowe', text: 'Partie towaru z Chin i Europy, dostawa do magazynu lub prosto do kupującego.' },
        { icon: 'factory', title: 'Producenci', text: 'Surowce do zakładu, gotowe wyroby do dystrybutora, maszyny i urządzenia.' },
        { icon: 'build', title: 'Firmy budowlane', text: 'Materiały budowlane, maszyny na niskopodwoziówce, HDS i dźwig na budowę.' },
        { icon: 'agro', title: 'Rolnictwo', text: 'Maszyny rolnicze, zboże, nawozy, ładunki sypkie wywrotkami.' },
        { icon: 'home', title: 'Klienci prywatni', text: 'Przeprowadzki, meble i AGD, samochody z Europy.' },
      ],
    },
    cta: {
      title: 'Wycenimy transport Twojego ładunku',
      text: 'Zostaw numer telefonu i trasę. Logistyk oddzwoni, dobierze auto i poda cenę.',
      button: 'Wycena transportu',
      or: 'albo napisz do nas',
      orMobile: 'Napisz do nas na komunikatorze',
    },
    related: 'Inne usługi',
    cargoTitle: 'Co przewozimy',
    pricesTitle: 'Cennik',
  },

  home: {
    meta: {
      title: 'Transport do Ukrainy z Polski i Europy oraz po Ukrainie | CR Logistics',
      description:
        'Transport towarów: Polska – Ukraina, Europa, cała Ukraina. Bus, TIR, ładunki ponadgabarytowe, autolawety. Import z Chin morzem i samolotem. Wycena po zapytaniu.',
    },
    eyebrow: "Transport drogowy · Lotniczy · Morski",
    h1: 'Transport towarów',
    h1Accent: 'po Ukrainie i za granicę',
    lead: "Dobierzemy auto do ładunku i podstawimy je w dowolne miejsce w 2 godziny. Wozimy po całej Ukrainie i Europie, morzem i samolotem dostarczamy z Azji i USA, zajmujemy się odprawą celną.",
    bullets: ['Bus od 1,2 €/km, TIR od 1,5 €/km w Europie', 'Auto na wyłączność albo auto jadące po drodze', 'Logistyk dostępny całą dobę', 'Warunki zapisane w zleceniu'],
    faq: [
      {
        q: 'Jak poznać cenę transportu?',
        a: 'Wypełnij formularz albo zadzwoń. Logistyk sprawdzi trasę, wagę i objętość, dobierze auto i poda cenę. Po akceptacji podpisujemy zlecenie transportowe i rezerwujemy auto na wybrany termin.',
      },
      {
        q: 'Od czego zależy cena?',
        a: 'Podstawą jest odległość i rodzaj auta. Liczą się też waga i objętość ładunku, jego cechy (delikatny, ponadgabarytowy), liczba miejsc załadunku, tragarze i obłożenie kierunku: kurs bez ładunku powrotnego kosztuje więcej.',
      },
      {
        q: 'Jak przewieźć taniej?',
        a: 'Jeśli ładunek zajmuje tylko część auta, taniej wychodzi doładunek: płacisz tylko za swoje miejsce. Minus jest taki, że trzeba dopasować się do terminu głównego kursu.',
      },
      {
        q: 'Kto odpowiada za ładunek w trasie?',
        a: 'Przewoźnik odpowiada za ładunek zgodnie ze zleceniem. Kierowca sprawdza stan i zabezpieczenie przy załadunku. W transporcie międzynarodowym działa ubezpieczenie OCP (CMR), rozszerzone ubezpieczenie organizujemy na życzenie.',
      },
      {
        q: 'Jak zapłacić za transport?',
        a: 'Sposób i termin płatności zapisujemy w zleceniu transportowym. Zwykle część płacisz przy rezerwacji auta, resztę po dostawie.',
      },
      {
        q: 'Czy można zamówić tragarzy?',
        a: 'Tak. Zapewnimy tragarzy na załadunek i rozładunek, a przy przeprowadzkach także demontaż mebli i pakowanie.',
      },
      {
        q: 'Czy można jechać razem z ładunkiem?',
        a: 'Tak, w busach i ciężarówkach zwykle jest miejsce dla pasażera. Napisz o tym w zapytaniu, żebyśmy dobrali odpowiednie auto.',
      },
      {
        q: 'Czy jeździcie za granicę?',
        a: 'Tak. Wozimy z Ukrainy do krajów Europy i z powrotem, po Europie, a także sprowadzamy ładunki z Chin morzem i samolotem.',
      },
    ],
  },

  vehicles: [
    {
      id: 'bus',
      name: 'Bus dostawczy',
      use: 'Przeprowadzki, meble, AGD, małe partie towaru',
      specs: [
        { label: 'Ładowność', value: '1–2 t' },
        { label: 'Objętość', value: 'do 20 m³' },
        { label: 'Przestrzeń, D×S×W', value: 'do 4,8×2,2×2,2 m' },
        { label: 'Palety', value: 'do 8–10' },
      ],
      price: 'od 60 UAH/km',
    },
    {
      id: 't5',
      name: 'Ciężarówka 5 t',
      use: 'Ładunki handlowe, palety, przeprowadzki biur',
      specs: [
        { label: 'Ładowność', value: 'do 5 t' },
        { label: 'Objętość', value: 'do 36–45 m³' },
        { label: 'Przestrzeń, D×S×W', value: 'do 7,2×2,45×2,5 m' },
        { label: 'Palety', value: 'do 15–18' },
      ],
      price: 'od 80 UAH/km',
    },
    {
      id: 't10',
      name: 'Ciężarówka 10 t',
      use: 'Materiały budowlane, maszyny, duże partie',
      specs: [
        { label: 'Ładowność', value: 'do 10 t' },
        { label: 'Objętość', value: 'do 50 m³' },
        { label: 'Przestrzeń, D×S×W', value: 'do 9×2,45×2,7 m' },
        { label: 'Palety', value: 'do 22' },
      ],
      price: 'od 100 UAH/km',
    },
    {
      id: 'fura',
      name: 'TIR (plandeka)',
      use: 'Całopojazdowe ładunki po Ukrainie i do Europy',
      specs: [
        { label: 'Ładowność', value: 'do 22 t' },
        { label: 'Objętość', value: '86–92 m³' },
        { label: 'Przestrzeń, D×S×W', value: '13,6×2,45×2,7 m' },
        { label: 'Palety', value: 'do 33–34' },
      ],
      price: 'od 70 UAH/km',
    },
    {
      id: 'coupler',
      name: 'Zestaw z przyczepą (tandem)',
      use: 'Lekkie, objętościowe ładunki, gdy liczą się metry sześcienne',
      specs: [
        { label: 'Ładowność', value: 'do 22 t' },
        { label: 'Objętość', value: '110–120 m³' },
        { label: 'Przestrzeń', value: '2 × 7,7 m' },
        { label: 'Palety', value: 'do 36–38' },
      ],
      price: 'od 80 UAH/km',
    },
    {
      id: 'carrier',
      name: 'Autolaweta',
      use: 'Nowe i używane auta, kilka samochodów w jednym kursie',
      specs: [
        { label: 'Pojemność', value: 'do 8 aut osobowych' },
        { label: 'Warianty', value: 'laweta, otwarta, zamknięta' },
        { label: 'Także', value: 'motocykle, auta powypadkowe' },
      ],
      price: 'od 40 UAH/km',
    },
    {
      id: 'lowbed',
      name: 'Naczepa niskopodwoziowa',
      use: 'Maszyny budowlane i rolnicze, ponadgabaryty',
      specs: [
        { label: 'Ładowność', value: 'do 60–80 t' },
        { label: 'Platforma', value: 'niskopodwoziowa, teleskopowa' },
        { label: 'Zezwolenia', value: 'załatwiamy pod trasę' },
      ],
      price: 'od 100 UAH/km',
    },
    {
      id: 'manipulator',
      name: 'Samochód z HDS',
      use: 'Załadunek bez dźwigu: bloczki, kontenery, urządzenia',
      specs: [
        { label: 'Skrzynia', value: '6–8 m' },
        { label: 'Żuraw', value: 'od 3 do 7 t' },
        { label: 'Przewóz', value: 'do 10 t' },
      ],
      price: 'od 100 UAH/km',
    },
    {
      id: 'reefer',
      name: 'Chłodnia',
      use: 'Żywność, leki, kwiaty: w odpowiedniej temperaturze',
      specs: [
        { label: 'Ładowność', value: 'od 1,5 do 22 t' },
        { label: 'Temperatura', value: 'od −20 do +20 °C' },
        { label: 'Palety', value: 'do 33' },
      ],
      price: 'od 80 UAH/km',
    },
    {
      id: 'tipper',
      name: 'Wywrotka / zbożówka',
      use: 'Piasek, kruszywo, ziemia, zboże, nawozy',
      specs: [
        { label: 'Objętość skrzyni', value: '20–60 m³' },
        { label: 'Ładowność', value: 'do 25–40 t' },
        { label: 'Rozładunek', value: 'wywrotem' },
      ],
      price: 'od 100 UAH/km',
    },
    {
      id: 'tanker',
      name: 'Cysterna',
      use: 'Płyny spożywcze i techniczne, olej, paliwo',
      specs: [
        { label: 'Objętość', value: '20–40 m³' },
        { label: 'Rodzaje', value: 'spożywcza, chemiczna, paliwowa' },
      ],
      price: 'od 100 UAH/km',
    },
    {
      id: 'crane',
      name: 'Dźwig samojezdny',
      use: 'Podnoszenie i montaż ciężkich ładunków na miejscu',
      specs: [
        { label: 'Udźwig', value: '25–50 t' },
        { label: 'Rozliczenie', value: 'godzinowe, minimalna zmiana' },
      ],
      price: 'na zapytanie',
    },
  ],

  hubs: [
    {
      slug: 'ukraine',
      meta: {
        title: 'Transport towarów po Ukrainie',
        description:
          'Transport między miastami Ukrainy: bus do 2 t, ciężarówki 5–10 t, TIR 22 t, ponadgabaryty. Stawki od 60 UAH/km, auto na wyłączność albo doładunek.',
      },
      h1: 'Transport towarów po Ukrainie',
      lead: 'Wozimy między dowolnymi miastami i wsiami Ukrainy: od kilku kartonów w doładunku po pełnego TIR-a albo ponadgabaryt na niskopodwoziówce.',
      bullets: ['Bus, ciężarówki 5–10 t, TIR 22 t', 'Auto na wyłączność albo doładunek', 'Tragarze w razie potrzeby'],
      sections: [
        {
          title: 'Co robimy',
          items: [
            'Przewozy między miastami: Kijów, Lwów, Odessa, Dniepr, Charków, Winnica, Użhorod i każda inna miejscowość',
            'Kompleksowe przeprowadzki mieszkań i biur',
            'Ładunki handlowe: palety, maszyny, materiały budowlane',
            'Doładunek (transport drobnicowy) dla małych partii',
            'Ponadgabaryty, maszyny, autolawety, HDS, dźwigi',
            'Chłodnie, wywrotki i zbożówki, cysterny',
          ],
        },
        {
          title: 'Jak liczymy cenę',
          text: 'Stawka zależy od rodzaju auta i odległości. Na kwotę wpływają też waga i objętość, liczba miejsc załadunku, potrzeba tragarzy i obłożenie kierunku. Stawki „od” na stronie są orientacyjne, dokładną cenę logistyk podaje po zapytaniu.',
        },
      ],
      faq: [
        {
          q: 'Ile kosztuje transport po Ukrainie?',
          a: 'Bus do 2 t na wyłączność od 60 UAH/km, ciężarówka 5 t od 50, 10 t od 60, TIR 22 t od 70 UAH/km. Dokładna cena zależy od ładunku i trasy.',
        },
        {
          q: 'Jak szybko można podstawić auto?',
          a: 'To zależy od dostępności aut w regionie. Często auto znajdzie się na ten sam lub następny dzień; na konkretną datę lepiej zarezerwować wcześniej.',
        },
        {
          q: 'Czy wozicie do małych miejscowości i wsi?',
          a: 'Tak, adres załadunku i rozładunku może być dowolny, z wyjątkiem strefy aktywnych działań wojennych.',
        },
        {
          q: 'Czy można przewieźć ładunek z pasażerem?',
          a: 'Tak, w busach i ciężarówkach zwykle jest miejsce dla osoby towarzyszącej. Zaznacz to w zapytaniu.',
        },
      ],
    },
    {
      slug: 'international',
      meta: {
        title: 'Transport międzynarodowy: Ukraina – Europa, Chiny, morze, samolot',
        description:
          'Transport z Polski i Europy do Ukrainy i z powrotem, przewozy po Europie, import z Chin morzem i samolotem. Auto na wyłączność, doładunek, kontenery.',
      },
      h1: 'Transport międzynarodowy',
      lead: 'Przewieziemy ładunek z Ukrainy do Europy i z powrotem, po Europie, a także zorganizujemy dostawę towarów z Chin morzem albo samolotem.',
      bullets: ['Ukraina ↔ Europa, kursy po UE', 'Import z Chin: morze, samolot', 'Dokumenty i odprawa celna'],
      sections: [
        {
          title: 'Kierunki',
          text: 'Polska, Niemcy, Czechy, Słowacja, Węgry, Rumunia, Bułgaria, Austria, Słowenia, Chorwacja, Włochy, Francja, Hiszpania, Holandia, Belgia, kraje bałtyckie i inne. Do każdej trasy dobieramy auto i schemat dostawy.',
        },
        {
          title: 'Kompleksowo',
          items: [
            'Dobór auta do wagi, objętości i rodzaju ładunku',
            'Załadunek pod adresem nadawcy',
            'CMR i dokumenty przewozowe, odprawa celna przez agencję celną',
            'Dostawa pod drzwi odbiorcy',
          ],
        },
      ],
      faq: [
        {
          q: 'Jak liczy się cenę transportu międzynarodowego?',
          a: 'Drogą: za kilometr albo ryczałtem za trasę. Bus do 2 t orientacyjnie 1,2 €/km, TIR 22 t 1,5 €/km, paleta w doładunku od 0,4 €/km. Morze i samolot: za metr sześcienny albo kilogram.',
        },
        {
          q: 'Kto zajmuje się odprawą celną?',
          a: 'Odprawę celną robimy przez partnerską agencję celną. Od Ciebie potrzebujemy faktury, listy pakunkowej i innych dokumentów towaru.',
        },
        {
          q: 'Czy można wysłać mały ładunek?',
          a: 'Tak, dowolna waga w doładunku. Z Chin: w kontenerze zbiorczym albo samolotem.',
        },
      ],
    },
  ],

  services: [
    // ——— Po Ukrainie ———
    {
      slug: 'bus',
      group: 'ukraine',
      meta: {
        title: 'Transport busem do 2 ton po Ukrainie od 60 UAH/km',
        description:
          'Bus dostawczy do 2 t i 20 m³ na przeprowadzki, meble i małe partie towaru. Auto na wyłączność albo doładunek, przejazd z ładunkiem, tragarze.',
      },
      card: { icon: 'bus', title: 'Bus do 2 t', text: 'Przeprowadzki, meble, AGD, małe partie', price: 'od 60 UAH/km' },
      h1: 'Transport busem do 2 ton',
      lead: 'Bus dostawczy typu Sprinter, Crafter albo Master: pojemny, szybki i tani przy małych ładunkach po Ukrainie.',
      bullets: ['Do 2 t i do 20 m³', 'Możesz jechać razem z ładunkiem', 'Tragarze w razie potrzeby'],
      priceFrom: 'od 60 UAH/km',
      intro: {
        title: 'Bus do małych ładunków',
        paragraphs: [
          'Bus dostawczy to najpopularniejszy wybór przy ładunkach do 2 ton. Szybko jedzie trasą, łatwo wjeżdża na podwórka i pod klatkę, a 20 m³ przestrzeni wystarcza na przeprowadzkę mieszkania albo partię towaru dla sklepu.',
          'Podstawimy auto pod adres, kierowca zabezpieczy ładunek pasami i bus od razu ruszy do celu, bez przeładunków. Jeśli trzeba, w kabinie pojedzie osoba towarzysząca, a na załadunek przyjadą tragarze.',
        ],
      },
      cargo: {
        title: 'Co przewozimy busem',
        items: ['Rzeczy i meble przy przeprowadzce', 'AGD i RTV', 'Kartony, paczki', 'Towar na 1–8 paletach', 'Części zamienne', 'Wyposażenie sklepu lub biura'],
      },
      sections: [
        {
          title: 'Kiedy wystarczy bus',
          text: 'Bus sprawdzi się przy przeprowadzce kawalerki lub mieszkania dwupokojowego, małego biura albo partii towaru do 2 ton. Jeśli ładunek zajmuje mniej niż połowę przestrzeni, zaproponujemy doładunek: tak jest taniej.',
        },
        {
          title: 'Co obejmuje usługa',
          items: ['Podstawienie auta pod adres', 'Pasy do zabezpieczenia ładunku', 'Miejsce dla osoby towarzyszącej', 'Dodatkowe miejsce załadunku po uzgodnieniu'],
        },
      ],
      prices: {
        title: 'Ceny busa',
        rows: [
          { label: 'Bus do 2 t na wyłączność', value: 'od 60 UAH/km' },
          { label: 'Rzeczy i meble (przeprowadzka)', value: 'od 60 UAH/km' },
          { label: 'Doładunek', value: 'od 15 UAH/km' },
          { label: 'Tragarz', value: 'od 250 UAH/godz.', note: 'minimum 2 godziny' },
        ],
        note: 'Stawki orientacyjne. Dokładną cenę logistyk poda po zapytaniu.',
      },
      vehicles: ['bus', 't5'],
      faq: [
        {
          q: 'Ile rzeczy zmieści się do busa?',
          a: 'Przestrzeń do 20 m³ to mniej więcej wyposażenie kawalerki: szafa, kanapa, łóżko, lodówka, pralka i 15–20 kartonów.',
        },
        {
          q: 'Czy można jechać razem z ładunkiem?',
          a: 'Tak, w kabinie są zwykle jedno lub dwa miejsca dla pasażerów. Zaznacz to w zapytaniu.',
        },
        {
          q: 'Czy kierowca pomoże załadować?',
          a: 'Kierowca zabezpiecza ładunek w przestrzeni ładunkowej. Do noszenia lepiej zamówić tragarzy: zorganizujemy ich na załadunek i rozładunek.',
        },
      ],
    },
    {
      slug: 'trucks',
      group: 'ukraine',
      meta: {
        title: 'Transport ciężarówką 5 i 10 ton po Ukrainie od 80 UAH/km',
        description:
          'Ciężarówki 5 t i 10 t do ładunków handlowych, palet, maszyn i materiałów budowlanych. Plandeka, izoterma, winda. Stawki od 80 UAH/km.',
      },
      card: { icon: 'truck', title: 'Ciężarówki 5–10 t', text: 'Ładunki handlowe, palety, maszyny', price: 'od 80 UAH/km' },
      h1: 'Transport ciężarówką 5 i 10 ton',
      lead: 'Średnie ciężarówki dla firm: partie towaru, palety, maszyny, materiały budowlane. Dobierzemy nadwozie do ładunku i sposobu załadunku.',
      bullets: ['Do 10 t i do 50 m³', 'Plandeka, izoterma, winda', 'Załadunek z góry, z boku, z tyłu'],
      priceFrom: 'od 80 UAH/km',
      intro: {
        title: 'Ciężarówki dla firm',
        paragraphs: [
          'Pięcio- i dziesięciotonowe auta załatwiają większość potrzeb firm: dostawy do magazynu, do klientów, transport maszyn i materiałów budowlanych. Cenowo i pojemnościowo to złoty środek między busem a TIR-em.',
          'Nadwozie dobieramy do ładunku: plandeka, gdy potrzebny jest załadunek z boku lub z góry; furgon do towaru, który boi się kurzu; izoterma lub chłodnia do żywności; winda, gdy na miejscu nie ma wózka widłowego.',
        ],
      },
      cargo: {
        title: 'Co przewozimy',
        items: ['Towar na paletach', 'Materiały budowlane', 'Maszyny i obrabiarki', 'Agregaty prądotwórcze', 'Kable i wyroby hutnicze', 'Meble i AGD w partiach', 'Towar w kartonach, workach, big-bagach', 'Płody rolne'],
      },
      sections: [
        {
          title: 'Nadwozia',
          items: ['Plandeka: uniwersalna, z możliwością rozsunięcia', 'Furgon (kontener)', 'Izoterma i chłodnia do żywności', 'Winda do załadunku bez wózka widłowego'],
        },
        {
          title: 'Dla firm',
          text: 'Obsługujemy regularne dostawy do magazynów i sklepów, dostawy od producenta do klienta, przeprowadzki biur i magazynów. Warunki i terminy płatności zapisujemy w umowie.',
        },
      ],
      prices: {
        title: 'Ceny ciężarówek',
        rows: [
          { label: 'Ciężarówka do 5 t', value: 'od 80 UAH/km' },
          { label: 'Ciężarówka do 10 t', value: 'od 100 UAH/km' },
          { label: 'Doładunek', value: 'do uzgodnienia' },
        ],
        note: 'Stawki orientacyjne. Na cenę wpływają waga, objętość, rodzaj nadwozia i kierunek.',
      },
      vehicles: ['t5', 't10'],
      faq: [
        {
          q: 'Jakie auto wybrać: 5 czy 10 ton?',
          a: 'Kieruj się wagą i liczbą palet: do 15–18 palet i 5 t wystarczy pięciotonówka, do 22 palet i 10 t dziesięciotonówka. Logistyk doradzi na podstawie parametrów ładunku.',
        },
        {
          q: 'Czy macie auta z windą?',
          a: 'Tak, jeśli na miejscu nie ma wózka widłowego, dobierzemy ciężarówkę z windą. Zaznacz to w zapytaniu.',
        },
        {
          q: 'Czy można wozić żywność?',
          a: 'Tak, do żywności dobieramy izotermę albo chłodnię z odpowiednią temperaturą.',
        },
      ],
    },
    {
      slug: 'fura',
      group: 'ukraine',
      meta: {
        title: 'Transport TIR-em 22 t po Ukrainie od 70 UAH/km',
        description:
          'TIR 22 t, 86–92 m³, 33 palety, a także zestawy z przyczepą do 120 m³. Ładunki całopojazdowe po Ukrainie i do Europy. Stawki od 70 UAH/km.',
      },
      card: { icon: 'trailer', title: 'TIR 22 t i tandem', text: 'Całe auta, do 34 palet', price: 'od 70 UAH/km' },
      h1: 'Transport TIR-em 22 tony',
      lead: 'Naczepy plandekowe i zestawy z przyczepą do dużych partii: do 22 ton, do 34 palet albo do 120 m³ lekkiego, objętościowego ładunku.',
      bullets: ['Do 22 t, 86–120 m³', 'Do 33–38 palet', 'Pełne rozsunięcie plandeki'],
      priceFrom: 'od 70 UAH/km',
      intro: {
        title: 'Cały ładunek jednym autem',
        paragraphs: [
          'TIR to najtańszy sposób na przewóz dużej partii: kilometr kosztuje więcej niż w mniejszej ciężarówce, ale w przeliczeniu na tonę czy paletę wychodzi korzystniej.',
          'Wozimy TIR-ami po całej Ukrainie i do krajów Europy. Do lekkich, ale objętościowych ładunków proponujemy zestawy do 120 m³, do żywności chłodnie.',
        ],
      },
      cargo: {
        title: 'Co przewozimy TIR-em',
        items: ['Towar paletowy', 'Materiały budowlane', 'Konstrukcje stalowe', 'Opakowania', 'Meble', 'Zboże w big-bagach', 'Żywność (chłodnia)', 'Lekkie ładunki objętościowe (tandem)'],
      },
      sections: [
        {
          title: 'TIR czy tandem',
          text: 'Standardowa naczepa ma 13,6 m i 86–92 m³. Jeśli ładunek jest lekki, ale objętościowy, korzystniejszy jest zestaw z przyczepą: dwie skrzynie po 7,7 m dają do 120 m³.',
        },
        {
          title: 'Sposoby załadunku',
          items: ['Z tyłu z rampy', 'Z boku po rozsunięciu plandeki', 'Z góry, po zdjęciu kłonic i poprzeczek', 'Kilka miejsc załadunku lub rozładunku'],
        },
      ],
      prices: {
        title: 'Ceny TIR-a',
        rows: [
          { label: 'TIR 22 t (plandeka)', value: 'od 70 UAH/km' },
          { label: 'Tandem do 120 m³', value: 'od 80 UAH/km' },
          { label: 'TIR po Europie', value: 'od 1,5 €/km' },
        ],
        note: 'Stawki orientacyjne. Cena zależy od trasy, sezonu i dostępności ładunku powrotnego.',
      },
      vehicles: ['fura', 'coupler'],
      faq: [
        {
          q: 'Ile palet mieści TIR?',
          a: 'Standardowa naczepa 13,6 m mieści 33–34 europalety, zestaw z przyczepą do 36–38.',
        },
        {
          q: 'Czy można załadować w jednym miejscu i rozładować w kilku?',
          a: 'Tak, trasę z kilkoma punktami uzgadniamy z góry i uwzględniamy w cenie.',
        },
        {
          q: 'Czy jeździcie TIR-em za granicę?',
          a: 'Tak, nasze auta jeżdżą do krajów Europy i z powrotem. Orientacyjna stawka to 1,5 €/km.',
        },
      ],
    },
    {
      slug: 'negabaryt',
      group: 'ukraine',
      meta: {
        title: 'Transport ponadgabarytowy niskopodwoziówką od 100 UAH/km',
        description:
          'Ponadgabaryty i ładunki ciężkie do 80 t: maszyny budowlane i rolnicze, urządzenia, domy modułowe. Niskopodwoziówki, platformy, zezwolenia i trasa.',
      },
      card: { icon: 'oversized', title: 'Ponadgabaryty', text: 'Maszyny i urządzenia do 80 t', price: 'od 100 UAH/km' },
      h1: 'Transport ponadgabarytowy',
      lead: 'Niskopodwoziówkami i platformami wozimy to, co nie mieści się w zwykłym nadwoziu: maszyny, urządzenia, konstrukcje. Załatwiamy zezwolenia i planujemy trasę.',
      bullets: ['Do 60–80 t', 'Naczepy niskopodwoziowe i teleskopowe', 'Zezwolenia i trasa pod ładunek'],
      priceFrom: 'od 100 UAH/km',
      cargo: {
        title: 'Co przewozimy',
        items: ['Koparki, ładowarki, spycharki', 'Ciągniki i kombajny', 'Maszyny drogowe', 'Urządzenia i linie przemysłowe', 'Konstrukcje stalowe, zbiorniki', 'Kioski, kontenery, domy modułowe', 'Prefabrykaty betonowe, płyty'],
      },
      sections: [
        {
          title: 'Jak to wygląda',
          items: [
            'Otrzymujemy wymiary, wagę i zdjęcia ładunku',
            'Dobieramy niskopodwoziówkę albo platformę',
            'Planujemy trasę z uwzględnieniem mostów, linii energetycznych i ograniczeń',
            'Załatwiamy zezwolenia na przejazd ponadgabarytowy',
            'W razie potrzeby organizujemy pilotaż oraz dźwig lub HDS do załadunku',
          ],
        },
      ],
      prices: {
        title: 'Ceny ponadgabarytów',
        rows: [
          { label: 'Niskopodwoziówka po Ukrainie', value: 'od 100 UAH/km' },
          { label: 'Zezwolenia i pilotaż', value: 'liczone osobno' },
        ],
        note: 'Cenę liczymy indywidualnie: zależy od wymiarów, wagi i trasy.',
      },
      vehicles: ['lowbed', 'manipulator', 'crane'],
      faq: [
        {
          q: 'Co to jest ładunek ponadgabarytowy?',
          a: 'Ładunek szerszy niż 2,6 m, wyższy niż 4 m razem z autem, dłuższy niż 22 m albo cięższy niż dopuszczalny nacisk. Taki ładunek wymaga zezwoleń i uzgodnionej trasy.',
        },
        {
          q: 'Jak długo trwa uzyskanie zezwoleń?',
          a: 'To zależy od wymiarów i trasy. Dlatego z ponadgabarytem najlepiej zgłosić się z wyprzedzeniem.',
        },
        {
          q: 'Czy możecie przywieźć maszynę z Europy?',
          a: 'Tak, wozimy niskopodwoziówkami z Polski, Niemiec i innych krajów UE do Ukrainy.',
        },
      ],
    },
    {
      slug: 'avtovoz',
      group: 'ukraine',
      meta: {
        title: 'Transport samochodów autolawetą: Ukraina i Europa',
        description:
          'Przewóz aut autolawetą i lawetą po Ukrainie i z Europy: osobowe, motocykle, elektryki, auta powypadkowe. Lawety otwarte i zamknięte.',
      },
      card: { icon: 'car', title: 'Autolaweta', text: 'Auta po Ukrainie i z Europy', price: 'od 40 UAH/km' },
      h1: 'Transport samochodów autolawetą',
      lead: 'Przewieziemy jedno auto lawetą albo kilka autolawetą: po Ukrainie, z Europy do Ukrainy i z powrotem.',
      bullets: ['Laweta na 1–2 auta, autolaweta do 8', 'Lawety otwarte i zamknięte', 'Auta powypadkowe i niejezdne'],
      priceFrom: 'od 40 UAH/km',
      cargo: {
        title: 'Co przewozimy',
        items: ['Samochody osobowe', 'SUV-y i minivany', 'Samochody elektryczne', 'Motocykle i quady', 'Auta powypadkowe', 'Nowe auta z salonu'],
      },
      sections: [
        {
          title: 'Warianty',
          items: ['Laweta na jedno-dwa auta: szybko, bez czekania na komplet', 'Autolaweta do 8 aut: taniej w przeliczeniu na auto', 'Laweta zamknięta: dla drogich i kolekcjonerskich aut'],
        },
        {
          title: 'Z Europy',
          text: 'Przywieziemy auto z Litwy, Polski, Niemiec i innych krajów: z aukcji, od dealera albo od osoby prywatnej. Pomożemy z dokumentami na przekroczenie granicy.',
        },
      ],
      prices: {
        title: 'Ceny autolawety',
        rows: [
          { label: 'Po Ukrainie', value: 'od 40 UAH/km' },
          { label: 'Z Litwy do Ukrainy', value: 'od 850 €' },
        ],
        note: 'Cena zależy od modelu, wagi, trasy i liczby aut.',
      },
      vehicles: ['carrier'],
      faq: [
        {
          q: 'Czy można przewieźć auto niejezdne?',
          a: 'Tak, wciągamy je wyciągarką. Opisz stan auta w zapytaniu.',
        },
        {
          q: 'Czy auto jest ubezpieczone w trasie?',
          a: 'Przewoźnik odpowiada za auto zgodnie ze zleceniem. Dodatkowe ubezpieczenie organizujemy na życzenie.',
        },
      ],
    },
    {
      slug: 'manipulator',
      group: 'ukraine',
      meta: {
        title: 'Usługi HDS w Kijowie i w całej Ukrainie',
        description:
          'Samochód z HDS, skrzynią 6–8 m i żurawiem do 7 t: załadunek i przewóz bloczków, kiosków, urządzeń, materiałów budowlanych bez osobnego dźwigu.',
      },
      card: { icon: 'manipulator', title: 'HDS', text: 'Sam załaduje i przywiezie', price: 'od 100 UAH/km' },
      h1: 'Usługi HDS',
      lead: 'Ciężarówka z żurawiem HDS sama załaduje, przywiezie i rozładuje ładunek tam, gdzie nie ma wózka widłowego ani osobnego dźwigu.',
      bullets: ['Skrzynia 6–8 m', 'Żuraw od 3 do 7 t', 'Kijów, obwód i cała Ukraina'],
      priceFrom: 'od 100 UAH/km',
      cargo: {
        title: 'Co przewozimy',
        items: ['Materiały budowlane na paletach', 'Kręgi betonowe, bloczki, płyty', 'Kioski, kontenery budowlane', 'Agregaty, urządzenia', 'Kontenery', 'Sejfy i ciężkie przedmioty'],
      },
      sections: [
        {
          title: 'Dlaczego HDS',
          text: 'Nie trzeba osobno zamawiać dźwigu i ciężarówki: jedno auto robi wszystko. To oszczędza czas i pieniądze na mniejszych budowach.',
        },
      ],
      prices: {
        title: 'Ceny',
        rows: [
          { label: 'HDS (przewóz)', value: 'od 100 UAH/km' },
          { label: 'Praca w mieście', value: 'za godzinę, na zapytanie' },
        ],
        note: 'Cena zależy od udźwigu żurawia, czasu pracy i odległości.',
      },
      vehicles: ['manipulator', 'crane'],
      faq: [
        {
          q: 'Jaki ciężar podniesie HDS?',
          a: 'Zależy od żurawia i wysięgu: przy aucie do 7 t, na maksymalnym wysięgu znacznie mniej. Podaj wagę i odległość od auta do miejsca, a dobierzemy sprzęt.',
        },
      ],
    },
    {
      slug: 'avtokran',
      group: 'ukraine',
      meta: {
        title: 'Wynajem dźwigu samojezdnego 25–50 t w Kijowie i obwodzie',
        description:
          'Dźwig samojezdny do montażu, załadunku i podnoszenia ciężkich ładunków. Udźwig 25–50 t, rozliczenie godzinowe, razem z niskopodwoziówką do przewozu.',
      },
      card: { icon: 'crane', title: 'Dźwig', text: 'Podnoszenie i montaż do 50 t', price: 'na zapytanie' },
      h1: 'Wynajem dźwigu samojezdnego',
      lead: 'Dźwig 25–50 ton do załadunku, rozładunku i montażu. Możemy połączyć go z niskopodwoziówką albo TIR-em do przewozu.',
      bullets: ['25–50 t', 'Rozliczenie godzinowe', 'Razem z transportem'],
      cargo: {
        title: 'Do czego się zamawia',
        items: ['Załadunek maszyn na niskopodwoziówkę', 'Montaż konstrukcji stalowych', 'Ustawianie urządzeń', 'Rozładunek materiałów budowlanych', 'Montaż domów modułowych'],
      },
      sections: [
        {
          title: 'Czego potrzebujemy do wyceny',
          items: ['Waga i wymiary ładunku', 'Odległość od dźwigu do miejsca ustawienia', 'Adres i warunki dojazdu', 'Orientacyjny czas pracy'],
        },
      ],
      vehicles: ['crane', 'lowbed'],
      faq: [
        {
          q: 'Jak rozlicza się dźwig?',
          a: 'Za godzinę, z minimalną zmianą. Dojazd dźwigu na budowę poza miastem liczymy osobno.',
        },
      ],
    },
    {
      slug: 'pereizd',
      group: 'ukraine',
      meta: {
        title: 'Przeprowadzki mieszkań i biur po Ukrainie i do Europy',
        description:
          'Przeprowadzki kompleksowe: bus 15–20 m³, tragarze od 250 UAH/godz., pakowanie, przeprowadzki między miastami i za granicę. Auto na wyłączność od 60 UAH/km.',
      },
      card: { icon: 'moving', title: 'Przeprowadzki', text: 'Mieszkanie, biuro, między miastami i za granicę', price: 'od 60 UAH/km' },
      h1: 'Przeprowadzki mieszkań i biur',
      lead: 'Przewieziemy rzeczy, meble i AGD do innego miasta lub kraju. Można zamówić auto z tragarzami, pakowanie i demontaż mebli.',
      bullets: ['Auto na wyłączność od 60 UAH/km', 'Tragarze od 250 UAH/godz.', 'Po Ukrainie i do Europy'],
      priceFrom: 'od 60 UAH/km',
      intro: {
        title: 'Przeprowadzka bez stresu',
        paragraphs: [
          'Przeprowadzka do innego miasta to nie tylko auto. Trzeba rozkręcić meble, spakować rzeczy, wynieść wszystko z mieszkania i równie ostrożnie wnieść na miejscu. Bierzemy na siebie tyle, ile zechcesz: od samego auta po przeprowadzkę kompleksową.',
          'Auto dobierzemy do ilości rzeczy: na kawalerkę wystarczy bus 15–20 m³, przy większych przeprowadzkach ciężarówka. Możesz jechać razem z rzeczami albo zostawić wszystko nam.',
        ],
      },
      cargo: {
        title: 'Co przewozimy',
        items: ['Meble', 'AGD i RTV', 'Rzeczy osobiste w kartonach', 'Meble i sprzęt biurowy', 'Dokumenty i archiwa', 'Rośliny doniczkowe'],
      },
      sections: [
        {
          title: 'Przeprowadzka kompleksowa',
          items: ['Auto dobrane do ilości rzeczy', 'Tragarze na załadunek i rozładunek', 'Demontaż i montaż mebli', 'Materiały do pakowania', 'Wnoszenie na piętro'],
        },
        {
          title: 'Przeprowadzka za granicę',
          text: 'Przewieziemy rzeczy do Polski, Niemiec, Czech, Słowenii i innych krajów Europy. Pomożemy z dokumentami na granicę. Cenę liczymy indywidualnie: zależy od kraju, ilości rzeczy i formatu, auto na wyłączność czy doładunek.',
        },
      ],
      prices: {
        title: 'Ceny przeprowadzek',
        rows: [
          { label: 'Auto na wyłączność 15–20 m³', value: 'od 60 UAH/km' },
          { label: 'Doładunek', value: 'od 15 UAH/km' },
          { label: 'Tragarz', value: 'od 250 UAH/godz.', note: 'minimum 2 godziny' },
          { label: 'Przeprowadzka do Europy', value: 'od 0,3 €/km' },
        ],
        note: 'Stawki orientacyjne. Dokładną cenę podamy, gdy poznamy ilość rzeczy.',
      },
      vehicles: ['bus', 't5'],
      faq: [
        {
          q: 'Jak ocenić, jakie auto jest potrzebne?',
          a: 'Wypisz duże przedmioty (szafy, kanapa, AGD) i przybliżoną liczbę kartonów albo wyślij zdjęcia na komunikatorze. Logistyk dobierze auto.',
        },
        {
          q: 'Czy można przeprowadzić się taniej?',
          a: 'Tak, w doładunku: płacisz tylko za miejsce, które zajmują Twoje rzeczy. Termin zależy wtedy od głównego kursu.',
        },
        {
          q: 'Czy można przewieźć zwierzę razem z rzeczami?',
          a: 'Omów to z logistykiem: w niektórych autach jest to możliwe razem z osobą towarzyszącą.',
        },
      ],
    },
    {
      slug: 'zbirni',
      group: 'ukraine',
      meta: {
        title: 'Drobnica i doładunek po Ukrainie i do Europy',
        description:
          'Doładunek (transport drobnicowy) dla małych partii: płacisz tylko za miejsce w aucie. Po Ukrainie od 15 UAH/km, do Europy od 0,4 €/km za paletę.',
      },
      card: { icon: 'groupage', title: 'Drobnica i doładunek', text: 'Płacisz tylko za swoje miejsce', price: 'od 15 UAH/km' },
      h1: 'Drobnica i doładunek',
      lead: 'Mała partia nie potrzebuje osobnego auta. Dołożymy Twój ładunek do kursu w odpowiednim kierunku, a Ty zapłacisz tylko za zajęte miejsce.',
      bullets: ['Bez minimalnej wagi', 'Po Ukrainie i do Europy', 'Taniej niż auto na wyłączność'],
      priceFrom: 'od 15 UAH/km',
      sections: [
        {
          title: 'Dla kogo',
          items: ['Kilka palet lub kartonów', 'Mała przeprowadzka', 'Regularne drobne dostawy', 'Gdy termin nie jest pilny'],
        },
        {
          title: 'O czym pamiętać',
          text: 'Doładunek jest tańszy, ale data załadunku zależy od głównego kursu. Jeśli potrzebujesz dostawy dokładnie w danym dniu, lepsze jest auto na wyłączność.',
        },
      ],
      prices: {
        title: 'Ceny doładunku',
        rows: [
          { label: 'Doładunek po Ukrainie', value: 'od 15 UAH/km' },
          { label: 'Paleta do 300 kg do Europy', value: 'od 0,4 €/km' },
        ],
        note: 'Stawki orientacyjne, zależą od kierunku i ilości.',
      },
      vehicles: ['bus', 'fura'],
      faq: [
        {
          q: 'O ile tańszy jest doładunek?',
          a: 'Zależy od ilości i kierunku. Im mniej miejsca zajmuje ładunek, tym większa oszczędność w porównaniu z autem na wyłączność.',
        },
      ],
    },
    {
      slug: 'palety',
      group: 'ukraine',
      meta: {
        title: 'Transport palet po Ukrainie: od 1 do 34 palet',
        description:
          'Transport towaru na paletach: bus do 8–10 palet, ciężarówki do 22, TIR do 34. Plandeka, izoterma, winda, załadunek z boku.',
      },
      card: { icon: 'pallet', title: 'Palety', text: 'Od 1 do 34 palet w jednym kursie', price: 'od 60 UAH/km' },
      h1: 'Transport towaru na paletach',
      lead: 'Od jednej palety w doładunku po pełnego TIR-a na 34 palety. Dobierzemy auto do liczby palet, wagi i sposobu załadunku.',
      bullets: ['1–34 palety', 'Winda i rozsuwana plandeka', 'Izoterma do żywności'],
      priceFrom: 'od 60 UAH/km',
      cargo: {
        title: 'Co przewozimy na paletach',
        items: ['Żywność i napoje', 'Materiały budowlane', 'AGD', 'Towary dla sieci handlowych', 'Elektrotechnika, kable', 'Surowce i gotowe wyroby'],
      },
      sections: [
        {
          title: 'Ile palet mieści auto',
          items: ['Bus: do 8–10 palet', 'Ciężarówka 5 t: do 15–18 palet', 'Ciężarówka 10 t: do 22 palet', 'TIR: do 33–34 palet'],
        },
      ],
      vehicles: ['bus', 't5', 't10', 'fura'],
      faq: [
        {
          q: 'Czy można wysłać jedną paletę?',
          a: 'Tak, w doładunku autem, które jedzie w Twoim kierunku.',
        },
      ],
    },

    {
      slug: 'kyiv',
      group: 'ukraine',
      meta: {
        title: 'Transport w Kijowie: miasto, obwód i cała Ukraina',
        description:
          'Transport towarów w Kijowie i obwodzie kijowskim: bus od 350 UAH/godz., tragarze, przeprowadzki. Z Kijowa po Ukrainie od 60 UAH/km.',
      },
      card: { icon: 'city', title: 'Transport w Kijowie', text: 'Miasto, obwód i kursy z Kijowa', price: 'od 350 UAH/godz.' },
      h1: 'Transport w Kijowie',
      lead: 'Przewieziemy ładunek po Kijowie, na przedmieścia albo z Kijowa do dowolnego miasta Ukrainy. Bus, ciężarówka, tragarze: pod Twoje zadanie.',
      bullets: ['W mieście za godzinę', 'Obwód kijowski i cała Ukraina', 'Tragarze i przeprowadzki'],
      priceFrom: 'od 350 UAH/godz.',
      intro: {
        title: 'Bus z kierowcą po Kijowie',
        paragraphs: [
          'W mieście liczymy za godzinę: minimalne zamówienie to 2 godziny pracy auta, dalej płacisz za faktyczny czas. Poza miastem obowiązuje stawka za kilometr.',
          'Podstawiamy auta na lewy i prawy brzeg, do Browarów, Irpienia, Buczy, Wyszniewego, Boryspola i innych miast obwodu. Dostawy z Kijowa do innych miast liczymy według zwykłych stawek po Ukrainie.',
        ],
      },
      cargo: {
        title: 'Co wozimy po Kijowie',
        items: ['Przeprowadzki mieszkań i biur', 'Meble i AGD ze sklepu', 'Materiały budowlane', 'Towar do magazynu i sklepu', 'Wywóz starych mebli', 'Urządzenia'],
      },
      sections: [
        {
          title: 'Jak zaoszczędzić',
          items: [
            'Rezerwuj auto z wyprzedzeniem, zwłaszcza na koniec miesiąca i weekendy',
            'Podaj dokładne wymiary i wagę, żeby nie przepłacić za za duże auto',
            'Przygotuj rzeczy przed przyjazdem auta: czas oczekiwania też jest płatny',
            'Nie zdejmuj fabrycznego opakowania z AGD i armatury',
          ],
        },
      ],
      prices: {
        title: 'Ceny w Kijowie',
        rows: [
          { label: 'Bus w mieście', value: 'od 350 UAH/godz.', note: 'minimum 2 godziny' },
          { label: 'Ciężarówka 3–5 t w mieście', value: 'od 600 UAH/godz.', note: 'minimum 2 godziny' },
          { label: 'Poza miasto', value: 'od 17 UAH/km' },
          { label: 'Tragarz', value: 'od 250 UAH/godz.' },
          { label: 'Z Kijowa po Ukrainie', value: 'od 60 UAH/km' },
        ],
        note: 'Stawki orientacyjne. Dokładną cenę logistyk poda po zapytaniu.',
      },
      vehicles: ['bus', 't5', 'manipulator'],
      faq: [
        {
          q: 'Jak liczy się koszt w mieście?',
          a: 'Za godzinę: minimum 2 godziny pracy auta, dalej za faktyczny czas. Jeśli auto jedzie poza miasto, dochodzi stawka za kilometr.',
        },
        {
          q: 'Czy można zamówić auto na dziś?',
          a: 'Często tak, jeśli jest wolne auto. Żeby mieć pewność co do godziny, rezerwuj wcześniej.',
        },
        {
          q: 'Czy wozicie w obwodzie kijowskim?',
          a: 'Tak: Browary, Boryspol, Irpień, Bucza, Wyszniewe, Obuchów, Biała Cerkiew i inne miasta.',
        },
      ],
    },
    {
      slug: 'refrigerator',
      group: 'ukraine',
      meta: {
        title: 'Transport chłodniczy po Ukrainie i do Europy',
        description:
          'Przewóz żywności i ładunków wymagających temperatury chłodniami od 1,5 do 22 t. Od −20 do +20 °C. Po Ukrainie od 80 UAH/km.',
      },
      card: { icon: 'reefer', title: 'Chłodnia', text: 'Żywność i ładunki w temperaturze', price: 'od 80 UAH/km' },
      h1: 'Transport chłodniczy',
      lead: 'Przewieziemy żywność, leki, kwiaty i inne ładunki, które potrzebują stałej temperatury: po Ukrainie i do krajów Europy.',
      bullets: ['Od 1,5 do 22 t', 'Od −20 do +20 °C', 'Schłodzenie przed załadunkiem'],
      priceFrom: 'od 80 UAH/km',
      cargo: {
        title: 'Co przewozimy',
        items: ['Mięso i ryby', 'Nabiał', 'Warzywa i owoce', 'Mrożonki', 'Wyroby cukiernicze', 'Leki', 'Kwiaty i rośliny', 'Napoje'],
      },
      sections: [
        {
          title: 'Jak pilnujemy temperatury',
          items: [
            'Uzgadniamy temperaturę przed załadunkiem i wpisujemy ją do zlecenia',
            'Auto przyjeżdża już schłodzone do wymaganej temperatury',
            'Temperatura jest utrzymywana przez całą drogę do rozładunku',
          ],
        },
        {
          title: 'Izoterma czy chłodnia',
          text: 'Izoterma tylko utrzymuje temperaturę, więc nadaje się na krótkie kursy i ładunki bez ścisłych wymagań. Chłodnia ma agregat i trzyma zadaną temperaturę nawet w długiej trasie.',
        },
      ],
      prices: {
        title: 'Ceny chłodni',
        rows: [
          { label: 'Chłodnia do 5 t', value: 'od 100 UAH/km' },
          { label: 'Chłodnia 22 t', value: 'od 80 UAH/km' },
        ],
        note: 'Stawki orientacyjne, zależą od temperatury i trasy.',
      },
      vehicles: ['reefer', 't5'],
      faq: [
        {
          q: 'Czy można wieźć różne produkty razem?',
          a: 'Tylko jeśli wymagają tej samej temperatury i nie przenoszą na siebie zapachów. Opisz skład ładunku w zapytaniu.',
        },
        {
          q: 'Czy potrzebne są dokumenty na żywność?',
          a: 'Tak, ładunki spożywcze wymagają dokumentów od nadawcy. W transporcie międzynarodowym lista jest dłuższa, logistyk podpowie.',
        },
      ],
    },
    {
      slug: 'bulk',
      group: 'ukraine',
      meta: {
        title: 'Transport ładunków sypkich wywrotkami i zbożówkami',
        description:
          'Piasek, kruszywo, ziemia, zboże, nawozy: wywrotki i zbożówki 20–60 m³ po Ukrainie. Stawki od 100 UAH/km, pełne załadunki.',
      },
      card: { icon: 'bulk', title: 'Ładunki sypkie', text: 'Wywrotki i zbożówki 20–60 m³', price: 'od 100 UAH/km' },
      h1: 'Transport ładunków sypkich',
      lead: 'Wywrotki i zbożówki do sypkich materiałów budowlanych, zboża i nawozów. Pełny załadunek, dostawa na budowę, do elewatora lub magazynu.',
      bullets: ['Skrzynia 20–60 m³', 'Wywrotki i zbożówki', 'W całej Ukrainie'],
      priceFrom: 'od 100 UAH/km',
      cargo: {
        title: 'Co przewozimy',
        items: ['Piasek, tłuczeń, przesiewka, żwir', 'Ziemia i czarnoziem', 'Keramzyt', 'Pszenica, kukurydza, jęczmień', 'Słonecznik, rzepak, soja', 'Nawozy mineralne', 'Cement, sól', 'Torf, węgiel'],
      },
      sections: [
        {
          title: 'Auta',
          items: ['Wywrotka: do materiałów budowlanych i ziemi', 'Zbożówka: do zboża, roślin oleistych i nawozów', 'Naczepa wywrotka: do dużych ilości'],
        },
      ],
      prices: {
        title: 'Ceny',
        rows: [{ label: 'Wywrotka / zbożówka', value: 'od 100 UAH/km' }],
        note: 'Cena zależy od ilości, odległości i liczby kursów.',
      },
      vehicles: ['tipper'],
      faq: [
        {
          q: 'Czy można zamówić kilka aut naraz?',
          a: 'Tak, przy dużych ilościach organizujemy kilka aut na jeden załadunek. Podaj ilość w zapytaniu.',
        },
      ],
    },
    {
      slug: 'liquid',
      group: 'ukraine',
      meta: {
        title: 'Transport ładunków płynnych cysternami',
        description:
          'Płyny spożywcze i techniczne, olej, woda, paliwo: cysterny 20–40 m³ po Ukrainie i do Europy. Cysterna dobrana do rodzaju ładunku.',
      },
      card: { icon: 'liquid', title: 'Ładunki płynne', text: 'Cysterny 20–40 m³', price: 'od 100 UAH/km' },
      h1: 'Transport ładunków płynnych',
      lead: 'Dobierzemy cysternę do rodzaju płynu, jego właściwości i ilości: spożywczą, chemiczną albo paliwową. Pełne załadunki po Ukrainie i do UE.',
      bullets: ['Cysterny 20–40 m³', 'Spożywcze, chemiczne, paliwowe', 'Po Ukrainie i do Europy'],
      priceFrom: 'od 100 UAH/km',
      cargo: {
        title: 'Co przewozimy',
        items: ['Olej roślinny', 'Mleko i surowiec mleczarski', 'Melasa', 'Woda pitna i techniczna', 'Płyny techniczne', 'Nawozy płynne', 'Paliwa i produkty naftowe', 'Asfalt'],
      },
      sections: [
        {
          title: 'Rodzaje cystern',
          items: ['Spożywcze: ze stali nierdzewnej, do produktów', 'Chemiczne: do płynów technicznych i nawozów', 'Paliwowe: do produktów naftowych', 'Asfaltowe: z podgrzewaniem'],
        },
      ],
      prices: {
        title: 'Ceny',
        rows: [{ label: 'Cysterna', value: 'od 100 UAH/km' }],
        note: 'Cena zależy od rodzaju cysterny, ilości i trasy.',
      },
      vehicles: ['tanker'],
      faq: [
        {
          q: 'Czy cysterna musi być myta?',
          a: 'Przy ładunkach spożywczych cysterna musi być czysta i przygotowana pod produkt. Wymagania co do mycia uzgadniamy z góry.',
        },
      ],
    },

    // ——— Międzynarodowy ———
    {
      slug: 'europe',
      group: 'international',
      meta: {
        title: 'Transport Ukraina – Europa i z Europy do Ukrainy',
        description:
          'Transport Ukraina – Polska, Niemcy, Czechy, Słowenia i inne kraje UE. Bus od 1,2 €/km, TIR od 1,5 €/km, doładunek o dowolnej wadze.',
      },
      card: { icon: 'europe', title: 'Europa', text: 'Ukraina ↔ UE i kursy po Europie', price: 'od 1,2 €/km' },
      h1: 'Transport Ukraina – Europa',
      lead: 'Wozimy ładunki z Ukrainy do krajów UE i z powrotem, a także między krajami Europy. Autem na wyłączność albo w doładunku o dowolnej wadze.',
      bullets: ['Bus, TIR, niskopodwoziówka, autolaweta', 'Doładunek o dowolnej wadze', 'CMR i odprawa celna'],
      priceFrom: 'od 1,2 €/km',
      intro: {
        title: 'Transport między Ukrainą a UE',
        paragraphs: [
          'Wozimy ładunki handlowe, rzeczy osobiste, maszyny i samochody z Ukrainy do krajów Europy i z powrotem. Auto na wyłączność sprawdza się, gdy liczy się termin, a doładunek, gdy ładunek jest mały i chcesz zaoszczędzić.',
          'Bierzemy na siebie dokumenty na granicę i odprawę celną przez agencję. Przekazujesz ładunek w miejscu nadania, a odbiorca odbiera go pod swoimi drzwiami.',
        ],
      },
      cargo: {
        title: 'Co przewozimy',
        items: ['Ładunki handlowe', 'Palety i drobnica', 'Maszyny i urządzenia', 'Rzeczy osobiste przy przeprowadzce', 'Samochody', 'Ponadgabaryty'],
      },
      sections: [
        {
          title: 'Kraje',
          text: 'Polska, Niemcy, Czechy, Słowacja, Węgry, Austria, Słowenia, Chorwacja, Włochy, Francja, Hiszpania, Holandia, Belgia, Litwa, Łotwa, Estonia, Rumunia, Bułgaria i inne.',
        },
        {
          title: 'Kompleksowo',
          items: ['Dobór auta do ładunku', 'Załadunek pod adresem', 'CMR i dokumenty przewozowe', 'Odprawa celna przez agencję', 'Dostawa pod drzwi odbiorcy'],
        },
      ],
      prices: {
        title: 'Ceny orientacyjne',
        rows: [
          { label: 'Bus do 2 t', value: 'od 1,2 €/km' },
          { label: 'TIR 22 t', value: 'od 1,5 €/km' },
          { label: 'Paleta do 300 kg (doładunek)', value: 'od 0,4 €/km' },
          { label: 'Ukraina – Polska, TIR', value: 'od 1 000 €' },
          { label: 'Ukraina – Niemcy, TIR', value: 'od 1800 €' },
        ],
        note: 'Ceny orientacyjne: zależą od ilości, trasy, sezonu i dostępności ładunku powrotnego.',
      },
      vehicles: ['bus', 'fura', 'carrier', 'lowbed'],
      faq: [
        {
          q: 'Jakie dokumenty są potrzebne?',
          a: 'Dla ładunku handlowego: faktura, lista pakunkowa i dokumenty towaru; CMR wystawiamy my. Dla rzeczy osobistych lista jest prostsza, logistyk podpowie.',
        },
        {
          q: 'Ile trwa dostawa do Europy?',
          a: 'Zależy od kraju i kolejek na granicy. Logistyk poda orientacyjny czas dla Twojej trasy.',
        },
        {
          q: 'Czy wozicie po Europie bez wjazdu do Ukrainy?',
          a: 'Tak, organizujemy transport między krajami UE.',
        },
      ],
    },
    {
      slug: 'china',
      group: 'international',
      meta: {
        title: 'Transport z Chin morzem i samolotem',
        description:
          'Kompleksowy import towarów z Chin: morzem od 55 dni, samolotem od 14 dni. Kontenery zbiorcze i pełne, odprawa celna, dostawa pod drzwi.',
      },
      card: { icon: 'china', title: 'Transport z Chin', text: 'Morze i samolot kompleksowo', price: 'na zapytanie' },
      h1: 'Transport ładunków z Chin',
      lead: 'Odbierzemy towar od dostawcy w Chinach, wyślemy morzem albo samolotem przez Europę, odprawimy i przywieziemy do Twojego magazynu.',
      bullets: ['Dowolna waga', 'Morze od 55 dni, samolot od 14', 'Odprawa celna i dostawa pod drzwi'],
      priceFrom: 'na zapytanie',
      intro: {
        title: 'Import z Chin kompleksowo',
        paragraphs: [
          'Chiny to główne źródło towarów dla marketplace’ów, sklepów i zakładów produkcyjnych. Organizujemy cały łańcuch: od magazynu dostawcy w Chinach do Twojego magazynu w Ukrainie.',
          'Wybór sposobu zależy od pilności i budżetu. Morze jest tańsze, ale trwa dłużej; samolot jest szybki, ale droższy. Policzymy oba warianty i doradzimy, co bardziej opłaca się przy Twoim towarze.',
        ],
      },
      cargo: {
        title: 'Co sprowadza się z Chin',
        items: ['Maszyny i obrabiarki', 'Elektronika', 'Materiały budowlane', 'Akcesoria i części samochodowe', 'Meble i okucia', 'AGD', 'Towary na marketplace’y'],
      },
      sections: [
        {
          title: 'Sposoby dostawy',
          items: [
            'Morzem: najtaniej, od 55–60 dni przez porty Europy (Gdańsk, Gdynia, Konstanca), dalej drogą do Ukrainy',
            'Samolotem: od 14 dni do Kijowa, dla pilnych i cennych ładunków, kilka razy drożej niż morzem',
            'Pełny kontener (FCL) 20’ lub 40’: płacisz za cały kontener',
            'Ładunek zbiorczy (LCL): Twój towar jedzie w kontenerze z innymi, płacisz za swoje metry sześcienne',
          ],
        },
        {
          title: 'Jak przebiega dostawa',
          items: [
            'Przesyłasz wagę, objętość, rodzaj towaru, wartość z faktury i preferowany sposób dostawy',
            'Uzgadniamy trasę, terminy i cenę',
            'Odbieramy towar od dostawcy, sprawdzamy go i w razie potrzeby konsolidujemy w magazynie w Chinach',
            'Wysyłamy morzem albo samolotem',
            'Odprawa celna w Ukrainie: zgłoszenie, kody taryfy celnej, opłaty',
            'Dostarczamy do magazynu lub pod adres; rozliczenie końcowe przy odbiorze',
          ],
        },
      ],
      prices: {
        title: 'Od czego zależy cena',
        rows: [
          { label: 'Waga i objętość', value: 'kg lub m³' },
          { label: 'Sposób dostawy', value: 'morze / samolot' },
          { label: 'Rodzaj towaru i cło', value: 'według kodu taryfy' },
          { label: 'Ubezpieczenie i pakowanie', value: 'na zapytanie' },
        ],
        note: 'Cenę ustalamy po wyliczeniu trasy dla Twojego towaru.',
      },
      vehicles: ['fura', 'bus'],
      faq: [
        {
          q: 'Jaka jest minimalna partia?',
          a: 'Dowolna waga, w ładunku zbiorczym. Przy dużych partiach bardziej opłaca się pełny kontener.',
        },
        {
          q: 'Co wybrać: morze czy samolot?',
          a: 'Morze: do zakupów z wyprzedzeniem i ciężkich ładunków, tanio, ale od 55 dni. Samolot: gdy towar jest potrzebny szybko albo jest drogi i lekki.',
        },
        {
          q: 'Czy pomożecie z odprawą celną?',
          a: 'Tak, odprawę robimy przez agencję celną: zgłoszenie, klasyfikacja towaru, wyliczenie i opłacenie należności.',
        },
        {
          q: 'Czy wozicie koleją?',
          a: 'Nie, transportu kolejowego nie oferujemy. Tylko morze, samolot i transport drogowy.',
        },
      ],
    },
    {
      slug: 'sea',
      group: 'international',
      meta: {
        title: 'Fracht morski w kontenerach: FCL i LCL',
        description:
          'Morski transport ładunków w kontenerach 20’ i 40’ oraz w ładunkach zbiorczych przez porty Europy z dostawą do Ukrainy. Kompleksowa odprawa celna.',
      },
      card: { icon: 'sea', title: 'Morzem', text: 'Kontenery FCL i zbiorcze LCL', price: 'za m³' },
      h1: 'Fracht morski w kontenerach',
      lead: 'Duże partie morzem w kontenerach albo jako ładunek zbiorczy przez porty Europy, dalej autem do Twojego magazynu.',
      bullets: ['Kontenery 20’, 40’, 40’ HC', 'Ładunki zbiorcze od 1 m³', 'Port – magazyn kompleksowo'],
      cargo: {
        title: 'Co wozi się morzem',
        items: ['Duże partie towarów', 'Surowce i materiały', 'Maszyny i obrabiarki', 'Ponadgabaryty w kontenerach open top', 'Żywność w kontenerach chłodniczych'],
      },
      sections: [
        {
          title: 'FCL czy LCL',
          items: [
            'FCL (pełny kontener): cały kontener jest Twój, opłaca się od 15–20 m³',
            'LCL (zbiorczy): płacisz za swoje metry sześcienne lub tony, resztę miejsca zajmują ładunki innych klientów',
          ],
        },
        {
          title: 'Rodzaje kontenerów',
          items: ['20’: do ~28 t, ~33 m³', '40’: do ~27 t, ~67 m³', '40’ High Cube: ~76 m³', 'Open Top do ponadgabarytów, kontenery chłodnicze do żywności'],
        },
      ],
      vehicles: ['fura'],
      faq: [
        {
          q: 'Ile płynie ładunek morski?',
          a: 'Z Chin od 55–60 dni do Ukrainy, razem z dowozem z europejskiego portu. Dokładny czas zależy od portu nadania i rozkładu statków.',
        },
        {
          q: 'Przez jakie porty wozicie?',
          a: 'Najczęściej przez Gdańsk, Gdynię i Konstancę, dalej ładunek jedzie do Ukrainy transportem drogowym.',
        },
      ],
    },
    {
      slug: 'air',
      group: 'international',
      meta: {
        title: 'Fracht lotniczy do Ukrainy',
        description:
          'Transport lotniczy przez huby w Europie z dowozem autem do Ukrainy. Od 14 dni z Chin, dla pilnych i cennych ładunków. Rozliczenie za kg.',
      },
      card: { icon: 'air', title: 'Samolotem', text: 'Pilne i cenne ładunki', price: 'za kg' },
      h1: 'Fracht lotniczy',
      lead: 'Gdy towar jest potrzebny szybko. Dowozimy samolotem na lotniska w Europie, dalej autem do granicy, odprawa i dostawa pod drzwi.',
      bullets: ['Od 14 dni z Chin', 'Rozliczenie za kilogram', 'Odprawa celna'],
      cargo: {
        title: 'Co wozi się samolotem',
        items: ['Elektronika', 'Części zamienne', 'Próbki towaru', 'Wyroby medyczne', 'Odzież i akcesoria', 'Pilne komponenty'],
      },
      sections: [
        {
          title: 'Kiedy wybrać samolot',
          text: 'Samolot jest kilka razy droższy niż morze, ale wygrywa czasem. Sprawdza się przy lekkich, drogich i pilnych ładunkach, gdy przestój firmy kosztuje więcej niż transport.',
        },
        {
          title: 'Jak liczy się wagę',
          text: 'Cenę liczy się według większej z dwóch wag: rzeczywistej albo objętościowej (objętość ładunku przeliczona na kilogramy). Dlatego lekkie, ale duże kartony wychodzą drożej.',
        },
      ],
      vehicles: ['bus'],
      faq: [
        {
          q: 'Czego nie można wysłać samolotem?',
          a: 'Towary niebezpieczne, część baterii i płynów jadą według osobnych zasad albo nie są przyjmowane. Opisz towar w zapytaniu.',
        },
      ],
    },
    {
      slug: 'poland',
      group: 'international',
      meta: {
        title: 'Transport Polska – Ukraina i Ukraina – Polska',
        description:
          'Transport towarów z Polski do Ukrainy i z Ukrainy do Polski: Warszawa, Wrocław, Poznań, Gdańsk, Lublin. TIR od 1 000 €, bus od 400 €, doładunek o dowolnej wadze.',
      },
      card: { icon: 'flag', title: 'Polska', text: 'Najpopularniejszy kierunek', price: 'od 400 €' },
      h1: 'Transport Polska – Ukraina',
      lead: 'Co tydzień wozimy ładunki z Polski do Ukrainy i z powrotem: busem, TIR-em albo w doładunku. Warszawa, Wrocław, Poznań, Kraków, Gdańsk, Lublin i inne miasta.',
      bullets: ['Bus od 400 €, TIR od 1 000 €', 'Doładunek o dowolnej wadze', 'CMR i odprawa celna'],
      priceFrom: 'od 400 €',
      cargo: {
        title: 'Co przewozimy',
        items: ['Towar na paletach', 'Maszyny i urządzenia', 'Meble', 'Materiały budowlane', 'Rzeczy osobiste', 'Samochody i sprzęt'],
      },
      sections: [
        {
          title: 'Miasta',
          text: 'Warszawa, Kraków, Wrocław, Poznań, Łódź, Gdańsk, Gdynia, Szczecin, Lublin, Rzeszów, Chełm, Katowice i każdy inny adres w Polsce.',
        },
        {
          title: 'Przez polskie porty',
          text: 'Gdańsk i Gdynia to główne bramy dla kontenerów morskich z Chin. Odbierzemy kontener w porcie i dowieziemy ładunek do Ukrainy transportem drogowym.',
        },
      ],
      prices: {
        title: 'Ceny orientacyjne',
        rows: [
          { label: 'Bus do 2 t', value: 'od 400 €' },
          { label: 'TIR 22 t', value: 'od 1 000 €' },
          { label: 'Doładunek', value: 'od 0,4 €/km za paletę' },
        ],
        note: 'Cena zależy od miasta, ilości i dostępności ładunku powrotnego.',
      },
      vehicles: ['bus', 'fura'],
      faq: [
        {
          q: 'Ile jedzie ładunek z Polski do Ukrainy?',
          a: 'Zależy od miasta i kolejki na granicy. Logistyk poda orientacyjny czas dla Twojej trasy.',
        },
      ],
    },
    {
      slug: 'customs',
      group: 'international',
      meta: { title: "Odprawa celna i magazyny przy granicy z Polską", description: "Odprawa celna importu i eksportu, T1, EUR.1, TIR, magazynowanie i przeładunek na granicy Ukraina – Polska." },
      card: { icon: 'docs', title: "Cło i magazyny", text: "Odprawa celna, magazyn, przeładunek", price: "na zapytanie" },
      h1: "Odprawa celna i magazyny przy granicy z Polską",
      lead: "Razem z partnerami przy polskiej granicy załatwiamy dokumenty i przechowujemy ładunek, żeby jechał dalej bez opóźnień.",
      bullets: ["Import, eksport, tranzyt", "T1, EUR.1, EX, TIR", "Magazyn, przeładunek, konsolidacja"],
      sections: [
        { title: "Odprawa celna", items: ["Dokument T1: odprawa i obsługa tranzytu", "Import: odprawa celna towarów wwożonych do UE", "Dokument EX: eksport towarów poza UE", "Świadectwo pochodzenia EUR.1", "Deklaracja tranzytowa dla ładunków spoza UE (Chiny, USA, Korea Południowa i inne)", "Karnet TIR: wystawienie i obsługa"] },
        { title: "Magazyn i logistyka", items: ["Magazynowanie towarów", "Przeładunek", "Konsolidacja i dekonsolidacja ładunków", "Szukanie transportu", "Odbiór ładunków z lotnisk i portów morskich", "Sprzedaż towarów w tranzycie"] },
        { title: "Dokumenty i konsultacje", items: ["Pełna obsługa dokumentów celnych i transportowych", "Konsultacje w sprawie procedur celnych i handlu międzynarodowego"] },
      ],
      vehicles: ['fura'],
      faq: [
        { q: "Ile kosztuje odprawa celna?", a: "Zależy od procedury i ładunku. Napisz, co i dokąd wieziesz, podamy cenę." },
        { q: "Czy można zamówić odprawę lub magazyn bez transportu?", a: "Tak, odprawę celną lub magazyn można zamówić osobno." },
      ],
    },
    {
      slug: 'asia',
      group: 'international',
      meta: { title: "Transport towarów z Azji na Ukrainę", description: "Transport towarów z Azji: Chiny, Turcja, Indie, Wietnam. Morzem w kontenerach i samolotem, z odprawą celną." },
      card: { icon: 'china', title: "Azja", text: "Chiny, Turcja, Indie i inne", price: "na zapytanie" },
      h1: "Transport towarów z Azji na Ukrainę",
      lead: "Przywieziemy towar z krajów Azji morzem lub samolotem: od odbioru u dostawcy do Twojego magazynu na Ukrainie.",
      bullets: ["Chiny, Turcja, Indie, Wietnam", "Morze FCL/LCL lub samolot", "Odprawa celna przez agencję"],
      cargo: { title: "Co przewozimy", items: ["Ładunki komercyjne", "Palety", "Sprzęt", "Kontenery"] },
      sections: [{ title: "Jak dostarczamy", text: "Morzem w kontenerach pełnych lub zbiorczych, samolotem dla pilnych ładunków, dalej po Ukrainie transportem drogowym." }],
      vehicles: ['fura'],
      faq: [
        { q: "Ile kosztuje transport z Azji?", a: "Cenę liczymy pod ładunek: zależy od kraju, objętości, wagi i sposobu dostawy." },
        { q: "Jakie dokumenty są potrzebne?", a: "Faktura i dokumenty towaru; odprawę celną robimy przez agencję celną." },
      ],
    },
    {
      slug: 'usa',
      group: 'international',
      meta: { title: "Transport towarów USA – Ukraina", description: "Transport towarów z USA na Ukrainę i do USA: morzem w kontenerach i samolotem, z odprawą celną." },
      card: { icon: 'air', title: "USA", text: "Morzem i samolotem w obie strony", price: "na zapytanie" },
      h1: "Transport towarów USA – Ukraina",
      lead: "Organizujemy transport ładunków między USA a Ukrainą morzem lub samolotem, od drzwi do drzwi.",
      bullets: ["Morze: kontenery FCL i zbiorcze LCL", "Samolot dla pilnych ładunków", "Odprawa celna przez agencję"],
      cargo: { title: "Co przewozimy", items: ["Ładunki komercyjne", "Palety", "Sprzęt", "Kontenery"] },
      sections: [{ title: "Jak dostarczamy", text: "Morzem przez porty europejskie lub samolotem, dalej transportem drogowym pod Twój adres." }],
      vehicles: ['fura'],
      faq: [
        { q: "Ile kosztuje transport z USA?", a: "Cenę liczymy pod ładunek: zależy od objętości, wagi, miasta i sposobu dostawy." },
        { q: "Jakie dokumenty są potrzebne?", a: "Faktura i dokumenty towaru; odprawę celną robimy przez agencję celną." },
      ],
    },
    {
      slug: 'slovenia',
      group: 'international',
      meta: {
        title: 'Transport Ukraina – Słowenia i Słowenia – Ukraina',
        description:
          'Transport towarów do i ze Słowenii: Lublana, Maribor, Koper. Auto na wyłączność, doładunek, ładunki przez port Koper.',
      },
      card: { icon: 'flag', title: 'Słowenia', text: 'Lublana, Maribor, port Koper', price: 'na zapytanie' },
      h1: 'Transport Ukraina – Słowenia',
      lead: 'Jesteśmy obecni w Słowenii, więc znamy ten kierunek od środka. Wozimy ładunki między Ukrainą a Słowenią, a także przez Słowenię dalej po Europie.',
      bullets: ['Lublana, Maribor, Celje, Koper', 'Auto na wyłączność albo doładunek', 'Ładunki przez port Koper'],
      cargo: {
        title: 'Co przewozimy',
        items: ['Ładunki handlowe', 'Palety', 'Maszyny i urządzenia', 'Rzeczy osobiste przy przeprowadzce', 'Kontenery morskie z Kopra'],
      },
      sections: [
        {
          title: 'Port Koper',
          text: 'Koper to słoweński port nad Adriatykiem, przez który przechodzi część ładunków z Azji do Europy Środkowej. Możemy zorganizować dostawę z portu do Ukrainy albo do innych krajów UE.',
        },
        {
          title: 'Przez Słowenię',
          text: 'Słowenia to wygodny punkt na kursy do Austrii, Włoch, Chorwacji i na Bałkany. Wycenimy trasę pod Twój adres.',
        },
      ],
      vehicles: ['bus', 'fura'],
      faq: [
        {
          q: 'Ile kosztuje transport do Słowenii?',
          a: 'Cenę liczymy pod trasę: zależy od ilości, miasta i formatu (auto na wyłączność czy doładunek). Orientacyjnie TIR po Europie to 1,5 €/km.',
        },
      ],
    },
  ],

  pricesPage: {
    meta: {
      title: 'Cennik transportu towarów: stawki za km w Ukrainie i Europie',
      description:
        'Orientacyjne stawki transportu po Ukrainie: bus od 60 UAH/km, 5 t od 50, 10 t od 60, TIR od 70. Ceny na Europę, tragarzy i przeprowadzki.',
    },
    h1: 'Cennik transportu towarów',
    lead: 'Orientacyjne stawki do zaplanowania budżetu. Dokładną cenę logistyk podaje po zapytaniu i wpisuje do zlecenia transportowego.',
    ukraineTitle: 'Po Ukrainie, auto na wyłączność',
    ukraineRows: [
      { label: 'Bus do 2 t, do 20 m³', value: 'od 60 UAH/km' },
      { label: 'Ciężarówka do 5 t', value: 'od 80 UAH/km' },
      { label: 'Ciężarówka do 10 t', value: 'od 100 UAH/km' },
      { label: 'TIR do 22 t', value: 'od 70 UAH/km' },
      { label: 'Tandem do 120 m³', value: 'od 80 UAH/km' },
      { label: 'Chłodnia 22 t', value: 'od 80 UAH/km' },
      { label: 'Wywrotka / zbożówka', value: 'od 100 UAH/km' },
      { label: 'Cysterna', value: 'od 100 UAH/km' },
      { label: 'Autolaweta', value: 'od 40 UAH/km' },
      { label: 'HDS', value: 'od 100 UAH/km' },
      { label: 'Niskopodwoziówka (ponadgabaryt)', value: 'od 100 UAH/km' },
      { label: 'Dźwig samojezdny', value: 'na zapytanie' },
    ],
    extraTitle: 'Przeprowadzki i usługi dodatkowe',
    extraRows: [
      { label: 'Przeprowadzka, auto 15–20 m³', value: 'od 60 UAH/km' },
      { label: 'Doładunek po Ukrainie', value: 'od 15 UAH/km' },
      { label: 'Tragarz', value: 'od 250 UAH/godz.', note: 'minimum 2 godziny' },
    ],
    europeTitle: 'Europa',
    europeRows: [
      { label: 'Bus do 2 t', value: 'od 1,2 €/km' },
      { label: 'TIR 22 t', value: 'od 1,5 €/km' },
      { label: 'Paleta do 300 kg (doładunek)', value: 'od 0,4 €/km' },
      { label: 'Ukraina – Polska, TIR', value: 'od 1 000 €' },
      { label: 'Ukraina – Niemcy, TIR', value: 'od 1800 €' },
    ],
    note: 'Ceny są orientacyjne i mogą się zmieniać. Ostateczna kwota zależy od ładunku, trasy i terminu.',
    factorsTitle: 'Co wpływa na cenę',
    factors: [
      'Odległość i rodzaj auta',
      'Waga, objętość i cechy ładunku',
      'Liczba miejsc załadunku i rozładunku',
      'Tragarze, winda, czas oczekiwania',
      'Dostępność aut w regionie i ładunku powrotnego',
      'Pilność',
    ],
    faq: [
      {
        q: 'Dlaczego cena „od”?',
        a: 'Stawka „od” to minimum dla auta na wyłączność na obłożonym kierunku. Na trasie bez ładunku powrotnego, z kilkoma punktami albo z tragarzami kwota będzie wyższa.',
      },
      {
        q: 'Czy cena może się zmienić po uzgodnieniu?',
        a: 'Nie, jeśli parametry ładunku i trasa się nie zmieniły: cenę zapisujemy w zleceniu transportowym.',
      },
    ],
  },

  contactsPage: {
    meta: {
      title: 'Kontakt: telefon, Viber, Telegram, WhatsApp',
      description: 'Telefon, Viber, Telegram, WhatsApp i e-mail CR Logistics. Kijów, Ukraina, a także Słowenia.',
    },
    h1: 'Kontakt',
    lead: 'Zadzwoń albo napisz na wygodnym komunikatorze. Do wyceny podaj trasę, wagę i objętość ładunku.',
    aboutTitle: 'O firmie',
    about: [
      "CR Logistics organizuje transport ładunków po Ukrainie i za granicę: drogowy, morski i lotniczy. Dobieramy transport do ładunku: od busa po TIR, niskopodwozie, autolawetę czy HDS. Zajmujemy się też odprawą celną na Ukrainie i w Europie.",
      "Działamy na Ukrainie, w Polsce i w Słowenii. Pracujemy zarówno z firmami, jak i z klientami prywatnymi.",
    ],
    hours: 'Zapytania ze strony trafiają do nas od razu na Telegram',
  },

  thanksPage: {
    meta: { title: 'Dziękujemy za zapytanie', description: 'Zapytanie otrzymane.' },
    h1: 'Dziękujemy, zapytanie otrzymane',
    lead: 'Logistyk zadzwoni, doprecyzuje szczegóły i poda cenę. Jeśli sprawa jest pilna, zadzwoń albo napisz do nas.',
    next: 'Co dalej',
  },
}
