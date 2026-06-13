// EcoSphere State Management & Interactive Logic

// Initial application state
const state = {
  user: {
    name: "Alina",
    streak: 7,
    points: 450,
    level: 2
  },
  footprint: {
    current: 742,
    goal: 850,
    saved: 108,
    categories: {
      transport: 237,
      food: 208,
      home: 178,
      shopping: 119
    }
  },
  world: {
    transport: true, // starts with bike unlocked
    diet: false,
    energy: false,
    rewild: true,    // starts with trees rewilding
    waste: false,
    water: false
  },
  tasks: [
    { id: 1, text: "Unplug chargers when not in use", impact: 0.4, category: "Energy", completed: false },
    { id: 2, text: "Shorten shower by 2 minutes", impact: 1.2, category: "Water", completed: false },
    { id: 3, text: "Adopt meatless Mondays", impact: 4.5, category: "Diet", completed: false },
    { id: 4, text: "Set thermostat 1 degree lower", impact: 2.0, category: "Energy", completed: false }
  ],
  community: {
    joinedWasteChallenge: false,
    enrolledCompost: false,
    co2Offset: 42.5,
    posts: [
      {
        id: 1,
        author: "Sasha Green",
        time: "2 hours ago",
        challenge: "Zero Waste Week",
        content: "Successfully finished my first week without single-use plastics! The transition was easier than I thought, especially with the EcoSphere shopping guide. 🌿✨",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQVKfNlES-Sqg4xmzypdG0F-Hrx9K-XidUfYZwPg2N1pZc1IuK2UqDnON3A-vi1XtfGC82mK0PxshR1558mRrq_vp9u5rF9bt3JbmdZoZmJ5kvp41MIXe4u-29b8yS52l6ZTrtBRYNTFh2-T1imq90OghgjrI_mHSWyJZRx2mxjaBWC8z7wmWfcIbIh8uz8VJha_oCtLWHIO_l4IVc2nfGxR0UZqYw907txS1rO9RQbL9eOhDelL9UUebxtKF7Dftf0UrCfTw4z5o",
        likes: 124,
        comments: 18,
        liked: false
      },
      {
        id: 2,
        author: "Jonas K.",
        time: "5 hours ago",
        challenge: "Urban Cyclist",
        content: "Just completed a 15km bike trip to work instead of taking the diesel SUV! Feeling energized, saving cash, and saving the planet one commute at a time. 🚲💪",
        image: null,
        likes: 45,
        comments: 3,
        liked: false
      }
    ],
    leaderboard: [
      { rank: 1, name: "Marco V.", points: 2450, verified: true, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxv0_IQoWK7E8sw0Cwj5rj8V7Eg3jzAdoxC0JwNXp9dMI7KYM1xbyxvU0M5GvrcZnfqpnQdgWD4k1py3Mmx60WCK9dzDta1NiNyP-CfMWFVfc3ZkvIdj4bMLoJsdJ5Mwx3DUJwd4nbGNyxC0ShjZiOzjKZow3M7SYPYsi4Ey3ds8_CoXIAmsLhWwzRjqprUTSjq5m2yuNeIfNHz0G-gyq4va7DOHEO6L28xJFdbCfxYbhUkJgnUgNeWRz0ptDenohQ8TJs5zOkldc" },
      { rank: 2, name: "Elena R.", points: 2120, verified: false, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNhMoKvzTN-W6Ovdg389pOvjndrzTQjWqrI5Rs5Z7R0905Tx1b51tNSBhk3yPj824OZDNXGhfNu69W40tS89qpLs3qWbSRdQwY2SDmUhXutRYX87-gF3ltnOte9nzrtvSbjYRa4Ncnty8DBJwHAnsUQvDQxqtXbjtAqbuIc1LQZsP4CVNCU7Ikf1_VhAtbBf6G0HiU2RIsM9W1k2fx3LyuUd0zaFwfRPAq5b8r4ef-3LCVTyQw9a_l33ohgZKkAkT0gCp1ITqpNzM" },
      { rank: 3, name: "Jonas K.", points: 1980, verified: false, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGz9jlyU3ljeV2HnUmzV3_EAQ0O-k_CTJbEbfJzqQ56bJECippOd0EWpoEeTKLdd4aMUQFfarhD3OHJ146ROEuPXjCHBGUVYaW_lT15HyWtU8tI5x1g0wJzj3s80wRRf1Nmh5wcckZb8Y9Bf0fVp0LGkoODDikGwboj7je71yzzcRWw-ViQZPTudOhv6eqe7e9GdtJOlQ50JAwBUf1JVPdHEXxDejUXUwr5JTyCNfiHlAAC4Pbq5UJOcI3aBvSSe8BnX584RRBnLQ" }
    ]
  },
  aiHistory: [
    { sender: "assistant", text: "Hello! I am your EcoSphere AI Assistant. You can ask me questions about reducing your footprint, or type a command like 'log oat milk' or 'unplug chargers' to update your progress!" }
  ]
};

// --- NAVIGATION LOGIC ---
let activeTab = 'world'; // Default view

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
  });
  const activeDesktopBtn = document.getElementById(`nav-btn-${tabId}`);
  if (activeDesktopBtn) {
    activeDesktopBtn.className = "nav-tab font-label-md text-label-md flex items-center gap-sm bg-primary-container text-on-primary-container rounded-full px-4 py-1.5 active:scale-95 transition-transform duration-200";
  }

  // Update mobile navigation button active styling
  document.querySelectorAll('.nav-tab-mobile').forEach(btn => {
    btn.className = "nav-tab-mobile flex flex-col items-center justify-center text-on-surface-variant transition-colors";
  });
  const activeMobileBtn = document.getElementById(`mobile-nav-btn-${tabId}`);
  if (activeMobileBtn) {
    activeMobileBtn.className = "nav-tab-mobile flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-300";
  }

  // Render updates for specific tabs
  if (tabId === 'dashboard') {
    renderDashboard();
  } else if (tabId === 'actions') {
    renderActions();
  } else if (tabId === 'world') {
    renderWorld();
  } else if (tabId === 'community') {
    renderCommunity();
  }
}

