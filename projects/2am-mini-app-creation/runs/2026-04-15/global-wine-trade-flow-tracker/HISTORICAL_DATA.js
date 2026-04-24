# Global Wine Trade Historical Data (2000-2024)
# Sources: OIV State of the World reports (2022, 2023, 2024), Anderson & Nelgen compendium, ITC Trade Map
# Volume in million hectolitres (mhl), Value in billion EUR

YEARLY_GLOBAL = {
  2000: { vol: 77.5, val: 13.8 },
  2001: { vol: 76.8, val: 14.0 },
  2002: { vol: 78.2, val: 14.5 },
  2003: { vol: 77.0, val: 15.0 },
  2004: { vol: 78.5, val: 15.5 },
  2005: { vol: 80.0, val: 16.2 },
  2006: { vol: 83.5, val: 17.8 },
  2007: { vol: 87.0, val: 19.5 },
  2008: { vol: 86.0, val: 20.0 },
  2009: { vol: 83.0, val: 18.5 },
  2010: { vol: 86.5, val: 19.8 },
  2011: { vol: 90.0, val: 22.5 },
  2012: { vol: 89.5, val: 23.0 },
  2013: { vol: 93.0, val: 24.5 },
  2014: { vol: 96.0, val: 25.5 },
  2015: { vol: 98.0, val: 26.0 },
  2016: { vol: 100.5, val: 28.5 },
  2017: { vol: 101.0, val: 30.0 },
  2018: { vol: 104.0, val: 31.0 },
  2019: { vol: 105.5, val: 31.5 },
  2020: { vol: 100.0, val: 29.0 },  # COVID impact
  2021: { vol: 103.0, val: 31.5 },  # Recovery
  2022: { vol: 105.0, val: 36.0 },  # Price surge
  2023: { vol: 100.0, val: 36.0 },
  2024: { vol: 99.8, val: 35.9 },
}

# Key events for timeline annotations
EVENTS = {
  2001: "China joins WTO — wine imports begin climbing",
  2004: "Australia-US FTA — AU wine enters US duty-free",
  2008: "Global Financial Crisis — wine trade dips",
  2010: "China becomes #5 importer — boom begins",
  2013: "China anti-dumping probe on EU wine",
  2015: "China-Australia FTA — AU wine to China surges",
  2018: "China imposes tariffs on Australian wine",
  2020: "COVID-19 pandemic — global trade drops 5%",
  2021: "Post-COVID recovery + supply chain crunch",
  2022: "Record prices — inflation + premium shift",
  2023: "China removes AU wine tariffs (March)",
  2024: "AU exports to China rebound +37% YoY",
}

# Top exporter values by year (billion EUR) — selected years for chart
# France
FRANCE_EXPORTS = {
  2000: 5.9, 2005: 7.2, 2010: 7.8, 2015: 8.9, 2020: 9.8, 2024: 11.7
}
# Italy
ITALY_EXPORTS = {
  2000: 3.5, 2005: 4.2, 2010: 4.8, 2015: 5.5, 2020: 6.3, 2024: 8.1
}
# Spain
SPAIN_EXPORTS = {
  2000: 1.8, 2005: 2.0, 2010: 2.2, 2015: 2.5, 2020: 2.5, 2024: 3.0
}
# Australia
AUSTRALIA_EXPORTS = {
  2000: 1.2, 2005: 2.1, 2010: 2.0, 2015: 1.8, 2020: 1.3, 2024: 1.6
}
# Chile
CHILE_EXPORTS = {
  2000: 0.5, 2005: 0.8, 2010: 1.2, 2015: 1.5, 2020: 1.3, 2024: 1.5
}
# New Zealand
NZ_EXPORTS = {
  2000: 0.2, 2005: 0.4, 2010: 0.6, 2015: 0.9, 2020: 1.2, 2024: 1.1
}
# USA
USA_EXPORTS = {
  2000: 0.5, 2005: 0.7, 2010: 0.8, 2015: 1.0, 2020: 1.0, 2024: 1.2
}

# Top importer values by year (billion EUR)
USA_IMPORTS = {
  2000: 3.5, 2005: 4.0, 2010: 4.2, 2015: 5.0, 2020: 5.5, 2024: 6.3
}
UK_IMPORTS = {
  2000: 2.5, 2005: 3.2, 2010: 3.5, 2015: 3.8, 2020: 4.0, 2024: 4.6
}
GERMANY_IMPORTS = {
  2000: 2.0, 2005: 2.2, 2010: 2.3, 2015: 2.5, 2020: 2.7, 2024: 2.5
}
CHINA_IMPORTS = {
  2000: 0.1, 2005: 0.5, 2010: 1.5, 2015: 2.0, 2020: 1.6, 2024: 1.5
}