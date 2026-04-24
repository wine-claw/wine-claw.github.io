// ===== VINTAGE TIME MACHINE — APP.JS =====
// Australian wine vintage explorer & quiz (1990–2024)

// ──────────────── VINTAGE DATA ────────────────
// Quality: 1–5 stars per region per year
// Tags: emoji + label describing the year's character
// variety: key standout variety for that region that year

const VINTAGES = {
  1990: {
    headline: "The year that set the benchmark",
    barossa: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★★", summary: "A warm, dry season produced deeply coloured, richly structured Shiraz with extraordinary intensity. One of the great Barossa vintages of the decade.", back: "The 1990 Barossa Shiraz set a benchmark for the region — big, generous, and built to last. Many producers still reference it as a peak year. Cabernet also performed well but Shiraz stole the show." },
    mclaren: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "Solid and reliable, with well-structured Shiraz and good Cabernet. A year that rewarded patient growers.", back: "McLaren Vale's maritime influence kept things moderate. Reds had fine tannin structure and good longevity. A quietly excellent year rather than a spectacular one." },
    hills: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Chardonnay ★★★★", summary: "Cool conditions suited the Hills perfectly. Elegant Chardonnay and crisp Riesling were highlights.", back: "The Adelaide Hills enjoyed a long, cool ripening period. Pinot Noir showed promise too, though it was Chardonnay that really shone in this vintage." },
    coonawarra: { q: 5, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★★★", summary: "Legendary Coonawarra Cabernet — warm, dry, perfect terra rossa conditions. One for the ages.", back: "The 1990 Coonawarra Cabernet is widely regarded as one of the greatest ever made. Warm, dry conditions on the terra rossa produced deeply coloured, intensely flavoured fruit with fine tannins. A collector's vintage." },
    clare: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Classic Clare Riesling year — crisp acidity, laser-like lime flavours, and great ageing potential.", back: "Clare Valley Rieslings from 1990 developed beautiful tertiary character over decades. The Shiraz was solid but Riesling was the star." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★½", summary: "High-altitude cool conditions produced stunning Riesling with intense citrus and floral notes.", back: "Eden Valley Rieslings from 1990 are considered benchmarks. The cool season gave them piercing acidity and extraordinary length." }
  },
  1991: {
    headline: "Great reds across the south",
    barossa: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★★", summary: "Another warm, generous year. Shiraz was opulent and deeply coloured — a worthy follow-up to 1990.", back: "Back-to-back warm vintages gave Barossa two legendary Shiraz years. The '91s were slightly more forward and approachable than the '90s but equally impressive." },
    mclaren: { q: 4.5, tag: "⚖ Balanced", variety: "Shiraz ★★★★★", summary: "Exceptional McLaren Vale — warm and dry with perfect ripening. Shiraz had wonderful depth.", back: "The '91 McLaren Vale Shiraz is considered one of the region's greats. Perfectly balanced fruit and tannin, with a long, fine finish." },
    hills: { q: 3.5, tag: "⚖ Balanced", variety: "Pinot Noir ★★★½", summary: "A decent year for the Hills, though warmer than ideal for Pinot. Chardonnay performed better.", back: "Adelaide Hills was on the warmer side in '91, making it better for Chardonnay than Pinot Noir. Still a respectable vintage." },
    coonawarra: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★★★", summary: "Another outstanding Coonawarra Cabernet year. Warm and dry on the terra rossa — near-perfect.", back: "The 1991 Coonawarra Cabernets rivaled 1990 for quality — perhaps slightly more elegant and perfumed. Another legendary year." },
    clare: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Good Clare Riesling year with bright acidity and classic lime flavours.", back: "Clare Valley produced clean, precise Rieslings in 1991. Shiraz was also very good — warm but structured." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Fine Riesling with great poise and length from the high country.", back: "Eden Valley's cool altitude served it well again in 1991. Rieslings were tight and mineral." }
  },
  1992: {
    headline: "Solid and steady",
    barossa: { q: 3.5, tag: "⚖ Balanced", variety: "Shiraz ★★★½", summary: "A reliable, even season. No drama, no disasters — just good, honest Barossa wine.", back: "1992 was a 'winemaker's year' — good fruit without extreme conditions. Shiraz was solid if not spectacular." },
    mclaren: { q: 3.5, tag: "⚖ Balanced", variety: "Shiraz ★★★½", summary: "Consistent and dependable. McLaren Vale did what it does best: produce generous, approachable reds.", back: "A steady year in McLaren Vale. No heatwaves, no rain events — just reliable ripening." },
    hills: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Chardonnay ★★★½", summary: "Cool, even conditions suited white varieties. Chardonnay had good natural acidity.", back: "The Adelaide Hills had a gentle, cool vintage in 1992. Good for whites, Pinot was respectable." },
    coonawarra: { q: 3.5, tag: "⚖ Balanced", variety: "Cabernet Sauvignon ★★★½", summary: "A workmanlike vintage — good Cabernet with decent structure but without the brilliance of '90–'91.", back: "Coonawarra's '92 was competent but lived in the shadow of its two predecessors. The Cabernet was sound but not collectible." },
    clare: { q: 3.5, tag: "⚖ Balanced", variety: "Riesling ★★★½", summary: "Reliable Riesling with typical Clare character — lime, floral, good acid.", back: "A solid but unremarkable Clare Valley vintage. Rieslings were typical if not thrilling." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Consistent quality from the high country. Clean, fresh Rieslings.", back: "Eden Valley did its thing in 1992 — clean, precise Riesling without the fireworks of the surrounding great years." }
  },
  1993: {
    headline: "Cool and sometimes tricky",
    barossa: { q: 3, tag: "🌧 Wet & Cool", variety: "Shiraz ★★★", summary: "A cooler, wetter season made ripening difficult. Reds were lighter and more elegant than usual.", back: "1993 challenged Barossa growers with cool, wet conditions. Those who managed canopy and crop levels produced elegant, lighter-style wines." },
    mclaren: { q: 3, tag: "🌧 Wet & Cool", variety: "Shiraz ★★★", summary: "McLaren Vale's maritime climate helped moderate the cool, wet season. Reds were variable.", back: "A difficult year in McLaren Vale. The best sites produced drinkable wines, but many struggled with ripeness." },
    hills: { q: 4, tag: "🏔 Cool & Elegant", variety: "Pinot Noir ★★★★", summary: "The cool season was perfect for Adelaide Hills Pinot and sparkling base. A standout for cool-climate styles.", back: "For the Adelaide Hills, the cool 1993 was actually a blessing. Pinot Noir and Chardonnay for sparkling thrived in the long, cool ripening." },
    coonawarra: { q: 2.5, tag: "🌧 Wet & Cool", variety: "Cabernet Sauvignon ★★½", summary: "A challenging year for Coonawarra — too cool for Cabernet to fully ripen on the terra rossa.", back: "Coonawarra struggled in 1993. Cabernet didn't reach full ripeness, and many wines were green and lean." },
    clare: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Clare Riesling benefited from the cool conditions — high acid, bright citrus.", back: "The cool year suited Clare Valley Riesling, giving it tight acidity and bright citrus flavours." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Eden Valley excelled in the cool year — Riesling was the highlight with piercing acidity.", back: "Eden Valley's high altitude made it one of the winners in the cool 1993. Rieslings were outstanding." }
  },
  1994: {
    headline: "Warm, dry, and outstanding",
    barossa: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★★", summary: "A warm, dry year producing powerful, concentrated Shiraz. Low crops meant intense flavours.", back: "The 1994 Barossa vintage was outstanding for reds. Drought conditions reduced crops but concentrated flavours. Shiraz was exceptional — rich, powerful, and long-lived." },
    mclaren: { q: 4, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★", summary: "Warm and dry suited McLaren Vale's natural generosity. Shiraz had great depth.", back: "McLaren Vale's Mediterranean climate handled the warm, dry conditions well. Reds were generous and structured." },
    hills: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Chardonnay ★★★½", summary: "Warmer than ideal for the Hills, but well-managed vineyards produced good Chardonnay.", back: "The warm 1994 was a bit much for Adelaide Hills Pinot, but Chardonnay handled it reasonably well." },
    coonawarra: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★★★", summary: "Exceptional Coonawarra — warm, dry conditions on terra rossa produced magnificent Cabernet.", back: "Another top-shelf Coonawarra Cabernet year. Warm, dry conditions gave deeply coloured, intensely flavoured fruit. Some rank it alongside 1990." },
    clare: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Clare Valley did well despite warmth. Riesling held its acidity; Shiraz was rich.", back: "Clare Valley managed the warm year well. Rieslings retained freshness and Shiraz had real depth." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Eden Valley's altitude protected its Riesling. Beautiful, structured whites.", back: "The high country saved Eden Valley Riesling from the heat. The wines were elegant and precise." }
  },
  1995: {
    headline: "Drought intensity",
    barossa: { q: 4, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★½", summary: "Severe drought cut crops to the bone but the surviving fruit was intensely concentrated.", back: "The 1995 drought devastated yields but the fruit that survived was remarkably concentrated. Barossa Shiraz was small-batch but powerful." },
    mclaren: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★½", summary: "Drought conditions reduced yields. Quality varied by vineyard age and water access.", back: "Old vines with deep roots handled the drought best. Some McLaren Vale wines from '95 are stunners; others struggled." },
    hills: { q: 3, tag: "🔥 Hot & Dry", variety: "Chardonnay ★★★", summary: "Tough year for the Hills — heat and water stress made elegant styles difficult.", back: "The Adelaide Hills suffered in the drought. Pinot was particularly challenging; Chardonnay was the better bet." },
    coonawarra: { q: 4, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★★", summary: "Drought suited Coonawarra's well-drained terra rossa. Cabernet was small-crop but intense.", back: "Coonawarra's free-draining soils handled the drought better than most. Cabernet was concentrated and structured." },
    clare: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Riesling ★★★½", summary: "Low crops from drought. Riesling was good but not exceptional — the heat challenged acidity.", back: "Clare Valley's Riesling held up reasonably well in the drought but lacked the brilliance of cooler years." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Eden Valley's altitude offered some protection but the drought still took its toll.", back: "Eden Valley was drought-affected but altitude helped retain some freshness. Rieslings were sound." }
  },
  1996: {
    headline: "Record harvest, high quality",
    barossa: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "A large, high-quality vintage — rare combination. Warm, even ripening produced generous, approachable Shiraz.", back: "The 1996 Barossa vintage broke production records while maintaining quality. Shiraz was generous and forward-drinking." },
    mclaren: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "McLaren Vale enjoyed a generous, balanced season. Volume and quality both up.", back: "A standout McLaren Vale year — big volumes, real quality. Shiraz and Grenache both excelled." },
    hills: { q: 4, tag: "🏔 Cool & Elegant", variety: "Chardonnay ★★★★", summary: "Good conditions for the Hills — warm enough for ripeness, cool enough for elegance.", back: "1996 was kind to the Adelaide Hills. Chardonnay and Sauvignon Blanc both did well, and Pinot showed promise." },
    coonawarra: { q: 4, tag: "⚖ Balanced", variety: "Cabernet Sauvignon ★★★★", summary: "A strong Coonawarra vintage — even ripening, good structure, generous volumes.", back: "Coonawarra enjoyed a balanced season with good yields. Cabernet had classic varietal character." },
    clare: { q: 4, tag: "⚖ Balanced", variety: "Riesling ★★★★", summary: "Excellent Clare Valley vintage — Riesling had typical lime purity and Shiraz was strong too.", back: "1996 was a strong all-round year for Clare Valley. Riesling was pure and Shiraz had real depth." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "High-quality Riesling with lovely floral and citrus character. Eden Valley at its best.", back: "Eden Valley delivered beautifully in 1996. Rieslings were floral, citrus-driven, and built to age." }
  },
  1997: {
    headline: "Elegant whites shine",
    barossa: { q: 3.5, tag: "⚖ Balanced", variety: "Shiraz ★★★½", summary: "A milder year than the mid-90s norm. Reds were elegant; whites were excellent.", back: "The cooler 1997 produced more restrained Barossa wines. Shiraz was elegant rather than powerful, and Chardonnay was lovely." },
    mclaren: { q: 3.5, tag: "⚖ Balanced", variety: "Shiraz ★★★½", summary: "Moderate conditions produced balanced wines. Not a blockbuster year but very drinkable.", back: "McLaren Vale's '97 was a year of elegance. Grenache particularly shone in the milder conditions." },
    hills: { q: 4.5, tag: "🏔 Cool & Elegant", variety: "Chardonnay ★★★★★", summary: "One of the best Adelaide Hills years of the decade. Cool, long ripening = stunning Chardonnay and Pinot.", back: "The Adelaide Hills loved 1997. Cool conditions gave Chardonnay brilliant natural acidity and Pinot Noir wonderful finesse. One of the great Hills vintages." },
    coonawarra: { q: 3.5, tag: "⚖ Balanced", variety: "Cabernet Sauvignon ★★★½", summary: "A solid year without the fireworks. Cabernet was elegant and well-structured.", back: "Coonawarra's '97 was more elegant than powerful. Good Cabernet with fine tannins, if lacking the concentration of warmer years." },
    clare: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★½", summary: "Outstanding Riesling year — racy, intense, with brilliant lime and floral character.", back: "The Clare Valley Rieslings from 1997 are considered among the best of the decade. Racy acidity and intense flavour." },
    eden: { q: 4.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★★", summary: "Exceptional Eden Valley Riesling. The cool year was tailor-made for high-altitude whites.", back: "Eden Valley Riesling from 1997 is legendary. The cool, long season produced wines of extraordinary precision and ageing potential." }
  },
  1998: {
    headline: "The biggest and the best",
    barossa: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★★", summary: "Record harvest with outstanding quality — a rare double. Warm throughout, Shiraz was opulent and deeply coloured.", back: "The 1998 vintage was the largest in Australian history at the time, and quality was outstanding. Barossa Shiraz was the star — rich, powerful, and deeply coloured. Chardonnay and Semillon also excelled." },
    mclaren: { q: 4, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★", summary: "Hot and dry stressed some vineyards, but old vines handled it. Reds were better than whites.", back: "McLaren Vale had a stressful vintage — hot and dry. Unirrigated vineyards struggled, but old-rooted vines produced powerful, concentrated reds." },
    hills: { q: 3, tag: "🔥 Hot & Dry", variety: "Chardonnay ★★★", summary: "Too warm for the Hills' elegant style. Whites lacked intensity; Pinot was challenged.", back: "The hot 1998 was not kind to Adelaide Hills. Chardonnay and Pinot struggled in the heat. A year for red wine lovers, not white." },
    coonawarra: { q: 5, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★★★", summary: "Coonawarra Cabernet compared to the legendary '90 and '91 — that says everything.", back: "The 1998 Coonawarra Cabernet was immediately compared to 1990 and 1991. Warm, dry conditions on the terra rossa produced magnificent fruit. Shiraz also looked exceptional." },
    clare: { q: 4, tag: "⚖ Balanced", variety: "Riesling ★★★★", summary: "Clare Valley enjoyed good spring rain and mild harvest weather. Riesling was fuller and earlier-drinking.", back: "Clare Valley had a fine season in 1998. Rieslings were a touch fuller than the racy 1997s but very appealing. Shiraz was encouraging." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Eden Valley's summer was mild and dry. Rieslings were good but cooler late summer slowed red ripening.", back: "The cool finish to the season prevented Eden Valley reds from fully ripening, but Rieslings were first-class." }
  },
  1999: {
    headline: "Good, not great",
    barossa: { q: 3.5, tag: "⚖ Balanced", variety: "Shiraz ★★★½", summary: "A decent year without the extremes. Even ripening, good drinkability, but not a landmark vintage.", back: "1999 was a reliable Barossa year. Shiraz was approachable and well-made but lacked the concentration of surrounding great years." },
    mclaren: { q: 3.5, tag: "⚖ Balanced", variety: "Shiraz ★★★½", summary: "Steady and sound. McLaren Vale did what it does — generous, drinkable reds.", back: "McLaren Vale 1999 was a middle-of-the-road year. No complaints, no celebration." },
    hills: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Chardonnay ★★★½", summary: "Cool conditions helped maintain the Hills' elegant house style.", back: "The Adelaide Hills had a cool, even vintage in 1999. Chardonnay and Pinot were both solid." },
    coonawarra: { q: 3, tag: "🌧 Wet & Cool", variety: "Cabernet Sauvignon ★★★", summary: "Cooler, wetter conditions made it a tough year for Coonawarra Cabernet. Variable quality.", back: "Coonawarra's 1999 was uneven. Some producers made very good wine; others struggled with ripeness and disease pressure." },
    clare: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Clare Riesling was sound with typical varietal character.", back: "A competent Clare Valley year. Riesling was typical without being exciting." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Eden Valley Riesling was fresh and clean, if not a classic.", back: "Eden Valley produced clean, fresh Riesling in 1999. Perfectly good drinking." }
  },
  2000: {
    headline: "Millennial mixed bag",
    barossa: { q: 3.5, tag: "⚖ Balanced", variety: "Shiraz ★★★½", summary: "A mixed year — some heat, some rain. The best Barossa sites produced very good Shiraz.", back: "The millennial vintage was patchy in the Barossa. Hot spells and rain events tested vineyard management. The best wines were very good." },
    mclaren: { q: 3.5, tag: "⚖ Balanced", variety: "Shiraz ★★★½", summary: "Variable conditions but McLaren Vale's resilience showed through. Good, drinkable reds.", back: "McLaren Vale handled the variable 2000 conditions reasonably well. Reliable rather than remarkable." },
    hills: { q: 3.5, tag: "🌧 Wet & Cool", variety: "Pinot Noir ★★★½", summary: "Cool and sometimes wet — suited the Hills' cool-climate varieties well enough.", back: "The Adelaide Hills Pinot was the highlight of a mild, sometimes damp year. Chardonnay was decent." },
    coonawarra: { q: 3, tag: "🌧 Wet & Cool", variety: "Cabernet Sauvignon ★★★", summary: "A tricky vintage on the Limestone Coast. Cabernet struggled to reach full ripeness.", back: "Coonawarra had another cooler, wetter year in 2000. Cabernet was lean and green in lesser sites." },
    clare: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Clare Valley had a reasonable year. Riesling was sound, Shiraz was approachable.", back: "Clare Valley's 2000 was quietly competent. Riesling had good freshness; Shiraz was drinkable." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Eden Valley's cool conditions suited Riesling, giving it typical precision.", back: "Eden Valley delivered characteristic Riesling in 2000 — clean, precise, and refreshing." }
  },
  2001: {
    headline: "Barossa brilliance",
    barossa: { q: 5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★★", summary: "One of the all-time great Barossa vintages. Warm, dry, low crops — the recipe for Shiraz perfection.", back: "The 2001 Barossa Shiraz is legendary. Warm, dry conditions reduced crops and concentrated flavours. The wines were rich, powerful, and extraordinarily long-lived. Still drinking magnificently today." },
    mclaren: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★½", summary: "McLaren Vale thrived in the warm, dry conditions. Shiraz was powerful and deep.", back: "McLaren Vale loved 2001. The warm, dry year gave Shiraz extraordinary concentration and Grenache was beautiful too." },
    hills: { q: 3, tag: "🔥 Hot & Dry", variety: "Chardonnay ★★★", summary: "Too hot for the Hills' elegant style. Some vineyards handled it; others didn't.", back: "The Adelaide Hills struggled in the heat of 2001. It was a red wine year, and the Hills' whites suffered for it." },
    coonawarra: { q: 4, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★★", summary: "Warm and dry suited Coonawarra. Cabernet was concentrated and powerful.", back: "Coonawarra enjoyed the warm, dry 2001. Cabernet had real depth and structure, though it didn't reach the legendary heights of 1990/91/98." },
    clare: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "Clare Valley had a strong year — warm enough for Shiraz power, cool enough for Riesling acid.", back: "2001 was a strong Clare Valley vintage. Both Riesling and Shiraz performed well — a rare double." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Eden Valley Riesling was sound, with the altitude offering some relief from the warmth.", back: "Eden Valley's altitude was its saviour in 2001. Rieslings were fresh if not classic." }
  },
  2002: {
    headline: "Cool elegance reigns",
    barossa: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Shiraz ★★★½", summary: "A cooler year produced more elegant Barossa Shiraz — spice and pepper over raw power.", back: "The cool 2002 gave Barossa Shiraz a different personality — more pepper, more spice, less sheer power. Interesting for those who prefer elegance." },
    mclaren: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Shiraz ★★★½", summary: "Cooler conditions gave McLaren Vale reds more finesse and less overt fruit. A year for elegance.", back: "McLaren Vale's 2002 was a cooler, more restrained year. The wines had finesse rather than power." },
    hills: { q: 5, tag: "🏔 Cool & Elegant", variety: "Pinot Noir ★★★★★", summary: "An absolute standout for the Adelaide Hills. Cool, long ripening = stunning Pinot and Chardonnay.", back: "The 2002 Adelaide Hills vintage is considered one of the best ever for the region. Pinot Noir had extraordinary finesse and Chardonnay was brilliant. A cool-climate classic." },
    coonawarra: { q: 3, tag: "🏔 Cool & Elegant", variety: "Cabernet Sauvignon ★★★", summary: "Too cool for Coonawarra's liking. Cabernet struggled to ripen fully on the terra rossa.", back: "Coonawarra's 2002 was one for the patient — and even then, Cabernet didn't fully ripen. A year for those who like leaner, more herbaceous styles." },
    clare: { q: 5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★★", summary: "Outstanding Riesling year — one of the great Clare vintages. Laser acidity, pure lime.", back: "The 2002 Clare Valley Rieslings are considered among the greatest ever produced. The cool season gave them piercing acidity, intense lime flavour, and extraordinary ageing potential. Still developing beautifully." },
    eden: { q: 5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★★", summary: "A legendary Eden Valley Riesling year — cool, precise, and built for decades.", back: "Eden Valley's 2002 Rieslings are legendary. The cool season produced wines of extraordinary precision and longevity. Benchmark stuff." }
  },
  2003: {
    headline: "Heat and stress",
    barossa: { q: 3, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★", summary: "Very hot conditions stressed vineyards. Some Shiraz was pruney and overripe; the best were powerful.", back: "The extreme heat of 2003 challenged Barossa winemakers. The best sites produced concentrated, powerful wine; others were baked and jammy." },
    mclaren: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★½", summary: "McLaren Vale's maritime influence moderated the worst of the heat. Shiraz was generous.", back: "The sea breeze helped McLaren Vale through the hot 2003. Shiraz had warmth and generosity if not great finesse." },
    hills: { q: 2.5, tag: "🔥 Hot & Dry", variety: "Chardonnay ★★½", summary: "Brutally hot for the Hills. The cool-climate varieties suffered badly.", back: "The Adelaide Hills was one of the big losers in the hot 2003. Most whites were flat and Pinot was unrecognisable." },
    coonawarra: { q: 3, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★", summary: "Heat suited some Coonawarra sites; others were stressed. Mixed quality.", back: "Coonawarra's 2003 was uneven. The best Cabernets had richness and power, but many were overripe." },
    clare: { q: 3, tag: "🔥 Hot & Dry", variety: "Riesling ★★★", summary: "Heat challenged Riesling. Some good wines, but not a classic Clare year.", back: "Clare Valley Riesling struggled with the heat in 2003. Shiraz was better — warm, rich, and forward." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Eden Valley's altitude was a saving grace. Rieslings retained more freshness than most.", back: "Eden Valley's altitude preserved some elegance in the hot 2003. Rieslings were decent if not outstanding." }
  },
  2004: {
    headline: "Balanced and rewarding",
    barossa: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "A return to form — warm, even, and balanced. Barossa Shiraz showed its classical side.", back: "2004 was a return to balance after the extremes of 2003. Barossa Shiraz was generous, well-structured, and classically proportioned." },
    mclaren: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "McLaren Vale enjoyed a lovely, even season. Reds had great balance and drinkability.", back: "McLaren Vale loved the balanced 2004. Shiraz, Grenache, and Cabernet all performed well. A winemaker's dream year." },
    hills: { q: 4, tag: "🏔 Cool & Elegant", variety: "Pinot Noir ★★★★", summary: "Good conditions for the Hills — Pinot Noir and Chardonnay both showed class.", back: "The Adelaide Hills had a fine vintage in 2004. Cool nights and warm days gave elegant, expressive wines." },
    coonawarra: { q: 4, tag: "⚖ Balanced", variety: "Cabernet Sauvignon ★★★★", summary: "Solid Coonawarra year — balanced conditions gave classic, well-structured Cabernet.", back: "Coonawarra's 2004 was classic — no extremes, just solid, well-structured Cabernet with good varietal character." },
    clare: { q: 4, tag: "⚖ Balanced", variety: "Riesling ★★★★", summary: "Excellent Clare Valley — Riesling had classic lime purity and Shiraz was strong.", back: "Clare Valley enjoyed a balanced 2004. Rieslings were pure and precise; Shiraz had depth and structure." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Eden Valley at its cool-climate best. Beautiful Riesling with floral lift.", back: "Eden Valley's Rieslings in 2004 were beautifully balanced — floral, citrus-driven, and built to age." }
  },
  2005: {
    headline: "Warm, long, and excellent",
    barossa: { q: 5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★★", summary: "One of the great Barossa vintages. Warm, long season produced Shiraz of extraordinary depth and structure.", back: "The 2005 Barossa vintage is widely considered one of the greatest. A long, warm ripening period gave Shiraz incredible depth, fine tannins, and extraordinary balance. Wines from this vintage are still magnificent." },
    mclaren: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★½", summary: "Outstanding McLaren Vale year. Warm, even ripening gave rich, powerful reds with great finesse.", back: "McLaren Vale's 2005 was exceptional. The long, warm season gave Shiraz wonderful concentration and the tannins were remarkably fine." },
    hills: { q: 4, tag: "🏔 Cool & Elegant", variety: "Chardonnay ★★★★", summary: "Warm enough for generosity, cool enough for structure. A very good Hills year.", back: "The Adelaide Hills enjoyed a warm but not extreme 2005. Chardonnay had generosity and freshness; Pinot was solid." },
    coonawarra: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★★½", summary: "Excellent Coonawarra — warm conditions gave Cabernet power and depth with fine terra rossa minerality.", back: "The 2005 Coonawarra Cabernets are outstanding — rich, powerful, and structured. A worthy successor to the great warm vintages." },
    clare: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "Clare Valley had a strong year. Shiraz was the standout — rich and well-structured.", back: "Clare Valley's 2005 was excellent for reds. Riesling was good but Shiraz stole the show." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Fine Riesling from the high country — good warmth balanced by altitude freshness.", back: "Eden Valley's Rieslings were beautifully balanced in 2005 — ripe fruit with retaining freshness." }
  },
  2006: {
    headline: "Heatwave winners and losers",
    barossa: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★½", summary: "Heatwaves during ripening. Old vines coped; young vines suffered. Quality was very variable.", back: "The 2006 heatwaves were brutal. Old Barossa vines with deep roots survived and produced concentrated wine. Young vineyards were scorched. Quality varied enormously." },
    mclaren: { q: 4, tag: "🔥 Hot & Dry", variety: "Grenache ★★★★", summary: "McLaren Vale's maritime influence and old-vine Grenache handled the heat surprisingly well.", back: "McLaren Vale fared better than most in 2006. The sea breeze helped, and old Grenache bush vines thrived in the heat." },
    hills: { q: 2, tag: "🔥 Hot & Dry", variety: "Chardonnay ★★", summary: "Devastating heat for the Hills. Many vineyards lost fruit; survivors produced flat, sunburnt wines.", back: "The Adelaide Hills was hammered by the 2006 heatwaves. It was one of the worst vintages in memory for the region. Only the highest, coolest sites produced drinkable wine." },
    coonawarra: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★½", summary: "Heat stressed some vineyards, but Coonawarra's structure held. Cabernet was powerful but variable.", back: "Coonawarra's 2006 was uneven. The best Cabernets had concentration and power; others were overripe and flat." },
    clare: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★½", summary: "Heat tested Clare Valley. Shiraz was the best bet — warm, rich, and forward.", back: "Clare Valley's 2006 was challenging. Riesling struggled in the heat; Shiraz was more reliable." },
    eden: { q: 3, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★", summary: "Altitude helped but the heat was relentless. Riesling was sound but not exciting.", back: "Even Eden Valley's altitude couldn't fully escape the 2006 heat. Rieslings were acceptable but not up to the region's best." }
  },
  2007: {
    headline: "Drought, heat, and bushfire smoke",
    barossa: { q: 3, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★", summary: "Severe drought and heat. Low yields produced some concentrated reds, but the season was punishing.", back: "2007 was a brutal year in the Barossa. Drought, heat, and water shortages devastated some vineyards. The survivors made intense, concentrated wine but volumes were tiny." },
    mclaren: { q: 3, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★", summary: "Drought-hit McLaren Vale. The strongest old vineyards produced decent wine; many others struggled.", back: "McLaren Vale's old vines were its salvation in 2007. The drought was severe, and young vineyards suffered badly." },
    hills: { q: 1.5, tag: "🔥 Hot & Dry", variety: "— ★½", summary: "The worst Adelaide Hills vintage in memory. Bushfires brought devastating smoke taint to many vineyards.", back: "The 2007 Adelaide Hills vintage was catastrophic. Bushfires in the region caused widespread smoke taint, and the drought was extreme. Many producers wrote off the entire vintage. A year to forget." },
    coonawarra: { q: 3, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★", summary: "Drought affected Coonawarra too. Cabernet was small-crop and concentrated, but the season was harsh.", back: "Coonawarra's 2007 was drought-stricken but the terra rossa helped drainage. Cabernet was concentrated but the season was exhausting for growers." },
    clare: { q: 3, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★", summary: "Clare Valley struggled with the drought. Riesling was below par; Shiraz was the better bet.", back: "Clare Valley's 2007 was tough. The drought hit Riesling quality, and Shiraz was the safer choice." },
    eden: { q: 3, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★", summary: "Altitude helped Eden Valley cope with the drought better than most. Riesling was acceptable.", back: "Eden Valley's altitude gave some protection from the worst of 2007. Rieslings were sound if not exciting." }
  },
  2008: {
    headline: "Another heatwave year",
    barossa: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★½", summary: "Another very hot year. Back-to-back heatwaves tested Barossa's resilience. Reds were powerful.", back: "The second consecutive heatwave vintage was exhausting for Barossa growers. Some excellent Shiraz was made at the best sites, but the cumulative stress was telling." },
    mclaren: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★½", summary: "McLaren Vale's maritime influence helped again. Reds were warm and generous.", back: "McLaren Vale showed its resilience in 2008. The sea breeze moderated the worst heat, and old vines delivered." },
    hills: { q: 2.5, tag: "🔥 Hot & Dry", variety: "Chardonnay ★★½", summary: "Another tough hot year for the Hills. Some Chardonnay was okay; Pinot was mostly a write-off.", back: "The Adelaide Hills suffered through another hot year in 2008. It wasn't as catastrophic as 2007, but it was far from ideal." },
    coonawarra: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★½", summary: "Warm conditions gave Coonawarra Cabernet power and concentration. Not a classic but solid.", back: "Coonawarra's 2008 was warm and dry. Cabernet had concentration and ripeness, if not the elegance of the best years." },
    clare: { q: 3, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★", summary: "Another warm year in Clare. Riesling was challenged; Shiraz was the safer pick.", back: "Clare Valley's 2008 continued the warm pattern. Rieslings were fuller and less precise than usual." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Eden Valley's altitude continued to be its best asset. Rieslings were the best of the warm regions.", back: "Eden Valley Riesling was the winner in the warm 2008. The altitude preserved enough freshness for good wine." }
  },
  2009: {
    headline: "Black Saturday's shadow",
    barossa: { q: 4, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★", summary: "A warm year with good reds. The Barossa escaped the worst of the Victorian bushfires' smoke.", back: "The 2009 Barossa vintage was warm and produced very good Shiraz. The region was largely spared from the smoke taint that devastated areas closer to Victoria." },
    mclaren: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "McLaren Vale had a good year — warm but not extreme. Shiraz and Grenache both performed.", back: "McLaren Vale enjoyed a warm, balanced 2009. It was a solid year for the region's signature varieties." },
    hills: { q: 2.5, tag: "🔥 Hot & Dry", variety: "— ★★½", summary: "Bushfire smoke from Victoria affected many Adelaide Hills vineyards. A difficult, anxious vintage.", back: "The Adelaide Hills was on high alert during 2009 as bushfires raged in Victoria. Smoke taint was a real concern and affected many vineyards. A stressful vintage." },
    coonawarra: { q: 4, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★★", summary: "Warm and dry on the Limestone Coast. Cabernet was ripe, structured, and impressive.", back: "Coonawarra's 2009 was a good warm year. Cabernet was rich and well-structured." },
    clare: { q: 3.5, tag: "⚖ Balanced", variety: "Shiraz ★★★½", summary: "Clare Valley had a reasonable year. Warm conditions suited Shiraz more than Riesling.", back: "Clare Valley's 2009 was decent without being outstanding. Shiraz was the better variety." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Eden Valley Riesling was sound and typical, with good varietal character.", back: "Eden Valley's Rieslings in 2009 were clean and varietal, if not reaching the heights of the great cool years." }
  },
  2010: {
    headline: "Cool, long, and beautiful",
    barossa: { q: 4, tag: "🏔 Cool & Elegant", variety: "Shiraz ★★★★", summary: "A cool year gave Barossa Shiraz a different face — elegant, spicy, and beautifully balanced.", back: "The 2010 Barossa vintage was a departure from the norm. Cool, long ripening produced Shiraz with spice, pepper, and finesse rather than raw power. Many winemakers loved the elegance." },
    mclaren: { q: 4, tag: "🏔 Cool & Elegant", variety: "Shiraz ★★★★", summary: "Cool conditions gave McLaren Vale reds wonderful elegance and freshness. A year of finesse.", back: "McLaren Vale's 2010 was a year of elegance. The cooler season gave Shiraz and Grenache beautiful freshness." },
    hills: { q: 5, tag: "🏔 Cool & Elegant", variety: "Pinot Noir ★★★★★", summary: "An absolute cracker for the Adelaide Hills. One of the best cool-climate vintages ever. Pinot and Chardonnay were stunning.", back: "The 2010 Adelaide Hills vintage was one of the greats. Pinot Noir had extraordinary finesse, Chardonnay was brilliant, and Riesling was outstanding. A cool-climate paradise year." },
    coonawarra: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Cabernet Sauvignon ★★★½", summary: "Cool conditions gave Coonawarra Cabernet elegance and finesse, if not raw power.", back: "Coonawarra's 2010 was more elegant than powerful. Cabernet had fine tannins and good varietal character but lacked the concentration of warmer years." },
    clare: { q: 5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★★", summary: "One of the greatest Clare Riesling vintages. Cool, long ripening = extraordinary purity and acid.", back: "The 2010 Clare Valley Rieslings are magnificent. The cool, long season gave them extraordinary purity, intense lime flavour, and brilliant acidity. A vintage for the ages." },
    eden: { q: 5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★★", summary: "Legendary Eden Valley Riesling. The cool year was tailor-made for high-altitude precision.", back: "Eden Valley's 2010 Rieslings are among the greatest ever produced. Piercing acidity, intense citrus and floral character, and extraordinary length. Benchmark stuff." }
  },
  2011: {
    headline: "The miracle vintage",
    barossa: { q: 3.5, tag: "🌧 Wet & Cool", variety: "Shiraz ★★★½", summary: "Incredibly wet La Niña year. Disease pressure was fierce, but those who managed it made surprisingly good wine.", back: "The 2011 'miracle vintage' was the wettest in decades. Mildew and botrytis pressure was extreme. Growers who stayed on top of canopy management and spray programs were rewarded with surprisingly good wine." },
    mclaren: { q: 3.5, tag: "🌧 Wet & Cool", variety: "Shiraz ★★★½", summary: "La Niña brought heavy rain. The best McLaren Vale vineyards pulled through with respectable results.", back: "McLaren Vale's maritime climate was both a blessing and curse in 2011. Humidity was high, but some sites produced very drinkable wine." },
    hills: { q: 4, tag: "🌧 Wet & Cool", variety: "Pinot Noir ★★★★", summary: "Wet, but the Hills' cool climate actually coped reasonably well. Pinot Noir was the highlight.", back: "The Adelaide Hills was one of the better-performing regions in the wet 2011. Pinot Noir and Chardonnay handled the conditions surprisingly well." },
    coonawarra: { q: 3, tag: "🌧 Wet & Cool", variety: "Cabernet Sauvignon ★★★", summary: "Very wet on the Limestone Coast. Cabernet struggled to ripen; disease was a real issue.", back: "Coonawarra's 2011 was very challenging. The wet conditions meant disease pressure was high and Cabernet struggled to reach full ripeness." },
    clare: { q: 4, tag: "🌧 Wet & Cool", variety: "Riesling ★★★★", summary: "Despite the wet, Clare Riesling showed its class — bright acidity and lime purity prevailed.", back: "Clare Valley Riesling came through the wet 2011 with flying colours. The natural acidity and lime character were preserved beautifully." },
    eden: { q: 4, tag: "🌧 Wet & Cool", variety: "Riesling ★★★★", summary: "Eden Valley's altitude and drainage helped it cope with the deluge. Riesling was excellent.", back: "Eden Valley's high altitude and well-drained soils were a real advantage in 2011. Rieslings were fresh and precise despite the challenging season." }
  },
  2012: {
    headline: "Warm, dry, and structured",
    barossa: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★½", summary: "Warm and dry — perfect Barossa conditions. Shiraz was powerful, structured, and deeply coloured.", back: "The 2012 Barossa vintage was outstanding. Warm, dry conditions throughout gave Shiraz extraordinary depth and structure. A worthy successor to 2005." },
    mclaren: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★½", summary: "Exceptional McLaren Vale year. Warm, dry conditions produced rich, powerful reds with great finesse.", back: "McLaren Vale's 2012 was one of the best in recent memory. Shiraz had wonderful concentration and the tannins were silky." },
    hills: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Chardonnay ★★★½", summary: "Warm for the Hills but not extreme. Chardonnay was the pick; Pinot was decent.", back: "The Adelaide Hills managed the warm 2012 reasonably well. Chardonnay was the star; Pinot was solid if not thrilling." },
    coonawarra: { q: 4, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★★", summary: "Good Coonawarra year — warm and dry gave Cabernet ripeness and structure.", back: "Coonawarra's 2012 was a very good warm year. Cabernet had real depth and the classic terra rossa character came through." },
    clare: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "Clare Valley had a strong year. Shiraz was rich and Riesling held its own.", back: "Clare Valley's 2012 was a good all-round year. Shiraz had warmth and depth; Riesling retained freshness despite the warmth." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Eden Valley Riesling was very good — altitude preserved freshness in a warm year.", back: "Eden Valley's altitude was key in 2012. Rieslings had beautiful balance — ripe fruit with retained acidity." }
  },
  2013: {
    headline: "Warm and powerful",
    barossa: { q: 4, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★", summary: "Another warm year. Barossa Shiraz was rich and powerful with generous fruit.", back: "Barossa's 2013 continued the warm pattern. Shiraz was generous, rich, and approachable. A solid vintage." },
    mclaren: { q: 4, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★", summary: "McLaren Vale enjoyed warm, consistent conditions. Shiraz and Tempranillo both did well.", back: "McLaren Vale's 2013 was consistently warm and produced rich, generous wines. A very good year." },
    hills: { q: 3.5, tag: "⚖ Balanced", variety: "Chardonnay ★★★½", summary: "Warm but manageable. Chardonnay and Sauvignon Blanc were the highlights.", back: "The Adelaide Hills had a decent 2013. Warm enough for ripeness, cool enough for freshness. Chardonnay led the way." },
    coonawarra: { q: 4, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★★", summary: "Warm Coonawarra gave ripe, generous Cabernet with good structure.", back: "Coonawarra's 2013 was warm and produced generous, ripe Cabernet. A good year." },
    clare: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★½", summary: "Warm conditions suited Clare Shiraz; Riesling was decent but not at its best.", back: "Clare Valley's 2013 was a Shiraz year. Riesling was good but the warmth reduced its typical precision." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Eden Valley Riesling was sound with good varietal character.", back: "Eden Valley's 2013 Rieslings were solid — good varietal character, if not the precision of the great cool years." }
  },
  2014: {
    headline: "Heat spikes and mixed fortunes",
    barossa: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★½", summary: "Heat spikes in January tested vineyards. The best Barossa sites produced good Shiraz; others were uneven.", back: "2014 had serious heat spikes that caught some Barossa vineyards off guard. Well-managed sites produced good wine; others were baked." },
    mclaren: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★½", summary: "Heat events were a challenge. McLaren Vale's maritime influence helped moderate the worst.", back: "McLaren Vale's 2014 was variable. The sea breeze helped, but the heat spikes were hard to manage." },
    hills: { q: 3, tag: "🔥 Hot & Dry", variety: "Chardonnay ★★★", summary: "Another warm year that wasn't ideal for the Hills' cool-climate signature.", back: "The Adelaide Hills had another warm year in 2014. Not as bad as 2007 but not what the region does best." },
    coonawarra: { q: 3.5, tag: "⚖ Balanced", variety: "Cabernet Sauvignon ★★★½", summary: "Some heat but also some cooler periods. Coonawarra managed a decent Cabernet vintage.", back: "Coonawarra's 2014 was mixed — heat spikes but also cooler windows that allowed Cabernet to ripen steadily." },
    clare: { q: 3.5, tag: "⚖ Balanced", variety: "Riesling ★★★½", summary: "Clare Valley had a reasonable year. Riesling was typical; Shiraz was warm and forward.", back: "Clare Valley's 2014 was decent. Riesling had typical Clare character and Shiraz was generous." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Eden Valley's altitude helped through the heat. Riesling was fresh and varietal.", back: "Eden Valley managed the 2014 heat reasonably well. Rieslings were fresh and varietal." }
  },
  2015: {
    headline: "Warm, solid, and dependable",
    barossa: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "A warm, balanced year without extremes. Barossa Shiraz showed its classic, generous side.", back: "Barossa's 2015 was a return to solid, dependable winemaking. No heatwaves, no drought — just good, balanced Shiraz." },
    mclaren: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "McLaren Vale enjoyed a lovely, even season. Reds had generosity and finesse.", back: "McLaren Vale's 2015 was a pleasure — warm, even, and balanced. Shiraz, Grenache, and Cabernet all performed." },
    hills: { q: 4, tag: "🏔 Cool & Elegant", variety: "Chardonnay ★★★★", summary: "Good year for the Hills — warm enough for ripeness, cool enough for elegance.", back: "The Adelaide Hills had a very good 2015. Chardonnay and Pinot Noir both showed real class." },
    coonawarra: { q: 4, tag: "⚖ Balanced", variety: "Cabernet Sauvignon ★★★★", summary: "Solid Coonawarra vintage — balanced conditions gave classic Cabernet.", back: "Coonawarra's 2015 was a classic year. Cabernet had good varietal character and fine tannins." },
    clare: { q: 4, tag: "⚖ Balanced", variety: "Riesling ★★★★", summary: "Strong Clare Valley vintage — Riesling and Shiraz both performed well.", back: "Clare Valley's 2015 was excellent across both Riesling and Shiraz. A well-balanced year." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Beautiful Eden Valley Riesling — floral, precise, and well-balanced.", back: "Eden Valley's 2015 Rieslings were beautifully balanced — floral, citrus-driven, and built to age." }
  },
  2016: {
    headline: "Elegant whites, very good reds",
    barossa: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "A milder year for Barossa — Shiraz was elegant and balanced rather than blockbuster.", back: "The 2016 Barossa was more elegant than powerful. Shiraz had spice and finesse; Eden Valley Rieslings were outstanding." },
    mclaren: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "Balanced conditions gave McLaren Vale well-structured, approachable wines.", back: "McLaren Vale's 2016 was well-balanced and enjoyable. Reds were generous without being over the top." },
    hills: { q: 4.5, tag: "🏔 Cool & Elegant", variety: "Chardonnay ★★★★½", summary: "Excellent Adelaide Hills year. Cool conditions gave Chardonnay brilliant freshness and Pinot real finesse.", back: "The Adelaide Hills had a standout 2016. Cool nights and warm days gave Chardonnay and Pinot Noir wonderful expression." },
    coonawarra: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Cabernet Sauvignon ★★★½", summary: "Cooler year for Coonawarra. Cabernet was elegant but some lacked the power of warmer vintages.", back: "Coonawarra's 2016 was more elegant than powerful. Cabernet was fine and well-structured but without great concentration." },
    clare: { q: 4.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★½", summary: "Outstanding Clare Riesling year — cool conditions gave extraordinary purity and drive.", back: "Clare Valley's 2016 Rieslings were outstanding. The cool season gave them piercing acidity and intense lime character." },
    eden: { q: 4.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★½", summary: "Exceptional Eden Valley Riesling. A cool year that played to the high country's strengths.", back: "Eden Valley's 2016 Rieslings were among the best of the decade. The cool season gave them extraordinary precision and ageing potential." }
  },
  2017: {
    headline: "The balanced year",
    barossa: { q: 4.5, tag: "⚖ Balanced", variety: "Shiraz ★★★★½", summary: "One of the best balanced vintages in years. Warm, even ripening gave Shiraz depth and finesse.", back: "The 2017 Barossa vintage was widely praised. Warm, even conditions without extreme events gave Shiraz wonderful balance and structure. A great all-round year." },
    mclaren: { q: 4.5, tag: "⚖ Balanced", variety: "Shiraz ★★★★½", summary: "Exceptional McLaren Vale year — balanced and harmonious. Reds had real class.", back: "McLaren Vale's 2017 was one of the best in recent years. Perfectly balanced conditions gave Shiraz wonderful depth and finesse." },
    hills: { q: 4.5, tag: "🏔 Cool & Elegant", variety: "Pinot Noir ★★★★½", summary: "Fantastic Adelaide Hills year. Pinot Noir and Chardonnay were both outstanding.", back: "The Adelaide Hills had a brilliant 2017. Pinot Noir had real finesse and Chardonnay was exceptional. A year that showed the region at its best." },
    coonawarra: { q: 4.5, tag: "⚖ Balanced", variety: "Cabernet Sauvignon ★★★★½", summary: "Excellent Coonawarra — balanced conditions gave Cabernet both power and finesse.", back: "Coonawarra's 2017 was outstanding. Cabernet had classic varietal character with fine tannins and real depth. A return to form." },
    clare: { q: 4.5, tag: "⚖ Balanced", variety: "Riesling ★★★★½", summary: "Superb Clare Valley — Riesling was pure and precise, Shiraz was rich and structured.", back: "Clare Valley's 2017 was outstanding across the board. Rieslings were pure and Shiraz had real depth. A year for both camps." },
    eden: { q: 4.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★½", summary: "Beautiful Eden Valley Riesling — a balanced year that gave both freshness and flavour.", back: "Eden Valley's 2017 was superb. Rieslings had beautiful balance — fresh acidity with generous fruit. Built to age gracefully." }
  },
  2018: {
    headline: "Strong and consistent",
    barossa: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★½", summary: "Warm, dry, and consistent — the Barossa at its reliable best. Shiraz was rich and well-structured.", back: "The 2018 Barossa vintage was excellent. Warm, dry conditions throughout gave Shiraz real depth and structure. Another strong year." },
    mclaren: { q: 4.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★½", summary: "McLaren Vale had a terrific year — warm and even. Shiraz was generous and finely structured.", back: "McLaren Vale's 2018 was outstanding. The warm, consistent season gave reds wonderful concentration and finesse." },
    hills: { q: 4, tag: "⚖ Balanced", variety: "Chardonnay ★★★★", summary: "A good Hills year — warm enough for generosity, cool enough for character.", back: "The Adelaide Hills had a very good 2018. Chardonnay and Pinot both showed well." },
    coonawarra: { q: 4, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★★", summary: "Good Coonawarra year — warm and dry gave Cabernet ripeness and structure.", back: "Coonawarra's 2018 was a good warm year. Cabernet was ripe and well-structured." },
    clare: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "Solid Clare Valley year. Shiraz was rich and Riesling was good.", back: "Clare Valley's 2018 was strong across varieties. Shiraz had depth and Riesling was typically pure." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Eden Valley Riesling was very good — balanced and expressive.", back: "Eden Valley's 2018 Rieslings were beautifully balanced and expressive." }
  },
  2019: {
    headline: "Drought and concentration",
    barossa: { q: 4, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★", summary: "Hot and dry with drought conditions. Low yields but intensely concentrated fruit. Powerful Shiraz.", back: "The 2019 Barossa drought reduced crops dramatically but the surviving fruit was remarkably concentrated. Shiraz was powerful and long-lived." },
    mclaren: { q: 4, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★★", summary: "Drought conditions tested McLaren Vale. Old vines with deep roots produced the best wines.", back: "McLaren Vale's 2019 was hot and dry. Old-vine Shiraz and Grenache handled the conditions best." },
    hills: { q: 3, tag: "🔥 Hot & Dry", variety: "Chardonnay ★★★", summary: "Another hot, dry year for the Hills. Chardonnay was the best bet; Pinot was challenging.", back: "The Adelaide Hills struggled again in hot, dry 2019. Chardonnay was the standout; Pinot was variable." },
    coonawarra: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★½", summary: "Drought conditions. Cabernet was concentrated but some vineyards were severely stressed.", back: "Coonawarra's 2019 was tough. The best Cabernets were concentrated and structured; many vineyards were drought-stressed." },
    clare: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★½", summary: "Warm Clare year. Shiraz was the better variety; Riesling lacked its usual precision.", back: "Clare Valley's 2019 was warm and dry. Shiraz was the safe bet; Riesling was fuller and less precise." },
    eden: { q: 3.5, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★½", summary: "Eden Valley coped better than most with the drought. Riesling retained some freshness.", back: "Eden Valley's altitude was its saviour in 2019. Rieslings were decent if not classic." }
  },
  2020: {
    headline: "Black Summer's devastating toll",
    barossa: { q: 3.5, tag: "🔥 Hot & Dry", variety: "Shiraz ★★★½", summary: "Bushfire smoke from the Black Summer fires affected many vineyards. Those that escaped made good wine.", back: "The Black Summer bushfires of 2019-20 were devastating for many regions. The Barossa was partially affected by smoke, but many vineyards escaped and produced good Shiraz." },
    mclaren: { q: 3.5, tag: "⚖ Balanced", variety: "Shiraz ★★★½", summary: "McLaren Vale was somewhat protected by its coastal position. Smoke was a concern but quality was reasonable.", back: "McLaren Vale's coastal position gave some protection from the worst smoke. Reds were reasonable if not exceptional." },
    hills: { q: 1, tag: "🔥 Hot & Dry", variety: "— ★", summary: "Catastrophic. The Adelaide Hills was ground zero for smoke taint. Many producers wrote off the entire vintage.", back: "The 2020 Adelaide Hills vintage was the worst in living memory. The Black Summer bushfires surrounded the region and smoke taint devastated the crop. Many producers harvested nothing. A tragedy for the region." },
    coonawarra: { q: 3, tag: "🔥 Hot & Dry", variety: "Cabernet Sauvignon ★★★", summary: "Smoke taint was a concern on the Limestone Coast. Some vineyards were affected; others escaped.", back: "Coonawarra was partially affected by smoke in 2020. Some Cabernet was sound; other vineyards were tainted. A difficult, anxious vintage." },
    clare: { q: 3.5, tag: "⚖ Balanced", variety: "Riesling ★★★½", summary: "Clare Valley was relatively fortunate — some smoke but less severe. Riesling and Shiraz were reasonable.", back: "Clare Valley escaped the worst of the Black Summer smoke. Riesling and Shiraz were both respectable." },
    eden: { q: 3, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★", summary: "Eden Valley had some smoke exposure. Quality was variable; the best Rieslings were sound.", back: "Eden Valley was not as badly affected as the Hills, but some smoke taint was present. The best Rieslings were drinkable." }
  },
  2021: {
    headline: "La Niña returns",
    barossa: { q: 4, tag: "🌧 Wet & Cool", variety: "Shiraz ★★★★", summary: "Wet La Niña year with disease pressure. Well-managed vineyards produced excellent Shiraz with freshness.", back: "The 2021 La Niña brought welcome rain after the drought years. Disease pressure was real, but growers who managed canopies and spray programs made very good wine." },
    mclaren: { q: 4, tag: "🌧 Wet & Cool", variety: "Shiraz ★★★★", summary: "Rain returned after years of drought. McLaren Vale's old vines thrived with the moisture.", back: "McLaren Vale enjoyed the return of rain in 2021. Old vines responded positively to the moisture after years of drought stress." },
    hills: { q: 4.5, tag: "🌧 Wet & Cool", variety: "Pinot Noir ★★★★½", summary: "The wet year suited the Hills beautifully. Pinot Noir and Chardonnay were outstanding — the region's best in years.", back: "The Adelaide Hills thrived in the wet 2021. Pinot Noir had wonderful finesse and Chardonnay was brilliant. A return to form after the devastating 2020." },
    coonawarra: { q: 3.5, tag: "🌧 Wet & Cool", variety: "Cabernet Sauvignon ★★★½", summary: "Wet conditions were a challenge for Coonawarra Cabernet, but good vineyard management produced decent wine.", back: "Coonawarra's 2021 was wet and challenging. Cabernet was decent but not a classic — more elegant than powerful." },
    clare: { q: 4, tag: "🌧 Wet & Cool", variety: "Riesling ★★★★", summary: "Clare Riesling showed beautifully in the wet year — high acid, pure lime, typical character.", back: "Clare Valley Riesling was excellent in 2021. The wet year gave it high natural acidity and intense lime character." },
    eden: { q: 4.5, tag: "🌧 Wet & Cool", variety: "Riesling ★★★★½", summary: "Outstanding Eden Valley Riesling — the wet, cool year was perfect for high-altitude precision.", back: "Eden Valley's 2021 Rieslings were outstanding. The cool, wet season gave them extraordinary purity and acidity. Among the best of the decade." }
  },
  2022: {
    headline: "Too much of a good thing",
    barossa: { q: 3, tag: "🌧 Wet & Cool", variety: "Shiraz ★★★", summary: "Very wet year with significant disease pressure. Some good Shiraz but a challenging vintage overall.", back: "The 2022 Barossa vintage was very wet and disease pressure was high. Some dedicated growers produced good wine, but it was hard work." },
    mclaren: { q: 3, tag: "🌧 Wet & Cool", variety: "Shiraz ★★★", summary: "La Niña continued. Humidity and rain made for a difficult season in McLaren Vale.", back: "McLaren Vale's 2022 was challenging — persistent rain and humidity made disease control a constant battle." },
    hills: { q: 3.5, tag: "🌧 Wet & Cool", variety: "Pinot Noir ★★★½", summary: "The wet year was manageable for the Hills, but not as kind as 2021. Pinot and Chardonnay were decent.", back: "The Adelaide Hills had a decent 2022 — not as good as 2021 but the cool-climate varieties handled the wet conditions reasonably well." },
    coonawarra: { q: 2.5, tag: "🌧 Wet & Cool", variety: "Cabernet Sauvignon ★★½", summary: "Very challenging on the Limestone Coast. Cabernet struggled to ripen; disease was widespread.", back: "Coonawarra's 2022 was one of the tougher vintages in recent memory. Wet, cold, and disease-ridden." },
    clare: { q: 3.5, tag: "🌧 Wet & Cool", variety: "Riesling ★★★½", summary: "Riesling was the bright spot in a wet Clare year — bright acidity, classic lime character.", back: "Clare Valley's Riesling showed its resilience in the wet 2022. Good acidity and typical character." },
    eden: { q: 4, tag: "🌧 Wet & Cool", variety: "Riesling ★★★★", summary: "Eden Valley Riesling was the highlight — altitude and drainage helped enormously.", back: "Eden Valley was one of the winners in the wet 2022. Its altitude and free-draining soils gave Riesling excellent quality." }
  },
  2023: {
    headline: "Return to balance",
    barossa: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "A more balanced season was welcome after the La Niña years. Shiraz showed its classic generosity.", back: "Barossa's 2023 was a relief after the wet years. Balanced, warm conditions gave Shiraz its characteristic generosity and depth." },
    mclaren: { q: 4, tag: "⚖ Balanced", variety: "Shiraz ★★★★", summary: "McLaren Vale enjoyed a balanced, pleasant season. Reds were generous and well-structured.", back: "McLaren Vale's 2023 was a very good, balanced year. All varieties performed well." },
    hills: { q: 4, tag: "🏔 Cool & Elegant", variety: "Chardonnay ★★★★", summary: "Good conditions for the Hills — Chardonnay and Pinot were both very good.", back: "The Adelaide Hills had a fine 2023. Chardonnay was the standout, with Pinot Noir also showing well." },
    coonawarra: { q: 4, tag: "⚖ Balanced", variety: "Cabernet Sauvignon ★★★★", summary: "A good, balanced Coonawarra year — Cabernet had classic varietal character and fine structure.", back: "Coonawarra's 2023 was a return to form. Balanced conditions gave Cabernet fine tannins and good varietal character." },
    clare: { q: 4, tag: "⚖ Balanced", variety: "Riesling ★★★★", summary: "Clare Valley had a very good year — Riesling was pure and Shiraz was rich.", back: "Clare Valley's 2023 was excellent. Riesling was typical and pure; Shiraz had real depth." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Beautiful Eden Valley Riesling from a balanced, cool year.", back: "Eden Valley's 2023 Rieslings were beautifully balanced — floral, citrus-driven, and precise." }
  },
  2024: {
    headline: "Wind-thinned quality",
    barossa: { q: 4, tag: "🌬 Windy", variety: "Shiraz ★★★★", summary: "Strong winds at flowering painfully reduced crops. But small berries meant intense flavours — quality over quantity.", back: "The 2024 Barossa vintage will be remembered for painfully low yields due to wind at flowering. But the small berries and open canopies gave the surviving fruit extraordinary concentration. Shiraz was excellent where fruit set." },
    mclaren: { q: 3.5, tag: "🌬 Windy", variety: "Shiraz ★★★½", summary: "Wind at flowering hit McLaren Vale too. Smaller crops but decent quality where fruit set.", back: "McLaren Vale's 2024 had reduced crops from wind at flowering. The quality of what survived was good, but volumes were down." },
    hills: { q: 4, tag: "🌬 Windy", variety: "Chardonnay ★★★★", summary: "Wind reduced crops but the cool season gave Chardonnay and Pinot good quality. A surprisingly good year.", back: "The Adelaide Hills had a better 2024 than expected. Wind-reduced crops meant intense flavours, and the cool season suited the region's signature varieties." },
    coonawarra: { q: 4, tag: "🌬 Windy", variety: "Cabernet Sauvignon ★★★★", summary: "Small crops from wind at flowering, but Coonawarra Cabernet quality was strong where fruit set.", back: "Coonawarra's 2024 produced low yields but good quality Cabernet. The wind-thinned crops gave the surviving fruit real concentration." },
    clare: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Good Clare Riesling year — the cool season and lower crops gave it intensity and precision.", back: "Clare Valley's 2024 Rieslings were very good — the smaller crops and cool conditions gave them intensity and typical lime precision." },
    eden: { q: 4, tag: "🏔 Cool & Elegant", variety: "Riesling ★★★★", summary: "Excellent Eden Valley Riesling from a cool, wind-affected year. Small berries, intense flavour.", back: "Eden Valley's 2024 Rieslings were outstanding. The cool year and wind-reduced crops gave them extraordinary concentration and precision." }
  }
};

const REGIONS = ['barossa', 'mclaren', 'hills', 'coonawarra', 'clare', 'eden'];
const REGION_LABELS = {
  barossa: 'Barossa Valley',
  mclaren: 'McLaren Vale',
  hills: 'Adelaide Hills',
  coonawarra: 'Coonawarra',
  clare: 'Clare Valley',
  eden: 'Eden Valley'
};
const YEARS = Object.keys(VINTAGES).map(Number).sort((a, b) => a - b);

// ──────────────── STATE ────────────────
let currentYear = 2024;
let currentMode = 'explore';

// Quiz state
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizStreak = 0;
let quizBestStreak = 0;
let quizAnswered = false;

// ──────────────── INIT ────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildTimeline();
  selectYear(2024);
});

// ──────────────── MODE SWITCHING ────────────────
function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  document.getElementById('explore-mode').style.display = mode === 'explore' ? '' : 'none';
  document.getElementById('quiz-mode').style.display = mode === 'quiz' ? '' : 'none';
  if (mode === 'quiz') {
    document.querySelector('.timeline-section').style.display = 'none';
  } else {
    document.querySelector('.timeline-section').style.display = '';
  }
}

// ──────────────── WARNING ────────────────
function dismissWarning() {
  const banner = document.getElementById('warning-banner');
  banner.style.transform = 'translateY(-100%)';
  banner.style.transition = 'transform 0.3s ease';
  setTimeout(() => banner.remove(), 300);
}

// ──────────────── TIMELINE ────────────────
function buildTimeline() {
  const track = document.getElementById('timeline-track');
  track.innerHTML = '';
  YEARS.forEach(year => {
    const chip = document.createElement('button');
    chip.className = 'year-chip' + (year === currentYear ? ' active' : '');
    chip.textContent = year;
    chip.setAttribute('aria-label', `Select vintage ${year}`);
    chip.onclick = () => selectYear(year);
    track.appendChild(chip);
  });
  scrollTimelineTo(currentYear);
}

function selectYear(year) {
  currentYear = year;
  // Update chips
  document.querySelectorAll('.year-chip').forEach(chip => {
    chip.classList.toggle('active', parseInt(chip.textContent) === year);
  });
  scrollTimelineTo(year);
  renderYear(year);
}

function scrollTimelineTo(year) {
  const track = document.getElementById('timeline-track');
  const chips = track.querySelectorAll('.year-chip');
  for (const chip of chips) {
    if (parseInt(chip.textContent) === year) {
      chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      break;
    }
  }
}

// ──────────────── RENDER YEAR ────────────────
function renderYear(year) {
  const data = VINTAGES[year];
  if (!data) return;

  document.getElementById('year-display').textContent = year;
  document.getElementById('year-headline').textContent = data.headline;

  const grid = document.getElementById('cards-grid');
  grid.innerHTML = '';

  REGIONS.forEach(region => {
    const rd = data[region];
    if (!rd) return;

    const card = document.createElement('div');
    card.className = 'postcard-card fade-in';
    card.onclick = () => card.classList.toggle('flipped');

    const stars = renderStars(rd.q);

    card.innerHTML = `
      <div class="postcard-inner">
        <div class="postcard-front">
          <div class="card-region">${REGION_LABELS[region]}</div>
          <div class="card-stars">${stars}</div>
          <div class="card-tag">${rd.tag}</div>
          <div class="card-summary">${rd.summary}</div>
          <div class="card-variety">${rd.variety}</div>
          <div class="card-flip-hint">tap to flip ↻</div>
        </div>
        <div class="postcard-back">
          <div class="card-back-title">${REGION_LABELS[region]} · ${year}</div>
          <div class="card-back-story">${rd.back}</div>
          <div class="card-back-flip">tap to flip back ↻</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderStars(q) {
  const full = Math.floor(q);
  const half = q % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  let s = '★'.repeat(full);
  if (half) s += '★';
  s += '☆'.repeat(empty);
  return s;
}

// ──────────────── QUIZ ENGINE ────────────────
function startQuiz() {
  quizQuestions = generateQuizQuestions(10);
  quizIndex = 0;
  quizScore = 0;
  quizStreak = 0;
  quizBestStreak = 0;
  quizAnswered = false;

  document.getElementById('quiz-start').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'none';
  document.getElementById('quiz-play').style.display = '';
  renderQuizQuestion();
}

function generateQuizQuestions(count) {
  const questions = [];
  const usedYears = new Set();

  // Build a pool of interesting vintages
  const pool = YEARS.filter(y => {
    const d = VINTAGES[y];
    // Need at least one region with a distinctive story
    return REGIONS.some(r => d[r] && d[r].back.length > 50);
  });

  for (let i = 0; i < count && i < pool.length; i++) {
    let year;
    do {
      year = pool[Math.floor(Math.random() * pool.length)];
    } while (usedYears.has(year) && usedYears.size < pool.length);
    usedYears.add(year);

    // Generate 3–4 clues from the vintage data
    const data = VINTAGES[year];
    const clues = [];

    // Add the headline
    clues.push(data.headline);

    // Pick 2–3 distinctive region clues
    const regionClues = [];
    REGIONS.forEach(r => {
      const rd = data[r];
      if (rd && (rd.q <= 2.5 || rd.q >= 4.5)) {
        // Very good or very bad = interesting
        if (rd.q <= 2) regionClues.push(`${REGION_LABELS[r]}: "Worst vintage in memory"`);
        else if (rd.q <= 2.5) regionClues.push(`${REGION_LABELS[r]}: "A very tough year"`);
        else if (rd.q >= 5) regionClues.push(`${REGION_LABELS[r]}: "Legendary quality ★★★★★"`);
        else if (rd.q >= 4.5) regionClues.push(`${REGION_LABELS[r]}: "Outstanding ★★★★½"`);
      }
      // Add tag-based clues
      if (rd && (rd.tag.includes('🔥') || rd.tag.includes('🌧'))) {
        regionClues.push(`${REGION_LABELS[r]}: ${rd.tag}`);
      }
      // Add key historical clues from back text
      if (rd && rd.back) {
        if (rd.back.toLowerCase().includes('smoke')) regionClues.push('Smoke taint affected vineyards');
        if (rd.back.toLowerCase().includes('bushfire')) regionClues.push('Bushfires menaced the region');
        if (rd.back.toLowerCase().includes('drought')) regionClues.push('Severe drought conditions');
        if (rd.back.toLowerCase().includes('heatwave')) regionClues.push('Heatwave conditions');
        if (rd.back.toLowerCase().includes('record')) regionClues.push('Record-breaking harvest');
        if (rd.back.toLowerCase().includes('miracle')) regionClues.push('Called "the miracle vintage"');
        if (rd.back.toLowerCase().includes('la niña')) regionClues.push('La Niña weather pattern');
      }
    });

    // Deduplicate and pick up to 3 region clues
    const uniqueRegionClues = [...new Set(regionClues)].slice(0, 3);
    clues.push(...uniqueRegionClues);

    // Generate wrong options
    const wrongOptions = new Set();
    while (wrongOptions.size < 3) {
      const w = pool[Math.floor(Math.random() * pool.length)];
      if (w !== year) wrongOptions.add(w);
    }

    const options = [year, ...wrongOptions].sort(() => Math.random() - 0.5);

    questions.push({
      year,
      clues: clues.slice(0, 4),
      options
    });
  }

  return questions;
}

function renderQuizQuestion() {
  if (quizIndex >= quizQuestions.length) {
    showResults();
    return;
  }

  const q = quizQuestions[quizIndex];
  quizAnswered = false;

  document.getElementById('quiz-progress').textContent = `${quizIndex + 1} / ${quizQuestions.length}`;
  document.getElementById('quiz-score').textContent = `${quizScore} pts`;
  document.getElementById('quiz-streak').textContent = quizStreak > 1 ? `🔥 ${quizStreak} streak` : '';

  const cluesDiv = document.getElementById('quiz-clues');
  cluesDiv.innerHTML = q.clues.map(c => `<p class="clue-item">${c}</p>`).join('');

  const optionsDiv = document.getElementById('quiz-options');
  optionsDiv.innerHTML = q.options.map(opt =>
    `<button class="quiz-option" onclick="answerQuiz(${opt}, this)">${opt}</button>`
  ).join('');

  document.getElementById('quiz-feedback').style.display = 'none';
}

function answerQuiz(chosenYear, btn) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = quizQuestions[quizIndex];
  const correct = chosenYear === q.year;

  // Disable all buttons
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.style.pointerEvents = 'none';
    if (parseInt(btn.textContent) === q.year) {
      btn.classList.add('reveal');
    }
  });

  const feedback = document.getElementById('quiz-feedback');
  feedback.style.display = '';

  if (correct) {
    btn.classList.add('correct');
    quizStreak++;
    if (quizStreak > quizBestStreak) quizBestStreak = quizStreak;
    const bonus = quizStreak > 1 ? (quizStreak - 1) * 2 : 0;
    const points = 10 + bonus;
    quizScore += points;
    feedback.className = 'quiz-feedback correct-fb';
    document.getElementById('feedback-text').textContent = bonus > 0
      ? `✅ Correct! +${points} pts (streak bonus +${bonus})`
      : `✅ Correct! +10 pts`;
    launchConfetti();
  } else {
    btn.classList.add('wrong');
    quizStreak = 0;
    feedback.className = 'quiz-feedback wrong-fb';
    document.getElementById('feedback-text').textContent = `❌ Not quite!`;
  }
  document.getElementById('feedback-year').textContent = `It was ${q.year}`;
  document.getElementById('quiz-score').textContent = `${quizScore} pts`;

  // Auto-advance after delay
  setTimeout(() => {
    quizIndex++;
    renderQuizQuestion();
  }, 1800);
}

function showResults() {
  document.getElementById('quiz-play').style.display = 'none';
  document.getElementById('quiz-results').style.display = '';

  document.getElementById('results-score').textContent = quizScore;
  const title = getQuizTitle(quizScore);
  document.getElementById('results-title-earned').textContent = title;

  document.getElementById('results-breakdown').innerHTML = `
    <p>Correct answers: ${quizQuestions.filter((q, i) => i < quizIndex).length} / ${quizQuestions.length}</p>
    <p>Best streak: ${quizBestStreak}</p>
  `;

  if (quizScore >= 80) launchConfetti();
}

function getQuizTitle(score) {
  if (score >= 100) return '🏆 Legend';
  if (score >= 80) return '🌟 Vigneron';
  if (score >= 60) return '🍷 Winemaker';
  if (score >= 40) return '🧤 Cellar Hand';
  return '🌱 Apprentice';
}

// ──────────────── CONFETTI ────────────────
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#6b1d3a', '#c8a24e', '#5a6b3c', '#b4382e', '#2e6b4a', '#e0c97a', '#d4a017'];

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 14 - 4,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.3 + Math.random() * 0.2
    });
  }

  let frame = 0;
  const maxFrames = 90;

  function animate() {
    if (frame > maxFrames) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, 1 - frame / maxFrames);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    frame++;
    requestAnimationFrame(animate);
  }

  animate();
}

// ──────────────── REDUCED MOTION ────────────────
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Override confetti with a no-op
  window.launchConfetti = () => {};
}