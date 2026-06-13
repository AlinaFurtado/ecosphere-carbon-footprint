// EcoSphere State Management & Dynamic Calculator Logic

// Initial state template focusing on footprint, insights, and island health
const DEFAULT_STATE = {
  user: {
    name: "Alina",
    points: 450
  },
  footprint: {
    total_kg: 0,
    breakdown: {
      transport: 0,
      food: 0,
      home: 0,
      shopping: 0
    },
    vs_global_average_pct: 0,
    vs_paris_target_pct: 0
  },
  insights: []
};

let state = { ...DEFAULT_STATE };

// Load saved state if present in localStorage
try {
  if (typeof localStorage !== 'undefined') {
    const localCache = localStorage.getItem('ecosphere_cached_state');
    if (localCache) {
      const loaded = JSON.parse(localCache);
      state = {
        ...DEFAULT_STATE,
        ...loaded,
        user: { ...DEFAULT_STATE.user, ...(loaded && loaded.user) },
        footprint: {
          ...DEFAULT_STATE.footprint,
          ...(loaded && loaded.footprint),
          breakdown: { ...DEFAULT_STATE.footprint.breakdown, ...(loaded && loaded.footprint && loaded.footprint.breakdown) }
        },
        insights: (loaded && loaded.insights) || []
      };
    }
  }
} catch (err) {
  console.warn("Could not read state from localStorage, using defaults.", err);
}

function saveState() {
  try {
    localStorage.setItem('ecosphere_cached_state', JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state to localStorage.", err);
  }
}

// --- CONFIG & CONSTANTS ---
const API_BASE = "https://carbon-platform-962545646921.us-central1.run.app/api";
let activeTab = 'world'; // Default view

// Unique device ID for insights tracking
function getDeviceId() {
  let id = localStorage.getItem('carbon_device_id');
  if (!id) {
    id = 'dev-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
    localStorage.setItem('carbon_device_id', id);
  }
  return id;
}

// --- NAVIGATION LOGIC ---
function switchTab(tabId) {
  activeTab = tabId;
  
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(element => {
    element.classList.remove('active');
  });
  
  // Show active tab content
  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Update desktop navigation button active styling
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.className = "nav-tab font-label-md text-label-md flex items-center gap-sm text-on-surface-variant hover:bg-secondary-container/50 transition-colors rounded-full px-4 py-1.5 active:scale-95";
    btn.setAttribute('aria-selected', 'false');
  });
  const activeDesktopBtn = document.getElementById(`nav-btn-${tabId}`);
  if (activeDesktopBtn) {
    activeDesktopBtn.className = "nav-tab font-label-md text-label-md flex items-center gap-sm bg-primary-container text-on-primary-container rounded-full px-4 py-1.5 active:scale-95 transition-transform duration-200";
    activeDesktopBtn.setAttribute('aria-selected', 'true');
  }

  // Update mobile navigation button active styling
  document.querySelectorAll('.nav-tab-mobile').forEach(btn => {
    btn.className = "nav-tab-mobile flex flex-col items-center justify-center text-on-surface-variant transition-colors";
    btn.setAttribute('aria-selected', 'false');
  });
  const activeMobileBtn = document.getElementById(`mobile-nav-btn-${tabId}`);
  if (activeMobileBtn) {
    activeMobileBtn.className = "nav-tab-mobile flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-300";
    activeMobileBtn.setAttribute('aria-selected', 'true');
  }

  // Render updates for specific tabs
  if (tabId === 'dashboard') {
    renderDashboard();
  } else if (tabId === 'world') {
    renderWorld();
  }
}

// --- CALCULATOR & API INTEGRATION ---

