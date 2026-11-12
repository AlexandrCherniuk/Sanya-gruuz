// English version. Same structure and facts as ua.ts, written for an international reader:
// companies and private clients in Europe shipping to or from Ukraine, plus foreign
// businesses that need transport inside Ukraine. Prices inside Ukraine stay in UAH,
// European ones in EUR. Rates are indicative, taken from competitors; Oleksandr will adjust.
import type { LangContent } from './types'

export const en: LangContent = {
  ui: {
    skip: 'Skip to quote form',
    menu: 'Menu',
    nav: { services: 'Services', ukraine: 'Within Ukraine', international: 'International', prices: 'Prices', contacts: 'Contact' },
    menuGroups: { vehicles: 'Vehicles', special: 'Special equipment', cargo: 'Cargo & tasks', europe: 'Europe', overseas: 'Asia & USA' },
    cta: 'Get a quote',
    ctaShort: 'Get a quote',
    call: 'Call',
    write: 'Message us',
    breadcrumbHome: 'Home',
    city: 'Kyiv',
    location: "Ukraine · Poland · Slovenia",
    from: 'from',
    more: 'Learn more',
    allServices: 'All services',
    perKm: 'UAH/km',
    orderVehicle: 'Book',
    footerAbout:
      'Road freight within Ukraine and across Europe: from vans to full trucks, oversized loads, car transporters and special vehicles. Sea and air freight from Asia and the USA.',
    footerNote: 'Prices on the website are indicative. Your manager confirms the exact price after your request and fixes it in the contract.',
    rights: 'All rights reserved.',
    notFound: {
      title: 'Page not found',
      text: 'It may have moved. Start from the home page or send us a transport request straight away.',
    },
    routesHead: { route: 'Route', km: 'Distance', bus: 'Van up to 2 t', fura: 'Truck 22 t' },
    langSwitch: 'Website language',
    theme: 'Dark theme',
    units: { km: 'km', uah: 'UAH' },
  },

  blocks: {
    truck: 'Take the truck for a spin',
    trustStrip: [
      { title: 'From vans to low-loaders', text: 'A vehicle matched to weight and volume' },
      { title: 'Ukraine, Europe, Asia, USA', text: 'Road, sea and air' },
      { title: 'Price in the contract', text: 'Agreed before loading' },
      { title: 'One manager', text: 'From request to delivery' },
    ],
    transport: {
      eyebrow: 'Vehicles',
      title: 'The right vehicle for your cargo',
      sub: 'Typical body specifications. For each order we pick a vehicle with the payload, volume and loading type you need.',
    },
    steps: {
      eyebrow: 'How we work',
      title: 'Four steps to delivery',
      sub: 'One logistics manager handles your shipment from the first call to unloading.',
      items: [
        { title: 'Request', text: 'Fill in the form, call us or send a message: where from, where to and what we are moving.' },
        { title: 'Quote and contract', text: 'Your manager picks the vehicle and route and gives you a price. We put the terms in a transport order.' },
        { title: 'Pickup', text: 'The vehicle arrives for loading at the agreed time. The driver ensures the cargo is reliably secured.' },
        { title: 'Delivery', text: 'We regularly update you on where your cargo is. We are reachable any time, day or night, to deal quickly with any force majeure or problem.' },
      ],
      note: 'Full payment is made on unloading. A prepayment may be needed to book the vehicle.',
    },
    why: {
      eyebrow: 'Why it is easy with us',
      title: 'Your cargo under control',
      sub: 'No empty promises: here is what we actually do to keep your shipment on track.',
      items: [
        { icon: 'check', title: 'We solve any problem', text: 'Our experience helps us sort out most issues that come up on the road: documents, permits, delays at the border and at customs.' },
        { icon: 'contract', title: 'No price changes on the road', text: 'Route, timing and price go into the transport order before loading.' },
        { icon: 'chat', title: 'Your manager stays in touch', text: 'Phone, Viber, Telegram, WhatsApp. We tell you where the truck is and when to expect it.' },
        { icon: 'truck', title: 'Pay only for the space you need', text: 'We match the vehicle to your cargo and offer groupage for small shipments.' },
        { icon: 'clock', title: 'A vehicle right away', text: 'In 95% of shared-load orders the vehicle arrives at the pickup point within 2 hours. You can reach a logistics manager any time: we work 24/7.' },
        { icon: 'shield', title: 'Cargo insurance', text: 'We insure cargo against damage through trusted partners, with cover of up to €1,000,000.' },
        { icon: 'docs', title: 'Documents for international shipments', text: 'CMR, shipping documents and customs clearance through a broker on international routes.' },
        { icon: 'route', title: 'Door-to-door', text: 'We collect and deliver at the addresses you give us, with no reloading on the way.' },
      ],
    },
    routes: {
      eyebrow: 'Indicative prices',
      title: 'Popular routes from Kyiv',
      sub: 'Calculated at the minimum rate for a dedicated vehicle. Groupage costs less.',
      note: 'Based on the "from" rate. The price depends on weight, volume, loading and demand on the route. Your manager will give you the exact figure.',
      list: [
        { from: 'Kyiv', to: 'Lviv', km: 540 },
        { from: 'Kyiv', to: 'Odesa', km: 475 },
        { from: 'Kyiv', to: 'Dnipro', km: 480 },
        { from: 'Kyiv', to: 'Kharkiv', km: 480 },
        { from: 'Kyiv', to: 'Vinnytsia', km: 270 },
        { from: 'Kyiv', to: 'Rivne', km: 330 },
        { from: 'Kyiv', to: 'Chernivtsi', km: 530 },
        { from: 'Kyiv', to: 'Uzhhorod', km: 790 },
      ],
    },
    faq: { eyebrow: 'Questions', title: 'Frequently asked questions' },
    clients: {
      eyebrow: 'Who we work with',
      title: 'Trusted with their freight',
      sub: 'We work for businesses of every size and for private clients. Each job gets its own vehicle and its own plan.',
      logosTitle: 'Among our clients',
      items: [
        { icon: 'business', title: 'Small and medium businesses', text: 'Regular supplies, palletised goods, deliveries to customers across Ukraine.' },
        { icon: 'store', title: 'Sole traders and online shops', text: 'Shipments from Asia, the USA and Europe, delivered to a warehouse or straight to the buyer.' },
        { icon: 'factory', title: 'Manufacturers', text: 'Raw materials to the plant, finished goods to distributors, equipment.' },
        { icon: 'build', title: 'Construction companies', text: 'Building materials, machinery on low-loaders, crane trucks and mobile cranes on site.' },
        { icon: 'agro', title: 'Agribusiness', text: 'Farm machinery, grain, fertilisers, bulk cargo in tippers.' },
        { icon: 'home', title: 'Private clients', text: 'Home moves, furniture and appliances, cars from Europe.' },
      ],
    },
    cta: {
      title: 'Get a quote for your cargo',
      text: 'Leave your phone number and route. A logistics manager will call you back, pick a vehicle and give you a price.',
      button: 'Get a quote',
      or: 'or message us',
      orMobile: 'Message us on',
    },
    related: 'Other services',
    cargoTitle: 'What we carry',
    pricesTitle: 'Prices',
  },

  home: {
    meta: {
      title: 'Freight Transport Ukraine – Europe and within Ukraine | GR Logistics',
      description:
        'Road freight between Ukraine and Europe and across Ukraine: vans, full trucks, oversized loads, car transporters. Sea and air freight from Asia and the USA. Quote after your request.',
    },
    eyebrow: "Road freight · Air · Sea",
    h1: 'Freight transport',
    h1Accent: 'across Ukraine and abroad',
    lead: "We match the vehicle to your cargo and get it to any pickup point within 2 hours. We carry across Ukraine and Europe, ship by sea and air from Asia and the USA, and handle customs clearance.",
    bullets: ['Van from €1.2/km, truck from €1.5/km in Europe', 'Dedicated vehicle or one already going your way', 'Logistics manager available 24/7', 'Terms fixed in the contract'],
    faq: [
      {
        q: 'How do I find out the price?',
        a: 'Fill in the form or call us. Your manager will check the route, weight and volume, pick a vehicle and give you a price. Once you agree, we sign a transport order and book the vehicle for your date.',
      },
      {
        q: 'How is the price calculated?',
        a: 'The basis is distance and vehicle type. Weight and volume matter too, as do special features of the cargo (fragile, oversized), the number of loading points, loaders, and demand on the route: a trip with no return load costs more.',
      },
      {
        q: 'How can I ship for less?',
        a: 'If your cargo takes up only part of the vehicle, groupage is cheaper: you pay only for your space. The trade-off is that you follow the schedule of the main trip.',
      },
      {
        q: 'Who is responsible for the cargo in transit?',
        a: 'The carrier is liable for the cargo under the contract. The driver checks its condition and securing at loading. International trips are covered by CMR insurance; extended insurance is available on request.',
      },
      {
        q: 'How do I pay?',
        a: 'The payment method and schedule are set out in the transport order. Usually you pay part when booking the vehicle and the rest after delivery.',
      },
      {
        q: 'Can you provide loaders?',
        a: 'Yes. We arrange loaders for loading and unloading, and for moves also furniture disassembly and packing.',
      },
      {
        q: 'Can I travel with my cargo?',
        a: 'Yes, vans and trucks usually have a passenger seat. Mention it in your request so we pick a suitable vehicle.',
      },
      {
        q: 'Do you work outside Ukraine?',
        a: 'Yes. We carry cargo from Ukraine to European countries and back, within Europe, and we deliver goods from Asia and the USA by sea and air.',
      },
    ],
  },

  vehicles: [
    {
      id: 'bus',
      name: 'Cargo van',
      use: 'Moves, furniture, appliances, small consignments',
      specs: [
        { label: 'Payload', value: '1–2 t' },
        { label: 'Volume', value: 'up to 20 m³' },
        { label: 'Body, L×W×H', value: 'up to 4.8×2.2×2.2 m' },
        { label: 'Pallets', value: 'up to 8–10' },
      ],
      price: 'from UAH 35/km',
    },
    {
      id: 't5',
      name: '5-tonne truck',
      use: 'Commercial cargo, pallets, office moves',
      specs: [
        { label: 'Payload', value: 'up to 5 t' },
        { label: 'Volume', value: 'up to 36–45 m³' },
        { label: 'Body, L×W×H', value: 'up to 7.2×2.45×2.5 m' },
        { label: 'Pallets', value: 'up to 15–18' },
      ],
      price: 'from UAH 50/km',
    },
    {
      id: 't10',
      name: '10-tonne truck',
      use: 'Building materials, equipment, large consignments',
      specs: [
        { label: 'Payload', value: 'up to 10 t' },
        { label: 'Volume', value: 'up to 50 m³' },
        { label: 'Body, L×W×H', value: 'up to 9×2.45×2.7 m' },
        { label: 'Pallets', value: 'up to 22' },
      ],
      price: 'from UAH 60/km',
    },
    {
      id: 'fura',
      name: 'Curtainsider truck',
      use: 'Full truckloads within Ukraine and to Europe',
      specs: [
        { label: 'Payload', value: 'up to 22 t' },
        { label: 'Volume', value: '86–92 m³' },
        { label: 'Body, L×W×H', value: '13.6×2.45×2.7 m' },
        { label: 'Pallets', value: 'up to 33–34' },
      ],
      price: 'from UAH 70/km',
    },
    {
      id: 'coupler',
      name: 'Road train (truck and trailer)',
      use: 'Light, bulky cargo where cubic metres matter',
      specs: [
        { label: 'Payload', value: 'up to 22 t' },
        { label: 'Volume', value: '110–120 m³' },
        { label: 'Body', value: '2 × 7.7 m' },
        { label: 'Pallets', value: 'up to 36–38' },
      ],
      price: 'from UAH 80/km',
    },
    {
      id: 'carrier',
      name: 'Car transporter',
      use: 'New and used cars, several vehicles per trip',
      specs: [
        { label: 'Capacity', value: 'up to 8 cars' },
        { label: 'Options', value: 'tow truck, open, enclosed' },
        { label: 'Also', value: 'motorbikes, damaged cars' },
      ],
      price: 'from UAH 40/km',
    },
    {
      id: 'lowbed',
      name: 'Low-loader',
      use: 'Construction and farm machinery, oversized cargo',
      specs: [
        { label: 'Payload', value: 'up to 60–80 t' },
        { label: 'Platform', value: 'low-bed, extendable' },
        { label: 'Permits', value: 'arranged for the route' },
      ],
      price: 'from UAH 100/km',
    },
    {
      id: 'manipulator',
      name: 'Crane truck',
      use: 'Loading without a separate crane: blocks, kiosks, equipment',
      specs: [
        { label: 'Bed', value: '6–8 m' },
        { label: 'Crane', value: '3 to 7 t' },
        { label: 'Transport', value: 'up to 10 t' },
      ],
      price: 'from UAH 100/km',
    },
    {
      id: 'reefer',
      name: 'Refrigerated truck',
      use: 'Food, medicines, flowers at the right temperature',
      specs: [
        { label: 'Payload', value: '1.5 to 22 t' },
        { label: 'Temperature', value: '−20 to +20 °C' },
        { label: 'Pallets', value: 'up to 33' },
      ],
      price: 'from UAH 80/km',
    },
    {
      id: 'tipper',
      name: 'Tipper / grain truck',
      use: 'Sand, gravel, soil, grain, fertilisers',
      specs: [
        { label: 'Body volume', value: '20–60 m³' },
        { label: 'Payload', value: 'up to 25–40 t' },
        { label: 'Unloading', value: 'tipping' },
      ],
      price: 'from UAH 100/km',
    },
    {
      id: 'tanker',
      name: 'Tanker truck',
      use: 'Food-grade and technical liquids, oil, fuel',
      specs: [
        { label: 'Volume', value: '20–40 m³' },
        { label: 'Types', value: 'food-grade, chemical, fuel' },
      ],
      price: 'from UAH 100/km',
    },
    {
      id: 'crane',
      name: 'Mobile crane',
      use: 'Lifting and installing heavy loads on site',
      specs: [
        { label: 'Lifting capacity', value: '25–50 t' },
        { label: 'Billing', value: 'hourly, minimum shift' },
      ],
      price: 'on request',
    },
  ],

  hubs: [
    {
      slug: 'ukraine',
      meta: {
        title: 'Freight Transport within Ukraine from 1 Tonne',
        description:
          'Road freight between cities in Ukraine: vans up to 2 t, 5–10 t trucks, 22 t trucks, oversized loads. Rates from UAH 35/km, dedicated vehicle or groupage.',
      },
      h1: 'Freight transport within Ukraine',
      lead: 'We deliver between any cities and villages in Ukraine: from a few boxes as groupage to a full truckload or oversized cargo on a low-loader.',
      bullets: ['Vans, 5–10 t trucks, 22 t trucks', 'Dedicated vehicle or groupage', 'Loaders if needed'],
      sections: [
        {
          title: 'What we do',
          items: [
            'Transport between cities: Kyiv, Lviv, Odesa, Dnipro, Kharkiv, Vinnytsia, Uzhhorod and any other town',
            'Full-service home and office moves',
            'Commercial cargo: pallets, equipment, building materials',
            'Groupage (shared loads) for small consignments',
            'Oversized cargo, machinery, car transporters, crane trucks, mobile cranes',
            'Refrigerated trucks, tippers and grain trucks, tankers',
          ],
        },
        {
          title: 'How we price',
          text: 'The rate depends on the vehicle type and distance. The total also depends on weight and volume, the number of loading points, whether you need loaders, and demand on the route. The "from" rates on the website are a guide; your manager gives you the exact price after your request.',
        },
      ],
      faq: [
        {
          q: 'How much does transport within Ukraine cost?',
          a: 'A dedicated van up to 2 t costs from UAH 35/km, a 5 t truck from UAH 50, a 10 t truck from UAH 60, a 22 t truck from UAH 70/km. The exact price depends on the cargo and route.',
        },
        {
          q: 'How soon can a vehicle arrive?',
          a: 'It depends on vehicle availability in the region. Often we can find one for the same or the next day; for a specific date it is better to book in advance.',
        },
        {
          q: 'Do you deliver to small towns and villages?',
          a: 'Yes, loading and unloading addresses can be anywhere except areas of active hostilities.',
        },
        {
          q: 'Can a passenger travel with the cargo?',
          a: 'Yes, vans and trucks usually have a seat for an accompanying person. Mention it in your request.',
        },
      ],
    },
    {
      slug: 'international',
      meta: {
        title: 'International Freight: Ukraine – Europe, Asia, USA, Sea and Air',
        description:
          'Freight from Ukraine to Europe and back, transport within Europe, imports from Asia and the USA by sea and air. Dedicated vehicle, groupage, containers.',
      },
      h1: 'International freight transport',
      lead: 'We carry cargo from Ukraine to Europe and back, within Europe, and arrange delivery of goods from Asia and the USA by sea or air.',
      bullets: ['Ukraine ↔ Europe, trips within the EU', 'Imports from Asia and the USA: sea, air', 'Documents and customs clearance'],
      sections: [
        {
          title: 'Destinations',
          text: 'Poland, Germany, Czechia, Slovakia, Hungary, Romania, Bulgaria, Austria, Slovenia, Croatia, Italy, France, Spain, the Netherlands, Belgium, the Baltic states and more. For each route we pick the vehicle and delivery plan.',
        },
        {
          title: 'Door-to-door',
          items: [
            'Vehicle matched to weight, volume and cargo type',
            'Loading at the sender’s address',
            'CMR and shipping documents, customs clearance through a broker',
            'Delivery to the recipient’s door',
          ],
        },
      ],
      faq: [
        {
          q: 'How is an international shipment priced?',
          a: 'By road, per kilometre or as a fixed price for the route: a van up to 2 t costs about €1.2/km, a 22 t truck €1.5/km, a pallet as groupage from €0.4/km. Sea and air are priced per cubic metre or kilogram.',
        },
        {
          q: 'Who handles customs?',
          a: 'Customs clearance is done through a partner customs broker. From you we need the invoice, packing list and other documents for the goods.',
        },
        {
          q: 'Can I send a small shipment?',
          a: 'Yes, any weight as groupage in a shared truck. From China, in a shared container or by air.',
        },
      ],
    },
  ],

  services: [
    // ——— Within Ukraine ———
    {
      slug: 'bus',
      group: 'ukraine',
      meta: {
        title: 'Van Transport up to 2 Tonnes in Ukraine from UAH 35/km',
        description:
          'Cargo van up to 2 t and 20 m³ for moves, furniture and small consignments. Dedicated van or groupage, travel with your cargo, loaders.',
      },
      card: { icon: 'bus', title: 'Van up to 2 t', text: 'Moves, furniture, appliances, small loads', price: 'from UAH 35/km' },
      h1: 'Van transport up to 2 tonnes',
      lead: 'A Sprinter, Crafter or Master-type cargo van: roomy, fast and affordable for small loads across Ukraine.',
      bullets: ['Up to 2 t and 20 m³', 'You can travel with your cargo', 'Loaders if needed'],
      priceFrom: 'from UAH 35/km',
      intro: {
        title: 'A van for small loads',
        paragraphs: [
          'A cargo van is the most popular option for loads up to 2 tonnes. It is quick on the motorway, easily gets into courtyards and up to entrances, and its body of up to 20 m³ is enough for a flat move or a batch of goods for a shop.',
          'We send the van to your address, the driver secures the cargo with straps, and it goes straight to the destination with no reloading. If needed, someone can ride along in the cab, and loaders can come for loading.',
        ],
      },
      cargo: {
        title: 'What we carry by van',
        items: ['Belongings and furniture for a move', 'Household appliances', 'Boxes and parcels', 'Goods on 1–8 pallets', 'Spare parts', 'Shop or office equipment'],
      },
      sections: [
        {
          title: 'When a van is enough',
          text: 'A van suits a one- or two-room flat, a small office or a batch of goods up to 2 tonnes. If your cargo takes less than half the body, we will offer groupage, which is cheaper.',
        },
        {
          title: 'What is included',
          items: ['Vehicle sent to your address', 'Straps to secure the cargo', 'Passenger seat for an accompanying person', 'Extra loading point by arrangement'],
        },
      ],
      prices: {
        title: 'Van prices',
        rows: [
          { label: 'Dedicated van up to 2 t', value: 'from UAH 35/km' },
          { label: 'Belongings and furniture (move)', value: 'from UAH 35/km' },
          { label: 'Groupage', value: 'from UAH 15/km' },
          { label: 'Loader', value: 'from UAH 250/h', note: 'minimum 2 hours' },
        ],
        note: 'Rates are indicative. Your manager will give you the exact price after your request.',
      },
      vehicles: ['bus', 't5'],
      faq: [
        {
          q: 'How much fits in a van?',
          a: 'A body of up to 20 m³ is roughly the contents of a one-room flat: a wardrobe, sofa, bed, fridge, washing machine and 15–20 boxes.',
        },
        {
          q: 'Can I travel with my cargo?',
          a: 'Yes, the cab usually has one or two passenger seats. Mention it when you send your request.',
        },
        {
          q: 'Will the driver help with loading?',
          a: 'The driver secures the cargo in the body. To carry things it is better to book loaders; we will arrange them for loading and unloading.',
        },
      ],
    },
    {
      slug: 'trucks',
      group: 'ukraine',
      meta: {
        title: '5 and 10 Tonne Truck Transport in Ukraine from UAH 50/km',
        description:
          '5 t and 10 t trucks for commercial cargo, pallets, equipment and building materials. Curtainsider, insulated body, tail lift. Rates from UAH 50/km.',
      },
      card: { icon: 'truck', title: 'Trucks 5–10 t', text: 'Commercial cargo, pallets, equipment', price: 'from UAH 50/km' },
      h1: '5 and 10 tonne truck transport',
      lead: 'Medium trucks for business: batches of goods, pallets, equipment, building materials. We pick the body type and loading method for your cargo.',
      bullets: ['Up to 10 t and 50 m³', 'Curtainsider, insulated, tail lift', 'Top, side or rear loading'],
      priceFrom: 'from UAH 50/km',
      intro: {
        title: 'Trucks for business',
        paragraphs: [
          'Five- and ten-tonne trucks cover most business needs: supplies to warehouses, deliveries to customers, transport of equipment and building materials. In price and capacity they sit between a van and a full truck.',
          'We match the body to the cargo: a curtainsider for side or top loading, a box van for goods that must stay dust-free, an insulated or refrigerated body for food, and a tail lift when there is no forklift on site.',
        ],
      },
      cargo: {
        title: 'What we carry',
        items: ['Palletised goods', 'Building materials', 'Equipment and machine tools', 'Generators', 'Cable and rolled metal', 'Furniture and appliances in batches', 'Goods in boxes, bags, big bags', 'Farm produce'],
      },
      sections: [
        {
          title: 'Body types',
          items: ['Curtainsider: versatile, curtains open fully', 'All-metal box van', 'Insulated and refrigerated bodies for food', 'Tail lift for loading without a forklift'],
        },
        {
          title: 'For business',
          text: 'We handle regular supplies to warehouses and shops, deliveries from manufacturer to customer, office and warehouse moves. Terms and payment schedule are set out in the contract.',
        },
      ],
      prices: {
        title: 'Truck prices',
        rows: [
          { label: 'Truck up to 5 t', value: 'from UAH 50/km' },
          { label: 'Truck up to 10 t', value: 'from UAH 60/km' },
          { label: 'Groupage', value: 'by arrangement' },
        ],
        note: 'Rates are indicative. The price depends on weight, volume, body type and route.',
      },
      vehicles: ['t5', 't10'],
      faq: [
        {
          q: 'Which truck do I need: 5 or 10 tonnes?',
          a: 'Go by weight and pallet count: up to 15–18 pallets and 5 t, a 5-tonne truck; up to 22 pallets and 10 t, a 10-tonne truck. Your manager will advise based on your cargo.',
        },
        {
          q: 'Do you have trucks with a tail lift?',
          a: 'Yes, if there is no forklift on site we will find a truck with a tail lift. Mention it in your request.',
        },
        {
          q: 'Can you carry food?',
          a: 'Yes, for food we provide an insulated or refrigerated truck with the right temperature.',
        },
      ],
    },
    {
      slug: 'fura',
      group: 'ukraine',
      meta: {
        title: 'Full Truckload 22 t in Ukraine from UAH 70/km',
        description:
          '22 t truck, 86–92 m³, 33 pallets, plus road trains up to 120 m³. Full truckloads within Ukraine and to Europe. Rates from UAH 70/km.',
      },
      card: { icon: 'trailer', title: 'Truck 22 t and road train', text: 'Full loads, up to 34 pallets', price: 'from UAH 70/km' },
      h1: 'Full truckload transport, 22 tonnes',
      lead: 'Curtainsider semi-trailers and road trains for large consignments: up to 22 tonnes, up to 34 pallets or up to 120 m³ of light bulky cargo.',
      bullets: ['Up to 22 t, 86–120 m³', 'Up to 33–38 pallets', 'Curtains open fully'],
      priceFrom: 'from UAH 70/km',
      intro: {
        title: 'A full load in one vehicle',
        paragraphs: [
          'A full truck is the cheapest way to move a large consignment: the price per kilometre is higher than for a smaller truck, but per tonne or per pallet it works out better.',
          'We run full trucks across Ukraine and to European countries. For light but bulky cargo we offer road trains up to 120 m³; for food, refrigerated trucks.',
        ],
      },
      cargo: {
        title: 'What we carry by full truck',
        items: ['Palletised goods', 'Building materials', 'Steel structures', 'Packaging', 'Furniture', 'Grain in big bags', 'Food (refrigerated)', 'Light bulky cargo (road train)'],
      },
      sections: [
        {
          title: 'Truck or road train',
          text: 'A standard trailer is 13.6 m long and holds 86–92 m³. If your cargo is light but bulky, a road train is better value: two 7.7 m bodies give up to 120 m³.',
        },
        {
          title: 'Loading options',
          items: ['Rear loading from a dock', 'Side loading with curtains open', 'Top loading with posts and cross-bars removed', 'Several loading or unloading points'],
        },
      ],
      prices: {
        title: 'Full truck prices',
        rows: [
          { label: 'Truck 22 t (curtainsider)', value: 'from UAH 70/km' },
          { label: 'Road train up to 120 m³', value: 'from UAH 80/km' },
          { label: 'Full truck within Europe', value: 'from €1.5/km' },
        ],
        note: 'Rates are indicative. The price depends on the route, season and availability of a return load.',
      },
      vehicles: ['fura', 'coupler'],
      faq: [
        {
          q: 'How many pallets fit in a truck?',
          a: 'A standard 13.6 m body takes 33–34 euro pallets, a road train up to 36–38.',
        },
        {
          q: 'Can I load at one point and unload at several?',
          a: 'Yes, we agree a multi-drop route in advance and include it in the price.',
        },
        {
          q: 'Do you run full trucks abroad?',
          a: 'Yes, our trucks go to European countries and back. The indicative rate is €1.5/km.',
        },
      ],
    },
    {
      slug: 'negabaryt',
      group: 'ukraine',
      meta: {
        title: 'Oversized Cargo Transport by Low-Loader from UAH 100/km',
        description:
          'Oversized and heavy cargo up to 80 t: construction and farm machinery, equipment, modular buildings. Low-loaders, platforms, permits and route planning.',
      },
      card: { icon: 'oversized', title: 'Oversized cargo', text: 'Machinery, equipment up to 80 t', price: 'from UAH 100/km' },
      h1: 'Oversized cargo transport',
      lead: 'We use low-loaders and platforms for anything that does not fit in a standard body: machinery, equipment, structures. We get the permits and plan the route.',
      bullets: ['Up to 60–80 t', 'Low-bed and extendable trailers', 'Permits and route for your load'],
      priceFrom: 'from UAH 100/km',
      cargo: {
        title: 'What we carry',
        items: ['Excavators, loaders, bulldozers', 'Tractors and combines', 'Road-building machinery', 'Industrial equipment and lines', 'Steel structures, tanks', 'Kiosks, cabins, modular buildings', 'Concrete products, slabs'],
      },
      sections: [
        {
          title: 'How it works',
          items: [
            'We get the dimensions, weight and photos of the cargo',
            'We pick a low-loader or platform',
            'We plan the route around bridges, power lines and restrictions',
            'We obtain oversized transport permits',
            'If needed, we arrange an escort and a crane or crane truck for loading',
          ],
        },
      ],
      prices: {
        title: 'Oversized cargo prices',
        rows: [
          { label: 'Low-loader within Ukraine', value: 'from UAH 100/km' },
          { label: 'Permits and escort', value: 'priced separately' },
        ],
        note: 'We price each job individually: it depends on dimensions, weight and route.',
      },
      vehicles: ['lowbed', 'manipulator', 'crane'],
      faq: [
        {
          q: 'What counts as oversized?',
          a: 'Cargo wider than 2.6 m, higher than 4 m including the vehicle, longer than 22 m, or heavier than the permitted axle load. Such cargo needs permits and an approved route.',
        },
        {
          q: 'How long do permits take?',
          a: 'It depends on the dimensions and route. That is why it is best to contact us early with oversized cargo.',
        },
        {
          q: 'Can you bring machinery from Europe?',
          a: 'Yes, we run low-loaders from Poland, Germany and other EU countries to Ukraine.',
        },
      ],
    },
    {
      slug: 'avtovoz',
      group: 'ukraine',
      meta: {
        title: 'Car Transport by Car Transporter: Ukraine and Europe',
        description:
          'Car delivery by car transporter and tow truck within Ukraine and from Europe: cars, motorbikes, EVs, damaged vehicles. Open and enclosed transporters.',
      },
      card: { icon: 'car', title: 'Car transporter', text: 'Cars within Ukraine and from Europe', price: 'from UAH 40/km' },
      h1: 'Car transport',
      lead: 'We deliver a single car on a tow truck or several on a car transporter: within Ukraine, from Europe to Ukraine and back.',
      bullets: ['Tow truck for 1–2 cars, transporter up to 8', 'Open and enclosed transporters', 'Damaged and non-running cars'],
      priceFrom: 'from UAH 40/km',
      cargo: {
        title: 'What we carry',
        items: ['Passenger cars', 'SUVs and minivans', 'Electric vehicles', 'Motorbikes and quad bikes', 'Damaged cars', 'New cars from dealers'],
      },
      sections: [
        {
          title: 'Options',
          items: ['Tow truck for one or two cars: fast, no waiting for a full load', 'Transporter for up to 8 cars: cheaper per car', 'Enclosed transporter for expensive and classic cars'],
        },
        {
          title: 'From Europe',
          text: 'We bring cars from Lithuania, Poland, Germany and other countries: from an auction, a dealer or a private seller. We help with the documents for crossing the border.',
        },
      ],
      prices: {
        title: 'Car transport prices',
        rows: [
          { label: 'Within Ukraine', value: 'from UAH 40/km' },
          { label: 'Lithuania to Ukraine', value: 'from €850' },
        ],
        note: 'The price depends on the model, weight, route and number of cars.',
      },
      vehicles: ['carrier'],
      faq: [
        {
          q: 'Can you transport a car that does not run?',
          a: 'Yes, we load it with a winch. Tell us about the car’s condition in your request.',
        },
        {
          q: 'Is the car insured in transit?',
          a: 'The carrier is liable for the car under the contract. Additional insurance is available on request.',
        },
      ],
    },
    {
      slug: 'manipulator',
      group: 'ukraine',
      meta: {
        title: 'Crane Truck Hire in Kyiv and across Ukraine',
        description:
          'Crane truck with a 6–8 m bed and a crane up to 7 t: loading and delivery of blocks, kiosks, equipment and building materials without a separate crane.',
      },
      card: { icon: 'manipulator', title: 'Crane truck', text: 'Loads itself and delivers', price: 'from UAH 100/km' },
      h1: 'Crane truck hire',
      lead: 'A truck with a loader crane loads, delivers and unloads your cargo itself, where there is no forklift or separate crane.',
      bullets: ['6–8 m bed', 'Crane from 3 to 7 t', 'Kyiv, the region and all of Ukraine'],
      priceFrom: 'from UAH 100/km',
      cargo: {
        title: 'What we carry',
        items: ['Building materials on pallets', 'Concrete rings, blocks, slabs', 'Kiosks, site cabins', 'Generators, equipment', 'Containers', 'Safes and heavy items'],
      },
      sections: [
        {
          title: 'Why a crane truck',
          text: 'You do not need to book a crane and a truck separately: one vehicle does it all. That saves time and money on small sites.',
        },
      ],
      prices: {
        title: 'Prices',
        rows: [
          { label: 'Crane truck (transport)', value: 'from UAH 100/km' },
          { label: 'Work within the city', value: 'hourly, on request' },
        ],
        note: 'The price depends on crane capacity, working time and distance.',
      },
      vehicles: ['manipulator', 'crane'],
      faq: [
        {
          q: 'How much can a crane truck lift?',
          a: 'It depends on the crane and reach: next to the truck up to 7 t, at full reach much less. Tell us the weight and the distance from the truck to the spot, and we will pick the right vehicle.',
        },
      ],
    },
    {
      slug: 'avtokran',
      group: 'ukraine',
      meta: {
        title: 'Mobile Crane Hire 25–50 t in Kyiv and the Region',
        description:
          'Mobile crane for installation, loading and lifting heavy loads. 25–50 t capacity, hourly billing, can be combined with a low-loader for transport.',
      },
      card: { icon: 'crane', title: 'Mobile crane', text: 'Lifting and installation up to 50 t', price: 'on request' },
      h1: 'Mobile crane hire',
      lead: 'A 25–50 tonne mobile crane for loading, unloading and installation. We can combine it with a low-loader or full truck for transport.',
      bullets: ['25–50 t', 'Hourly billing', 'Together with transport'],
      cargo: {
        title: 'What it is used for',
        items: ['Loading machinery onto a low-loader', 'Installing steel structures', 'Placing equipment', 'Unloading building materials', 'Installing modular buildings'],
      },
      sections: [
        {
          title: 'What we need for a quote',
          items: ['Weight and dimensions of the load', 'Distance from the crane to the installation spot', 'Address and access conditions', 'Estimated working time'],
        },
      ],
      vehicles: ['crane', 'lowbed'],
      faq: [
        {
          q: 'How is a mobile crane billed?',
          a: 'Hourly, with a minimum shift. Getting the crane to a site outside the city is priced separately.',
        },
      ],
    },
    {
      slug: 'pereizd',
      group: 'ukraine',
      meta: {
        title: 'Home and Office Moves within Ukraine and to Europe',
        description:
          'Full-service moves: 15–20 m³ van, loaders from UAH 250/h, packing, moves between cities and abroad. Dedicated vehicle from UAH 35/km.',
      },
      card: { icon: 'moving', title: 'Moves', text: 'Home, office, between cities and abroad', price: 'from UAH 35/km' },
      h1: 'Home and office moves',
      lead: 'We move your belongings, furniture and appliances to another city or country. Loaders, packing and furniture disassembly are available.',
      bullets: ['Dedicated vehicle from UAH 35/km', 'Loaders from UAH 250/h', 'Within Ukraine and to Europe'],
      priceFrom: 'from UAH 35/km',
      intro: {
        title: 'A move without the hassle',
        paragraphs: [
          'Moving to another city is more than a vehicle. Furniture has to be taken apart, belongings packed, everything carried out and just as carefully carried in at the new place. We take on as much as you want: from a single vehicle to a full-service move.',
          'We pick the vehicle by the amount of belongings: a 15–20 m³ van is enough for a one-room flat, larger moves need a truck. You can travel with your things or leave it all to us.',
        ],
      },
      cargo: {
        title: 'What we move',
        items: ['Furniture', 'Household appliances', 'Personal belongings in boxes', 'Office furniture and equipment', 'Documents and archives', 'House plants'],
      },
      sections: [
        {
          title: 'Full-service move',
          items: ['Vehicle matched to the amount of belongings', 'Loaders for loading and unloading', 'Furniture disassembly and assembly', 'Packing materials', 'Carrying up to your floor'],
        },
        {
          title: 'Moving abroad',
          text: 'We move belongings to Poland, Germany, Czechia, Slovenia and other European countries and help with the border documents. The price is calculated individually: it depends on the country, volume and format, dedicated vehicle or groupage.',
        },
      ],
      prices: {
        title: 'Moving prices',
        rows: [
          { label: 'Dedicated vehicle 15–20 m³', value: 'from UAH 35/km' },
          { label: 'Groupage', value: 'from UAH 15/km' },
          { label: 'Loader', value: 'from UAH 250/h', note: 'minimum 2 hours' },
          { label: 'Move to Europe', value: 'from €0.3/km' },
        ],
        note: 'Rates are indicative. We will give you the exact price once we know the volume.',
      },
      vehicles: ['bus', 't5'],
      faq: [
        {
          q: 'How do I know which vehicle I need?',
          a: 'List the large items (wardrobes, sofa, appliances) and roughly how many boxes, or send photos via a messenger. Your manager will pick the right vehicle.',
        },
        {
          q: 'Can I move for less?',
          a: 'Yes, with groupage: you pay only for the space your belongings take. Timing then depends on the main trip.',
        },
        {
          q: 'Can I move a pet together with my belongings?',
          a: 'Discuss it with your manager: in some vehicles it is possible with an accompanying person.',
        },
      ],
    },
    {
      slug: 'zbirni',
      group: 'ukraine',
      meta: {
        title: 'Groupage and Part Loads within Ukraine and to Europe',
        description:
          'Groupage (shared loads) for small consignments: you pay only for your space. Within Ukraine from UAH 15/km, to Europe from €0.4/km per pallet.',
      },
      card: { icon: 'groupage', title: 'Groupage', text: 'Pay only for your space', price: 'from UAH 15/km' },
      h1: 'Groupage and part loads',
      lead: 'A small consignment does not need its own vehicle. We add your cargo to a trip going your way, and you pay only for the space it takes.',
      bullets: ['No minimum weight', 'Within Ukraine and to Europe', 'Cheaper than a dedicated vehicle'],
      priceFrom: 'from UAH 15/km',
      sections: [
        {
          title: 'Who it suits',
          items: ['A few pallets or boxes', 'A small move', 'Regular small deliveries', 'When timing is not critical'],
        },
        {
          title: 'What to keep in mind',
          text: 'Groupage is cheaper, but the loading date depends on the main trip. If you need delivery on an exact day, a dedicated vehicle is better.',
        },
      ],
      prices: {
        title: 'Groupage prices',
        rows: [
          { label: 'Groupage within Ukraine', value: 'from UAH 15/km' },
          { label: 'Pallet up to 300 kg to Europe', value: 'from €0.4/km' },
        ],
        note: 'Rates are indicative and depend on the route and volume.',
      },
      vehicles: ['bus', 'fura'],
      faq: [
        {
          q: 'How much cheaper is groupage?',
          a: 'It depends on the volume and route. The less space your cargo takes, the more you save compared with a dedicated vehicle.',
        },
      ],
    },
    {
      slug: 'palety',
      group: 'ukraine',
      meta: {
        title: 'Pallet Transport in Ukraine: 1 to 34 Pallets',
        description:
          'Palletised goods transport: van up to 8–10 pallets, trucks up to 22, full truck up to 34. Curtainsider, insulated body, tail lift, side loading.',
      },
      card: { icon: 'pallet', title: 'Pallets', text: '1 to 34 pallets in one trip', price: 'from UAH 35/km' },
      h1: 'Pallet transport',
      lead: 'From one pallet as groupage to a full truck of 34 pallets. We pick the vehicle by pallet count, weight and loading method.',
      bullets: ['1–34 pallets', 'Tail lift and open curtains', 'Insulated body for food'],
      priceFrom: 'from UAH 35/km',
      cargo: {
        title: 'What we carry on pallets',
        items: ['Food and drinks', 'Building materials', 'Household appliances', 'Goods for retail chains', 'Electrical goods, cable', 'Raw materials and finished products'],
      },
      sections: [
        {
          title: 'How many pallets per vehicle',
          items: ['Van: up to 8–10 pallets', '5 t truck: up to 15–18 pallets', '10 t truck: up to 22 pallets', 'Full truck: up to 33–34 pallets'],
        },
      ],
      vehicles: ['bus', 't5', 't10', 'fura'],
      faq: [
        {
          q: 'Can I send a single pallet?',
          a: 'Yes, as groupage in a vehicle going your way.',
        },
      ],
    },

    {
      slug: 'kyiv',
      group: 'ukraine',
      meta: {
        title: 'Freight Transport in Kyiv: City, Region and across Ukraine',
        description:
          'Freight transport in Kyiv and the Kyiv region: van from UAH 350/h, loaders, moves. From Kyiv across Ukraine from UAH 35/km. Pickup in every district.',
      },
      card: { icon: 'city', title: 'Transport in Kyiv', text: 'City, region and trips from Kyiv', price: 'from UAH 350/h' },
      h1: 'Freight transport in Kyiv',
      lead: 'We move cargo within Kyiv, to the suburbs or from Kyiv to any city in Ukraine. Van, truck, loaders: whatever the job needs.',
      bullets: ['Hourly rates in the city', 'Kyiv region and all of Ukraine', 'Loaders and moves'],
      priceFrom: 'from UAH 350/h',
      intro: {
        title: 'Man and van in Kyiv',
        paragraphs: [
          'In the city we charge by the hour: the minimum order is 2 hours of vehicle time, after that you pay for the actual time. Outside the city a per-kilometre rate applies.',
          'We send vehicles to both banks of the Dnipro and to Brovary, Irpin, Bucha, Vyshneve, Boryspil and other towns in the region. Deliveries from Kyiv to other cities follow our standard Ukraine rates.',
        ],
      },
      cargo: {
        title: 'What we carry in Kyiv',
        items: ['Flat and office moves', 'Furniture and appliances from shops', 'Building materials', 'Goods to warehouses and shops', 'Removal of old furniture', 'Equipment'],
      },
      sections: [
        {
          title: 'Tips to save money',
          items: [
            'Book in advance, especially for the end of the month and weekends',
            'Give exact dimensions and weight so you do not pay for a bigger body than you need',
            'Have everything ready when the vehicle arrives: waiting time is paid too',
            'Keep the factory packaging on appliances and plumbing fixtures',
          ],
        },
      ],
      prices: {
        title: 'Kyiv prices',
        rows: [
          { label: 'Van in the city', value: 'from UAH 350/h', note: 'minimum 2 hours' },
          { label: '3–5 t truck in the city', value: 'from UAH 600/h', note: 'minimum 2 hours' },
          { label: 'Outside the city', value: 'from UAH 17/km' },
          { label: 'Loader', value: 'from UAH 250/h' },
          { label: 'From Kyiv across Ukraine', value: 'from UAH 35/km' },
        ],
        note: 'Rates are indicative. Your manager will give you the exact price after your request.',
      },
      vehicles: ['bus', 't5', 'manipulator'],
      faq: [
        {
          q: 'How is a job within the city priced?',
          a: 'By the hour: at least 2 hours of vehicle time, then the actual time. If the vehicle goes outside the city, a per-kilometre rate is added.',
        },
        {
          q: 'Can I book a vehicle for today?',
          a: 'Often yes, if a vehicle is free. To be sure of getting one at the right time, book in advance.',
        },
        {
          q: 'Do you serve the Kyiv region?',
          a: 'Yes: Brovary, Boryspil, Irpin, Bucha, Vyshneve, Obukhiv, Bila Tserkva and other towns.',
        },
      ],
    },
    {
      slug: 'refrigerator',
      group: 'ukraine',
      meta: {
        title: 'Refrigerated Transport within Ukraine and to Europe',
        description:
          'Refrigerated trucks from 1.5 to 22 t for food and temperature-sensitive cargo. −20 to +20 °C. Within Ukraine from UAH 80/km.',
      },
      card: { icon: 'reefer', title: 'Refrigerated', text: 'Food and temperature-sensitive cargo', price: 'from UAH 80/km' },
      h1: 'Refrigerated transport',
      lead: 'We carry food, medicines, flowers and other cargo that needs a stable temperature: within Ukraine and to European countries.',
      bullets: ['1.5 to 22 t', '−20 to +20 °C', 'Pre-cooled before loading'],
      priceFrom: 'from UAH 80/km',
      cargo: {
        title: 'What we carry',
        items: ['Meat and fish', 'Dairy products', 'Fruit and vegetables', 'Frozen food', 'Confectionery', 'Medicines', 'Flowers and plants', 'Drinks'],
      },
      sections: [
        {
          title: 'How we keep the temperature',
          items: [
            'We agree the temperature before loading and write it into the transport order',
            'The truck arrives already cooled to the required temperature',
            'The temperature is maintained all the way to unloading',
          ],
        },
        {
          title: 'Insulated or refrigerated',
          text: 'An insulated body only keeps the temperature, so it suits short trips and cargo without strict requirements. A refrigerated truck has a cooling unit and holds the set temperature even on long routes.',
        },
      ],
      prices: {
        title: 'Refrigerated truck prices',
        rows: [
          { label: 'Refrigerated truck up to 5 t', value: 'from UAH 60/km' },
          { label: 'Refrigerated truck 22 t', value: 'from UAH 80/km' },
        ],
        note: 'Rates are indicative and depend on the temperature and route.',
      },
      vehicles: ['reefer', 't5'],
      faq: [
        {
          q: 'Can different foods travel together?',
          a: 'Only if they need the same temperature and do not pass odours to each other. Tell us what the cargo is when you send your request.',
        },
        {
          q: 'Do I need documents for food?',
          a: 'Yes, food cargo needs shipping documents from the sender. International trips require more; your manager will tell you what is needed.',
        },
      ],
    },
    {
      slug: 'bulk',
      group: 'ukraine',
      meta: {
        title: 'Bulk Cargo Transport by Tipper and Grain Truck',
        description:
          'Sand, gravel, soil, grain, fertilisers: tippers and grain trucks of 20–60 m³ across Ukraine. Rates from UAH 100/km, full loads.',
      },
      card: { icon: 'bulk', title: 'Bulk cargo', text: 'Tippers and grain trucks 20–60 m³', price: 'from UAH 100/km' },
      h1: 'Bulk cargo transport',
      lead: 'Tippers and grain trucks for bulk building materials, grain and fertilisers. Full loads delivered to a site, elevator or warehouse.',
      bullets: ['20–60 m³ body', 'Tippers and grain trucks', 'Across Ukraine'],
      priceFrom: 'from UAH 100/km',
      cargo: {
        title: 'What we carry',
        items: ['Sand, crushed stone, screenings, gravel', 'Soil and black earth', 'Expanded clay', 'Wheat, maize, barley', 'Sunflower, rapeseed, soy', 'Mineral fertilisers', 'Cement, salt', 'Peat, coal'],
      },
      sections: [
        {
          title: 'Vehicles',
          items: ['Tipper: for building materials and soil', 'Grain truck: for grain, oilseeds and fertilisers', 'Tipper semi-trailer: for large volumes'],
        },
      ],
      prices: {
        title: 'Prices',
        rows: [{ label: 'Tipper / grain truck', value: 'from UAH 100/km' }],
        note: 'The price depends on volume, distance and number of trips.',
      },
      vehicles: ['tipper'],
      faq: [
        {
          q: 'Can I book several trucks at once?',
          a: 'Yes, for large volumes we send several trucks to one loading point. Tell us the volume in your request.',
        },
      ],
    },
    {
      slug: 'liquid',
      group: 'ukraine',
      meta: {
        title: 'Liquid Cargo Transport by Tanker Truck',
        description:
          'Food-grade and technical liquids, oil, water, fuel: 20–40 m³ tankers within Ukraine and to Europe. Tanker matched to your cargo.',
      },
      card: { icon: 'liquid', title: 'Liquid cargo', text: 'Tankers 20–40 m³', price: 'from UAH 100/km' },
      h1: 'Liquid cargo transport',
      lead: 'We pick a tanker for the type of liquid, its properties and volume: food-grade, chemical or fuel. Full loads within Ukraine and to the EU.',
      bullets: ['20–40 m³ tankers', 'Food-grade, chemical, fuel', 'Within Ukraine and to Europe'],
      priceFrom: 'from UAH 100/km',
      cargo: {
        title: 'What we carry',
        items: ['Vegetable oil', 'Milk and dairy raw materials', 'Molasses', 'Drinking and process water', 'Technical liquids', 'Liquid fertilisers', 'Fuel and petroleum products', 'Bitumen'],
      },
      sections: [
        {
          title: 'Tanker types',
          items: ['Food-grade: stainless steel, for foodstuffs', 'Chemical: for technical liquids and fertilisers', 'Fuel: for petroleum products', 'Bitumen tankers: heated'],
        },
      ],
      prices: {
        title: 'Prices',
        rows: [{ label: 'Tanker truck', value: 'from UAH 100/km' }],
        note: 'The price depends on tanker type, volume and route.',
      },
      vehicles: ['tanker'],
      faq: [
        {
          q: 'Does the tank need washing?',
          a: 'For food cargo the tank must be clean and prepared for the product. We agree washing requirements in advance.',
        },
      ],
    },

    // ——— International ———
    {
      slug: 'europe',
      group: 'international',
      meta: {
        title: 'Freight Transport between Ukraine and Europe',
        description:
          'Freight between Ukraine and Poland, Germany, Czechia, Slovenia and other EU countries. Van from €1.2/km, full truck from €1.5/km, groupage of any weight.',
      },
      card: { icon: 'europe', title: 'Europe', text: 'Ukraine ↔ EU and trips within Europe', price: 'from €1.2/km' },
      h1: 'Freight transport Ukraine – Europe',
      lead: 'We carry cargo from Ukraine to EU countries and back, and between European countries. In a dedicated vehicle or as groupage of any weight.',
      bullets: ['Van, full truck, low-loader, car transporter', 'Groupage of any weight', 'CMR and customs clearance'],
      priceFrom: 'from €1.2/km',
      intro: {
        title: 'Transport between Ukraine and the EU',
        paragraphs: [
          'We carry commercial cargo, personal belongings, machinery and cars from Ukraine to European countries and back. A dedicated vehicle suits you when the date matters; groupage when the shipment is small and you want to save.',
          'We take care of the border documents and customs clearance through a broker. You hand over the cargo at the pickup point, and the recipient gets it at their door.',
        ],
      },
      cargo: {
        title: 'What we carry',
        items: ['Commercial cargo', 'Pallets and groupage', 'Equipment and machinery', 'Personal belongings for a move', 'Cars', 'Oversized cargo'],
      },
      sections: [
        {
          title: 'Countries',
          text: 'Poland, Germany, Czechia, Slovakia, Hungary, Austria, Slovenia, Croatia, Italy, France, Spain, the Netherlands, Belgium, Lithuania, Latvia, Estonia, Romania, Bulgaria and more.',
        },
        {
          title: 'Door-to-door',
          items: ['Vehicle matched to your cargo', 'Loading at your address', 'CMR and shipping documents', 'Customs clearance through a broker', 'Delivery to the recipient’s door'],
        },
      ],
      prices: {
        title: 'Indicative prices',
        rows: [
          { label: 'Van up to 2 t', value: 'from €1.2/km' },
          { label: 'Truck 22 t', value: 'from €1.5/km' },
          { label: 'Pallet up to 300 kg (groupage)', value: 'from €0.4/km' },
          { label: 'Ukraine – Poland, full truck', value: 'from €1,000' },
          { label: 'Ukraine – Germany, full truck', value: 'from €2,000' },
        ],
        note: 'Prices are indicative: they depend on volume, route, season and availability of a return load.',
      },
      vehicles: ['bus', 'fura', 'carrier', 'lowbed'],
      faq: [
        {
          q: 'What documents do I need?',
          a: 'For commercial cargo: an invoice, a packing list and documents for the goods; we issue the CMR. For personal belongings the list is simpler; your manager will guide you.',
        },
        {
          q: 'How long does delivery to Europe take?',
          a: 'It depends on the country and border queues. Your manager will give you an estimated transit time for your route.',
        },
        {
          q: 'Do you carry within Europe without going through Ukraine?',
          a: 'Yes, we arrange transport between EU countries.',
        },
      ],
    },
    {
      slug: 'china',
      group: 'international',
      meta: {
        title: 'Shipping from China to Ukraine by Sea and Air',
        description:
          'Door-to-door delivery of goods from China: by sea from 55 days, by air from 14 days. Shared and full containers, customs clearance, delivery to your door.',
      },
      card: { icon: 'china', title: 'Shipping from China', text: 'Sea and air, door-to-door', price: 'on request' },
      h1: 'Shipping from China',
      lead: 'We collect goods from your supplier in China, ship them by sea or air via Europe, clear customs and deliver to your warehouse.',
      bullets: ['Any weight', 'Sea from 55 days, air from 14', 'Customs clearance and delivery to your door'],
      priceFrom: 'on request',
      intro: {
        title: 'Door-to-door imports from China',
        paragraphs: [
          'China is the main source of goods for marketplaces, shops and manufacturers. We organise the whole chain: from the supplier’s warehouse in China to your warehouse in Ukraine.',
          'The choice of mode depends on urgency and budget. Sea is cheaper but slower; air is fast but more expensive. We will price both options and tell you which works better for your goods.',
        ],
      },
      cargo: {
        title: 'What people ship from China',
        items: ['Equipment and machine tools', 'Electronics', 'Building materials', 'Car accessories and parts', 'Furniture and fittings', 'Household appliances', 'Goods for marketplaces'],
      },
      sections: [
        {
          title: 'Shipping options',
          items: [
            'Sea: the cheapest, from 55–60 days via European ports (Gdańsk, Gdynia, Constanța), then by road to Ukraine',
            'Air: from 14 days to Kyiv, for urgent and valuable cargo, several times more expensive than sea',
            'Full container (FCL) 20’ or 40’: you pay for the whole container',
            'Shared container (LCL): your goods travel with others, you pay for your cubic metres',
          ],
        },
        {
          title: 'How it works',
          items: [
            'You send us the weight, volume, type of goods, invoice value and preferred mode',
            'We agree the route, timing and price',
            'We collect the goods from the supplier, check them and consolidate at a warehouse in China if needed',
            'We ship by sea or air',
            'Customs clearance in Ukraine: declaration, HS codes, payment of duties',
            'We deliver to your warehouse or address; final payment on receipt',
          ],
        },
      ],
      prices: {
        title: 'What the price depends on',
        rows: [
          { label: 'Weight and volume', value: 'kg or m³' },
          { label: 'Mode of transport', value: 'sea / air' },
          { label: 'Type of goods and duties', value: 'by HS code' },
          { label: 'Insurance and packing', value: 'on request' },
        ],
        note: 'We fix the price after calculating the route for your goods.',
      },
      vehicles: ['fura', 'bus'],
      faq: [
        {
          q: 'What is the minimum shipment?',
          a: 'Any weight, as shared cargo. For large consignments a full container is better value.',
        },
        {
          q: 'Sea or air?',
          a: 'Sea is for planned purchases and heavy cargo: cheap, but from 55 days. Air is for goods you need quickly, or expensive and light goods.',
        },
        {
          q: 'Can you help with customs clearance?',
          a: 'Yes, customs clearance is done through a customs broker: declaration, classification of goods, calculation and payment of duties.',
        },
        {
          q: 'Do you ship by rail?',
          a: 'No, we do not offer rail freight. Only sea, air and road.',
        },
      ],
    },
    {
      slug: 'sea',
      group: 'international',
      meta: {
        title: 'Sea Container Shipping: FCL and LCL',
        description:
          'Sea freight in 20’ and 40’ containers and as shared cargo via European ports, with onward delivery to Ukraine. Door-to-door customs clearance.',
      },
      card: { icon: 'sea', title: 'Sea freight', text: 'FCL containers and LCL', price: 'per m³' },
      h1: 'Sea container shipping',
      lead: 'Large consignments by sea in containers or as shared cargo via European ports, then by road to your warehouse.',
      bullets: ['20’, 40’, 40’ HC containers', 'Shared cargo from 1 m³', 'Port to warehouse, door-to-door'],
      cargo: {
        title: 'What goes by sea',
        items: ['Large consignments of goods', 'Raw materials', 'Equipment and machine tools', 'Oversized cargo in open-top containers', 'Food in reefer containers'],
      },
      sections: [
        {
          title: 'FCL or LCL',
          items: [
            'FCL (full container load): the whole container is yours, worthwhile from 15–20 m³',
            'LCL (less than container load): you pay for your cubic metres or tonnes, the rest is taken by other clients’ cargo',
          ],
        },
        {
          title: 'Container types',
          items: ['20’: up to ~28 t, ~33 m³', '40’: up to ~27 t, ~67 m³', '40’ High Cube: ~76 m³', 'Open Top for oversized cargo, reefer containers for food'],
        },
      ],
      vehicles: ['fura'],
      faq: [
        {
          q: 'How long does sea freight take?',
          a: 'From China, from 55–60 days to Ukraine including delivery from a European port. The exact time depends on the port of loading and the sailing schedule.',
        },
        {
          q: 'Which ports do you use?',
          a: 'Most often Gdańsk, Gdynia and Constanța, then the cargo travels to Ukraine by road.',
        },
      ],
    },
    {
      slug: 'air',
      group: 'international',
      meta: {
        title: 'Air Freight to Ukraine',
        description:
          'Air freight via European hubs with onward road delivery to Ukraine. From 14 days from China, for urgent and valuable cargo. Priced per kg.',
      },
      card: { icon: 'air', title: 'Air freight', text: 'Urgent and valuable cargo', price: 'per kg' },
      h1: 'Air freight',
      lead: 'When you need your goods fast. We fly them to European airports, then by road to the border, through customs and to your door.',
      bullets: ['From 14 days from China', 'Priced per kilogram', 'Customs clearance'],
      cargo: {
        title: 'What goes by air',
        items: ['Electronics', 'Spare parts', 'Product samples', 'Medical products', 'Clothing and accessories', 'Urgent components'],
      },
      sections: [
        {
          title: 'When to choose air',
          text: 'Air is several times more expensive than sea, but much faster. It suits light, valuable and urgent cargo, when downtime costs your business more than the delivery.',
        },
        {
          title: 'How weight is calculated',
          text: 'The price is based on the greater of two weights: actual or volumetric (the volume of the cargo converted into kilograms). That is why light but large boxes cost more.',
        },
      ],
      vehicles: ['bus'],
      faq: [
        {
          q: 'What cannot be sent by air?',
          a: 'Dangerous goods, some batteries and liquids travel under special rules or are not accepted. Tell us what the goods are in your request.',
        },
      ],
    },
    {
      slug: 'poland',
      group: 'international',
      meta: {
        title: 'Freight Transport Ukraine – Poland and Poland – Ukraine',
        description:
          'Freight to and from Poland: Warsaw, Wrocław, Poznań, Gdańsk, Lublin. Full truck from €1,000, van from €400, groupage of any weight.',
      },
      card: { icon: 'flag', title: 'Poland', text: 'Our most popular route', price: 'from €400' },
      h1: 'Freight transport Ukraine – Poland',
      lead: 'We carry cargo to and from Poland every week: by van, full truck or groupage. Warsaw, Wrocław, Poznań, Kraków, Gdańsk, Lublin and other cities.',
      bullets: ['Van from €400, full truck from €1,000', 'Groupage of any weight', 'CMR and customs'],
      priceFrom: 'from €400',
      cargo: {
        title: 'What we carry',
        items: ['Palletised goods', 'Equipment', 'Furniture', 'Building materials', 'Personal belongings', 'Cars and machinery'],
      },
      sections: [
        {
          title: 'Cities',
          text: 'Warsaw, Kraków, Wrocław, Poznań, Łódź, Gdańsk, Gdynia, Szczecin, Lublin, Rzeszów, Chełm, Katowice and any other address in Poland.',
        },
        {
          title: 'Via Polish ports',
          text: 'Gdańsk and Gdynia are the main gateways for sea containers from China. We collect the container at the port and deliver the cargo to Ukraine by road.',
        },
      ],
      prices: {
        title: 'Indicative prices',
        rows: [
          { label: 'Van up to 2 t', value: 'from €400' },
          { label: 'Truck 22 t', value: 'from €1,000' },
          { label: 'Groupage', value: 'from €0.4/km per pallet' },
        ],
        note: 'The price depends on the city, volume and availability of a return load.',
      },
      vehicles: ['bus', 'fura'],
      faq: [
        {
          q: 'How long does delivery to Poland take?',
          a: 'It depends on the city and the border queue. Your manager will give you an estimated transit time for your route.',
        },
      ],
    },
    {
      slug: 'customs',
      group: 'international',
      meta: { title: "Customs clearance and warehousing at the Polish border", description: "Import and export customs clearance, T1, EUR.1, TIR, warehousing and transloading at the Ukraine – Poland border." },
      card: { icon: 'docs', title: "Customs and warehousing", text: "Customs clearance, storage, transloading", price: "on request" },
      h1: "Customs clearance and warehousing at the Polish border",
      lead: "Together with our partners at the Polish border, we handle the paperwork and store your cargo so it moves on without delays.",
      bullets: ["Import, export, transit", "T1, EUR.1, EX, TIR", "Storage, transloading, consolidation"],
      sections: [
        { title: "Customs clearance", items: ["T1 document: transit clearance and support", "Import: customs clearance of goods entering the EU", "EX document: export of goods outside the EU", "EUR.1 certificate of origin", "Transit declaration for cargo from non-EU countries (China, USA, South Korea and others)", "TIR carnet: issuing and support"] },
        { title: "Warehouse and logistics", items: ["Warehouse storage", "Transloading", "Cargo consolidation and deconsolidation", "Finding transport", "Cargo pickup from airports and seaports", "Sale of goods in transit"] },
        { title: "Documents and advice", items: ["Full support with customs and transport documents", "Advice on customs procedures and international trade"] },
      ],
      vehicles: ['fura'],
      faq: [
        { q: "How much does customs clearance cost?", a: "It depends on the procedure and the cargo. Tell us what you are shipping and where, and we will quote." },
        { q: "Can I order customs or storage without transport?", a: "Yes, customs clearance or warehousing can be ordered separately." },
      ],
    },
    {
      slug: 'asia',
      group: 'international',
      meta: { title: "Freight from Asia to Ukraine", description: "Freight from Asia: China, Turkey, India, Vietnam. Sea containers and air freight, with customs clearance." },
      card: { icon: 'china', title: "Asia", text: "China, Turkey, India and more", price: "on request" },
      h1: "Freight from Asia to Ukraine",
      lead: "We bring goods from Asian countries by sea or air: from pickup at the supplier to your warehouse in Ukraine.",
      bullets: ["China, Turkey, India, Vietnam", "Sea FCL/LCL or air", "Customs clearance via a broker"],
      cargo: { title: "What we carry", items: ["Commercial cargo", "Pallets", "Equipment", "Containers"] },
      sections: [{ title: "How we deliver", text: "By sea in full or groupage containers, by air for urgent cargo, then by road across Ukraine." }],
      vehicles: ['fura'],
      faq: [
        { q: "How much does shipping from Asia cost?", a: "We quote per shipment: it depends on the country, volume, weight and delivery method." },
        { q: "What documents are needed?", a: "An invoice and documents for the goods; customs clearance is handled by a customs broker." },
      ],
    },
    {
      slug: 'usa',
      group: 'international',
      meta: { title: "Freight USA – Ukraine", description: "Freight from the USA to Ukraine and to the USA: sea containers and air freight, with customs clearance." },
      card: { icon: 'air', title: "USA", text: "Sea and air, both ways", price: "on request" },
      h1: "Freight USA – Ukraine",
      lead: "We arrange cargo delivery between the USA and Ukraine by sea or air, door to door.",
      bullets: ["Sea: FCL containers and LCL groupage", "Air for urgent cargo", "Customs clearance via a broker"],
      cargo: { title: "What we carry", items: ["Commercial cargo", "Pallets", "Equipment", "Containers"] },
      sections: [{ title: "How we deliver", text: "By sea via European ports or by air, then by road to your address." }],
      vehicles: ['fura'],
      faq: [
        { q: "How much does shipping from the USA cost?", a: "We quote per shipment: it depends on volume, weight, city and delivery method." },
        { q: "What documents are needed?", a: "An invoice and documents for the goods; customs clearance is handled by a customs broker." },
      ],
    },
    {
      slug: 'slovenia',
      group: 'international',
      meta: {
        title: 'Freight Transport Ukraine – Slovenia',
        description:
          'Freight to and from Slovenia: Ljubljana, Maribor, Koper. Dedicated vehicle, groupage, cargo via the Port of Koper.',
      },
      card: { icon: 'flag', title: 'Slovenia', text: 'Ljubljana, Maribor, Port of Koper', price: 'on request' },
      h1: 'Freight transport Ukraine – Slovenia',
      lead: 'We have a presence in Slovenia, so we know this route from the inside. We carry cargo between Ukraine and Slovenia, and through Slovenia on to the rest of Europe.',
      bullets: ['Ljubljana, Maribor, Celje, Koper', 'Dedicated vehicle or groupage', 'Cargo via the Port of Koper'],
      cargo: {
        title: 'What we carry',
        items: ['Commercial cargo', 'Pallets', 'Equipment', 'Personal belongings for a move', 'Sea containers from Koper'],
      },
      sections: [
        {
          title: 'Port of Koper',
          text: 'Koper is Slovenia’s seaport on the Adriatic, and part of the cargo from Asia to Central Europe passes through it. We can arrange delivery from the port to Ukraine or to other EU countries.',
        },
        {
          title: 'Through Slovenia',
          text: 'Slovenia is a convenient point for trips to Austria, Italy, Croatia and the Balkans. We will price the route for your address.',
        },
      ],
      vehicles: ['bus', 'fura'],
      faq: [
        {
          q: 'How much does transport to Slovenia cost?',
          a: 'We price it for the route: it depends on volume, city and format (dedicated vehicle or groupage). As a guide, a full truck within Europe costs €1.5/km.',
        },
      ],
    },
  ],

  pricesPage: {
    meta: {
      title: 'Freight Transport Prices: Rates per km in Ukraine and Europe',
      description:
        'Indicative freight rates within Ukraine: van from UAH 35/km, 5 t from UAH 50, 10 t from UAH 60, full truck from UAH 70. Rates for Europe, loaders and moves.',
    },
    h1: 'Freight transport prices',
    lead: 'Indicative rates to plan your budget. Your manager gives you the exact price after your request and fixes it in the transport order.',
    ukraineTitle: 'Within Ukraine, dedicated vehicle',
    ukraineRows: [
      { label: 'Van up to 2 t, up to 20 m³', value: 'from UAH 35/km' },
      { label: 'Truck up to 5 t', value: 'from UAH 50/km' },
      { label: 'Truck up to 10 t', value: 'from UAH 60/km' },
      { label: 'Truck up to 22 t', value: 'from UAH 70/km' },
      { label: 'Road train up to 120 m³', value: 'from UAH 80/km' },
      { label: 'Refrigerated truck 22 t', value: 'from UAH 80/km' },
      { label: 'Tipper / grain truck', value: 'from UAH 100/km' },
      { label: 'Tanker truck', value: 'from UAH 100/km' },
      { label: 'Car transporter', value: 'from UAH 40/km' },
      { label: 'Crane truck', value: 'from UAH 100/km' },
      { label: 'Low-loader (oversized)', value: 'from UAH 100/km' },
      { label: 'Mobile crane', value: 'on request' },
    ],
    extraTitle: 'Moves and extra services',
    extraRows: [
      { label: 'Move, dedicated vehicle 15–20 m³', value: 'from UAH 35/km' },
      { label: 'Groupage within Ukraine', value: 'from UAH 15/km' },
      { label: 'Loader', value: 'from UAH 250/h', note: 'minimum 2 hours' },
    ],
    europeTitle: 'Europe',
    europeRows: [
      { label: 'Van up to 2 t', value: 'from €1.2/km' },
      { label: 'Truck 22 t', value: 'from €1.5/km' },
      { label: 'Pallet up to 300 kg (groupage)', value: 'from €0.4/km' },
      { label: 'Ukraine – Poland, full truck', value: 'from €1,000' },
      { label: 'Ukraine – Germany, full truck', value: 'from €2,000' },
    ],
    note: 'Prices are indicative and may change. The final amount depends on the cargo, route and date.',
    factorsTitle: 'What affects the price',
    factors: [
      'Distance and vehicle type',
      'Weight, volume and features of the cargo',
      'Number of loading and unloading points',
      'Loaders, tail lift, waiting time',
      'Vehicle availability in the region and return loads',
      'Urgency',
    ],
    faq: [
      {
        q: 'Why are prices shown as "from"?',
        a: 'The "from" rate is the minimum for a dedicated vehicle on a busy route. A route with no return load, several stops or loaders will cost more.',
      },
      {
        q: 'Can the price change after we agree it?',
        a: 'No, as long as the cargo details and route stay the same: we fix the price in the transport order.',
      },
    ],
  },

  contactsPage: {
    meta: {
      title: 'Contact Us: Phone, Viber, Telegram, WhatsApp',
      description: 'Phone, Viber, Telegram, WhatsApp and email of GR Logistics. Kyiv, Ukraine, and Slovenia.',
    },
    h1: 'Contact us',
    lead: 'Call us or message us on your favourite messenger. For a quote, tell us the route, weight and volume of your cargo.',
    aboutTitle: 'About us',
    about: [
      "GR Logistics arranges freight transport within Ukraine and abroad: by road, sea and air. We match the vehicle to the cargo: from a van to a full truck, low-bed trailer, car transporter or crane truck. We also handle customs clearance in Ukraine and Europe.",
      "We are based in Ukraine, Poland and Slovenia. We work with both businesses and private clients.",
    ],
    hours: 'Requests from the website reach us instantly on Telegram',
  },

  thanksPage: {
    meta: { title: 'Thank you for your request', description: 'Request received.' },
    h1: 'Thank you, we have your request',
    lead: 'A logistics manager will call you, check the details and give you a price. If it is urgent, call or message us.',
    next: 'What happens next',
  },
}
