// Sample data for the Geopolitical Risk Analyzer

// Global risk data
const globalRiskData = {
    currentScore: 78,
    trend: 'increasing',
    lastUpdated: new Date().toISOString(),
    regions: {
        'middle-east': {
            name: 'Middle East',
            score: 85,
            level: 'critical',
            conflicts: ['Israel-Iran', 'Syria', 'Yemen'],
            keyFactors: ['Nuclear tensions', 'Oil supply', 'Proxy wars']
        },
        'eastern-europe': {
            name: 'Eastern Europe',
            score: 78,
            level: 'high',
            conflicts: ['Russia-Ukraine', 'Belarus'],
            keyFactors: ['NATO expansion', 'Energy security', 'Nuclear threats']
        },
        'pacific': {
            name: 'Pacific',
            score: 72,
            level: 'moderate-high',
            conflicts: ['Taiwan Strait', 'South China Sea'],
            keyFactors: ['US-China rivalry', 'Trade tensions', 'Military buildup']
        },
        'south-asia': {
            name: 'South Asia',
            score: 65,
            level: 'moderate',
            conflicts: ['Kashmir', 'Afghanistan'],
            keyFactors: ['India-Pakistan tensions', 'Nuclear weapons', 'Terrorism']
        },
        'africa': {
            name: 'Africa',
            score: 58,
            level: 'moderate',
            conflicts: ['Sahel', 'Horn of Africa', 'DRC'],
            keyFactors: ['Resource conflicts', 'Climate change', 'Governance']
        },
        'americas': {
            name: 'Americas',
            score: 45,
            level: 'low-moderate',
            conflicts: ['Venezuela', 'Colombia'],
            keyFactors: ['Migration', 'Drug trafficking', 'Political instability']
        }
    }
};

// Nuclear powers data
const nuclearPowersData = {
    'USA': {
        warheads: 5550,
        deliverySystems: ['ICBMs', 'SLBMs', 'Strategic Bombers'],
        doctrine: 'No First Use (conditional)',
        alertLevel: 'normal',
        riskLevel: 'low'
    },
    'RUS': {
        warheads: 6257,
        deliverySystems: ['ICBMs', 'SLBMs', 'Strategic Bombers', 'Tactical'],
        doctrine: 'First Use (escalate to de-escalate)',
        alertLevel: 'elevated',
        riskLevel: 'high'
    },
    'CHN': {
        warheads: 350,
        deliverySystems: ['ICBMs', 'SLBMs', 'Mobile Launchers'],
        doctrine: 'No First Use',
        alertLevel: 'normal',
        riskLevel: 'moderate'
    },
    'FRA': {
        warheads: 290,
        deliverySystems: ['SLBMs', 'Air-launched'],
        doctrine: 'Vital Interests',
        alertLevel: 'normal',
        riskLevel: 'low'
    },
    'GBR': {
        warheads: 225,
        deliverySystems: ['SLBMs'],
        doctrine: 'Extreme Circumstances',
        alertLevel: 'normal',
        riskLevel: 'low'
    },
    'IND': {
        warheads: 160,
        deliverySystems: ['ICBMs', 'SLBMs', 'Aircraft'],
        doctrine: 'No First Use',
        alertLevel: 'normal',
        riskLevel: 'moderate'
    },
    'PAK': {
        warheads: 165,
        deliverySystems: ['Ballistic Missiles', 'Aircraft'],
        doctrine: 'First Use',
        alertLevel: 'elevated',
        riskLevel: 'high'
    },
    'ISR': {
        warheads: 90,
        deliverySystems: ['Ballistic Missiles', 'Aircraft', 'Submarines'],
        doctrine: 'Undeclared',
        alertLevel: 'elevated',
        riskLevel: 'high'
    },
    'PRK': {
        warheads: 30,
        deliverySystems: ['Ballistic Missiles'],
        doctrine: 'First Use',
        alertLevel: 'high',
        riskLevel: 'critical'
    }
};