// Fallback calculations in case of CORS or connectivity failures
function calculateLocalFallback(inputs) {
  // Travel calculations
  const petrolCar = (inputs.transport_km_car_petrol || 0) * 0.17;
  const dieselCar = (inputs.transport_km_car_diesel || 0) * 0.171;
  const electricCar = (inputs.transport_km_car_electric || 0) * 0.047;
  const bus = (inputs.transport_km_bus || 0) * 0.096;
  const train = (inputs.transport_km_train || 0) * 0.041;
  const transitTotal = petrolCar + dieselCar + electricCar + bus + train;

  // Flight calculations
  const flightShort = (inputs.flights_short_haul || 0) * 150;
  const flightLong = (inputs.flights_long_haul || 0) * 1000;
  const aviationTotal = flightShort + flightLong;

  // Diet calculations
  let dietTotal = 2500; // meat_moderate
  if (inputs.diet_type === 'vegan') dietTotal = 1500;
  else if (inputs.diet_type === 'vegetarian') dietTotal = 1700;
  else if (inputs.diet_type === 'meat_heavy') dietTotal = 3300;

  // Home energy calculations
  const hhSize = inputs.household_size || 1;
  const electricity = ((inputs.home_electricity_kwh || 0) * 0.35) / hhSize;
  const gas = ((inputs.home_gas_kwh || 0) * 0.2) / hhSize;
  const homeTotal = electricity + gas;

  // Consumption calculations
  let consumptionTotal = 1500; // medium
  if (inputs.consumption_level === 'low') consumptionTotal = 500;
  else if (inputs.consumption_level === 'high') consumptionTotal = 3000;

  // Totals
  const transport = transitTotal + aviationTotal;
  const food = dietTotal;
  const home = homeTotal;
  const shopping = consumptionTotal;
  const total_kg = transport + food + home + shopping;

  // Comparisons (Paris target = 2000 kg, Global average = 8000 kg)
  const vs_paris_target_pct = Math.round(((total_kg - 2000) / 2000) * 100);
  const vs_global_average_pct = Math.round(((total_kg - 8000) / 8000) * 100);

  return {
    total_kg,
    breakdown: { transport, food, home, shopping },
    vs_paris_target_pct,
    vs_global_average_pct
  };
}

// Fallback recommendations if API fails
function getLocalFallbackInsights(result) {
  const recommendations = [];
  const b = result.breakdown;

  if (b.transport > 2000) {
    recommendations.push({
      recommendation: "Switch short car trips to cycling or public transit to cut travel emissions.",
      category: "transport",
      estimated_saving_kg: Math.round(b.transport * 0.2)
    });
  }
  if (b.food > 2000) {
    recommendations.push({
      recommendation: "Incorporate more plant-based days into your week to lower food agricultural footprint.",
      category: "diet",
      estimated_saving_kg: 350
    });
  }
  if (b.home > 1500) {
    recommendations.push({
      recommendation: "Improve your thermostat schedules and check home drafts to optimize heating emissions.",
      category: "home",
      estimated_saving_kg: Math.round(b.home * 0.15)
    });
  }
  if (b.shopping > 1500) {
    recommendations.push({
      recommendation: "Consider buying high-quality second-hand items for clothing and electronics.",
      category: "consumption",
      estimated_saving_kg: 400
    });
  }

  // General default fallback insight
  recommendations.push({
    recommendation: "Unplug idle household chargers and home media gear to prevent standby power drains.",
    category: "home",
    estimated_saving_kg: 50
  });

  return { insights: recommendations };
}

