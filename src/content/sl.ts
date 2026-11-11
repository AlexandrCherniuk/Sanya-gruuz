// Slovenska različica. Ista struktura in dejstva kot ua.ts, napisano za slovenskega bralca:
// podjetja in posamezniki, ki pošiljajo blago iz Slovenije v Ukrajino in nazaj, po Evropi
// ali potrebujejo prevoz znotraj Ukrajine. Cene v Ukrajini v UAH, v Evropi v EUR.
// Postavke so okvirne (s trga), Oleksandr jih bo popravil.
import type { LangContent } from './types'

export const sl: LangContent = {
  ui: {
    skip: 'Na obrazec za povpraševanje',
    menu: 'Meni',
    nav: { ukraine: 'Po Ukrajini', international: 'Mednarodni', prices: 'Cenik', contacts: 'Kontakt' },
    cta: 'Izračun cene',
    ctaShort: 'Ponudba',
    call: 'Pokliči',
    write: 'Piši',
    breadcrumbHome: 'Domov',
    city: 'Kijev',
    location: "Ukrajina · Poljska · Slovenija",
    from: 'od',
    more: 'Več',
    allServices: 'Vse storitve',
    perKm: 'UAH/km',
    orderVehicle: 'Naroči',
    footerAbout:
      'Prevoz tovora po Ukrajini in v tujino: od kombija do tovornjaka s polprikolico, izredni prevozi, avtotransporterji, dvigala. Dostava iz Azije in ZDA po morju in letalsko.',
    footerNote: 'Cene na spletni strani so okvirne. Točno ceno vam logist pove po povpraševanju in jo zapiše v naročilo za prevoz.',
    rights: 'Vse pravice pridržane.',
    notFound: {
      title: 'Strani ni mogoče najti',
      text: 'Morda je bila premaknjena. Začnite na domači strani ali takoj pošljite povpraševanje za prevoz.',
    },
    routesHead: { route: 'Relacija', km: 'Razdalja', bus: 'Kombi do 2 t', fura: 'Tovornjak 22 t' },
    langSwitch: 'Jezik strani',
    units: { km: 'km', uah: 'UAH' },
  },

  blocks: {
    trustStrip: [
      { title: 'Od kombija do nizkopodnika', text: 'Vozilo glede na težo in prostornino' },
      { title: 'Ukrajina, Evropa, Azija, ZDA', text: 'Cestno, morsko, letalsko' },
      { title: 'Cena v naročilu', text: 'Dogovorjena pred nakladanjem' },
      { title: 'En logist', text: 'Od povpraševanja do razkladanja' },
    ],
    directions: {
      eyebrow: 'Storitve',
      title: 'Prepeljemo vsak tovor',
      sub: 'Prevozi po vsej Ukrajini, dostava v Evropo in iz nje, uvoz iz Azije in ZDA.',
    },
    transport: {
      eyebrow: 'Vozila',
      title: 'Vozilo za vaš tovor',
      sub: 'Tipične mere nadgradenj. Za vsako naročilo izberemo vozilo s pravo nosilnostjo, prostornino in načinom nakladanja.',
    },
    steps: {
      eyebrow: 'Kako delamo',
      title: 'Štirje koraki do dostave',
      sub: 'Od prvega klica do razkladanja vaš prevoz vodi en logist.',
      items: [
        { title: 'Povpraševanje', text: 'Izpolnite obrazec, pokličite ali pišite: od kod, kam in kaj prevažamo.' },
        { title: 'Ponudba in naročilo', text: 'Logist izbere vozilo in pot ter pove ceno. Pogoje zapišemo v naročilo za prevoz.' },
        { title: 'Prihod vozila', text: 'Vozilo pride na nakladanje ob dogovorjenem času. Voznik poskrbi za zanesljivo pritrditev tovora.' },
        { title: 'Dostava', text: 'Redno vas obveščamo, kje je tovor. Dosegljivi smo vedno, ob vsakem času, da hitro rešimo vsako višjo silo in vsako težavo.' },
      ],
      note: 'Celotno plačilo ob razkladanju. Za rezervacijo vozila je lahko potrebno predplačilo.',
    },
    why: {
      eyebrow: 'Zakaj z nami',
      title: 'Tovor pod nadzorom',
      sub: 'Brez praznih obljub: to je tisto, kar zares naredimo, da prevoz poteka gladko.',
      items: [
        { icon: 'check', title: 'Rešimo vsako težavo', text: 'Izkušnje nam pomagajo rešiti večino vprašanj, ki se pojavijo na poti: dokumente, dovoljenja, zamude na meji in carini.' },
        { icon: 'contract', title: 'Cena se na poti ne spremeni', text: 'Pot, roke in ceno zapišemo v naročilo še pred nakladanjem.' },
        { icon: 'chat', title: 'Logist je vedno dosegljiv', text: 'Telefon, Viber, Telegram, WhatsApp. Povemo, kje je vozilo in kdaj prispe.' },
        { icon: 'truck', title: 'Ne plačate preveč za prostor', text: 'Vozilo izberemo glede na tovor, za manjše pošiljke ponudimo zbirni prevoz.' },
        { icon: 'clock', title: 'Vozilo takoj', text: 'Pri 95 % naročil prevoza tovora na poti vozilo pride na dogovorjeno mesto v 2 urah. Logista lahko pokličete kadar koli: delamo 24 ur na dan.' },
        { icon: 'shield', title: 'Zavarovanje tovora', text: 'Tovor zavarujemo pred poškodbami prek zanesljivih partnerjev, s kritjem do 1 000 000 €.' },
        { icon: 'docs', title: 'Dokumenti za mednarodne prevoze', text: 'CMR, spremni dokumenti in carinjenje prek špediterja na mednarodnih relacijah.' },
        { icon: 'route', title: 'Od vrat do vrat', text: 'Tovor prevzamemo in dostavimo na navedena naslova, brez pretovarjanja na poti.' },
      ],
    },
    routes: {
      eyebrow: 'Okvirne cene',
      title: 'Priljubljene relacije iz Kijeva',
      sub: 'Izračun po najnižji postavki za samostojno vozilo. Zbirni prevoz je cenejši.',
      note: 'Okvirno po postavki »od«. Na ceno vplivajo teža, prostornina, nakladanje in zasedenost relacije. Točen znesek vam pove logist.',
      list: [
        { from: 'Kijev', to: 'Lvov', km: 540 },
        { from: 'Kijev', to: 'Odesa', km: 475 },
        { from: 'Kijev', to: 'Dnipro', km: 480 },
        { from: 'Kijev', to: 'Harkov', km: 480 },
        { from: 'Kijev', to: 'Vinica', km: 270 },
        { from: 'Kijev', to: 'Rivne', km: 330 },
        { from: 'Kijev', to: 'Černivci', km: 530 },
        { from: 'Kijev', to: 'Užgorod', km: 790 },
      ],
    },
    faq: { eyebrow: 'Vprašanja', title: 'Pogosta vprašanja' },
    clients: {
      eyebrow: 'S kom delamo',
      title: 'Zaupajo nam prevoz',
      sub: 'Vozimo za podjetja vseh velikosti in za fizične osebe. Za vsako nalogo svoje vozilo in svoj načrt.',
      logosTitle: 'Med našimi strankami',
      items: [
        { icon: 'business', title: 'Mala in srednja podjetja', text: 'Redne dobave, blago na paletah, dostava strankam po Ukrajini.' },
        { icon: 'store', title: 'Samostojni podjetniki in spletne trgovine', text: 'Pošiljke iz Azije, ZDA in Evrope, dostava v skladišče ali neposredno kupcu.' },
        { icon: 'factory', title: 'Proizvajalci', text: 'Surovine v tovarno, končni izdelki distributerju, oprema.' },
        { icon: 'build', title: 'Gradbena podjetja', text: 'Gradbeni material, stroji na nizkopodniku, tovornjak z dvigalom in avtodvigalo na gradbišče.' },
        { icon: 'agro', title: 'Kmetijstvo', text: 'Kmetijski stroji, žito, gnojila, sipki tovor s prekucniki.' },
        { icon: 'home', title: 'Fizične osebe', text: 'Selitve, pohištvo in gospodinjski aparati, avtomobili iz Evrope.' },
      ],
    },
    cta: {
      title: 'Izračunamo prevoz za vaš tovor',
      text: 'Pustite telefonsko številko in relacijo. Logist vas bo poklical, izbral vozilo in povedal ceno.',
      button: 'Izračun cene',
      or: 'ali nam pišite',
      orMobile: 'Pišite nam v aplikaciji',
    },
    related: 'Druge storitve',
    cargoTitle: 'Kaj prevažamo',
    pricesTitle: 'Cenik',
  },

  home: {
    meta: {
      title: 'Prevoz tovora Slovenija – Ukrajina, po Evropi in Ukrajini | CR Logistics',
      description:
        'Prevoz tovora med Slovenijo, Evropo in Ukrajino ter po vsej Ukrajini: kombi, tovornjak, izredni prevozi, avtotransporter. Uvoz iz Azije in ZDA po morju in letalsko.',
    },
    eyebrow: "Cestni prevoz · Letalski · Pomorski",
    h1: 'Prevoz tovora',
    h1Accent: 'po Ukrajini in v tujino',
    lead: "Vozilo izberemo glede na vaš tovor in ga v 2 urah pripeljemo na katero koli lokacijo. Vozimo po vsej Ukrajini in Evropi, po morju in letalsko dostavljamo iz Azije in ZDA ter uredimo carinjenje.",
    bullets: ['Kombi od 1,2 €/km, tovornjak od 1,5 €/km v Evropi', 'Samostojno vozilo ali vozilo, ki že gre v vašo smer', 'Logist dosegljiv 24 ur na dan', 'Pogoji zapisani v naročilu'],
    faq: [
      {
        q: 'Kako izvem ceno prevoza?',
        a: 'Izpolnite obrazec ali pokličite. Logist preveri relacijo, težo in prostornino, izbere vozilo in pove ceno. Ko se dogovorimo, podpišemo naročilo za prevoz in rezerviramo vozilo za želeni datum.',
      },
      {
        q: 'Kako se oblikuje cena?',
        a: 'Osnova sta razdalja in vrsta vozila. Vplivajo tudi teža in prostornina tovora, njegove posebnosti (lomljiv, izredni), število mest nakladanja, delavci za prenos in zasedenost relacije: prevoz brez povratnega tovora je dražji.',
      },
      {
        q: 'Kako prepeljati ceneje?',
        a: 'Če tovor zaseda le del vozila, je ugodnejši zbirni prevoz: plačate samo svoj prostor. Slabost je, da se morate prilagoditi terminu glavnega prevoza.',
      },
      {
        q: 'Kdo odgovarja za tovor med prevozom?',
        a: 'Prevoznik po naročilu odgovarja za tovor. Voznik ob nakladanju preveri stanje in pritrditev. Na mednarodnih prevozih velja zavarovanje CMR, razširjeno zavarovanje uredimo na željo.',
      },
      {
        q: 'Kako plačam prevoz?',
        a: 'Način in rok plačila zapišemo v naročilo za prevoz. Običajno del plačate ob rezervaciji vozila, preostanek po dostavi.',
      },
      {
        q: 'Ali lahko naročim delavce za prenos?',
        a: 'Da. Zagotovimo delavce za nakladanje in razkladanje, pri selitvah pa tudi razstavljanje pohištva in pakiranje.',
      },
      {
        q: 'Ali lahko potujem skupaj s tovorom?',
        a: 'Da, kombiji in tovornjaki imajo običajno sedež za sopotnika. Navedite to v povpraševanju, da izberemo primerno vozilo.',
      },
      {
        q: 'Ali vozite tudi v tujino?',
        a: 'Da. Vozimo iz Ukrajine v evropske države in nazaj, po Evropi, uvažamo pa tudi tovor iz Azije in ZDA po morju in letalsko.',
      },
    ],
  },

  vehicles: [
    {
      id: 'bus',
      name: 'Dostavni kombi',
      use: 'Selitve, pohištvo, aparati, manjše pošiljke',
      specs: [
        { label: 'Nosilnost', value: '1–2 t' },
        { label: 'Prostornina', value: 'do 20 m³' },
        { label: 'Tovorni prostor, D×Š×V', value: 'do 4,8×2,2×2,2 m' },
        { label: 'Palete', value: 'do 8–10' },
      ],
      price: 'od 60 UAH/km',
    },
    {
      id: 't5',
      name: 'Tovornjak 5 t',
      use: 'Komercialni tovor, palete, selitve pisarn',
      specs: [
        { label: 'Nosilnost', value: 'do 5 t' },
        { label: 'Prostornina', value: 'do 36–45 m³' },
        { label: 'Tovorni prostor, D×Š×V', value: 'do 7,2×2,45×2,5 m' },
        { label: 'Palete', value: 'do 15–18' },
      ],
      price: 'od 80 UAH/km',
    },
    {
      id: 't10',
      name: 'Tovornjak 10 t',
      use: 'Gradbeni material, oprema, večje pošiljke',
      specs: [
        { label: 'Nosilnost', value: 'do 10 t' },
        { label: 'Prostornina', value: 'do 50 m³' },
        { label: 'Tovorni prostor, D×Š×V', value: 'do 9×2,45×2,7 m' },
        { label: 'Palete', value: 'do 22' },
      ],
      price: 'od 100 UAH/km',
    },
    {
      id: 'fura',
      name: 'Tovornjak s polprikolico (ponjava)',
      use: 'Celotni tovori po Ukrajini in v Evropo',
      specs: [
        { label: 'Nosilnost', value: 'do 22 t' },
        { label: 'Prostornina', value: '86–92 m³' },
        { label: 'Tovorni prostor, D×Š×V', value: '13,6×2,45×2,7 m' },
        { label: 'Palete', value: 'do 33–34' },
      ],
      price: 'od 70 UAH/km',
    },
    {
      id: 'coupler',
      name: 'Tovornjak s prikolico (tandem)',
      use: 'Lahek, voluminozen tovor, kjer štejejo kubiki',
      specs: [
        { label: 'Nosilnost', value: 'do 22 t' },
        { label: 'Prostornina', value: '110–120 m³' },
        { label: 'Tovorni prostor', value: '2 × 7,7 m' },
        { label: 'Palete', value: 'do 36–38' },
      ],
      price: 'od 80 UAH/km',
    },
    {
      id: 'carrier',
      name: 'Avtotransporter',
      use: 'Novi in rabljeni avtomobili, več vozil na prevoz',
      specs: [
        { label: 'Zmogljivost', value: 'do 8 osebnih vozil' },
        { label: 'Možnosti', value: 'avtovleka, odprt, zaprt' },
        { label: 'Tudi', value: 'motorji, poškodovana vozila' },
      ],
      price: 'od 40 UAH/km',
    },
    {
      id: 'lowbed',
      name: 'Nizkopodnik',
      use: 'Gradbeni in kmetijski stroji, izredni tovor',
      specs: [
        { label: 'Nosilnost', value: 'do 60–80 t' },
        { label: 'Ploščad', value: 'nizkopodna, teleskopska' },
        { label: 'Dovoljenja', value: 'uredimo za relacijo' },
      ],
      price: 'od 100 UAH/km',
    },
    {
      id: 'manipulator',
      name: 'Tovornjak z dvigalom',
      use: 'Nakladanje brez avtodvigala: bloki, kioski, oprema',
      specs: [
        { label: 'Keson', value: '6–8 m' },
        { label: 'Dvigalo', value: 'od 3 do 7 t' },
        { label: 'Prevoz', value: 'do 10 t' },
      ],
      price: 'od 100 UAH/km',
    },
    {
      id: 'reefer',
      name: 'Hladilno vozilo',
      use: 'Živila, zdravila, cvetje: pri pravi temperaturi',
      specs: [
        { label: 'Nosilnost', value: 'od 1,5 do 22 t' },
        { label: 'Temperatura', value: 'od −20 do +20 °C' },
        { label: 'Palete', value: 'do 33' },
      ],
      price: 'od 80 UAH/km',
    },
    {
      id: 'tipper',
      name: 'Prekucnik / vozilo za žito',
      use: 'Pesek, gramoz, zemlja, žito, gnojila',
      specs: [
        { label: 'Prostornina kesona', value: '20–60 m³' },
        { label: 'Nosilnost', value: 'do 25–40 t' },
        { label: 'Razkladanje', value: 's prekucnikom' },
      ],
      price: 'od 100 UAH/km',
    },
    {
      id: 'tanker',
      name: 'Cisterna',
      use: 'Živilske in tehnične tekočine, olje, gorivo',
      specs: [
        { label: 'Prostornina', value: '20–40 m³' },
        { label: 'Vrste', value: 'živilska, kemična, za gorivo' },
      ],
      price: 'od 100 UAH/km',
    },
    {
      id: 'crane',
      name: 'Avtodvigalo',
      use: 'Dviganje in montaža težkih bremen na terenu',
      specs: [
        { label: 'Nosilnost', value: '25–50 t' },
        { label: 'Obračun', value: 'na uro, minimalna izmena' },
      ],
      price: 'po dogovoru',
    },
  ],

  hubs: [
    {
      slug: 'ukraine',
      meta: {
        title: 'Prevoz tovora po Ukrajini',
        description:
          'Prevoz tovora med mesti v Ukrajini: kombi do 2 t, tovornjaki 5–10 t, tovornjak 22 t, izredni prevozi. Postavke od 60 UAH/km, samostojno vozilo ali zbirni prevoz.',
      },
      h1: 'Prevoz tovora po Ukrajini',
      lead: 'Vozimo med katerimi koli mesti in vasmi v Ukrajini: od nekaj škatel v zbirnem prevozu do polnega tovornjaka ali izrednega tovora na nizkopodniku.',
      bullets: ['Kombi, tovornjaki 5–10 t, tovornjak 22 t', 'Samostojno vozilo ali zbirni prevoz', 'Delavci za prenos po potrebi'],
      sections: [
        {
          title: 'Kaj delamo',
          items: [
            'Prevozi med mesti: Kijev, Lvov, Odesa, Dnipro, Harkov, Vinica, Užgorod in kateri koli drug kraj',
            'Celovite selitve stanovanj in pisarn',
            'Komercialni tovor: palete, oprema, gradbeni material',
            'Zbirni prevoz za manjše pošiljke',
            'Izredni prevozi, stroji, avtotransporterji, tovornjaki z dvigalom, avtodvigala',
            'Hladilna vozila, prekucniki in vozila za žito, cisterne',
          ],
        },
        {
          title: 'Kako izračunamo ceno',
          text: 'Postavka je odvisna od vrste vozila in razdalje. Na znesek vplivajo tudi teža in prostornina, število mest nakladanja, potreba po delavcih in zasedenost relacije. Postavke »od« na strani so okvirne, točno ceno vam logist pove po povpraševanju.',
        },
      ],
      faq: [
        {
          q: 'Koliko stane prevoz po Ukrajini?',
          a: 'Samostojni kombi do 2 t od 60 UAH/km, tovornjak 5 t od 50, 10 t od 60, tovornjak 22 t od 70 UAH/km. Točna cena je odvisna od tovora in relacije.',
        },
        {
          q: 'Kako hitro lahko pride vozilo?',
          a: 'Odvisno od razpoložljivosti vozil v regiji. Pogosto ga najdemo za isti ali naslednji dan; za točno določen datum je bolje rezervirati vnaprej.',
        },
        {
          q: 'Ali vozite tudi v manjše kraje in vasi?',
          a: 'Da, naslov nakladanja in razkladanja je lahko kjer koli, razen na območju aktivnih vojaških spopadov.',
        },
        {
          q: 'Ali lahko s tovorom potuje tudi sopotnik?',
          a: 'Da, kombiji in tovornjaki imajo običajno prostor za spremljevalca. Navedite to v povpraševanju.',
        },
      ],
    },
    {
      slug: 'international',
      meta: {
        title: 'Mednarodni prevoz tovora: Ukrajina – Evropa, Azija, ZDA, morje, letalo',
        description:
          'Prevoz iz Slovenije in Evrope v Ukrajino in nazaj, prevozi po Evropi, uvoz iz Azije in ZDA po morju in letalsko. Samostojno vozilo, zbirni prevoz, kontejnerji.',
      },
      h1: 'Mednarodni prevoz tovora',
      lead: 'Prepeljemo tovor iz Ukrajine v Evropo in nazaj, po Evropi, organiziramo pa tudi dostavo blaga iz Azije in ZDA po morju ali letalsko.',
      bullets: ['Ukrajina ↔ Evropa, prevozi po EU', 'Uvoz iz Azije in ZDA: morje, letalo', 'Dokumenti in carinjenje'],
      sections: [
        {
          title: 'Smeri',
          text: 'Poljska, Nemčija, Češka, Slovaška, Madžarska, Romunija, Bolgarija, Avstrija, Slovenija, Hrvaška, Italija, Francija, Španija, Nizozemska, Belgija, baltske države in druge. Za vsako relacijo izberemo vozilo in način dostave.',
        },
        {
          title: 'Na ključ',
          items: [
            'Izbira vozila glede na težo, prostornino in vrsto tovora',
            'Nakladanje na naslovu pošiljatelja',
            'CMR in spremni dokumenti, carinjenje prek špediterja',
            'Dostava do vrat prejemnika',
          ],
        },
      ],
      faq: [
        {
          q: 'Kako se izračuna cena mednarodnega prevoza?',
          a: 'Cestno na kilometer ali v pavšalu za relacijo: kombi do 2 t okvirno 1,2 €/km, tovornjak 22 t 1,5 €/km, paleta v zbirnem prevozu od 0,4 €/km. Morje in letalo: na kubični meter ali kilogram.',
        },
        {
          q: 'Kdo poskrbi za carino?',
          a: 'Carinjenje opravimo prek partnerskega carinskega špediterja. Od vas potrebujemo račun, dobavnico (packing list) in druge dokumente za blago.',
        },
        {
          q: 'Ali lahko pošljem manjši tovor?',
          a: 'Da, poljubna teža v zbirnem prevozu. Iz Kitajske v zbirnem kontejnerju ali letalsko.',
        },
      ],
    },
  ],

  services: [
    // ——— Po Ukrajini ———
    {
      slug: 'bus',
      group: 'ukraine',
      meta: {
        title: 'Prevoz s kombijem do 2 t po Ukrajini od 60 UAH/km',
        description:
          'Dostavni kombi do 2 t in 20 m³ za selitve, pohištvo in manjše pošiljke. Samostojno vozilo ali zbirni prevoz, potovanje s tovorom, delavci za prenos.',
      },
      card: { icon: 'bus', title: 'Kombi do 2 t', text: 'Selitve, pohištvo, aparati, manjše pošiljke', price: 'od 60 UAH/km' },
      h1: 'Prevoz s kombijem do 2 toni',
      lead: 'Dostavni kombi tipa Sprinter, Crafter ali Master: prostoren, hiter in ugoden za manjše tovore po Ukrajini.',
      bullets: ['Do 2 t in do 20 m³', 'S tovorom lahko potujete tudi vi', 'Delavci za prenos po potrebi'],
      priceFrom: 'od 60 UAH/km',
      intro: {
        title: 'Kombi za manjše tovore',
        paragraphs: [
          'Dostavni kombi je najpogostejša izbira za tovore do 2 toni. Hitro vozi po avtocesti, zlahka pride na dvorišče in do vhoda, 20 m³ prostora pa zadošča za selitev stanovanja ali pošiljko blaga za trgovino.',
          'Vozilo pripeljemo na vaš naslov, voznik tovor pritrdi s pasovi in kombi takoj odpelje na cilj, brez pretovarjanja. Po potrebi se v kabini pelje spremljevalec, na nakladanje pa pridejo delavci.',
        ],
      },
      cargo: {
        title: 'Kaj prevažamo s kombijem',
        items: ['Stvari in pohištvo pri selitvi', 'Gospodinjski aparati', 'Škatle, paketi', 'Blago na 1–8 paletah', 'Rezervni deli', 'Oprema za trgovino ali pisarno'],
      },
      sections: [
        {
          title: 'Kdaj zadošča kombi',
          text: 'Kombi je primeren za selitev garsonjere ali dvosobnega stanovanja, manjše pisarne ali pošiljko blaga do 2 toni. Če tovor zaseda manj kot polovico prostora, predlagamo zbirni prevoz, ki je cenejši.',
        },
        {
          title: 'Kaj je vključeno',
          items: ['Prihod vozila na naslov', 'Pasovi za pritrditev tovora', 'Sedež za spremljevalca', 'Dodatno mesto nakladanja po dogovoru'],
        },
      ],
      prices: {
        title: 'Cene kombija',
        rows: [
          { label: 'Samostojni kombi do 2 t', value: 'od 60 UAH/km' },
          { label: 'Stvari in pohištvo (selitev)', value: 'od 60 UAH/km' },
          { label: 'Zbirni prevoz', value: 'od 15 UAH/km' },
          { label: 'Delavec za prenos', value: 'od 250 UAH/uro', note: 'najmanj 2 uri' },
        ],
        note: 'Postavke so okvirne. Točno ceno vam logist pove po povpraševanju.',
      },
      vehicles: ['bus', 't5'],
      faq: [
        {
          q: 'Koliko stvari gre v kombi?',
          a: 'Prostor do 20 m³ je približno vsebina garsonjere: omara, kavč, postelja, hladilnik, pralni stroj in 15–20 škatel.',
        },
        {
          q: 'Ali lahko potujem skupaj s tovorom?',
          a: 'Da, v kabini sta običajno en ali dva sedeža za sopotnike. Navedite to v povpraševanju.',
        },
        {
          q: 'Ali voznik pomaga pri nakladanju?',
          a: 'Voznik tovor pritrdi v tovornem prostoru. Za prenašanje je bolje naročiti delavce: organiziramo jih za nakladanje in razkladanje.',
        },
      ],
    },
    {
      slug: 'trucks',
      group: 'ukraine',
      meta: {
        title: 'Prevoz s tovornjakom 5 in 10 t po Ukrajini od 80 UAH/km',
        description:
          'Tovornjaki 5 t in 10 t za komercialni tovor, palete, opremo in gradbeni material. Ponjava, izotermična nadgradnja, dvižna ploščad. Postavke od 80 UAH/km.',
      },
      card: { icon: 'truck', title: 'Tovornjaki 5–10 t', text: 'Komercialni tovor, palete, oprema', price: 'od 80 UAH/km' },
      h1: 'Prevoz s tovornjakom 5 in 10 ton',
      lead: 'Srednje veliki tovornjaki za podjetja: pošiljke blaga, palete, oprema, gradbeni material. Izberemo nadgradnjo glede na tovor in način nakladanja.',
      bullets: ['Do 10 t in do 50 m³', 'Ponjava, izoterma, dvižna ploščad', 'Nakladanje od zgoraj, s strani, zadaj'],
      priceFrom: 'od 80 UAH/km',
      intro: {
        title: 'Tovornjaki za podjetja',
        paragraphs: [
          'Pettonski in desettonski tovornjaki pokrijejo večino potreb podjetij: dobave v skladišče, dostavo strankam, prevoz opreme in gradbenega materiala. Po ceni in zmogljivosti so zlata sredina med kombijem in tovornjakom s polprikolico.',
          'Nadgradnjo izberemo glede na tovor: ponjavo, kadar je potrebno nakladanje s strani ali od zgoraj; zaprt furgon za blago, ki se boji prahu; izotermo ali hladilnik za živila; dvižno ploščad, kadar na mestu ni viličarja.',
        ],
      },
      cargo: {
        title: 'Kaj prevažamo',
        items: ['Blago na paletah', 'Gradbeni material', 'Oprema in obdelovalni stroji', 'Agregati', 'Kabli in jeklo', 'Pohištvo in aparati v večjih količinah', 'Blago v škatlah, vrečah, big bagih', 'Kmetijski pridelki'],
      },
      sections: [
        {
          title: 'Nadgradnje',
          items: ['Ponjava: vsestranska, s popolnim odpiranjem', 'Zaprt kovinski furgon', 'Izoterma in hladilnik za živila', 'Dvižna ploščad za nakladanje brez viličarja'],
        },
        {
          title: 'Za podjetja',
          text: 'Prevzamemo redne dobave v skladišča in trgovine, dostavo od proizvajalca do stranke ter selitve pisarn in skladišč. Pogoje in način plačila zapišemo v pogodbo.',
        },
      ],
      prices: {
        title: 'Cene tovornjakov',
        rows: [
          { label: 'Tovornjak do 5 t', value: 'od 80 UAH/km' },
          { label: 'Tovornjak do 10 t', value: 'od 100 UAH/km' },
          { label: 'Zbirni prevoz', value: 'po dogovoru' },
        ],
        note: 'Postavke so okvirne. Na ceno vplivajo teža, prostornina, vrsta nadgradnje in relacija.',
      },
      vehicles: ['t5', 't10'],
      faq: [
        {
          q: 'Kateri tovornjak izbrati: 5 ali 10 ton?',
          a: 'Ravnajte se po teži in številu palet: do 15–18 palet in 5 t pettonski, do 22 palet in 10 t desettonski. Logist vam svetuje glede na podatke o tovoru.',
        },
        {
          q: 'Ali imate vozila z dvižno ploščadjo?',
          a: 'Da, če na mestu ni viličarja, izberemo tovornjak z dvižno ploščadjo. Navedite to v povpraševanju.',
        },
        {
          q: 'Ali lahko prevažate živila?',
          a: 'Da, za živila izberemo izotermo ali hladilno vozilo s pravo temperaturo.',
        },
      ],
    },
    {
      slug: 'fura',
      group: 'ukraine',
      meta: {
        title: 'Prevoz s tovornjakom 22 t po Ukrajini od 70 UAH/km',
        description:
          'Tovornjak s polprikolico 22 t, 86–92 m³, 33 palet ter tandemi do 120 m³. Celotni tovori po Ukrajini in v Evropo. Postavke od 70 UAH/km.',
      },
      card: { icon: 'trailer', title: 'Tovornjak 22 t in tandem', text: 'Celotni tovori, do 34 palet', price: 'od 70 UAH/km' },
      h1: 'Prevoz s tovornjakom 22 ton',
      lead: 'Polprikolice s ponjavo in tandemi za velike pošiljke: do 22 ton, do 34 palet ali do 120 m³ lahkega, voluminoznega tovora.',
      bullets: ['Do 22 t, 86–120 m³', 'Do 33–38 palet', 'Ponjava se odpre v celoti'],
      priceFrom: 'od 70 UAH/km',
      intro: {
        title: 'Celoten tovor z enim vozilom',
        paragraphs: [
          'Tovornjak s polprikolico je najcenejši način za prevoz velike pošiljke: kilometer stane več kot pri manjšem tovornjaku, a preračunano na tono ali paleto je ugodneje.',
          'S tovornjaki vozimo po vsej Ukrajini in v evropske države. Za lahek, a voluminozen tovor ponudimo tandeme do 120 m³, za živila hladilna vozila.',
        ],
      },
      cargo: {
        title: 'Kaj prevažamo s tovornjakom',
        items: ['Paletirano blago', 'Gradbeni material', 'Jeklene konstrukcije', 'Embalaža', 'Pohištvo', 'Žito v big bagih', 'Živila (hladilnik)', 'Lahek voluminozen tovor (tandem)'],
      },
      sections: [
        {
          title: 'Polprikolica ali tandem',
          text: 'Standardna polprikolica je dolga 13,6 m in ima 86–92 m³. Če je tovor lahek, a voluminozen, je ugodnejši tandem: dva tovorna prostora po 7,7 m dasta do 120 m³.',
        },
        {
          title: 'Načini nakladanja',
          items: ['Zadaj z rampe', 'S strani ob odprti ponjavi', 'Od zgoraj, ko odstranimo stebre in prečke', 'Več mest nakladanja ali razkladanja'],
        },
      ],
      prices: {
        title: 'Cene tovornjaka 22 t',
        rows: [
          { label: 'Tovornjak 22 t (ponjava)', value: 'od 70 UAH/km' },
          { label: 'Tandem do 120 m³', value: 'od 80 UAH/km' },
          { label: 'Tovornjak po Evropi', value: 'od 1,5 €/km' },
        ],
        note: 'Postavke so okvirne. Cena je odvisna od relacije, sezone in povratnega tovora.',
      },
      vehicles: ['fura', 'coupler'],
      faq: [
        {
          q: 'Koliko palet gre v tovornjak?',
          a: 'V standardno polprikolico 13,6 m gre 33–34 europalet, v tandem do 36–38.',
        },
        {
          q: 'Ali lahko naložim na enem mestu in razložim na več mestih?',
          a: 'Da, relacijo z več točkami dogovorimo vnaprej in jo upoštevamo v ceni.',
        },
        {
          q: 'Ali vozite s tovornjakom v tujino?',
          a: 'Da, naši tovornjaki vozijo v evropske države in nazaj. Okvirna postavka je 1,5 €/km.',
        },
      ],
    },
    {
      slug: 'negabaryt',
      group: 'ukraine',
      meta: {
        title: 'Izredni prevozi z nizkopodnikom od 100 UAH/km',
        description:
          'Izredni in težki tovori do 80 t: gradbeni in kmetijski stroji, oprema, montažne hiše. Nizkopodniki, ploščadi, dovoljenja in načrt poti.',
      },
      card: { icon: 'oversized', title: 'Izredni prevozi', text: 'Stroji in oprema do 80 t', price: 'od 100 UAH/km' },
      h1: 'Izredni prevozi',
      lead: 'Z nizkopodniki in ploščadmi prevažamo, kar ne gre v običajno vozilo: stroje, opremo, konstrukcije. Uredimo dovoljenja in načrtujemo pot.',
      bullets: ['Do 60–80 t', 'Nizkopodni in teleskopski priklopniki', 'Dovoljenja in pot za vaš tovor'],
      priceFrom: 'od 100 UAH/km',
      cargo: {
        title: 'Kaj prevažamo',
        items: ['Bagri, nakladalniki, buldožerji', 'Traktorji in kombajni', 'Cestna mehanizacija', 'Industrijska oprema in linije', 'Jeklene konstrukcije, rezervoarji', 'Kioski, zabojniki, montažne hiše', 'Betonski izdelki, plošče'],
      },
      sections: [
        {
          title: 'Kako poteka',
          items: [
            'Dobimo mere, težo in fotografije tovora',
            'Izberemo nizkopodnik ali ploščad',
            'Načrtujemo pot glede na mostove, daljnovode in omejitve',
            'Uredimo dovoljenja za izredni prevoz',
            'Po potrebi organiziramo spremstvo ter dvigalo za nakladanje',
          ],
        },
      ],
      prices: {
        title: 'Cene izrednih prevozov',
        rows: [
          { label: 'Nizkopodnik po Ukrajini', value: 'od 100 UAH/km' },
          { label: 'Dovoljenja in spremstvo', value: 'obračunamo posebej' },
        ],
        note: 'Ceno izračunamo posebej za vsak prevoz: odvisna je od mer, teže in poti.',
      },
      vehicles: ['lowbed', 'manipulator', 'crane'],
      faq: [
        {
          q: 'Kaj velja za izredni tovor?',
          a: 'Tovor, širši od 2,6 m, višji od 4 m skupaj z vozilom, daljši od 22 m ali težji od dovoljene osne obremenitve. Za tak tovor so potrebna dovoljenja in odobrena pot.',
        },
        {
          q: 'Koliko časa traja pridobitev dovoljenj?',
          a: 'Odvisno od mer in poti. Zato se z izrednim tovorom obrnite na nas pravočasno.',
        },
        {
          q: 'Ali lahko pripeljete stroj iz Evrope?',
          a: 'Da, z nizkopodniki vozimo iz Poljske, Nemčije in drugih držav EU v Ukrajino.',
        },
      ],
    },
    {
      slug: 'avtovoz',
      group: 'ukraine',
      meta: {
        title: 'Prevoz avtomobilov z avtotransporterjem: Ukrajina in Evropa',
        description:
          'Prevoz vozil z avtotransporterjem in avtovleko po Ukrajini in iz Evrope: osebna vozila, motorji, električna vozila, poškodovana vozila. Odprti in zaprti transporterji.',
      },
      card: { icon: 'car', title: 'Avtotransporter', text: 'Vozila po Ukrajini in iz Evrope', price: 'od 40 UAH/km' },
      h1: 'Prevoz avtomobilov',
      lead: 'Prepeljemo eno vozilo z avtovleko ali več vozil z avtotransporterjem: po Ukrajini, iz Evrope v Ukrajino in nazaj.',
      bullets: ['Avtovleka za 1–2 vozili, transporter do 8', 'Odprti in zaprti transporterji', 'Poškodovana in nevozna vozila'],
      priceFrom: 'od 40 UAH/km',
      cargo: {
        title: 'Kaj prevažamo',
        items: ['Osebna vozila', 'SUV-ji in enoprostorci', 'Električna vozila', 'Motorna kolesa in štirikolesniki', 'Poškodovana vozila', 'Nova vozila iz salona'],
      },
      sections: [
        {
          title: 'Možnosti',
          items: ['Avtovleka za eno ali dve vozili: hitro, brez čakanja na polno naložitev', 'Avtotransporter do 8 vozil: ceneje na vozilo', 'Zaprt transporter: za draga in starodobna vozila'],
        },
        {
          title: 'Iz Evrope',
          text: 'Pripeljemo vozilo iz Litve, Poljske, Nemčije in drugih držav: z dražbe, od trgovca ali od fizične osebe. Pomagamo pri dokumentih za prehod meje.',
        },
      ],
      prices: {
        title: 'Cene prevoza vozil',
        rows: [
          { label: 'Po Ukrajini', value: 'od 40 UAH/km' },
          { label: 'Iz Litve v Ukrajino', value: 'od 850 €' },
        ],
        note: 'Cena je odvisna od modela, teže, relacije in števila vozil.',
      },
      vehicles: ['carrier'],
      faq: [
        {
          q: 'Ali lahko prepeljete nevozno vozilo?',
          a: 'Da, naložimo ga z vitlom. V povpraševanju opišite stanje vozila.',
        },
        {
          q: 'Ali je vozilo med prevozom zavarovano?',
          a: 'Prevoznik po naročilu odgovarja za vozilo. Dodatno zavarovanje uredimo na željo.',
        },
      ],
    },
    {
      slug: 'manipulator',
      group: 'ukraine',
      meta: {
        title: 'Tovornjak z dvigalom v Kijevu in po vsej Ukrajini',
        description:
          'Tovornjak s kesonom 6–8 m in dvigalom do 7 t: nakladanje in prevoz blokov, kioskov, opreme in gradbenega materiala brez ločenega avtodvigala.',
      },
      card: { icon: 'manipulator', title: 'Tovornjak z dvigalom', text: 'Sam naloži in pripelje', price: 'od 100 UAH/km' },
      h1: 'Tovornjak z dvigalom',
      lead: 'Tovornjak z nakladalnim dvigalom sam naloži, pripelje in razloži tovor tam, kjer ni viličarja ali avtodvigala.',
      bullets: ['Keson 6–8 m', 'Dvigalo od 3 do 7 t', 'Kijev, regija in vsa Ukrajina'],
      priceFrom: 'od 100 UAH/km',
      cargo: {
        title: 'Kaj prevažamo',
        items: ['Gradbeni material na paletah', 'Betonske cevi, bloki, plošče', 'Kioski, gradbeni zabojniki', 'Agregati, oprema', 'Zabojniki', 'Sefi in težki predmeti'],
      },
      sections: [
        {
          title: 'Zakaj tovornjak z dvigalom',
          text: 'Ni treba ločeno naročati avtodvigala in tovornjaka: eno vozilo opravi vse. To prihrani čas in denar na manjših gradbiščih.',
        },
      ],
      prices: {
        title: 'Cene',
        rows: [
          { label: 'Tovornjak z dvigalom (prevoz)', value: 'od 100 UAH/km' },
          { label: 'Delo v mestu', value: 'na uro, po dogovoru' },
        ],
        note: 'Cena je odvisna od nosilnosti dvigala, trajanja dela in razdalje.',
      },
      vehicles: ['manipulator', 'crane'],
      faq: [
        {
          q: 'Koliko lahko dvigne tovornjak z dvigalom?',
          a: 'Odvisno od dvigala in dosega: ob vozilu do 7 t, pri največjem dosegu precej manj. Povejte težo in razdaljo od vozila do mesta, pa izberemo pravo vozilo.',
        },
      ],
    },
    {
      slug: 'avtokran',
      group: 'ukraine',
      meta: {
        title: 'Najem avtodvigala 25–50 t v Kijevu in okolici',
        description:
          'Avtodvigalo za montažo, nakladanje in dviganje težkih bremen. Nosilnost 25–50 t, obračun na uro, skupaj z nizkopodnikom za prevoz.',
      },
      card: { icon: 'crane', title: 'Avtodvigalo', text: 'Dviganje in montaža do 50 t', price: 'po dogovoru' },
      h1: 'Najem avtodvigala',
      lead: 'Avtodvigalo z nosilnostjo 25–50 ton za nakladanje, razkladanje in montažo. Lahko ga združimo z nizkopodnikom ali tovornjakom za prevoz.',
      bullets: ['25–50 t', 'Obračun na uro', 'Skupaj s prevozom'],
      cargo: {
        title: 'Za kaj se naroča',
        items: ['Nakladanje strojev na nizkopodnik', 'Montaža jeklenih konstrukcij', 'Postavitev opreme', 'Razkladanje gradbenega materiala', 'Montaža montažnih hiš'],
      },
      sections: [
        {
          title: 'Kaj potrebujemo za izračun',
          items: ['Teža in mere bremena', 'Razdalja od dvigala do mesta postavitve', 'Naslov in pogoji dostopa', 'Okvirno trajanje dela'],
        },
      ],
      vehicles: ['crane', 'lowbed'],
      faq: [
        {
          q: 'Kako se obračuna avtodvigalo?',
          a: 'Na uro, z minimalno izmeno. Prihod dvigala na lokacijo zunaj mesta obračunamo posebej.',
        },
      ],
    },
    {
      slug: 'pereizd',
      group: 'ukraine',
      meta: {
        title: 'Selitve stanovanj in pisarn po Ukrajini in v Evropo',
        description:
          'Celovite selitve: kombi 15–20 m³, delavci od 250 UAH/uro, pakiranje, selitve med mesti in v tujino. Samostojno vozilo od 60 UAH/km.',
      },
      card: { icon: 'moving', title: 'Selitve', text: 'Stanovanje, pisarna, med mesti in v tujino', price: 'od 60 UAH/km' },
      h1: 'Selitve stanovanj in pisarn',
      lead: 'Prepeljemo stvari, pohištvo in aparate v drugo mesto ali državo. Naročite lahko vozilo z delavci, pakiranje in razstavljanje pohištva.',
      bullets: ['Samostojno vozilo od 60 UAH/km', 'Delavci od 250 UAH/uro', 'Po Ukrajini in v Evropo'],
      priceFrom: 'od 60 UAH/km',
      intro: {
        title: 'Selitev brez skrbi',
        paragraphs: [
          'Selitev v drugo mesto ni samo vozilo. Pohištvo je treba razstaviti, stvari zapakirati, vse odnesti iz stanovanja in enako skrbno prinesti v novega. Prevzamemo toliko, kot želite: od samega vozila do celovite selitve.',
          'Vozilo izberemo glede na količino stvari: za garsonjero zadošča kombi 15–20 m³, za večje selitve tovornjak. S stvarmi lahko potujete sami ali vse prepustite nam.',
        ],
      },
      cargo: {
        title: 'Kaj prevažamo',
        items: ['Pohištvo', 'Gospodinjski aparati', 'Osebne stvari v škatlah', 'Pisarniško pohištvo in oprema', 'Dokumenti in arhivi', 'Lončnice'],
      },
      sections: [
        {
          title: 'Celovita selitev',
          items: ['Vozilo glede na količino stvari', 'Delavci za nakladanje in razkladanje', 'Razstavljanje in sestavljanje pohištva', 'Material za pakiranje', 'Prenos v nadstropje'],
        },
        {
          title: 'Selitev v tujino',
          text: 'Stvari prepeljemo na Poljsko, v Nemčijo, na Češko, v Slovenijo in druge evropske države ter pomagamo z dokumenti za mejo. Ceno izračunamo posebej: odvisna je od države, količine in načina, samostojno vozilo ali zbirni prevoz.',
        },
      ],
      prices: {
        title: 'Cene selitev',
        rows: [
          { label: 'Samostojno vozilo 15–20 m³', value: 'od 60 UAH/km' },
          { label: 'Zbirni prevoz', value: 'od 15 UAH/km' },
          { label: 'Delavec za prenos', value: 'od 250 UAH/uro', note: 'najmanj 2 uri' },
          { label: 'Selitev v Evropo', value: 'od 0,3 €/km' },
        ],
        note: 'Postavke so okvirne. Točno ceno povemo, ko poznamo količino stvari.',
      },
      vehicles: ['bus', 't5'],
      faq: [
        {
          q: 'Kako ugotovim, kakšno vozilo potrebujem?',
          a: 'Naštejte večje kose (omare, kavč, aparati) in približno število škatel ali pošljite fotografije prek aplikacije. Logist izbere pravo vozilo.',
        },
        {
          q: 'Ali se lahko preselim ceneje?',
          a: 'Da, z zbirnim prevozom: plačate le prostor, ki ga zasedajo vaše stvari. Termin je takrat odvisen od glavnega prevoza.',
        },
        {
          q: 'Ali lahko s stvarmi prepeljem tudi hišnega ljubljenčka?',
          a: 'Dogovorite se z logistom: v nekaterih vozilih je to mogoče skupaj s spremljevalcem.',
        },
      ],
    },
    {
      slug: 'zbirni',
      group: 'ukraine',
      meta: {
        title: 'Zbirni prevoz tovora po Ukrajini in v Evropo',
        description:
          'Zbirni prevoz za manjše pošiljke: plačate le prostor v vozilu. Po Ukrajini od 15 UAH/km, v Evropo od 0,4 €/km na paleto.',
      },
      card: { icon: 'groupage', title: 'Zbirni prevoz', text: 'Plačate le svoj prostor', price: 'od 15 UAH/km' },
      h1: 'Zbirni prevoz tovora',
      lead: 'Manjša pošiljka ne potrebuje svojega vozila. Vaš tovor dodamo prevozu v pravi smeri, plačate pa le zasedeni prostor.',
      bullets: ['Brez minimalne teže', 'Po Ukrajini in v Evropo', 'Ceneje od samostojnega vozila'],
      priceFrom: 'od 15 UAH/km',
      sections: [
        {
          title: 'Za koga je primeren',
          items: ['Nekaj palet ali škatel', 'Manjša selitev', 'Redne manjše dobave', 'Ko rok ni nujen'],
        },
        {
          title: 'Kaj upoštevati',
          text: 'Zbirni prevoz je cenejši, datum nakladanja pa je odvisen od glavnega prevoza. Če potrebujete dostavo točno na določen dan, je bolje samostojno vozilo.',
        },
      ],
      prices: {
        title: 'Cene zbirnega prevoza',
        rows: [
          { label: 'Zbirni prevoz po Ukrajini', value: 'od 15 UAH/km' },
          { label: 'Paleta do 300 kg v Evropo', value: 'od 0,4 €/km' },
        ],
        note: 'Postavke so okvirne, odvisne od relacije in količine.',
      },
      vehicles: ['bus', 'fura'],
      faq: [
        {
          q: 'Koliko cenejši je zbirni prevoz?',
          a: 'Odvisno od količine in relacije. Manj prostora kot zaseda tovor, večji je prihranek v primerjavi s samostojnim vozilom.',
        },
      ],
    },
    {
      slug: 'palety',
      group: 'ukraine',
      meta: {
        title: 'Prevoz palet po Ukrajini: od 1 do 34 palet',
        description:
          'Prevoz blaga na paletah: kombi do 8–10 palet, tovornjaki do 22, polprikolica do 34. Ponjava, izoterma, dvižna ploščad, nakladanje s strani.',
      },
      card: { icon: 'pallet', title: 'Palete', text: 'Od 1 do 34 palet v enem prevozu', price: 'od 60 UAH/km' },
      h1: 'Prevoz blaga na paletah',
      lead: 'Od ene palete v zbirnem prevozu do polnega tovornjaka s 34 paletami. Vozilo izberemo glede na število palet, težo in način nakladanja.',
      bullets: ['1–34 palet', 'Dvižna ploščad in odprta ponjava', 'Izoterma za živila'],
      priceFrom: 'od 60 UAH/km',
      cargo: {
        title: 'Kaj prevažamo na paletah',
        items: ['Živila in pijače', 'Gradbeni material', 'Gospodinjski aparati', 'Blago za trgovske verige', 'Elektro material, kabli', 'Surovine in končni izdelki'],
      },
      sections: [
        {
          title: 'Koliko palet gre v vozilo',
          items: ['Kombi: do 8–10 palet', 'Tovornjak 5 t: do 15–18 palet', 'Tovornjak 10 t: do 22 palet', 'Polprikolica: do 33–34 palet'],
        },
      ],
      vehicles: ['bus', 't5', 't10', 'fura'],
      faq: [
        {
          q: 'Ali lahko pošljem eno paleto?',
          a: 'Da, v zbirnem prevozu z vozilom, ki gre v vašo smer.',
        },
      ],
    },

    {
      slug: 'kyiv',
      group: 'ukraine',
      meta: {
        title: 'Prevoz tovora v Kijevu: mesto, regija in vsa Ukrajina',
        description:
          'Prevoz tovora v Kijevu in Kijevski regiji: kombi od 350 UAH/uro, delavci, selitve. Iz Kijeva po Ukrajini od 60 UAH/km.',
      },
      card: { icon: 'city', title: 'Prevoz po Kijevu', text: 'Mesto, regija in prevozi iz Kijeva', price: 'od 350 UAH/uro' },
      h1: 'Prevoz tovora v Kijevu',
      lead: 'Tovor prepeljemo po Kijevu, v predmestja ali iz Kijeva v katero koli mesto v Ukrajini. Kombi, tovornjak, delavci: kar potrebuje vaša naloga.',
      bullets: ['V mestu na uro', 'Kijevska regija in vsa Ukrajina', 'Delavci in selitve'],
      priceFrom: 'od 350 UAH/uro',
      intro: {
        title: 'Kombi z voznikom po Kijevu',
        paragraphs: [
          'V mestu obračunamo na uro: najmanjše naročilo je 2 uri dela vozila, nato plačate dejanski čas. Zunaj mesta velja postavka na kilometer.',
          'Vozila pripeljemo na levi in desni breg ter v Brovari, Irpin, Bučo, Višneve, Borispil in druga mesta v regiji. Za dostavo iz Kijeva v druga mesta veljajo običajne postavke po Ukrajini.',
        ],
      },
      cargo: {
        title: 'Kaj vozimo po Kijevu',
        items: ['Selitve stanovanj in pisarn', 'Pohištvo in aparati iz trgovine', 'Gradbeni material', 'Blago v skladišče in trgovino', 'Odvoz starega pohištva', 'Oprema'],
      },
      sections: [
        {
          title: 'Nasveti za prihranek',
          items: [
            'Vozilo rezervirajte vnaprej, še posebej za konec meseca in vikende',
            'Navedite točne mere in težo, da ne plačate prevelikega vozila',
            'Stvari pripravite pred prihodom vozila: tudi čakanje se plača',
            'Na aparatih in sanitarni opremi pustite tovarniško embalažo',
          ],
        },
      ],
      prices: {
        title: 'Cene v Kijevu',
        rows: [
          { label: 'Kombi v mestu', value: 'od 350 UAH/uro', note: 'najmanj 2 uri' },
          { label: 'Tovornjak 3–5 t v mestu', value: 'od 600 UAH/uro', note: 'najmanj 2 uri' },
          { label: 'Zunaj mesta', value: 'od 17 UAH/km' },
          { label: 'Delavec za prenos', value: 'od 250 UAH/uro' },
          { label: 'Iz Kijeva po Ukrajini', value: 'od 60 UAH/km' },
        ],
        note: 'Postavke so okvirne. Točno ceno vam logist pove po povpraševanju.',
      },
      vehicles: ['bus', 't5', 'manipulator'],
      faq: [
        {
          q: 'Kako se obračuna prevoz po mestu?',
          a: 'Na uro: najmanj 2 uri dela vozila, nato dejanski čas. Če vozilo pelje izven mesta, se doda postavka na kilometer.',
        },
        {
          q: 'Ali lahko naročim vozilo še za danes?',
          a: 'Pogosto da, če je vozilo prosto. Da ga zagotovo dobite ob pravem času, rezervirajte vnaprej.',
        },
        {
          q: 'Ali vozite v Kijevsko regijo?',
          a: 'Da: Brovari, Borispil, Irpin, Buča, Višneve, Obuhiv, Bila Cerkva in druga mesta.',
        },
      ],
    },
    {
      slug: 'refrigerator',
      group: 'ukraine',
      meta: {
        title: 'Hladilni prevozi po Ukrajini in v Evropo',
        description:
          'Prevoz živil in temperaturno občutljivega tovora s hladilnimi vozili od 1,5 do 22 t. Od −20 do +20 °C. Po Ukrajini od 80 UAH/km.',
      },
      card: { icon: 'reefer', title: 'Hladilno vozilo', text: 'Živila in temperaturni tovor', price: 'od 80 UAH/km' },
      h1: 'Hladilni prevozi',
      lead: 'Prepeljemo živila, zdravila, cvetje in drug tovor, ki potrebuje stalno temperaturo: po Ukrajini in v evropske države.',
      bullets: ['Od 1,5 do 22 t', 'Od −20 do +20 °C', 'Ohlajeno pred nakladanjem'],
      priceFrom: 'od 80 UAH/km',
      cargo: {
        title: 'Kaj prevažamo',
        items: ['Meso in ribe', 'Mlečni izdelki', 'Sadje in zelenjava', 'Zamrznjena živila', 'Slaščice', 'Zdravila', 'Cvetje in rastline', 'Pijače'],
      },
      sections: [
        {
          title: 'Kako zagotovimo temperaturo',
          items: [
            'Temperaturni režim dogovorimo pred nakladanjem in ga zapišemo v naročilo',
            'Vozilo pride že ohlajeno na zahtevano temperaturo',
            'Temperatura se ohranja vso pot do razkladanja',
          ],
        },
        {
          title: 'Izoterma ali hladilnik',
          text: 'Izotermična nadgradnja temperaturo le ohranja, zato je primerna za kratke prevoze in tovor brez strogih zahtev. Hladilno vozilo ima hladilni agregat in vzdržuje nastavljeno temperaturo tudi na dolgih poteh.',
        },
      ],
      prices: {
        title: 'Cene hladilnih vozil',
        rows: [
          { label: 'Hladilno vozilo do 5 t', value: 'od 100 UAH/km' },
          { label: 'Hladilno vozilo 22 t', value: 'od 80 UAH/km' },
        ],
        note: 'Postavke so okvirne, odvisne od temperature in relacije.',
      },
      vehicles: ['reefer', 't5'],
      faq: [
        {
          q: 'Ali lahko različna živila potujejo skupaj?',
          a: 'Samo če potrebujejo enako temperaturo in si ne prenašajo vonjav. V povpraševanju opišite sestavo tovora.',
        },
        {
          q: 'Ali so za živila potrebni dokumenti?',
          a: 'Da, za živila so potrebni spremni dokumenti pošiljatelja. Pri mednarodnih prevozih jih je več, logist vam bo svetoval.',
        },
      ],
    },
    {
      slug: 'bulk',
      group: 'ukraine',
      meta: {
        title: 'Prevoz sipkega tovora s prekucniki in vozili za žito',
        description:
          'Pesek, gramoz, zemlja, žito, gnojila: prekucniki in vozila za žito 20–60 m³ po Ukrajini. Postavke od 100 UAH/km, polna naložitev.',
      },
      card: { icon: 'bulk', title: 'Sipki tovor', text: 'Prekucniki in vozila za žito 20–60 m³', price: 'od 100 UAH/km' },
      h1: 'Prevoz sipkega tovora',
      lead: 'Prekucniki in vozila za žito za sipke gradbene materiale, žito in gnojila. Polna naložitev, dostava na gradbišče, v silos ali skladišče.',
      bullets: ['Keson 20–60 m³', 'Prekucniki in vozila za žito', 'Po vsej Ukrajini'],
      priceFrom: 'od 100 UAH/km',
      cargo: {
        title: 'Kaj prevažamo',
        items: ['Pesek, gramoz, tampon, prod', 'Zemlja in črnica', 'Keramzit', 'Pšenica, koruza, ječmen', 'Sončnice, oljna ogrščica, soja', 'Mineralna gnojila', 'Cement, sol', 'Šota, premog'],
      },
      sections: [
        {
          title: 'Vozila',
          items: ['Prekucnik: za gradbeni material in zemljo', 'Vozilo za žito: za žito, oljnice in gnojila', 'Polprikolica prekucnik: za velike količine'],
        },
      ],
      prices: {
        title: 'Cene',
        rows: [{ label: 'Prekucnik / vozilo za žito', value: 'od 100 UAH/km' }],
        note: 'Cena je odvisna od količine, razdalje in števila prevozov.',
      },
      vehicles: ['tipper'],
      faq: [
        {
          q: 'Ali lahko naročim več vozil hkrati?',
          a: 'Da, za velike količine organiziramo več vozil na eno nakladanje. Količino navedite v povpraševanju.',
        },
      ],
    },
    {
      slug: 'liquid',
      group: 'ukraine',
      meta: {
        title: 'Prevoz tekočega tovora s cisternami',
        description:
          'Živilske in tehnične tekočine, olje, voda, gorivo: cisterne 20–40 m³ po Ukrajini in v Evropo. Cisterna glede na vrsto tovora.',
      },
      card: { icon: 'liquid', title: 'Tekoči tovor', text: 'Cisterne 20–40 m³', price: 'od 100 UAH/km' },
      h1: 'Prevoz tekočega tovora',
      lead: 'Cisterno izberemo glede na vrsto tekočine, njene lastnosti in količino: živilsko, kemično ali za gorivo. Polna naložitev po Ukrajini in v EU.',
      bullets: ['Cisterne 20–40 m³', 'Živilske, kemične, za gorivo', 'Po Ukrajini in v Evropo'],
      priceFrom: 'od 100 UAH/km',
      cargo: {
        title: 'Kaj prevažamo',
        items: ['Rastlinsko olje', 'Mleko in mlečne surovine', 'Melasa', 'Pitna in tehnološka voda', 'Tehnične tekočine', 'Tekoča gnojila', 'Gorivo in naftni derivati', 'Bitumen'],
      },
      sections: [
        {
          title: 'Vrste cistern',
          items: ['Živilske: iz nerjavnega jekla, za živila', 'Kemične: za tehnične tekočine in gnojila', 'Za gorivo: za naftne derivate', 'Za bitumen: z ogrevanjem'],
        },
      ],
      prices: {
        title: 'Cene',
        rows: [{ label: 'Cisterna', value: 'od 100 UAH/km' }],
        note: 'Cena je odvisna od vrste cisterne, količine in relacije.',
      },
      vehicles: ['tanker'],
      faq: [
        {
          q: 'Ali je treba cisterno oprati?',
          a: 'Za živilski tovor mora biti cisterna čista in pripravljena za izdelek. Zahteve glede pranja dogovorimo vnaprej.',
        },
      ],
    },

    // ——— Mednarodni ———
    {
      slug: 'europe',
      group: 'international',
      meta: {
        title: 'Prevoz tovora Ukrajina – Evropa in iz Evrope v Ukrajino',
        description:
          'Prevoz Ukrajina – Poljska, Nemčija, Češka, Slovenija in druge države EU. Kombi od 1,2 €/km, tovornjak od 1,5 €/km, zbirni prevoz poljubne teže.',
      },
      card: { icon: 'europe', title: 'Evropa', text: 'Ukrajina ↔ EU in prevozi po Evropi', price: 'od 1,2 €/km' },
      h1: 'Prevoz tovora Ukrajina – Evropa',
      lead: 'Tovor vozimo iz Ukrajine v države EU in nazaj ter med evropskimi državami. S samostojnim vozilom ali v zbirnem prevozu poljubne teže.',
      bullets: ['Kombi, tovornjak, nizkopodnik, avtotransporter', 'Zbirni prevoz poljubne teže', 'CMR in carinjenje'],
      priceFrom: 'od 1,2 €/km',
      intro: {
        title: 'Prevoz med Ukrajino in EU',
        paragraphs: [
          'Vozimo komercialni tovor, osebne stvari, stroje in vozila iz Ukrajine v evropske države in nazaj. Samostojno vozilo je primerno, ko šteje datum, zbirni prevoz pa, ko je pošiljka majhna in želite prihraniti.',
          'Poskrbimo za dokumente za prehod meje in carinjenje prek špediterja. Tovor predate na mestu odpreme, prejemnik pa ga prevzame pred svojimi vrati.',
        ],
      },
      cargo: {
        title: 'Kaj prevažamo',
        items: ['Komercialni tovor', 'Palete in zbirni tovor', 'Oprema in stroji', 'Osebne stvari pri selitvi', 'Avtomobili', 'Izredni tovor'],
      },
      sections: [
        {
          title: 'Države',
          text: 'Poljska, Nemčija, Češka, Slovaška, Madžarska, Avstrija, Slovenija, Hrvaška, Italija, Francija, Španija, Nizozemska, Belgija, Litva, Latvija, Estonija, Romunija, Bolgarija in druge.',
        },
        {
          title: 'Na ključ',
          items: ['Vozilo glede na tovor', 'Nakladanje na vašem naslovu', 'CMR in spremni dokumenti', 'Carinjenje prek špediterja', 'Dostava do vrat prejemnika'],
        },
      ],
      prices: {
        title: 'Okvirne cene',
        rows: [
          { label: 'Kombi do 2 t', value: 'od 1,2 €/km' },
          { label: 'Tovornjak 22 t', value: 'od 1,5 €/km' },
          { label: 'Paleta do 300 kg (zbirni prevoz)', value: 'od 0,4 €/km' },
          { label: 'Ukrajina – Poljska, tovornjak', value: 'od 1 000 €' },
          { label: 'Ukrajina – Nemčija, tovornjak', value: 'od 2.000 €' },
        ],
        note: 'Cene so okvirne: odvisne so od količine, relacije, sezone in povratnega tovora.',
      },
      vehicles: ['bus', 'fura', 'carrier', 'lowbed'],
      faq: [
        {
          q: 'Katere dokumente potrebujem?',
          a: 'Za komercialni tovor račun, dobavnico (packing list) in dokumente za blago; CMR izdamo mi. Za osebne stvari je seznam krajši, logist vam bo svetoval.',
        },
        {
          q: 'Koliko časa traja dostava v Evropo?',
          a: 'Odvisno od države in čakalnih vrst na meji. Logist vam pove okvirni rok za vašo relacijo.',
        },
        {
          q: 'Ali vozite po Evropi brez vstopa v Ukrajino?',
          a: 'Da, organiziramo prevoze med državami EU.',
        },
      ],
    },
    {
      slug: 'china',
      group: 'international',
      meta: {
        title: 'Dostava blaga iz Kitajske po morju in letalsko',
        description:
          'Celovit uvoz blaga iz Kitajske: po morju od 55 dni, letalsko od 14 dni. Zbirni in polni kontejnerji, carinjenje, dostava do vrat.',
      },
      card: { icon: 'china', title: 'Dostava iz Kitajske', text: 'Morje in letalo na ključ', price: 'na povpraševanje' },
      h1: 'Dostava tovora iz Kitajske',
      lead: 'Blago prevzamemo pri dobavitelju na Kitajskem, ga pošljemo po morju ali letalsko prek Evrope, ocarinimo in pripeljemo v vaše skladišče.',
      bullets: ['Poljubna teža', 'Morje od 55 dni, letalo od 14', 'Carinjenje in dostava do vrat'],
      priceFrom: 'na povpraševanje',
      intro: {
        title: 'Uvoz iz Kitajske na ključ',
        paragraphs: [
          'Kitajska je glavni vir blaga za spletne tržnice, trgovine in proizvodnjo. Organiziramo celotno verigo: od skladišča dobavitelja na Kitajskem do vašega skladišča v Ukrajini.',
          'Izbira načina je odvisna od nujnosti in proračuna. Morje je cenejše, a počasnejše; letalo je hitro, a dražje. Izračunamo obe možnosti in svetujemo, kaj se bolj splača za vaše blago.',
        ],
      },
      cargo: {
        title: 'Kaj se uvaža iz Kitajske',
        items: ['Oprema in obdelovalni stroji', 'Elektronika', 'Gradbeni material', 'Avtodeli in dodatki', 'Pohištvo in okovje', 'Gospodinjski aparati', 'Blago za spletne tržnice'],
      },
      sections: [
        {
          title: 'Načini dostave',
          items: [
            'Po morju: najceneje, od 55–60 dni prek evropskih pristanišč (Gdansk, Gdinja, Konstanca), nato po cesti v Ukrajino',
            'Letalsko: od 14 dni do Kijeva, za nujen in dragocen tovor, nekajkrat dražje od morja',
            'Poln kontejner (FCL) 20’ ali 40’: plačate cel kontejner',
            'Zbirni tovor (LCL): vaše blago potuje v kontejnerju z drugimi, plačate svoje kubične metre',
          ],
        },
        {
          title: 'Kako poteka dostava',
          items: [
            'Pošljete nam težo, prostornino, vrsto blaga, vrednost po računu in želeni način dostave',
            'Dogovorimo pot, roke in ceno',
            'Blago prevzamemo pri dobavitelju, ga preverimo in po potrebi konsolidiramo v skladišču na Kitajskem',
            'Pošljemo ga po morju ali letalsko',
            'Carinjenje v Ukrajini: deklaracija, tarifne oznake, plačilo dajatev',
            'Dostavimo v skladišče ali na naslov; končni obračun ob prevzemu',
          ],
        },
      ],
      prices: {
        title: 'Od česa je odvisna cena',
        rows: [
          { label: 'Teža in prostornina', value: 'kg ali m³' },
          { label: 'Način dostave', value: 'morje / letalo' },
          { label: 'Vrsta blaga in dajatve', value: 'po tarifni oznaki' },
          { label: 'Zavarovanje in pakiranje', value: 'po dogovoru' },
        ],
        note: 'Ceno določimo po izračunu poti za vaše blago.',
      },
      vehicles: ['fura', 'bus'],
      faq: [
        {
          q: 'Kakšna je najmanjša pošiljka?',
          a: 'Poljubna teža, v zbirnem tovoru. Za velike pošiljke se bolj splača poln kontejner.',
        },
        {
          q: 'Morje ali letalo?',
          a: 'Morje za vnaprej načrtovane nakupe in težak tovor: poceni, a od 55 dni. Letalo, ko blago potrebujete hitro ali je drago in lahko.',
        },
        {
          q: 'Ali pomagate pri carinjenju?',
          a: 'Da, carinjenje opravimo prek carinskega špediterja: deklaracija, uvrstitev blaga, izračun in plačilo dajatev.',
        },
        {
          q: 'Ali vozite po železnici?',
          a: 'Ne, železniških prevozov ne ponujamo. Samo morje, letalo in cesta.',
        },
      ],
    },
    {
      slug: 'sea',
      group: 'international',
      meta: {
        title: 'Pomorski kontejnerski prevoz: FCL in LCL',
        description:
          'Pomorski prevoz tovora v kontejnerjih 20’ in 40’ ter zbirnih pošiljkah prek evropskih pristanišč z dostavo v Ukrajino. Carinjenje na ključ.',
      },
      card: { icon: 'sea', title: 'Po morju', text: 'Kontejnerji FCL in zbirni LCL', price: 'na m³' },
      h1: 'Pomorski kontejnerski prevoz',
      lead: 'Velike pošiljke po morju v kontejnerjih ali kot zbirni tovor prek evropskih pristanišč, nato po cesti do vašega skladišča.',
      bullets: ['Kontejnerji 20’, 40’, 40’ HC', 'Zbirni tovor od 1 m³', 'Pristanišče – skladišče na ključ'],
      cargo: {
        title: 'Kaj se vozi po morju',
        items: ['Velike pošiljke blaga', 'Surovine in materiali', 'Oprema in obdelovalni stroji', 'Izredni tovor v kontejnerjih Open Top', 'Živila v hladilnih kontejnerjih'],
      },
      sections: [
        {
          title: 'FCL ali LCL',
          items: [
            'FCL (poln kontejner): cel kontejner je vaš, splača se od 15–20 m³',
            'LCL (zbirni): plačate svoje kubične metre ali tone, preostali prostor zasede tovor drugih strank',
          ],
        },
        {
          title: 'Vrste kontejnerjev',
          items: ['20’: do ~28 t, ~33 m³', '40’: do ~27 t, ~67 m³', '40’ High Cube: ~76 m³', 'Open Top za izredni tovor, hladilni kontejnerji za živila'],
        },
      ],
      vehicles: ['fura'],
      faq: [
        {
          q: 'Koliko časa potuje tovor po morju?',
          a: 'Iz Kitajske od 55–60 dni do Ukrajine, skupaj z dostavo iz evropskega pristanišča. Točen rok je odvisen od pristanišča odpreme in voznega reda ladij.',
        },
        {
          q: 'Prek katerih pristanišč vozite?',
          a: 'Najpogosteje prek Gdanska, Gdinje in Konstance, nato tovor potuje v Ukrajino po cesti.',
        },
      ],
    },
    {
      slug: 'air',
      group: 'international',
      meta: {
        title: 'Letalski prevoz tovora v Ukrajino',
        description:
          'Letalski prevoz prek evropskih vozlišč z nadaljnjo dostavo po cesti v Ukrajino. Od 14 dni iz Kitajske, za nujen in dragocen tovor. Obračun na kg.',
      },
      card: { icon: 'air', title: 'Letalsko', text: 'Nujen in dragocen tovor', price: 'na kg' },
      h1: 'Letalski prevoz tovora',
      lead: 'Ko blago potrebujete hitro. Z letalom ga pripeljemo na evropska letališča, nato po cesti do meje, carinjenje in dostava do vrat.',
      bullets: ['Od 14 dni iz Kitajske', 'Obračun na kilogram', 'Carinjenje'],
      cargo: {
        title: 'Kaj se vozi letalsko',
        items: ['Elektronika', 'Rezervni deli', 'Vzorci blaga', 'Medicinski pripomočki', 'Oblačila in modni dodatki', 'Nujne komponente'],
      },
      sections: [
        {
          title: 'Kdaj izbrati letalo',
          text: 'Letalski prevoz je nekajkrat dražji od pomorskega, a precej hitrejši. Primeren je za lahek, dragocen in nujen tovor, ko zastoj stane podjetje več kot dostava.',
        },
        {
          title: 'Kako se izračuna teža',
          text: 'Cena se obračuna po večji od dveh tež: dejanski ali volumenski (prostornina tovora, preračunana v kilograme). Zato so lahke, a velike škatle dražje.',
        },
      ],
      vehicles: ['bus'],
      faq: [
        {
          q: 'Česa ni mogoče poslati letalsko?',
          a: 'Nevarno blago, nekatere baterije in tekočine potujejo po posebnih pravilih ali jih ne sprejmejo. V povpraševanju opišite blago.',
        },
      ],
    },
    {
      slug: 'poland',
      group: 'international',
      meta: {
        title: 'Prevoz tovora Ukrajina – Poljska in Poljska – Ukrajina',
        description:
          'Prevoz tovora na Poljsko in s Poljske: Varšava, Vroclav, Poznanj, Gdansk, Lublin. Tovornjak od 1 000 €, kombi od 400 €, zbirni prevoz poljubne teže.',
      },
      card: { icon: 'flag', title: 'Poljska', text: 'Najbolj priljubljena smer', price: 'od 400 €' },
      h1: 'Prevoz tovora Ukrajina – Poljska',
      lead: 'Tovor na Poljsko in s Poljske vozimo vsak teden: s kombijem, tovornjakom ali v zbirnem prevozu. Varšava, Vroclav, Poznanj, Krakov, Gdansk, Lublin in druga mesta.',
      bullets: ['Kombi od 400 €, tovornjak od 1 000 €', 'Zbirni prevoz poljubne teže', 'CMR in carina'],
      priceFrom: 'od 400 €',
      cargo: {
        title: 'Kaj prevažamo',
        items: ['Blago na paletah', 'Oprema', 'Pohištvo', 'Gradbeni material', 'Osebne stvari', 'Vozila in stroji'],
      },
      sections: [
        {
          title: 'Mesta',
          text: 'Varšava, Krakov, Vroclav, Poznanj, Lodž, Gdansk, Gdinja, Szczecin, Lublin, Rzeszów, Chełm, Katovice in kateri koli drug naslov na Poljskem.',
        },
        {
          title: 'Prek poljskih pristanišč',
          text: 'Gdansk in Gdinja sta glavna vhoda za pomorske kontejnerje iz Kitajske. Kontejner prevzamemo v pristanišču in tovor po cesti pripeljemo v Ukrajino.',
        },
      ],
      prices: {
        title: 'Okvirne cene',
        rows: [
          { label: 'Kombi do 2 t', value: 'od 400 €' },
          { label: 'Tovornjak 22 t', value: 'od 1 000 €' },
          { label: 'Zbirni prevoz', value: 'od 0,4 €/km na paleto' },
        ],
        note: 'Cena je odvisna od mesta, količine in povratnega tovora.',
      },
      vehicles: ['bus', 'fura'],
      faq: [
        {
          q: 'Koliko časa traja prevoz na Poljsko?',
          a: 'Odvisno od mesta in čakalne vrste na meji. Logist vam pove okvirni rok za vašo relacijo.',
        },
      ],
    },
    {
      slug: 'customs',
      group: 'international',
      meta: { title: "Carinjenje in skladišča ob meji s Poljsko", description: "Carinjenje uvoza in izvoza, T1, EUR.1, TIR, skladiščenje in pretovor na meji Ukrajina – Poljska." },
      card: { icon: 'docs', title: "Carina in skladišča", text: "Carinjenje, skladiščenje, pretovor", price: "na povpraševanje" },
      h1: "Carinjenje in skladišča ob meji s Poljsko",
      lead: "S partnerji ob poljski meji uredimo dokumente in hranimo tovor, da brez zamud potuje naprej.",
      bullets: ["Uvoz, izvoz, tranzit", "T1, EUR.1, EX, TIR", "Skladišče, pretovor, konsolidacija"],
      sections: [
        { title: "Carinjenje", items: ["Dokument T1: carinjenje in spremljanje tranzita", "Uvoz: carinjenje blaga za vnos v EU", "Dokument EX: izvoz blaga iz EU", "Potrdilo o poreklu EUR.1", "Tranzitna deklaracija za tovor iz držav zunaj EU (Kitajska, ZDA, Južna Koreja in druge)", "Zvezek TIR: izdaja in spremljanje"] },
        { title: "Skladišče in logistika", items: ["Skladiščenje blaga", "Pretovor", "Konsolidacija in dekonsolidacija tovora", "Iskanje prevoza", "Prevzem tovora z letališč in pristanišč", "Prodaja blaga v tranzitu"] },
        { title: "Dokumenti in svetovanje", items: ["Celovito urejanje carinskih in prevoznih dokumentov", "Svetovanje o carinskih postopkih in mednarodni trgovini"] },
      ],
      vehicles: ['fura'],
      faq: [
        { q: "Koliko stane carinjenje?", a: "Odvisno od postopka in tovora. Napišite, kaj in kam vozite, in vam povemo ceno." },
        { q: "Lahko naročim carinjenje ali skladišče brez prevoza?", a: "Da, carinjenje ali skladiščenje lahko naročite posebej." },
      ],
    },
    {
      slug: 'asia',
      group: 'international',
      meta: { title: "Prevoz blaga iz Azije v Ukrajino", description: "Prevoz blaga iz Azije: Kitajska, Turčija, Indija, Vietnam. Morsko v kontejnerjih in letalsko, s carinjenjem." },
      card: { icon: 'china', title: "Azija", text: "Kitajska, Turčija, Indija in druge", price: "na povpraševanje" },
      h1: "Prevoz blaga iz Azije v Ukrajino",
      lead: "Pripeljemo blago iz azijskih držav po morju ali letalsko: od prevzema pri dobavitelju do vašega skladišča v Ukrajini.",
      bullets: ["Kitajska, Turčija, Indija, Vietnam", "Morsko FCL/LCL ali letalsko", "Carinjenje prek carinskega posrednika"],
      cargo: { title: "Kaj prevažamo", items: ["Komercialni tovor", "Palete", "Oprema", "Kontejnerji"] },
      sections: [{ title: "Kako dostavljamo", text: "Po morju v polnih ali zbirnih kontejnerjih, letalsko za nujne pošiljke, nato cestno po Ukrajini." }],
      vehicles: ['fura'],
      faq: [
        { q: "Koliko stane prevoz iz Azije?", a: "Ceno izračunamo za pošiljko: odvisna je od države, prostornine, teže in načina dostave." },
        { q: "Kateri dokumenti so potrebni?", a: "Račun in dokumenti za blago; carinjenje opravimo prek carinskega posrednika." },
      ],
    },
    {
      slug: 'usa',
      group: 'international',
      meta: { title: "Prevoz blaga ZDA – Ukrajina", description: "Prevoz blaga iz ZDA v Ukrajino in v ZDA: morsko v kontejnerjih in letalsko, s carinjenjem." },
      card: { icon: 'air', title: "ZDA", text: "Morsko in letalsko v obe smeri", price: "na povpraševanje" },
      h1: "Prevoz blaga ZDA – Ukrajina",
      lead: "Organiziramo prevoz tovora med ZDA in Ukrajino po morju ali letalsko, od vrat do vrat.",
      bullets: ["Morsko: kontejnerji FCL in zbirni LCL", "Letalsko za nujne pošiljke", "Carinjenje prek carinskega posrednika"],
      cargo: { title: "Kaj prevažamo", items: ["Komercialni tovor", "Palete", "Oprema", "Kontejnerji"] },
      sections: [{ title: "Kako dostavljamo", text: "Po morju prek evropskih pristanišč ali letalsko, nato cestno do vašega naslova." }],
      vehicles: ['fura'],
      faq: [
        { q: "Koliko stane prevoz iz ZDA?", a: "Ceno izračunamo za pošiljko: odvisna je od prostornine, teže, mesta in načina dostave." },
        { q: "Kateri dokumenti so potrebni?", a: "Račun in dokumenti za blago; carinjenje opravimo prek carinskega posrednika." },
      ],
    },
    {
      slug: 'slovenia',
      group: 'international',
      meta: {
        title: 'Prevoz tovora Slovenija – Ukrajina in Ukrajina – Slovenija',
        description:
          'Prevoz tovora iz Slovenije v Ukrajino in nazaj: Ljubljana, Maribor, Celje, Koper. Samostojno vozilo, zbirni prevoz, tovor prek Luke Koper.',
      },
      card: { icon: 'flag', title: 'Slovenija', text: 'Ljubljana, Maribor, Luka Koper', price: 'po dogovoru' },
      h1: 'Prevoz tovora Slovenija – Ukrajina',
      lead: 'Smo prisotni v Sloveniji, zato to smer poznamo od blizu. Tovor vozimo med Slovenijo in Ukrajino, prek Slovenije pa tudi naprej po Evropi.',
      bullets: ['Ljubljana, Maribor, Celje, Koper', 'Samostojno vozilo ali zbirni prevoz', 'Tovor prek Luke Koper'],
      cargo: {
        title: 'Kaj prevažamo',
        items: ['Komercialni tovor', 'Palete', 'Oprema', 'Osebne stvari pri selitvi', 'Pomorski kontejnerji iz Kopra'],
      },
      sections: [
        {
          title: 'Luka Koper',
          text: 'Koper je slovensko pristanišče na Jadranu, prek katerega gre del tovora iz Azije v Srednjo Evropo. Organiziramo lahko dostavo iz pristanišča v Ukrajino ali v druge države EU.',
        },
        {
          title: 'Prek Slovenije',
          text: 'Slovenija je priročna točka za prevoze v Avstrijo, Italijo, na Hrvaško in Balkan. Izračunamo relacijo za vaš naslov.',
        },
      ],
      vehicles: ['bus', 'fura'],
      faq: [
        {
          q: 'Koliko stane prevoz iz Slovenije v Ukrajino?',
          a: 'Ceno izračunamo za relacijo: odvisna je od količine, mesta in načina (samostojno vozilo ali zbirni prevoz). Okvirno velja za tovornjak po Evropi 1,5 €/km.',
        },
      ],
    },
  ],

  pricesPage: {
    meta: {
      title: 'Cenik prevoza tovora: postavke na km v Ukrajini in Evropi',
      description:
        'Okvirne postavke za prevoz po Ukrajini: kombi od 60 UAH/km, 5 t od 50, 10 t od 60, tovornjak od 70. Cene za Evropo, delavce in selitve.',
    },
    h1: 'Cenik prevoza tovora',
    lead: 'Okvirne postavke za načrtovanje proračuna. Točno ceno vam logist pove po povpraševanju in jo zapiše v naročilo za prevoz.',
    ukraineTitle: 'Po Ukrajini, samostojno vozilo',
    ukraineRows: [
      { label: 'Kombi do 2 t, do 20 m³', value: 'od 60 UAH/km' },
      { label: 'Tovornjak do 5 t', value: 'od 80 UAH/km' },
      { label: 'Tovornjak do 10 t', value: 'od 100 UAH/km' },
      { label: 'Tovornjak do 22 t', value: 'od 70 UAH/km' },
      { label: 'Tandem do 120 m³', value: 'od 80 UAH/km' },
      { label: 'Hladilno vozilo 22 t', value: 'od 80 UAH/km' },
      { label: 'Prekucnik / vozilo za žito', value: 'od 100 UAH/km' },
      { label: 'Cisterna', value: 'od 100 UAH/km' },
      { label: 'Avtotransporter', value: 'od 40 UAH/km' },
      { label: 'Tovornjak z dvigalom', value: 'od 100 UAH/km' },
      { label: 'Nizkopodnik (izredni prevoz)', value: 'od 100 UAH/km' },
      { label: 'Avtodvigalo', value: 'po dogovoru' },
    ],
    extraTitle: 'Selitve in dodatne storitve',
    extraRows: [
      { label: 'Selitev, samostojno vozilo 15–20 m³', value: 'od 60 UAH/km' },
      { label: 'Zbirni prevoz po Ukrajini', value: 'od 15 UAH/km' },
      { label: 'Delavec za prenos', value: 'od 250 UAH/uro', note: 'najmanj 2 uri' },
    ],
    europeTitle: 'Evropa',
    europeRows: [
      { label: 'Kombi do 2 t', value: 'od 1,2 €/km' },
      { label: 'Tovornjak 22 t', value: 'od 1,5 €/km' },
      { label: 'Paleta do 300 kg (zbirni prevoz)', value: 'od 0,4 €/km' },
      { label: 'Ukrajina – Poljska, tovornjak', value: 'od 1 000 €' },
      { label: 'Ukrajina – Nemčija, tovornjak', value: 'od 2.000 €' },
    ],
    note: 'Cene so okvirne in se lahko spremenijo. Končni znesek je odvisen od tovora, relacije in datuma.',
    factorsTitle: 'Kaj vpliva na ceno',
    factors: [
      'Razdalja in vrsta vozila',
      'Teža, prostornina in posebnosti tovora',
      'Število mest nakladanja in razkladanja',
      'Delavci, dvižna ploščad, čakanje',
      'Razpoložljivost vozil v regiji in povratni tovor',
      'Nujnost',
    ],
    faq: [
      {
        q: 'Zakaj je cena »od«?',
        a: 'Postavka »od« je najnižja za samostojno vozilo na zasedeni relaciji. Na relaciji brez povratnega tovora, z več točkami ali delavci bo znesek višji.',
      },
      {
        q: 'Ali se cena lahko spremeni po dogovoru?',
        a: 'Ne, če se podatki o tovoru in relacija ne spremenijo: ceno zapišemo v naročilo za prevoz.',
      },
    ],
  },

  contactsPage: {
    meta: {
      title: 'Kontakt: telefon, Viber, Telegram, WhatsApp',
      description: 'Telefon, Viber, Telegram, WhatsApp in e-pošta CR Logistics. Kijev, Ukrajina, in Slovenija.',
    },
    h1: 'Kontakt',
    lead: 'Pokličite ali pišite v aplikaciji, ki vam ustreza. Za izračun povejte relacijo, težo in prostornino tovora.',
    aboutTitle: 'O podjetju',
    about: [
      "CR Logistics organizira prevoz tovora po Ukrajini in v tujino: cestni, morski in letalski. Prevoz izberemo glede na tovor: od kombija do tovornjaka, nizko-podvoznika, avtotransporterja ali vozila z dvigalom. Uredimo tudi carinjenje v Ukrajini in Evropi.",
      "Imamo sedež v Ukrajini, na Poljskem in v Sloveniji. Delamo tako s podjetji kot s fizičnimi osebami.",
    ],
    hours: 'Povpraševanja s spletne strani prejmemo takoj v Telegram',
  },

  thanksPage: {
    meta: { title: 'Hvala za povpraševanje', description: 'Povpraševanje prejeto.' },
    h1: 'Hvala, povpraševanje smo prejeli',
    lead: 'Logist vas bo poklical, preveril podrobnosti in povedal ceno. Če se vam mudi, nas pokličite ali nam pišite.',
    next: 'Kaj sledi',
  },
}