// --- STATE SYNCING / RENDERING ---

function updatePointsAndStreak(pointsGained, streakUpdate = 0) {
  state.user.points += pointsGained;
  if (streakUpdate !== 0) {
    state.user.streak += streakUpdate;
  }
  
  // Update header indicators
  document.getElementById('user-points-display').textContent = `${state.user.points} pts`;
  document.getElementById('user-streak-display').textContent = `${state.user.streak} 🔥`;
  
  // Sync to world points display if visible
  const worldPoints = document.getElementById('world-points-display');
  if (worldPoints) {
    worldPoints.textContent = `+${state.user.points}`;
  }
}

// Render Dashboard View
function renderDashboard() {
  // Update numbers
  document.getElementById('dashboard-footprint-value').textContent = Math.round(state.footprint.current);
  document.getElementById('dashboard-saved-value').textContent = `${Math.round(state.footprint.saved)}kg`;
  document.getElementById('dashboard-goal-display').textContent = `Goal: ${state.footprint.goal}kg`;

  // Draw Dashboard Progress Ring
  const circle = document.getElementById('dashboard-progress-circle');
  if (circle) {
    const progress = state.footprint.current / state.footprint.goal;
    const circumference = 251.2; // 2 * pi * r (r=40)
    const offset = circumference - (progress * circumference);
    circle.style.strokeDashoffset = Math.max(0, offset);
  }

  // Update Category Breakdowns
  const totalCategoryEmissions = Object.values(state.footprint.categories).reduce((a, b) => a + b, 0);
  Object.keys(state.footprint.categories).forEach(cat => {
    const val = state.footprint.categories[cat];
    const pct = Math.round((val / totalCategoryEmissions) * 100);
    
    const displayVal = document.getElementById(`breakdown-val-${cat}`);
    const displayBar = document.getElementById(`breakdown-bar-${cat}`);
    
    if (displayVal) displayVal.textContent = Math.round(val);
    if (displayBar) displayBar.style.width = `${pct}%`;
  });
}