// Military capabilities data
const militaryCapabilitiesData = {
    'USA': {
        militaryIndex: 95,
        defense_budget: 778000000000,
        active_personnel: 1400000,
        nuclear_capable: true,
        global_reach: true,
        alliance_leader: true,
        key_capabilities: ['Power Projection', 'Nuclear Triad', 'Cyber Warfare', 'Space Assets']
    },
    'CHN': {
        militaryIndex: 88,
        defense_budget: 252000000000,
        active_personnel: 2000000,
        nuclear_capable: true,
        global_reach: true,
        alliance_leader: false,
        key_capabilities: ['Anti-Access/Area Denial', 'Hypersonic Weapons', 'Cyber Warfare', 'Naval Expansion']
    },
    'RUS': {
        militaryIndex: 82,
        defense_budget: 61700000000,
        active_personnel: 900000,
        nuclear_capable: true,
        global_reach: true,
        alliance_leader: true,
        key_capabilities: ['Nuclear Arsenal', 'Electronic Warfare', 'Hybrid Warfare', 'Arctic Operations']
    },
    'IND': {
        militaryIndex: 75,
        defense_budget: 72900000000,
        active_personnel: 1455000,
        nuclear_capable: true,
        global_reach: false,
        alliance_leader: false,
        key_capabilities: ['Regional Power', 'Nuclear Weapons', 'Mountain Warfare', 'Naval Expansion']
    },
    'GBR': {
        militaryIndex: 72,
        defense_budget: 59200000000,
        active_personnel: 194000,
        nuclear_capable: true,
        global_reach: true,
        alliance_leader: false,
        key_capabilities: ['Nuclear Submarines', 'Special Forces', 'Intelligence', 'Expeditionary Forces']
    },
    'FRA': {
        militaryIndex: 70,
        defense_budget: 50100000000,
        active_personnel: 270000,
        nuclear_capable: true,
        global_reach: true,
        alliance_leader: false,
        key_capabilities: ['Nuclear Deterrent', 'Expeditionary Forces', 'African Operations', 'Defense Industry']
    },
    'JPN': {
        militaryIndex: 68,
        defense_budget: 47600000000,
        active_personnel: 247000,
        nuclear_capable: false,
        global_reach: false,
        alliance_leader: false,
        key_capabilities: ['Maritime Defense', 'Missile Defense', 'Advanced Technology', 'US Alliance']
    },
    'KOR': {
        militaryIndex: 65,
        defense_budget: 46400000000,
        active_personnel: 599000,
        nuclear_capable: false,
        global_reach: false,
        alliance_leader: false,
        key_capabilities: ['Artillery', 'Missile Defense', 'Cyber Warfare', 'US Alliance']
    },
    'IRN': {
        militaryIndex: 58,
        defense_budget: 25000000000,
        active_personnel: 610000,
        nuclear_capable: false,
        global_reach: false,
        alliance_leader: false,
        key_capabilities: ['Asymmetric Warfare', 'Proxy Networks', 'Missile Program', 'Regional Influence']
    },
    'ISR': {
        militaryIndex: 78,
        defense_budget: 24300000000,
        active_personnel: 170000,
        nuclear_capable: true,
        global_reach: false,
        alliance_leader: false,
        key_capabilities: ['Air Superiority', 'Intelligence', 'Cyber Warfare', 'Nuclear Weapons']
    }
};

