// Коды стран для поля телефона. Названия берём из браузера (Intl.DisplayNames) на языке страницы,
// поэтому тут только ISO-код и телефонный код: список весит пару килобайт.
const RAW =
  'UA380 PL48 SI386 DE49 MD373 RO40 SK421 CZ420 HU36 LT370 LV371 EE372 AT43 IT39 HR385 RS381 BG359 FR33 ES34 PT351 NL31 BE32 LU352 CH41 GB44 IE353 DK45 SE46 NO47 FI358 IS354 GR30 CY357 MT356 TR90 GE995 AM374 AZ994 KZ7 RU7 BY375 UZ998 KG996 TJ992 TM993 ' +
  'US1 CA1 IL972 AE971 SA966 QA974 KW965 BH973 OM968 JO962 LB961 EG20 MA212 TN216 DZ213 LY218 CN86 HK852 MO853 TW886 JP81 KR82 IN91 PK92 BD880 LK94 NP977 VN84 TH66 MY60 SG65 ID62 PH63 AU61 NZ64 ' +
  'AL355 AD376 BA387 ME382 MK389 XK383 LI423 MC377 SM378 VA39 GI350 FO298 GL299 ' +
  'AF93 IR98 IQ964 SY963 YE967 MN976 KH855 LA856 MM95 BN673 TL670 MV960 BT975 KP850 ' +
  'MX52 BR55 AR54 CL56 CO57 PE51 VE58 EC593 BO591 PY595 UY598 CR506 PA507 GT502 HN504 SV503 NI505 CU53 DO1 PR1 JM1 TT1 BS1 BB1 HT509 BZ501 GY592 SR597 ' +
  'ZA27 NG234 KE254 ET251 GH233 TZ255 UG256 RW250 SN221 CI225 CM237 AO244 MZ258 ZM260 ZW263 NA264 BW267 MG261 MU230 SC248 SD249 SS211 SO252 DJ253 ER291 ' +
  'ML223 NE227 BF226 TD235 MR222 GM220 GN224 GW245 SL232 LR231 TG228 BJ229 GA241 CG242 CD243 CF236 GQ240 BI257 MW265 LS266 SZ268 CV238 KM269 ST239 ' +
  'FJ679 PG675 SB677 VU678 WS685 TO676 KI686 NR674 TV688 PW680 FM691 MH692'

export type Country = { iso: string; dial: string }

export const countries: Country[] = RAW.trim()
  .split(/\s+/)
  .map((s) => ({ iso: s.slice(0, 2), dial: s.slice(2) }))

/** Сначала страны, откуда реально пишут, дальше остальные по алфавиту. */
export const PRIORITY = ['UA', 'PL', 'SI', 'DE', 'MD', 'RO', 'SK', 'CZ', 'LT', 'AT', 'IT', 'HR', 'GB', 'US', 'KZ']

export function flag(iso: string) {
  return String.fromCodePoint(...[...iso].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))
}

/** Код страны по умолчанию для языка страницы. */
export const DEFAULT_COUNTRY: Record<string, string> = { ua: 'UA', ru: 'UA', en: 'UA', pl: 'PL', sl: 'SI' }

export function dialOf(iso: string) {
  return countries.find((c) => c.iso === iso)?.dial ?? '380'
}