// Master calculation process
async function calculateUserFootprint() {
  const btn = document.getElementById('btn-calculate');
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<span class="material-symbols-outlined text-sm animate-spin">sync</span> Calculating...`;

  const inputs = {
    transport_km_car_petrol: parseFloat(document.getElementById('input-car-petrol').value) || 0,
    transport_km_car_diesel: parseFloat(document.getElementById('input-car-diesel').value) || 0,
    transport_km_car_electric: parseFloat(document.getElementById('input-car-electric').value) || 0,
    transport_km_bus: parseFloat(document.getElementById('input-bus').value) || 0,
    transport_km_train: parseFloat(document.getElementById('input-train').value) || 0,
    flights_short_haul: parseInt(document.getElementById('input-flights-short').value) || 0,
    flights_long_haul: parseInt(document.getElementById('input-flights-long').value) || 0,
    diet_type: document.getElementById('input-diet').value,
    consumption_level: document.getElementById('input-consumption').value,
    home_electricity_kwh: parseFloat(document.getElementById('input-energy-electricity').value) || 0,
    home_gas_kwh: parseFloat(document.getElementById('input-energy-gas').value) || 0,
    household_size: parseInt(document.getElementById('input-household-size').value) || 1
  };

  const statusIndicator = document.getElementById('api-status-indicator');
  let result = null;
  let insightsData = null;

  try {
    // 1. Attempt API footprint calculation
    const calcResponse = await fetch(`${API_BASE}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs)
    });

    if (!calcResponse.ok) throw new Error("API Calculation call failed");
    result = await calcResponse.json();

    // 2. Attempt API AI Insights
    try {
      const devId = getDeviceId();
      const insightsResponse = await fetch(`${API_BASE}/insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carbon_result: result, device_id: devId })
      });
      if (insightsResponse.ok) {
        insightsData = await insightsResponse.json();
      }
    } catch (e) {
      console.warn("Could not fetch AI insights from server, using local fallback", e);
    }

    statusIndicator.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Remote API connected`;
  } catch (error) {
    console.warn("Using local calculation fallback due to network or CORS issues.", error);
    statusIndicator.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500"></span> Using local fallback`;
    
    result = calculateLocalFallback(inputs);
  }

  // If insights API failed or wasn't completed, load local fallback insights
  if (!insightsData || !insightsData.insights) {
    insightsData = getLocalFallbackInsights(result);
  }

  // Store in State
  state.footprint = {
    total_kg: result.total_kg,
    breakdown: {
      transport: result.breakdown.transport || 0,
      food: result.breakdown.food || 0,
      home: result.breakdown.home || 0,
      shopping: result.breakdown.shopping || 0
    },
    vs_global_average_pct: result.vs_global_average_pct,
    vs_paris_target_pct: result.vs_paris_target_pct
  };
  state.insights = insightsData.insights;

  // Award points for completing the calculation
  state.user.points += 50;
  
  saveState();
  
  // Render updates
  renderDashboard();
  renderWorld();

  // Reset button
  btn.disabled = false;
  btn.innerHTML = originalHtml;

  // Add confirmation message to chat
  addSystemChatMessage(`Completed carbon calculation! Footprint: ${Math.round(state.footprint.total_kg)} kg CO₂e. The environment has adapted! (+50 EcoPoints)`);
  
  // Trigger milestone if goal reached (<2000kg)
  if (state.footprint.total_kg <= 2000 && state.footprint.total_kg > 0) {
    showMilestoneToast();
  }
}