// Render World Builder View
function renderWorld() {
  // Update daily savings based on active state of items
  let totalDailySavings = 0;
  if (state.world.transport) totalDailySavings += 1.5;
  if (state.world.diet) totalDailySavings += 0.8;
  if (state.world.energy) totalDailySavings += 3.2;
  if (state.world.rewild) totalDailySavings += 2.0;
  if (state.world.waste) totalDailySavings += 0.9;
  if (state.world.water) totalDailySavings += 0.6;

  document.getElementById('world-savings-display').innerHTML = `${totalDailySavings.toFixed(1)}kg<span class="text-[10px] font-normal text-on-surface-variant">/d</span>`;

  // Update Goal Ring
  // Assuming a daily savings goal of 5kg
  const dailyGoal = 5.0;
  const goalPct = Math.min(100, Math.round((totalDailySavings / dailyGoal) * 100));
  document.getElementById('world-goal-percent').textContent = `${goalPct}%`;
  
  const ring = document.getElementById('world-goal-ring');
  if (ring) {
    const circumference = 408.4; // 2 * pi * r (r=65)
    const offset = circumference - ((goalPct / 100) * circumference);
    ring.style.strokeDashoffset = offset;
  }

  // Toggle visible floating items on isometric map
  Object.keys(state.world).forEach(item => {
    const element = document.getElementById(`island-item-${item}`);
    const button = document.getElementById(`world-btn-${item}`);
    const active = state.world[item];
    
    if (element) {
      if (active) {
        element.classList.remove('scale-0');
        element.classList.add('scale-100');
      } else {
        element.classList.remove('scale-100');
        element.classList.add('scale-0');
      }
    }
    
    if (button) {
      if (active) {
        button.className = "flex flex-col items-center justify-center p-3 rounded-2xl bg-primary text-white hover:opacity-90 transition-all border border-transparent group";
        const innerIconWrapper = button.querySelector('.w-10');
        if (innerIconWrapper) innerIconWrapper.className = "w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform";
      } else {
        button.className = "flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-secondary-container/30 transition-all border border-transparent hover:border-primary/20 group";
        const innerIconWrapper = button.querySelector('.w-10');
        if (innerIconWrapper) innerIconWrapper.className = "w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform";
      }
    }
  });

  // Level 2 Milestone notification trigger
  if (state.user.points >= 500 && state.user.level === 2) {
    showMilestoneToast();
  }
}

function showMilestoneToast() {
  const toast = document.getElementById('milestone-toast');
  toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');
}

function dismissMilestoneToast() {
  const toast = document.getElementById('milestone-toast');
  toast.classList.remove('opacity-100', 'translate-y-0');
  toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
  state.user.level = 3; // level up
}

function toggleWorldItem(item) {
  state.world[item] = !state.world[item];
  
  if (state.world[item]) {
    updatePointsAndStreak(35);
    addSystemChatMessage(`Unlocked and added ${item.toUpperCase()} upgrade to your Eco-Island! (+35 EcoPoints)`);
  } else {
    addSystemChatMessage(`Removed ${item.toUpperCase()} upgrade from your Eco-Island.`);
  }
  renderWorld();
}