// Alliance systems data
const allianceSystemsData = {
    'NATO': {
        members: ['USA', 'GBR', 'FRA', 'DEU', 'ITA', 'ESP', 'POL', 'TUR', 'CAN', 'NLD', 'BEL', 'NOR', 'DNK', 'PRT', 'CZE', 'HUN', 'BGR', 'EST', 'LVA', 'LTU', 'SVN', 'SVK', 'ROU', 'HRV', 'ALB', 'MNE', 'MKD', 'FIN', 'SWE'],
        type: 'Collective Defense',
        article5: true,
        strength: 'Very High',
        nuclear_umbrella: true
    },
    'CSTO': {
        members: ['RUS', 'BLR', 'KAZ', 'KGZ', 'TJK', 'ARM'],
        type: 'Collective Security',
        article5: true,
        strength: 'Moderate',
        nuclear_umbrella: true
    },
    'ANZUS': {
        members: ['USA', 'AUS', 'NZL'],
        type: 'Security Treaty',
        article5: false,
        strength: 'High',
        nuclear_umbrella: true
    },
    'QUAD': {
        members: ['USA', 'IND', 'JPN', 'AUS'],
        type: 'Strategic Partnership',
        article5: false,
        strength: 'Moderate',
        nuclear_umbrella: false
    },
    'AUKUS': {
        members: ['AUS', 'GBR', 'USA'],
        type: 'Security Partnership',
        article5: false,
        strength: 'High',
        nuclear_umbrella: true
    },
    'SCO': {
        members: ['CHN', 'RUS', 'IND', 'PAK', 'KAZ', 'KGZ', 'TJK', 'UZB'],
        type: 'Regional Organization',
        article5: false,
        strength: 'Low-Moderate',
        nuclear_umbrella: false
    }
};

// Economic interdependence data
const economicData = {
    'USA-CHN': {
        trade_volume: 690000000000,
        dependency_level: 'High',
        critical_sectors: ['Technology', 'Manufacturing', 'Agriculture'],
        vulnerability: 'Mutual'
    },
    'USA-RUS': {
        trade_volume: 28000000000,
        dependency_level: 'Low',
        critical_sectors: ['Energy', 'Raw Materials'],
        vulnerability: 'Low'
    },
    'EUR-RUS': {
        trade_volume: 174000000000,
        dependency_level: 'High',
        critical_sectors: ['Energy', 'Raw Materials'],
        vulnerability: 'European'
    },
    'CHN-RUS': {
        trade_volume: 147000000000,
        dependency_level: 'Moderate',
        critical_sectors: ['Energy', 'Technology', 'Military'],
        vulnerability: 'Mutual'
    }
};

// Current conflicts data
const currentConflictsData = {
    'ukraine': {
        name: 'Russia-Ukraine War',
        start_date: '2022-02-24',
        status: 'Active',
        intensity: 'High',
        parties: ['RUS', 'UKR'],
        supporters: {
            'UKR': ['USA', 'GBR', 'POL', 'NATO'],
            'RUS': ['BLR', 'IRN', 'PRK']
        },
        risk_factors: ['Nuclear threats', 'NATO involvement', 'Energy warfare'],
        escalation_risk: 78
    },
    'israel_palestine': {
        name: 'Israel-Palestine Conflict',
        start_date: '2023-10-07',
        status: 'Active',
        intensity: 'High',
        parties: ['ISR', 'PSE'],
        supporters: {
            'ISR': ['USA', 'GBR'],
            'PSE': ['IRN', 'TUR', 'QAT']
        },
        risk_factors: ['Regional escalation', 'Iranian involvement', 'Oil supply'],
        escalation_risk: 85
    },
    'taiwan_strait': {
        name: 'Taiwan Strait Tensions',
        start_date: 'Ongoing',
        status: 'Tensions',
        intensity: 'Moderate',
        parties: ['CHN', 'TWN'],
        supporters: {
            'TWN': ['USA', 'JPN', 'AUS'],
            'CHN': []
        },
        risk_factors: ['Semiconductor crisis', 'US-China rivalry', 'Military buildup'],
        escalation_risk: 72
    },
    'south_china_sea': {
        name: 'South China Sea Disputes',
        start_date: 'Ongoing',
        status: 'Tensions',
        intensity: 'Low-Moderate',
        parties: ['CHN', 'PHL', 'VNM', 'MYS'],
        supporters: {
            'PHL': ['USA'],
            'CHN': []
        },
        risk_factors: ['Naval incidents', 'Resource competition', 'Trade routes'],
        escalation_risk: 58
    },
    'kashmir': {
        name: 'Kashmir Dispute',
        start_date: 'Ongoing',
        status: 'Frozen',
        intensity: 'Low',
        parties: ['IND', 'PAK'],
        supporters: {
            'PAK': ['CHN'],
            'IND': ['USA', 'RUS']
        },
        risk_factors: ['Nuclear weapons', 'Terrorism', 'Water disputes'],
        escalation_risk: 65
    }
};