// --- STATE RENDERING FOR DASHBOARD ---
function renderDashboard() {
  const total = state.footprint.total_kg;
  document.getElementById('dashboard-footprint-value').textContent = Math.round(total);

  // Update comparisons
  const avgCompare = document.getElementById('dashboard-avg-compare');
  const avgPct = state.footprint.vs_global_average_pct;
  if (total === 0) {
    avgCompare.textContent = "-";
    avgCompare.className = "font-bold text-on-surface font-headline-md";
  } else {
    avgCompare.textContent = `${avgPct >= 0 ? '+' : ''}${avgPct}%`;
    avgCompare.className = `font-bold font-headline-md ${avgPct <= 0 ? 'text-primary' : 'text-red-600'}`;
  }

  const parisCompare = document.getElementById('dashboard-paris-compare');
  const parisPct = state.footprint.vs_paris_target_pct;
  if (total === 0) {
    parisCompare.textContent = "-";
    parisCompare.className = "font-bold text-on-surface font-headline-md";
  } else {
    parisCompare.textContent = `${parisPct >= 0 ? '+' : ''}${parisPct}%`;
    parisCompare.className = `font-bold font-headline-md ${parisPct <= 0 ? 'text-primary' : 'text-red-600'}`;
  }

  // Draw circular dashboard indicator (Goal representation of 2,000 Paris Target)
  const circle = document.getElementById('dashboard-progress-circle');
  if (circle) {
    const progress = total > 0 ? Math.min(1.5, total / 2000) : 0;
    const circumference = 251.2;
    const offset = circumference - (Math.min(1, progress) * circumference);
    circle.style.strokeDashoffset = offset;
    
    // Change color based on emission levels
    if (total > 6000) {
      circle.className = "text-red-500 stroke-current progress-ring-circle";
    } else if (total > 2000) {
      circle.className = "text-amber-500 stroke-current progress-ring-circle";
    } else {
      circle.className = "text-primary-container stroke-current progress-ring-circle";
    }
  }

  // Category Breakdown values and progress bars
  const b = state.footprint.breakdown;
  const breakdownSum = b.transport + b.food + b.home + b.shopping || 1;

  const cats = {
    transport: { val: b.transport, color: 'bg-primary' },
    food: { val: b.food, color: 'bg-tertiary' },
    home: { val: b.home, color: 'bg-blue-500' },
    shopping: { val: b.shopping, color: 'bg-stone-500' }
  };

  Object.keys(cats).forEach(cat => {
    const elVal = document.getElementById(`breakdown-val-${cat}`);
    const elBar = document.getElementById(`breakdown-bar-${cat}`);
    if (elVal) elVal.textContent = `${Math.round(cats[cat].val)} kg`;
    if (elBar) {
      const pct = (cats[cat].val / breakdownSum) * 100;
      elBar.style.width = `${pct}%`;
    }
  });

  // Render AI Insights
  const insightsList = document.getElementById('ai-insights-list');
  insightsList.innerHTML = '';
  
  if (state.insights.length === 0) {
    insightsList.innerHTML = `
      <div class="bg-surface-container-lowest p-md rounded-2xl flex gap-md items-center justify-center text-center text-xs text-on-surface-variant h-24">
          <p>Fill in the form and click Calculate to fetch AI emission reduction insights.</p>
      </div>
    `;
  } else {
    state.insights.forEach(item => {
      const emojis = { transport: '🚗', diet: '🥗', home: '🏠', consumption: '🛍️' };
      const icon = emojis[item.category] || '🌍';
      const bgColors = { transport: 'bg-primary/10', diet: 'bg-tertiary/10', home: 'bg-blue-500/10', consumption: 'bg-stone-500/10' };
      const bgColor = bgColors[item.category] || 'bg-secondary/10';

      const row = document.createElement('div');
      row.className = "bg-surface-container-lowest p-md rounded-2xl flex gap-md items-start shadow-sm border border-transparent hover:border-primary/10 transition-colors";
      row.innerHTML = `
        <div class="w-10 h-10 rounded-full ${bgColor} flex items-center justify-center shrink-0 text-lg">
            ${icon}
        </div>
        <div class="flex-grow">
            <p class="font-label-md text-on-surface font-semibold text-xs leading-tight">${item.recommendation}</p>
            <p class="text-[9px] text-primary-container font-semibold mt-1">Est. Savings: ${item.estimated_saving_kg} kg CO₂e / yr</p>
        </div>
      `;
      insightsList.appendChild(row);
    });
  }

  // Update Points in top header
  document.getElementById('user-points-display').textContent = `${state.user.points} pts`;
}