// Render Action Plan View
function renderActions() {
  const checklistContainer = document.getElementById('checklist-container');
  checklistContainer.innerHTML = '';

  let pendingCount = 0;
  
  state.tasks.forEach(task => {
    if (!task.completed) pendingCount++;

    const taskEl = document.createElement('div');
    taskEl.className = "group bg-white rounded-2xl p-md shadow-[0_4px_20px_rgba(0,108,73,0.05)] border border-transparent hover:border-primary/20 transition-all flex items-center justify-between";
    taskEl.innerHTML = `
      <div class="flex items-center gap-md">
        <button class="w-8 h-8 rounded-full border-2 ${task.completed ? 'bg-primary border-primary text-white' : 'border-outline-variant text-transparent'} flex items-center justify-center hover:bg-primary-container/20 hover:border-primary transition-all" onclick="toggleTask(${task.id})">
          <span class="material-symbols-outlined text-[20px] ${task.completed ? 'text-white' : 'group-hover:text-primary'}" style="font-variation-settings: 'FILL' ${task.completed ? 1 : 0}">check</span>
        </button>
        <div>
          <h4 class="font-label-md text-sm font-semibold text-on-surface ${task.completed ? 'line-through text-on-surface-variant/70' : ''}">${task.text}</h4>
          <p class="text-[10px] font-semibold text-on-surface-variant">Impact: ${task.impact}kg CO2e saved</p>
        </div>
      </div>
      <div class="flex items-center gap-xs">
        <span class="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold">${task.category}</span>
      </div>
    `;
    checklistContainer.appendChild(taskEl);
  });

  document.getElementById('pending-tasks-count').textContent = `${pendingCount} Tasks Pending`;

  // Goal ring stats in Actions panel
  const goalProgressRing = document.getElementById('goal-progress-ring');
  const goalPct = Math.round((state.footprint.saved / state.footprint.goal) * 100);
  document.getElementById('goal-progress-percent').textContent = `${goalPct}%`;
  document.getElementById('goal-offset-hint').textContent = `You're ${Math.max(0, state.footprint.goal - Math.round(state.footprint.saved))}kg away from your offset goal!`;

  if (goalProgressRing) {
    const circumference = 251.2;
    const offset = circumference - ((goalPct / 100) * circumference);
    goalProgressRing.style.strokeDashoffset = offset;
  }
}

function toggleTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  task.completed = !task.completed;
  if (task.completed) {
    state.footprint.saved += task.impact;
    state.footprint.current -= task.impact;
    
    // adjust category footprint specifically
    const catMapping = task.category.toLowerCase();
    if (state.footprint.categories[catMapping] !== undefined) {
      state.footprint.categories[catMapping] -= task.impact;
    } else if (catMapping === 'water') {
      state.footprint.categories.home -= task.impact; // water maps to home
    }
    
    updatePointsAndStreak(15); // +15 points for task completion
    addSystemChatMessage(`Nice work! You completed task: "${task.text}". Saved ${task.impact}kg CO2e and earned +15 EcoPoints!`);
  } else {
    state.footprint.saved -= task.impact;
    state.footprint.current += task.impact;
    
    const catMapping = task.category.toLowerCase();
    if (state.footprint.categories[catMapping] !== undefined) {
      state.footprint.categories[catMapping] += task.impact;
    } else if (catMapping === 'water') {
      state.footprint.categories.home += task.impact;
    }
    updatePointsAndStreak(-15);
  }
  
  renderActions();
}