// Early warning indicators with 2025 data
const earlyWarningIndicators = [
    {
        id: 'nuclear_alert',
        category: 'Military',
        indicator: 'Iran-Israel nuclear escalation imminent',
        current_status: 'Critical',
        severity: 'Critical',
        timeframe: 'Hours to days',
        last_triggered: '2025-06-19T14:30:00Z',
        description: 'Iranian missile strikes on Israeli hospital, nuclear facilities targeted'
    },
    {
        id: 'market_volatility',
        category: 'Economic',
        indicator: 'Global oil markets in crisis',
        current_status: 'Active',
        severity: 'High',
        timeframe: 'Hours to days',
        last_triggered: '2025-06-19T12:20:00Z',
        description: 'Oil prices spike 15% on Middle East escalation fears'
    },
    {
        id: 'satellite_activity',
        category: 'Military',
        indicator: 'China dual carrier operations near Taiwan',
        current_status: 'Active',
        severity: 'High',
        timeframe: 'Days to weeks',
        last_triggered: '2025-06-19T08:45:00Z',
        description: 'Unprecedented Chinese military activity in Taiwan Strait'
    },
    {
        id: 'embassy_evacuations',
        category: 'Diplomatic',
        indicator: 'US embassy staff reduction in Middle East',
        current_status: 'Active',
        severity: 'High',
        timeframe: 'Days to weeks',
        last_triggered: '2025-06-18T16:30:00Z',
        description: 'Non-essential personnel evacuated from Iran-Israel conflict zone'
    },
    {
        id: 'cyber_attacks',
        category: 'Information',
        indicator: 'Russian cyber attacks on Ukrainian infrastructure',
        current_status: 'Critical',
        severity: 'Critical',
        timeframe: 'Hours',
        last_triggered: '2025-06-17T22:15:00Z',
        description: '28 killed in deadliest Russian strikes on Kyiv in almost a year'
    },
    {
        id: 'nuclear_proliferation',
        category: 'Nuclear',
        indicator: 'North Korea deploys 30,000 troops to Russia',
        current_status: 'Active',
        severity: 'High',
        timeframe: 'Weeks to months',
        last_triggered: '2025-06-19T10:00:00Z',
        description: 'Additional 15,000 North Korean soldiers sent to support Russia'
    },
    {
        id: 'alliance_tensions',
        category: 'Diplomatic',
        indicator: 'Trump weighs US military intervention',
        current_status: 'Critical',
        severity: 'Critical',
        timeframe: 'Days to weeks',
        last_triggered: '2025-06-19T11:45:00Z',
        description: 'US President to decide on Iran-Israel conflict involvement within two weeks'
    }
];

// Risk calculation functions
function calculateOverallRisk(factors) {
    const weights = {
        military: 0.3,
        nuclear: 0.25,
        economic: 0.2,
        diplomatic: 0.15,
        social: 0.1
    };
    
    let totalRisk = 0;
    for (const [factor, weight] of Object.entries(weights)) {
        totalRisk += (factors[factor] || 0) * weight;
    }
    
    return Math.min(100, Math.max(0, totalRisk));
}

function getRiskLevel(score) {
    if (score >= 90) return 'Extreme';
    if (score >= 80) return 'Critical';
    if (score >= 70) return 'High';
    if (score >= 60) return 'Moderate-High';
    if (score >= 50) return 'Moderate';
    if (score >= 40) return 'Low-Moderate';
    return 'Low';
}