// --- STATE RENDERING FOR WORLD / ISLAND ---
function renderWorld() {
  const total = state.footprint.total_kg;
  const footprintDisplay = document.getElementById('world-footprint-display');
  if (footprintDisplay) {
    footprintDisplay.textContent = `${Math.round(total)} kg/yr`;
  }

  const baseImage = document.getElementById('island-base-image');
  const pollutionOverlay = document.getElementById('pollution-overlay');
  const smogOverlay = document.getElementById('smog-overlay');
  const healthRing = document.getElementById('world-health-ring');
  const healthStatus = document.getElementById('world-health-status');
  const healthScore = document.getElementById('world-health-score');

  // If no calculations are run yet, default to clean/neutral
  if (total === 0) {
    healthStatus.textContent = "Neutral";
    healthScore.textContent = "No data";
    healthStatus.className = "text-[22px] font-bold text-on-surface font-headline-lg leading-none";
    if (healthRing) healthRing.style.strokeDashoffset = 200;
    
    // De-activate smog/pollution visual overlay
    if (pollutionOverlay) pollutionOverlay.className = "absolute inset-0 bg-stone-900/0 pointer-events-none transition-all duration-1000 mix-blend-color-burn z-20";
    if (smogOverlay) {
      smogOverlay.style.opacity = 0;
      smogOverlay.className = "absolute inset-0 bg-yellow-900/0 opacity-0 pointer-events-none transition-all duration-1000 mix-blend-multiply z-20 backdrop-grayscale-[0]";
    }
    if (baseImage) baseImage.style.filter = "none";
    
    // Hide all objects
    toggleIslandItem('transport', false);
    toggleIslandItem('diet', false);
    toggleIslandItem('energy', false);
    toggleIslandItem('rewild', false);
    toggleIslandItem('pollution', false);
    return;
  }

  // Health categories: Healthy (< 3000), Balanced (3000 - 6000), Polluted (> 6000)
  if (total <= 3000) {
    // HEALTHY state
    healthStatus.textContent = "Healthy";
    healthScore.textContent = "Pristine";
    healthStatus.className = "text-[22px] font-bold text-primary font-headline-lg leading-none";
    if (healthRing) {
      healthRing.style.strokeDashoffset = 0;
      healthRing.className = "text-primary progress-ring-circle";
    }

    // Dynamic visual overlay updates (Beautiful green filters)
    if (pollutionOverlay) pollutionOverlay.className = "absolute inset-0 bg-emerald-900/5 pointer-events-none transition-all duration-1000 mix-blend-color-burn z-20";
    if (smogOverlay) {
      smogOverlay.style.opacity = 0;
      smogOverlay.className = "absolute inset-0 bg-yellow-900/0 opacity-0 pointer-events-none transition-all duration-1000 mix-blend-multiply z-20 backdrop-grayscale-[0]";
    }
    if (baseImage) baseImage.style.filter = "saturate(1.2) contrast(1.05)";

    // Show clean island upgrade decorations
    toggleIslandItem('transport', true);
    toggleIslandItem('diet', true);
    toggleIslandItem('energy', true);
    toggleIslandItem('rewild', true);
    toggleIslandItem('pollution', false); // Hide industrial smog
  } 
  else if (total <= 6000) {
    // BALANCED state
    healthStatus.textContent = "Balanced";
    healthScore.textContent = "Moderate";
    healthStatus.className = "text-[22px] font-bold text-amber-500 font-headline-lg leading-none";
    if (healthRing) {
      const ringOffset = 408.4 * 0.4; // 60%
      healthRing.style.strokeDashoffset = ringOffset;
      healthRing.className = "text-amber-500 progress-ring-circle";
    }

    // Visual updates
    if (pollutionOverlay) pollutionOverlay.className = "absolute inset-0 bg-stone-850/15 pointer-events-none transition-all duration-1000 mix-blend-color-burn z-20";
    if (smogOverlay) {
      smogOverlay.style.opacity = 0.2;
      smogOverlay.className = "absolute inset-0 bg-yellow-900/20 opacity-20 pointer-events-none transition-all duration-1000 mix-blend-multiply z-20 backdrop-grayscale-[5%]";
    }
    if (baseImage) baseImage.style.filter = "saturate(0.9) contrast(1)";

    // Show some clean options, hide factory
    toggleIslandItem('transport', true);
    toggleIslandItem('diet', false);
    toggleIslandItem('energy', false);
    toggleIslandItem('rewild', true);
    toggleIslandItem('pollution', false);
  } 
  else {
    // POLLUTED state
    healthStatus.textContent = "Polluted";
    healthScore.textContent = "Critical";
    healthStatus.className = "text-[22px] font-bold text-red-500 font-headline-lg leading-none";
    if (healthRing) {
      const ringOffset = 408.4 * 0.8; // 20%
      healthRing.style.strokeDashoffset = ringOffset;
      healthRing.className = "text-red-500 progress-ring-circle";
    }

    // Heavy smog visual overlays (Dark, greyish, smoggy filters)
    if (pollutionOverlay) pollutionOverlay.className = "absolute inset-0 bg-stone-900/40 pointer-events-none transition-all duration-1000 mix-blend-color-burn z-20";
    if (smogOverlay) {
      smogOverlay.style.opacity = 0.6;
      smogOverlay.className = "absolute inset-0 bg-yellow-900/40 opacity-60 pointer-events-none transition-all duration-1000 mix-blend-multiply z-20 backdrop-grayscale-[40%]";
    }
    if (baseImage) baseImage.style.filter = "saturate(0.4) brightness(0.8) contrast(0.95)";

    // Hide green options, show industrial factory indicator
    toggleIslandItem('transport', false);
    toggleIslandItem('diet', false);
    toggleIslandItem('energy', false);
    toggleIslandItem('rewild', false);
    toggleIslandItem('pollution', true);
  }
}

