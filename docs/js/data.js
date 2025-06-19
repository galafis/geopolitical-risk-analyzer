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

// Early warning indicators
const earlyWarningIndicators = [
    {
        id: 'nuclear_alert',
        category: 'Military',
        indicator: 'Nuclear forces placed on highest alert',
        current_status: 'Active',
        severity: 'Critical',
        timeframe: 'Hours to days',
        last_triggered: '2024-01-15T10:30:00Z',
        description: 'Multiple nuclear powers have elevated alert status'
    },
    {
        id: 'market_volatility',
        category: 'Economic',
        indicator: 'Global financial market collapse',
        current_status: 'Monitoring',
        severity: 'High',
        timeframe: 'Hours to days',
        last_triggered: '2024-01-14T14:20:00Z',
        description: 'Significant volatility in defense and energy sectors'
    },
    {
        id: 'satellite_activity',
        category: 'Military',
        indicator: 'Military satellite activity increase',
        current_status: 'Active',
        severity: 'Moderate',
        timeframe: 'Days to weeks',
        last_triggered: '2024-01-13T08:45:00Z',
        description: 'Increased reconnaissance and communication satellite usage'
    },
    {
        id: 'embassy_evacuations',
        category: 'Diplomatic',
        indicator: 'Mass embassy evacuations',
        current_status: 'Inactive',
        severity: 'High',
        timeframe: 'Days to weeks',
        last_triggered: null,
        description: 'No current mass evacuations detected'
    },
    {
        id: 'cyber_attacks',
        category: 'Information',
        indicator: 'Global infrastructure cyber attacks',
        current_status: 'Monitoring',
        severity: 'High',
        timeframe: 'Hours',
        last_triggered: '2024-01-12T22:15:00Z',
        description: 'Increased targeting of critical infrastructure'
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