// Render Community View
function renderCommunity() {
  // 1. Challenges
  const joinWasteBtn = document.getElementById('btn-join-waste-challenge');
  if (joinWasteBtn) {
    if (state.community.joinedWasteChallenge) {
      joinWasteBtn.textContent = 'Active (Sprint started)';
      joinWasteBtn.className = "bg-primary-fixed text-primary px-6 py-2.5 rounded-full font-label-md text-xs font-bold active:scale-95 transition-all shadow-md";
    } else {
      joinWasteBtn.textContent = 'Join Challenge';
      joinWasteBtn.className = "bg-white text-primary px-6 py-2.5 rounded-full font-label-md text-xs font-bold active:scale-95 transition-all shadow-lg hover:shadow-primary/30";
    }
  }

  const enrollCompostBtn = document.getElementById('btn-enroll-compost');
  if (enrollCompostBtn) {
    if (state.community.enrolledCompost) {
      enrollCompostBtn.textContent = 'Enrolled';
      enrollCompostBtn.className = "w-full bg-primary text-white px-md py-2.5 rounded-full font-label-md text-xs font-bold active:scale-95 transition-all";
    } else {
      enrollCompostBtn.textContent = 'Enroll Now';
      enrollCompostBtn.className = "w-full border-2 border-primary text-primary px-md py-2.5 rounded-full font-label-md text-xs font-bold hover:bg-primary hover:text-white transition-all";
    }
  }

  // Offset tons display
  document.getElementById('community-co2-display').textContent = `${state.community.co2Offset.toFixed(1)} Tons`;

  // 2. Leaderboard
  const leaderboardContainer = document.getElementById('leaderboard-container');
  leaderboardContainer.innerHTML = '';
  
  state.community.leaderboard.forEach(rank => {
    const isUser = rank.name === 'Marco V.'; // just highlight rank 1
    const rankEl = document.createElement('div');
    rankEl.className = `flex items-center gap-md p-sm rounded-2xl transition-colors ${isUser ? 'bg-primary-container/10 border border-primary-container/20' : 'hover:bg-surface'}`;
    rankEl.innerHTML = `
      <div class="w-8 font-headline-md text-on-surface-variant font-bold text-center ${isUser ? 'text-primary' : ''}">${rank.rank}</div>
      <div class="w-10 h-10 rounded-full bg-secondary-container overflow-hidden shrink-0 ${isUser ? 'ring-2 ring-primary' : ''}">
        <img alt="${rank.name}" class="w-full h-full object-cover" src="${rank.avatar}"/>
      </div>
      <div class="flex-1">
        <p class="font-label-md text-on-background text-sm font-bold">${rank.name}</p>
        <p class="text-[10px] text-on-surface-variant font-medium">${rank.points.toLocaleString()} EcoPoints</p>
      </div>
      ${rank.verified ? '<span class="material-symbols-outlined text-primary text-base">verified</span>' : ''}
    `;
    leaderboardContainer.appendChild(rankEl);
  });

  // 3. Activity Posts
  const postsTarget = document.getElementById('activity-posts');
  postsTarget.innerHTML = '';

  state.community.posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = "bg-white p-lg rounded-3xl shadow-sm border border-surface-container-high space-y-md";
    
    let imageHtml = '';
    if (post.image) {
      imageHtml = `
        <div class="rounded-2xl overflow-hidden aspect-video relative max-h-60">
          <img class="w-full h-full object-cover" src="${post.image}" alt="Feed attachment"/>
        </div>
      `;
    }

    postEl.innerHTML = `
      <div class="flex justify-between items-start">
        <div class="flex items-center gap-md">
          <div class="w-11 h-11 rounded-full bg-primary-fixed-dim overflow-hidden shrink-0">
            <img alt="${post.author}" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfbvg_y72i1HFJBQVU8j3JdkQPP33-z2wdA6-DoY05QVFKu3ZujV-mIy5tmjs2E19_RscpTBHiQO1bebOru14JU8pTBVDr_bksd0uHO6ocNYELAxb9ium2uQ7knPRnEoao187WRgVNIlGQ4CfT-iG1MnDxtlOR-YaByyt3p8dZPV7qarQYpM-am8wpRAkqy4YTkxcxMgJQyPxEng0ex-1J2if9jKcMHIxJpYRZfaxKbGNNTvkXoR2WlvX4tGtTAFv_tpwnVoLaM-g"/>
          </div>
          <div>
            <h4 class="font-label-md text-sm font-bold text-on-background">${post.author}</h4>
            <p class="text-[10px] text-on-surface-variant font-medium">${post.time} ${post.challenge ? `· ${post.challenge}` : ''}</p>
          </div>
        </div>
        <span class="material-symbols-outlined text-on-surface-variant cursor-pointer text-base">more_horiz</span>
      </div>
      
      <p class="font-body-md text-xs text-on-surface">${post.content}</p>
      
      ${imageHtml}
      
      <div class="flex items-center gap-xl pt-sm select-none">
        <button class="flex items-center gap-xs transition-colors ${post.liked ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}" onclick="likePost(${post.id})">
          <span class="material-symbols-outlined text-base" style="font-variation-settings: 'FILL' ${post.liked ? 1 : 0}">favorite</span>
          <span class="text-xs font-semibold">${post.likes}</span>
        </button>
        <button class="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-base">chat_bubble</span>
          <span class="text-xs font-semibold">${post.comments}</span>
        </button>
        <button class="flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors ml-auto">
          <span class="material-symbols-outlined text-base">share</span>
        </button>
      </div>
    `;
    postsTarget.appendChild(postEl);
  });
}