// Internal helper to toggle item scales
function toggleIslandItem(item, show) {
  const element = document.getElementById(`island-item-${item}`);
  if (element) {
    if (show) {
      element.classList.remove('scale-0');
      element.classList.add('scale-100');
    } else {
      element.classList.remove('scale-100');
      element.classList.add('scale-0');
    }
  }
}

// --- LEVEL RESTORED MODAL TOAST ---
function showMilestoneToast() {
  const toast = document.getElementById('milestone-toast');
  if (toast) {
    toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');
  }
}

function dismissMilestoneToast() {
  const toast = document.getElementById('milestone-toast');
  if (toast) {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
  }
}

// --- MODAL DIALOG CONTROLLER ---
function showDialog(title, icon, contentHtml, confirmCallback) {
  document.getElementById('dialog-title').textContent = title;
  document.getElementById('dialog-icon').textContent = icon;
  document.getElementById('dialog-body-area').innerHTML = contentHtml;
  
  const confirmBtn = document.getElementById('dialog-confirm-btn');
  
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.replaceWith(newConfirmBtn);
  
  newConfirmBtn.addEventListener('click', () => {
    confirmCallback();
    closeDialog();
  });
  
  const backdrop = document.getElementById('ui-dialog-backdrop');
  backdrop.classList.remove('opacity-0', 'pointer-events-none');
  backdrop.querySelector('div').classList.remove('scale-90');
  backdrop.querySelector('div').classList.add('scale-100');
}

function closeDialog() {
  const backdrop = document.getElementById('ui-dialog-backdrop');
  backdrop.classList.add('opacity-0', 'pointer-events-none');
  backdrop.querySelector('div').classList.remove('scale-100');
  backdrop.querySelector('div').classList.add('scale-90');
}


// --- AI ASSISTANT CHAT DIALOG PANEL ---
let isAIChatOpen = false;

function toggleAIChat() {
  isAIChatOpen = !isAIChatOpen;
  const chatBox = document.getElementById('ai-chat-box');
  const fabIcon = document.getElementById('ai-fab-icon');
  const fabBtn = document.getElementById('ai-fab-btn');
  
  if (isAIChatOpen) {
    chatBox.classList.remove('scale-0');
    chatBox.classList.add('scale-100');
    fabIcon.textContent = 'chat_bubble';
    if (fabBtn) fabBtn.setAttribute('aria-expanded', 'true');
    renderChatMessages();
  } else {
    chatBox.classList.remove('scale-100');
    chatBox.classList.add('scale-0');
    fabIcon.textContent = 'eco';
    if (fabBtn) fabBtn.setAttribute('aria-expanded', 'false');
  }
}

