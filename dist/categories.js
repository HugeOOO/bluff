// Legacy category names remain here so saved presets migrate without losing choices.
export const categoryGroups = {
  'Mat & dryck': ['Mat', 'Råvaror', 'Smaker och sötsaker', 'Drycker', 'Frukt och grönt', 'Mat och måltider', 'Bakverk och efterrätter', 'Kryddor och tillbehör'],
  'Djur': ['Djur', 'Vilda djur', 'Smådjur', 'Däggdjur', 'Hav och vatten'],
  'Natur & växter': ['Natur', 'Växter', 'Naturfenomen', 'Landskap och mark', 'Trädgård och odling'],
  'Väder & rymd': ['Väder och rymd'],
  'Hem & hushåll': ['Hemmet', 'Kök och städning', 'Småsaker hemma', 'Badrum och hygien'],
  'Kläder & tillbehör': ['Kläder och tillbehör', 'Klädesplagg'],
  'Verktyg & material': ['Verktyg och saker', 'Verkstad och fästen', 'Material'],
  'Transport & resor': ['Transport', 'Resor'],
  'Platser & byggnader': ['Platser och byggnader', 'Byggnader och byggdelar'],
  'Sport & friluftsliv': ['Sport och fritid', 'Utelek och rörelse', 'Friluftsliv'],
  'Musik & skapande': ['Musik och kultur', 'Musik och scen', 'Konst och skapande'],
  'Teknik & digitalt': ['Teknik', 'Digital vardag'],
  'Vardag & rutiner': ['Vardag och upplevelser', 'Tid och rutiner'],
  'Jobb & skola': ['Arbetsplatser och ärenden', 'Yrken', 'Skolsaker'],
  'Lek & fantasi': ['Lek och spel', 'Sagor och fantasifigurer'],
  'Kroppen & hälsa': ['Kroppen', 'Kroppens vardag']
};
const names = new Map(Object.entries(categoryGroups).flatMap(([group, legacy]) => legacy.map(name => [name, group])));
export const mergeCategory = name => names.get(name) ?? name;