function likePost(id) {
  const post = state.community.posts.find(p => p.id === id);
  if (!post) return;
  
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderCommunity();
}

function submitUserPost() {
  const input = document.getElementById('post-input');
  const text = input.value.trim();
  if (!text) return;

  const newPost = {
    id: Date.now(),
    author: "Alina Furtado", // Active User
    time: "Just now",
    challenge: state.community.joinedWasteChallenge ? "Zero Waste Week" : null,
    content: text,
    image: null,
    likes: 0,
    comments: 0,
    liked: false
  };

  state.community.posts.unshift(newPost);
  input.value = '';
  
  updatePointsAndStreak(10); // +10 points for sharing progress
  renderCommunity();
  addSystemChatMessage("Shared a post in the Community Hub! Earned +10 EcoPoints.");
}

function joinWasteSprint() {
  state.community.joinedWasteChallenge = !state.community.joinedWasteChallenge;
  if (state.community.joinedWasteChallenge) {
    updatePointsAndStreak(50);
    state.community.co2Offset += 0.2; // community offset increment
    renderCommunity();
    addSystemChatMessage("Joined the Zero Waste Week sprint challenge! Earned +50 EcoPoints.");
  } else {
    updatePointsAndStreak(-50);
    renderCommunity();
  }
}

function enrollCompost() {
  state.community.enrolledCompost = !state.community.enrolledCompost;
  if (state.community.enrolledCompost) {
    updatePointsAndStreak(30);
    
    // Auto unlock waste composting on the isometric island
    state.world.waste = true;
    
    renderCommunity();
    renderWorld();
    addSystemChatMessage("Enrolled in the Compost Hero challenge and unlocked 'Composting' on your Eco-Island! (+30 EcoPoints)");
  } else {
    updatePointsAndStreak(-30);
    state.world.waste = false;
    renderCommunity();
    renderWorld();
  }
}


// --- MODAL DIALOG CONTROLLER ---
let activeDialogCallback = null;