function handleChatKey(e) {
  if (e.key === 'Enter') {
    submitChat();
  }
}

function renderChatMessages() {
  const container = document.getElementById('ai-chat-messages');
  container.innerHTML = '';
  
  const welcomeMsg = {
    sender: "assistant",
    text: "Hello! I am your EcoSphere AI Assistant. Use the calculator to figure out your emissions, or ask me for tips on how to save carbon."
  };
  
  const list = [welcomeMsg];
  if (state.aiHistory && state.aiHistory.length > 0) {
    list.push(...state.aiHistory);
  } else {
    state.aiHistory = [];
  }
  
  list.forEach(msg => {
    const isAssistant = msg.sender === 'assistant';
    const bubble = document.createElement('div');
    bubble.className = `flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`;
    
    const content = document.createElement('div');
    content.className = `chat-bubble p-3 rounded-2xl text-[11px] leading-tight max-w-[85%] ${
      isAssistant 
        ? 'bg-surface-container text-on-surface rounded-tl-none border border-primary-container/10' 
        : 'bg-primary text-white rounded-tr-none'
    }`;
    content.textContent = msg.text;
    
    bubble.appendChild(content);
    container.appendChild(bubble);
  });
  
  container.scrollTop = container.scrollHeight;
}

function addSystemChatMessage(text) {
  if (!state.aiHistory) state.aiHistory = [];
  state.aiHistory.push({ sender: "assistant", text: text });
  saveState();
  if (isAIChatOpen) {
    renderChatMessages();
  }
}

function sendQuickMessage(text) {
  document.getElementById('ai-chat-input').value = text;
  submitChat();
}

function submitChat() {
  const input = document.getElementById('ai-chat-input');
  const text = input.value.trim();
  if (!text) return;

  if (!state.aiHistory) state.aiHistory = [];
  state.aiHistory.push({ sender: "user", text: text });
  input.value = '';
  renderChatMessages();

  setTimeout(() => {
    const response = generateAIResponse(text);
    state.aiHistory.push({ sender: "assistant", text: response });
    saveState();
    renderChatMessages();
  }, 600);
}

function generateAIResponse(input) {
  const query = input.toLowerCase();
  
  if (query.includes('how') && query.includes('reduce') && (query.includes('home') || query.includes('energy') || query.includes('electricity'))) {
    return "To reduce home energy emissions: 1) Switch to energy-efficient LED bulbs. 2) Lower your heating thermostat by 1°C. 3) Seal drafts around windows and doors. 4) Unplug phantom standby loads.";
  }
  
  if (query.includes('diet') || query.includes('food') || query.includes('oat') || query.includes('vegan')) {
    return "Plant-based diets have a significantly lower carbon footprint. Swapping beef for beans or switching from dairy milk to oat milk can save up to 400kg of CO₂e annually!";
  }

  if (query.includes('car') || query.includes('travel') || query.includes('transport') || query.includes('commute')) {
    return "Public transit and rail are highly carbon efficient. Replacing daily single-passenger petrol commutes with train/metro transit can cut your travel emissions by up to 75%!";
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('help')) {
    return "Hi there! Ask me: 'How can I reduce home energy emissions?' or 'What are dietary reduction tips?' to get eco-friendly insights.";
  }

  return "I've logged that query. Fill in the main calculator form on the Dashboard to see your live annual ecological impact details and get customized insights!";
}

// --- BOOTSTRAP INITIALIZATION ---
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    renderWorld();
    switchTab(activeTab);
  });
}

// --- MODULE EXPORTS FOR TESTING ---
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateLocalFallback,
    getLocalFallbackInsights,
    DEFAULT_STATE
  };
}
