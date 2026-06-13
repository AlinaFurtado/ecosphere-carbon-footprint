const assert = require('assert');
const test = require('node:test');
const { calculateLocalFallback, getLocalFallbackInsights, DEFAULT_STATE } = require('./app.js');

test('DEFAULT_STATE matches the standard starting footprint schema', (t) => {
  assert.strictEqual(DEFAULT_STATE.user.points, 450);
  assert.strictEqual(DEFAULT_STATE.footprint.total_kg, 0);
  assert.strictEqual(DEFAULT_STATE.footprint.breakdown.transport, 0);
  assert.strictEqual(DEFAULT_STATE.footprint.breakdown.food, 0);
  assert.strictEqual(DEFAULT_STATE.footprint.breakdown.home, 0);
  assert.strictEqual(DEFAULT_STATE.footprint.breakdown.shopping, 0);
  assert.ok(Array.isArray(DEFAULT_STATE.insights));
});

test('calculateLocalFallback processes transport, diet, consumption and home variables correctly', (t) => {
  const inputs = {
    transport_km_car_petrol: 5000,
    transport_km_car_diesel: 0,
    transport_km_car_electric: 0,
    transport_km_bus: 1000,
    transport_km_train: 2000,
    flights_short_haul: 1,
    flights_long_haul: 0,
    diet_type: 'meat_medium',
    consumption_level: 'medium',
    home_electricity_kwh: 3000,
    home_gas_kwh: 1000,
    household_size: 2
  };

  const results = calculateLocalFallback(inputs);

  // Assert calculations:
  // Car petrol: 5000 * 0.17 = 850
  // Bus: 1000 * 0.096 = 96
  // Train: 2000 * 0.041 = 82
  // Flights short: 1 * 150 = 150
  // Total transport: 850 + 96 + 82 + 150 = 1178 kg
  assert.strictEqual(Math.round(results.breakdown.transport), 1178);

  // Diet meat_medium = 2500 kg
  assert.strictEqual(results.breakdown.food, 2500);

  // Home energy:
  // Electricity: (3000 * 0.35) / 2 = 525
  // Gas: (1000 * 0.2) / 2 = 100
  // Total home: 525 + 100 = 625 kg
  assert.strictEqual(results.breakdown.home, 625);

  // Consumption medium = 1500 kg
  assert.strictEqual(results.breakdown.shopping, 1500);

  // Total kg = 1178 + 2500 + 625 + 1500 = 5803 kg
  assert.strictEqual(Math.round(results.total_kg), 5803);
});

test('calculateLocalFallback handles different dietary structures correctly', (t) => {
  const baseInputs = {
    transport_km_car_petrol: 0,
    transport_km_car_diesel: 0,
    transport_km_car_electric: 0,
    transport_km_bus: 0,
    transport_km_train: 0,
    flights_short_haul: 0,
    flights_long_haul: 0,
    consumption_level: 'low',
    home_electricity_kwh: 0,
    home_gas_kwh: 0,
    household_size: 1
  };

  const veganRes = calculateLocalFallback({ ...baseInputs, diet_type: 'vegan' });
  const vegRes = calculateLocalFallback({ ...baseInputs, diet_type: 'vegetarian' });
  const heavyRes = calculateLocalFallback({ ...baseInputs, diet_type: 'meat_heavy' });

  // Vegan = 1500 (diet) + 500 (low consumption) = 2000 kg
  assert.strictEqual(veganRes.breakdown.food, 1500);
  assert.strictEqual(veganRes.total_kg, 2000);

  // Vegetarian = 1700 (diet) + 500 (low consumption) = 2200 kg
  assert.strictEqual(vegRes.breakdown.food, 1700);

  // Meat heavy = 3300 (diet) + 500 (low consumption) = 3800 kg
  assert.strictEqual(heavyRes.breakdown.food, 3300);
});

test('getLocalFallbackInsights returns valid tips based on high categories', (t) => {
  const mockResult = {
    total_kg: 6000,
    breakdown: {
      transport: 2500, // High (> 2000)
      food: 2500,      // High (> 2000)
      home: 800,       // Low (< 1500)
      shopping: 400    // Low (< 1500)
    }
  };

  const insightsRes = getLocalFallbackInsights(mockResult);
  assert.ok(Array.isArray(insightsRes.insights));

  // Should have transport & diet insights + default standby insight
  const categories = insightsRes.insights.map(i => i.category);
  assert.ok(categories.includes('transport'));
  assert.ok(categories.includes('diet'));
});

test('calculateLocalFallback handles zero/empty inputs gracefully', (t) => {
  const zeroInputs = {
    transport_km_car_petrol: 0,
    transport_km_car_diesel: 0,
    transport_km_car_electric: 0,
    transport_km_bus: 0,
    transport_km_train: 0,
    flights_short_haul: 0,
    flights_long_haul: 0,
    diet_type: undefined,
    consumption_level: undefined,
    home_electricity_kwh: 0,
    home_gas_kwh: 0,
    household_size: 0
  };

  const result = calculateLocalFallback(zeroInputs);
  assert.ok(result.total_kg > 0); // Diet and consumption default to medium if undefined
  assert.strictEqual(result.breakdown.transport, 0);
  assert.strictEqual(result.breakdown.home, 0);
});

test('calculateLocalFallback handles negative values safely', (t) => {
  const negativeInputs = {
    transport_km_car_petrol: -100,
    transport_km_car_diesel: -50,
    transport_km_car_electric: -10,
    transport_km_bus: -5,
    transport_km_train: -2,
    flights_short_haul: -1,
    flights_long_haul: -2,
    diet_type: 'vegan',
    consumption_level: 'low',
    home_electricity_kwh: -500,
    home_gas_kwh: -200,
    household_size: -2
  };

  const result = calculateLocalFallback(negativeInputs);
  // Assert calculations do not throw or divide-by-zero crash
  assert.ok(!isNaN(result.total_kg));
  assert.ok(!isNaN(result.breakdown.home));
});

test('calculateLocalFallback handles household size division-by-zero protection', (t) => {
  const zeroHouseholdInput = {
    home_electricity_kwh: 1000,
    home_gas_kwh: 500,
    household_size: 0
  };

  const result = calculateLocalFallback(zeroHouseholdInput);
  // Household size defaults to 1 when 0 or falsy, so home energy calculation is (1000*0.35 + 500*0.2) / 1 = 450
  assert.strictEqual(result.breakdown.home, 450);
});

test('calculateLocalFallback handles extremely large input values safely', (t) => {
  const largeInputs = {
    transport_km_car_petrol: 99999999,
    flights_long_haul: 999999,
    diet_type: 'meat_heavy',
    consumption_level: 'high',
    home_electricity_kwh: 99999999,
    household_size: 1
  };

  const result = calculateLocalFallback(largeInputs);
  assert.ok(result.total_kg > 10000000);
  assert.ok(isFinite(result.total_kg));
});

test('getLocalFallbackInsights returns only default tips when all categories are low', (t) => {
  const lowResult = {
    total_kg: 1000,
    breakdown: {
      transport: 100,
      food: 100,
      home: 100,
      shopping: 100
    }
  };

  const insightsRes = getLocalFallbackInsights(lowResult);
  assert.strictEqual(insightsRes.insights.length, 1);
  assert.strictEqual(insightsRes.insights[0].category, 'home');
});