function showDialog(title, icon, contentHtml, confirmCallback) {
  document.getElementById('dialog-title').textContent = title;
  document.getElementById('dialog-icon').textContent = icon;
  document.getElementById('dialog-body-area').innerHTML = contentHtml;
  
  const confirmBtn = document.getElementById('dialog-confirm-btn');
  
  // Clone button to remove previous event listeners
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

// Log emissions trigger
function triggerLogModal(category, actionName, defaultSavings) {
  const content = `
    <p>Are you ready to log: <strong>${actionName}</strong>?</p>
    <p class="text-primary font-semibold">This action saves approx. ${defaultSavings}kg CO2e emissions!</p>
    <div class="mt-3">
      <label class="block text-[10px] font-bold text-on-surface-variant mb-1">Custom reduction amount (kg CO2e):</label>
      <input type="number" id="custom-savings-input" value="${defaultSavings}" step="0.1" min="0.1" class="w-full bg-surface border border-outline-variant rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-xs" />
    </div>
  `;
  
  showDialog(`Log ${category.toUpperCase()}`, 'co2', content, () => {
    const inputVal = parseFloat(document.getElementById('custom-savings-input').value) || defaultSavings;
    
    // Update state
    state.footprint.saved += inputVal;
    state.footprint.current = Math.max(0, state.footprint.current - inputVal);
    
    // adjust categories
    if (state.footprint.categories[category] !== undefined) {
      state.footprint.categories[category] = Math.max(0, state.footprint.categories[category] - inputVal);
    }
    
    // Auto unlock the corresponding isometric feature if not unlocked
    if (!state.world[category]) {
      state.world[category] = true;
    }

    updatePointsAndStreak(20, 0); // +20 pts
    
    addSystemChatMessage(`Logged action: "${actionName}". Saved ${inputVal}kg CO2e and earned +20 EcoPoints!`);
    
    // Re-render
    renderDashboard();
    renderWorld();
    if (activeTab === 'actions') renderActions();
  });
}

// Shift planning trigger
function triggerShiftDialog(shiftName, categoryKey, co2Offset) {
  const content = `
    <p>Do you want to finalize planning for <strong>${shiftName}</strong>?</p>
    <p class="text-tertiary font-semibold">This shift represents a massive long-term reduction of ${co2Offset}kg CO2e / year!</p>
    <p class="mt-2 text-[10px]">Confirming will offset your annual target projection and unlock new island decorations.</p>
  `;

  showDialog('Plan Shift', 'eco', content, () => {
    state.footprint.saved += co2Offset / 12; // monthly offset slice
    state.footprint.current = Math.max(0, state.footprint.current - (co2Offset / 12));
    
    updatePointsAndStreak(100); // Massive boost
    
    addSystemChatMessage(`Planned Life Shift: "${shiftName}". Saved ${co2Offset}kg CO2e annually, earned +100 EcoPoints!`);
    
    renderDashboard();
    renderWorld();
    if (activeTab === 'actions') renderActions();
  });
}

// Goal Optimization Trigger
function triggerOptimizeGoal() {
  const content = `
    <h4 class="font-bold text-on-surface mb-2">Adjust Carbon Goals</h4>
    <p class="mb-3">Configure your monthly target emissions limits:</p>
    <div class="space-y-2">
      <div>
        <label class="block text-[10px] font-semibold mb-1">Target Carbon Footprint (kg CO2e):</label>
        <input type="number" id="dialog-goal-val" value="${state.footprint.goal}" class="w-full bg-surface border border-outline-variant rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
    </div>
  `;
  showDialog('Optimize Target', 'tune', content, () => {
    const newGoal = parseInt(document.getElementById('dialog-goal-val').value) || state.footprint.goal;
    state.footprint.goal = newGoal;
    
    addSystemChatMessage(`Updated monthly carbon target goal to ${newGoal}kg CO2e.`);
    
    renderDashboard();
    if (activeTab === 'actions') renderActions();
  });
}

function showArticleModal(title, text) {
  showDialog(title, 'menu_book', `<p class="leading-relaxed text-[11px] text-on-surface">${text}</p>`, () => {});
}

function triggerStreakToast() {
  addSystemChatMessage(`You have logged eco-actions for ${state.user.streak} consecutive days! Keep it up 🔥`);
}


// --- AI ASSISTANT DIALOG / INTERACTION ---

let isAIChatOpen = false;

function toggleAIChat() {
  isAIChatOpen = !isAIChatOpen;
  const chatBox = document.getElementById('ai-chat-box');
  const fabIcon = document.getElementById('ai-fab-icon');
  
  if (isAIChatOpen) {
    chatBox.classList.remove('scale-0');
    chatBox.classList.add('scale-100');
    fabIcon.textContent = 'chat_bubble';
    renderChatMessages();
  } else {
    chatBox.classList.remove('scale-100');
    chatBox.classList.add('scale-0');
    fabIcon.textContent = 'eco';
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
  
  state.aiHistory.forEach(msg => {
    const isAssistant = msg.sender === 'assistant';
    const bubble = document.createElement('div');
    bubble.className = `flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`;
    
    const content = document.createElement('div');
    content.className = `chat-bubble p-3 rounded-2xl text-[11px] leading-tight ${
      isAssistant 
        ? 'bg-surface-container text-on-surface rounded-tl-none border border-primary-container/10' 
        : 'bg-primary text-white rounded-tr-none'
    }`;
    content.textContent = msg.text;
    
    bubble.appendChild(content);
    container.appendChild(bubble);
  });
  
  // scroll to bottom
  container.scrollTop = container.scrollHeight;
}

function addSystemChatMessage(text) {
  state.aiHistory.push({ sender: "assistant", text: text });
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

  // Add User Message
  state.aiHistory.push({ sender: "user", text: text });
  input.value = '';
  renderChatMessages();

  // Process message and generate automated simulated AI response
  setTimeout(() => {
    const response = generateAIResponse(text);
    state.aiHistory.push({ sender: "assistant", text: response });
    renderChatMessages();
  }, 600);
}

// Contextual response and decision logic based on user inputs
function generateAIResponse(input) {
  const query = input.toLowerCase();
  
  // 1. Natural Language Logging command for commutes
  if (query.includes('log') && (query.includes('bike') || query.includes('walk') || query.includes('ride') || query.includes('commute'))) {
    // extract digits if any
    const milesMatch = query.match(/\d+/);
    const miles = milesMatch ? parseInt(milesMatch[0]) : 5;
    const co2Saved = parseFloat((miles * 0.4).toFixed(1)); // 0.4kg per mile/km saved

    // Update state
    state.footprint.saved += co2Saved;
    state.footprint.current = Math.max(0, state.footprint.current - co2Saved);
    state.footprint.categories.transport = Math.max(0, state.footprint.categories.transport - co2Saved);
    
    if (!state.world.transport) {
      state.world.transport = true;
    }
    
    updatePointsAndStreak(20);
    renderDashboard();
    renderWorld();
    if (activeTab === 'actions') renderActions();

    return `Awesome, Alina! I have logged your commute action. That saves approx ${co2Saved}kg CO2e. I've awarded you +20 EcoPoints, and updated your Eco-Island. Biking rules! 🚲`;
  }

  // 2. Natural Language Logging command for food/milk
  if (query.includes('log') && (query.includes('oat') || query.includes('milk') || query.includes('vegan') || query.includes('vegetarian') || query.includes('meatless'))) {
    const savings = 0.4;
    state.footprint.saved += savings;
    state.footprint.current = Math.max(0, state.footprint.current - savings);
    state.footprint.categories.food = Math.max(0, state.footprint.categories.food - savings);
    
    if (!state.world.diet) {
      state.world.diet = true;
    }

    updatePointsAndStreak(20);
    renderDashboard();
    renderWorld();
    if (activeTab === 'actions') renderActions();

    return `Great choice! Switching to plant-based milk or meals cuts agricultural footprint. Logged 0.4kg CO2e savings and awarded you +20 EcoPoints. Your island's local diet plot is flourishing! 🥛🌿`;
  }

  // 3. Task completions
  if (query.includes('log') && (query.includes('unplug') || query.includes('charger'))) {
    const task = state.tasks.find(t => t.id === 1);
    if (task && !task.completed) {
      toggleTask(1);
      return "Excellent! I marked the 'Unplug chargers when not in use' task as completed for you. Keep those standby currents off! (+15 EcoPoints)";
    }
    return "I've logged that. Standby electricity reduction has been tracked in your Energy savings category!";
  }

  // 4. Inquiries / FAQ help
  if (query.includes('how') && query.includes('reduce') && (query.includes('home') || query.includes('energy') || query.includes('house'))) {
    return "To reduce your home carbon footprint: 1) Switch to energy-efficient LED light bulbs. 2) Clean your air filter to make heating/cooling units work less. 3) Unplug phantom loads. 4) Consider a smart plug set up like the one in your Eco Insights tab!";
  }
  
  if (query.includes('what') && query.includes('points')) {
    return `You currently have ${state.user.points} EcoPoints. You earn points by logging commutes, completing items in your Action Plan, enrolling in community sprints, or adjusting elements on your Eco-Island!`;
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('help')) {
    return "Hello! I can help you track emissions. Try asking: 'How to reduce home footprint', 'How many points do I have?', or instruct me: 'Log 8km bike commute'.";
  }

  // Fallback response
  return "Interesting! I've logged that request in our environmental telemetry ledger. If you want to log a specific reduction, try telling me 'Log 5km bike commute' or completing the tasks in your Action tab.";
}

// --- BOOTSTRAP INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
  // Sync basic header elements
  updatePointsAndStreak(0);
  
  // Set default view active
  switchTab(activeTab);
});