function getRiskColor(level) {
    const colors = {
        'Extreme': '#8e44ad',
        'Critical': '#e74c3c',
        'High': '#f39c12',
        'Moderate-High': '#f39c12',
        'Moderate': '#3498db',
        'Low-Moderate': '#27ae60',
        'Low': '#27ae60'
    };
    return colors[level] || '#95a5a6';
}

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        globalRiskData,
        nuclearPowersData,
        militaryCapabilitiesData,
        allianceSystemsData,
        economicData,
        currentConflictsData,
        earlyWarningIndicators,
        calculateOverallRisk,
        getRiskLevel,
        getRiskColor
    };
} else {
    // Browser environment
    window.GeopoliticalData = {
        globalRiskData,
        nuclearPowersData,
        militaryCapabilitiesData,
        allianceSystemsData,
        economicData,
        currentConflictsData,
        earlyWarningIndicators,
        calculateOverallRisk,
        getRiskLevel,
        getRiskColor
    };
}


// Predictions Tracking Data with 2025 Events
const predictionsData2025 = [
    {
        id: 'pred_2025_001',
        date: '6/19/2025',
        category: 'nuclear',
        prediction: 'Iran strikes Israeli hospital with ballistic missiles - 240 wounded',
        predicted_date: '3/15/2024',
        verification_date: '6/19/2025',
        status: 'VERIFIED CORRECT',
        confidence: '94%',
        accuracy: '96%',
        source: 'Reuters, CNN, AP News',
        outcome: 'Iranian missiles hit major hospital in southern Israel, escalating direct military confrontation',
        impact: 'Critical - Direct Iran-Israel warfare begins'
    },
    {
        id: 'pred_2025_002',
        date: '6/19/2025',
        category: 'military',
        prediction: 'Israel destroys Iranian nuclear facilities in massive airstrikes',
        predicted_date: '4/20/2024',
        verification_date: '6/19/2025',
        status: 'VERIFIED CORRECT',
        confidence: '91%',
        accuracy: '93%',
        source: 'Pentagon Reports, IAEA',
        outcome: 'Israeli forces target multiple Iranian nuclear installations in coordinated attack',
        impact: 'Critical - Nuclear escalation pathway activated'
    },
    {
        id: 'pred_2025_003',
        date: '6/17/2025',
        category: 'military',
        prediction: 'Russia kills 28 in deadliest Kyiv strikes in almost a year',
        predicted_date: '11/10/2024',
        verification_date: '6/17/2025',
        status: 'VERIFIED CORRECT',
        confidence: '88%',
        accuracy: '91%',
        source: 'UN Reports, ISW',
        outcome: 'Russian drone and missile attacks target civilian infrastructure in Ukrainian capital',
        impact: 'High - Escalation of civilian targeting'
    },
    {
        id: 'pred_2025_004',
        date: '6/19/2025',
        category: 'military',
        prediction: 'China deploys two aircraft carriers near Taiwan simultaneously',
        predicted_date: '8/15/2024',
        verification_date: '6/19/2025',
        status: 'VERIFIED CORRECT',
        confidence: '85%',
        accuracy: '88%',
        source: 'Pentagon, Taiwan Defense Ministry',
        outcome: 'Chinese military conducts unprecedented dual carrier operations in Taiwan Strait',
        impact: 'High - Taiwan invasion preparation escalates'
    },
    {
        id: 'pred_2025_005',
        date: '6/19/2025',
        category: 'military',
        prediction: 'North Korea sends additional 15,000 soldiers to Russia',
        predicted_date: '9/30/2024',
        verification_date: '6/19/2025',
        status: 'VERIFIED CORRECT',
        confidence: '82%',
        accuracy: '87%',
        source: 'NATO Intelligence, South Korea Defense',
        outcome: 'North Korean military deployment to Russia reaches 30,000 troops total',
        impact: 'High - Asia-Europe conflict axis strengthens'
    },
    {
        id: 'pred_2025_006',
        date: '6/19/2025',
        category: 'diplomatic',
        prediction: 'Trump weighs US military involvement in Iran-Israel conflict',
        predicted_date: '12/20/2024',
        verification_date: '6/19/2025',
        status: 'VERIFIED CORRECT',
        confidence: '79%',
        accuracy: '84%',
        source: 'White House Sources, CNN',
        outcome: 'US President to decide on military intervention within two weeks',
        impact: 'Critical - Global superpower involvement imminent'
    },
    {
        id: 'pred_2025_007',
        date: '6/18/2025',
        category: 'economic',
        prediction: 'Oil prices spike 15% on Middle East escalation',
        predicted_date: '2/28/2024',
        verification_date: '6/18/2025',
        status: 'VERIFIED CORRECT',
        confidence: '92%',
        accuracy: '95%',
        source: 'Bloomberg, Reuters Energy',
        outcome: 'Brent crude jumps to $95/barrel on Iran-Israel conflict fears',
        impact: 'High - Global energy crisis begins'
    },
    {
        id: 'pred_2025_008',
        date: '6/16/2025',
        category: 'nuclear',
        prediction: 'IAEA confirms Iran uranium enrichment at weapons-grade levels',
        predicted_date: '1/10/2024',
        verification_date: '6/16/2025',
        status: 'VERIFIED CORRECT',
        confidence: '96%',
        accuracy: '98%',
        source: 'IAEA Reports, UN Security Council',
        outcome: 'Iran reaches 84% uranium enrichment, crossing weapons threshold',
        impact: 'Critical - Nuclear breakout achieved'
    },
    {
        id: 'pred_2025_009',
        date: '6/15/2025',
        category: 'military',
        prediction: 'Ukraine destroys third of Russian strategic bomber fleet',
        predicted_date: '10/5/2024',
        verification_date: '6/15/2025',
        status: 'VERIFIED CORRECT',
        confidence: '73%',
        accuracy: '81%',
        source: 'Ukrainian Defense Ministry, NATO',
        outcome: 'Operation Spiderweb destroys 11-12 Russian strategic bombers on ground',
        impact: 'High - Russian nuclear delivery capability degraded'
    },
    {
        id: 'pred_2025_010',
        date: '6/14/2025',
        category: 'diplomatic',
        prediction: 'G7 emergency summit on multiple global conflicts',
        predicted_date: '5/20/2024',
        verification_date: '6/14/2025',
        status: 'VERIFIED CORRECT',
        confidence: '87%',
        accuracy: '89%',
        source: 'G7 Secretariat, Reuters',
        outcome: 'Emergency G7 meeting called to address Iran-Israel, Russia-Ukraine escalations',
        impact: 'Moderate - International coordination attempts'
    }
];

// Accuracy Trends Data for 2025
const accuracyTrends2025 = {
    monthly: [
        { month: 'Jan 2025', accuracy: 89, predictions: 23, verified: 21 },
        { month: 'Feb 2025', accuracy: 91, predictions: 27, verified: 25 },
        { month: 'Mar 2025', accuracy: 88, predictions: 31, verified: 27 },
        { month: 'Apr 2025', accuracy: 93, predictions: 29, verified: 27 },
        { month: 'May 2025', accuracy: 90, predictions: 35, verified: 32 },
        { month: 'Jun 2025', accuracy: 94, predictions: 42, verified: 39 }
    ],
    categories: {
        nuclear: { accuracy: 96, total: 18, verified: 17 },
        military: { accuracy: 89, total: 67, verified: 60 },
        economic: { accuracy: 92, total: 34, verified: 31 },
        diplomatic: { accuracy: 87, total: 45, verified: 39 },
        cyber: { accuracy: 85, total: 23, verified: 20 }
    },
    overall: {
        totalPredictions: 203,
        verifiedCorrect: 127,
        verifiedIncorrect: 18,
        pendingVerification: 58,
        overallAccuracy: 89
    }
};

