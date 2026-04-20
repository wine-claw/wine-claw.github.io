// case-studies.js — Pre-loaded case study data

const CASE_STUDIES = {
  'southern-beef': {
    scenarioName: 'Southern Beef — Riverina Mixed Enterprise',
    enterprises: { cattle: { enabled: true, dsePercent: 55 }, sheep: { enabled: true, dsePercent: 45 }, goat: { enabled: false, dsePercent: 0 } },
    cattle: {
      dressingPercent: 53,
      stock: [
        { class: 'Cows', ageBracket: '>2yr', opening: 220, purchases: 0, naturalIncrease: 0, sales: 35, deaths: 5, closing: 220, weightOpen: 500, valueOpen: 800, weightClose: 500, valueClose: 800, salesWeight: 450, salesPrice: 1.50, purchWeight: 0, purchPrice: 0 },
        { class: 'Calves', ageBracket: '0-6mo', opening: 0, purchases: 0, naturalIncrease: 230, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Weaners', ageBracket: '7-12mo', opening: 230, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 230, weightOpen: 300, valueOpen: 600, weightClose: 300, valueClose: 600, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Heifers', ageBracket: '1-2yr', opening: 40, purchases: 0, naturalIncrease: 0, sales: 75, deaths: 0, closing: 40, weightOpen: 450, valueOpen: 700, weightClose: 450, valueClose: 700, salesWeight: 364, salesPrice: 2.30, purchWeight: 0, purchPrice: 0 },
        { class: 'Steers 1yr', ageBracket: '1-2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 115, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 400, salesPrice: 2.45, purchWeight: 0, purchPrice: 0 },
        { class: 'Steers 2yr', ageBracket: '>2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Bulls', ageBracket: '>2yr', opening: 4, purchases: 2, naturalIncrease: 0, sales: 1, deaths: 1, closing: 4, weightOpen: 800, valueOpen: 1200, weightClose: 800, valueClose: 1200, salesWeight: 715, salesPrice: 1.20, purchWeight: 800, purchPrice: 3.13 }
      ],
      directExpenses: { herdHealth: 8000, contractors: 0, transport: 800, sellingCosts: 12000 },
      supplements: { homeGrownTonnes: 0, homeGrownPrice: 0, purchasedTonnes: 7.7, purchasedPrice: 210 },
      supplementAllocation: 55
    },
    sheep: {
      dressingPercent: 46,
      woolIncome: 36000,
      stock: [
        { class: 'Ewes', opening: 1500, purchases: 300, naturalIncrease: 0, sales: 200, deaths: 50, closing: 1550, weightOpen: 60, valueOpen: 120, weightClose: 60, valueClose: 120, salesWeight: 60, salesPrice: 1.33, purchWeight: 60, purchPrice: 2.00 },
        { class: 'Lambs', opening: 0, purchases: 0, naturalIncrease: 1875, sales: 1800, deaths: 75, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 48, salesPrice: 2.33, purchWeight: 0, purchPrice: 0 },
        { class: 'Rams', opening: 35, purchases: 10, naturalIncrease: 0, sales: 3, deaths: 7, closing: 35, weightOpen: 80, valueOpen: 300, weightClose: 80, valueClose: 300, salesWeight: 80, salesPrice: 1.25, purchWeight: 80, purchPrice: 15.00 }
      ],
      directExpenses: { flockHealth: 8000, contractors: 2200, transport: 220, sellingCosts: 12500, shearingCrutching: 12000 },
      supplements: { homeGrownTonnes: 0, homeGrownPrice: 0, purchasedTonnes: 6.3, purchasedPrice: 210 },
      supplementAllocation: 45
    },
    goat: {
      dressingPercent: 38,
      stock: [
        { class: 'Does', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Kids', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Capretto', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Chevon', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Wethers', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Bucks', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 }
      ],
      directExpenses: { herdHealth: 0, contractors: 0, transport: 0, sellingCosts: 0, shearingCrutching: 0, dairyCosts: 0 },
      supplements: { homeGrownTonnes: 0, homeGrownPrice: 0, purchasedTonnes: 0, purchasedPrice: 0 },
      supplementAllocation: 0
    },
    labour: {
      ownerOperator: 70000, familyLabour: 0, salariedEmployee: 0,
      casualRate: 35, casualHrsPerWeek: 42, casualWeeksPerYear: 2,
      allocation: { cattle: 45, sheep: 55, goat: 0 }
    },
    overheads: {
      repairsMaintLand: 12000, repairsMaintPlant: 8000, depreciation: 10000,
      adminExpenses: 9000, electricityGas: 8000, insurance: 12000,
      pastureCosts: 40000, ratesRents: 16000, fuelOil: 13000,
      allocationMethod: 'dse',
      allocation: { cattle: 55, sheep: 45, goat: 0 }
    }
  },

  'prime-lamb': {
    scenarioName: 'Prime Lamb — Western Victoria',
    enterprises: { cattle: { enabled: false, dsePercent: 0 }, sheep: { enabled: true, dsePercent: 100 }, goat: { enabled: false, dsePercent: 0 } },
    cattle: {
      dressingPercent: 53,
      stock: [
        { class: 'Cows', ageBracket: '>2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Calves', ageBracket: '0-6mo', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Weaners', ageBracket: '7-12mo', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Heifers', ageBracket: '1-2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Steers 1yr', ageBracket: '1-2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Steers 2yr', ageBracket: '>2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Bulls', ageBracket: '>2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 }
      ],
      directExpenses: { herdHealth: 0, contractors: 0, transport: 0, sellingCosts: 0 },
      supplements: { homeGrownTonnes: 0, homeGrownPrice: 0, purchasedTonnes: 0, purchasedPrice: 0 },
      supplementAllocation: 100
    },
    sheep: {
      dressingPercent: 46,
      woolIncome: 36000,
      stock: [
        { class: 'Ewes', opening: 1500, purchases: 300, naturalIncrease: 0, sales: 200, deaths: 50, closing: 1550, weightOpen: 60, valueOpen: 120, weightClose: 60, valueClose: 120, salesWeight: 60, salesPrice: 1.33, purchWeight: 60, purchPrice: 2.00 },
        { class: 'Lambs', opening: 0, purchases: 0, naturalIncrease: 1875, sales: 1800, deaths: 75, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 48, salesPrice: 2.33, purchWeight: 0, purchPrice: 0 },
        { class: 'Rams', opening: 35, purchases: 10, naturalIncrease: 0, sales: 3, deaths: 7, closing: 35, weightOpen: 80, valueOpen: 300, weightClose: 80, valueClose: 300, salesWeight: 80, salesPrice: 1.25, purchWeight: 80, purchPrice: 15.00 }
      ],
      directExpenses: { flockHealth: 8000, contractors: 2200, transport: 220, sellingCosts: 12500, shearingCrutching: 12000 },
      supplements: { homeGrownTonnes: 0, homeGrownPrice: 0, purchasedTonnes: 6.3, purchasedPrice: 210 },
      supplementAllocation: 100
    },
    goat: {
      dressingPercent: 38,
      stock: [
        { class: 'Does', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Kids', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Capretto', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Chevon', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Wethers', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Bucks', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 }
      ],
      directExpenses: { herdHealth: 0, contractors: 0, transport: 0, sellingCosts: 0, shearingCrutching: 0, dairyCosts: 0 },
      supplements: { homeGrownTonnes: 0, homeGrownPrice: 0, purchasedTonnes: 0, purchasedPrice: 0 },
      supplementAllocation: 100
    },
    labour: {
      ownerOperator: 70000, familyLabour: 0, salariedEmployee: 0,
      casualRate: 35, casualHrsPerWeek: 42, casualWeeksPerYear: 2,
      allocation: { cattle: 0, sheep: 100, goat: 0 }
    },
    overheads: {
      repairsMaintLand: 12000, repairsMaintPlant: 8000, depreciation: 10000,
      adminExpenses: 9000, electricityGas: 8000, insurance: 12000,
      pastureCosts: 40000, ratesRents: 16000, fuelOil: 13000,
      allocationMethod: 'dse',
      allocation: { cattle: 0, sheep: 100, goat: 0 }
    }
  },

  'goat': {
    scenarioName: 'Managed Goat — Southwest Queensland',
    enterprises: { cattle: { enabled: false, dsePercent: 0 }, sheep: { enabled: false, dsePercent: 0 }, goat: { enabled: true, dsePercent: 100 } },
    cattle: {
      dressingPercent: 53,
      stock: [
        { class: 'Cows', ageBracket: '>2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Calves', ageBracket: '0-6mo', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Weaners', ageBracket: '7-12mo', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Heifers', ageBracket: '1-2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Steers 1yr', ageBracket: '1-2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Steers 2yr', ageBracket: '>2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Bulls', ageBracket: '>2yr', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 }
      ],
      directExpenses: { herdHealth: 0, contractors: 0, transport: 0, sellingCosts: 0 },
      supplements: { homeGrownTonnes: 0, homeGrownPrice: 0, purchasedTonnes: 0, purchasedPrice: 0 },
      supplementAllocation: 100
    },
    sheep: {
      dressingPercent: 46,
      woolIncome: 0,
      stock: [
        { class: 'Ewes', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Lambs', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Rams', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 }
      ],
      directExpenses: { flockHealth: 0, contractors: 0, transport: 0, sellingCosts: 0, shearingCrutching: 0 },
      supplements: { homeGrownTonnes: 0, homeGrownPrice: 0, purchasedTonnes: 0, purchasedPrice: 0 },
      supplementAllocation: 100
    },
    goat: {
      dressingPercent: 38,
      stock: [
        { class: 'Does', opening: 1000, purchases: 0, naturalIncrease: 0, sales: 200, deaths: 20, closing: 1000, weightOpen: 50, valueOpen: 80, weightClose: 50, valueClose: 80, salesWeight: 40, salesPrice: 1.75, purchWeight: 0, purchPrice: 0 },
        { class: 'Kids', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Capretto', opening: 0, purchases: 0, naturalIncrease: 1400, sales: 200, deaths: 10, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 15, salesPrice: 3.50, purchWeight: 0, purchPrice: 0 },
        { class: 'Chevon', opening: 220, purchases: 0, naturalIncrease: 0, sales: 965, deaths: 5, closing: 220, weightOpen: 45, valueOpen: 70, weightClose: 45, valueClose: 70, salesWeight: 40, salesPrice: 2.10, purchWeight: 0, purchPrice: 0 },
        { class: 'Wethers', opening: 0, purchases: 0, naturalIncrease: 0, sales: 0, deaths: 0, closing: 0, weightOpen: 0, valueOpen: 0, weightClose: 0, valueClose: 0, salesWeight: 0, salesPrice: 0, purchWeight: 0, purchPrice: 0 },
        { class: 'Bucks', opening: 20, purchases: 5, naturalIncrease: 0, sales: 5, deaths: 0, closing: 20, weightOpen: 60, valueOpen: 200, weightClose: 60, valueClose: 200, salesWeight: 55, salesPrice: 1.50, purchWeight: 60, purchPrice: 3.33 }
      ],
      directExpenses: { herdHealth: 0, contractors: 2500, transport: 0, sellingCosts: 188.50, shearingCrutching: 0, dairyCosts: 0 },
      supplements: { homeGrownTonnes: 0, homeGrownPrice: 0, purchasedTonnes: 6, purchasedPrice: 260 },
      supplementAllocation: 100
    },
    labour: {
      ownerOperator: 70000, familyLabour: 0, salariedEmployee: 0,
      casualRate: 35, casualHrsPerWeek: 42, casualWeeksPerYear: 2,
      allocation: { cattle: 0, sheep: 0, goat: 100 }
    },
    overheads: {
      repairsMaintLand: 12000, repairsMaintPlant: 8000, depreciation: 10000,
      adminExpenses: 9000, electricityGas: 8000, insurance: 12000,
      pastureCosts: 40000, ratesRents: 16000, fuelOil: 13000,
      allocationMethod: 'dse',
      allocation: { cattle: 0, sheep: 0, goat: 100 }
    }
  }
};