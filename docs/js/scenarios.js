// Scenario data and functionality

function getScenarioData(scenarioId) {
    const scenarios = {
        'israel-iran': {
            title: 'Israel-Iran Regional Confrontation Analysis',
            content: `
                <div class="scenario-analysis">
                    <div class="risk-overview">
                        <h3>Current Risk Assessment</h3>
                        <div class="risk-metrics">
                            <div class="metric">
                                <span class="metric-label">Overall Risk Score</span>
                                <span class="metric-value critical">85/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Nuclear Escalation Risk</span>
                                <span class="metric-value extreme">92/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Regional Impact</span>
                                <span class="metric-value high">78/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Global Economic Impact</span>
                                <span class="metric-value high">81/100</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="scenario-factors">
                        <h3>Key Risk Factors</h3>
                        <div class="factors-grid">
                            <div class="factor-card">
                                <i class="fas fa-radiation"></i>
                                <h4>Nuclear Capabilities</h4>
                                <p>Israel's undeclared nuclear arsenal vs Iran's nuclear program creates extreme escalation risk</p>
                                <span class="factor-risk extreme">EXTREME</span>
                            </div>
                            <div class="factor-card">
                                <i class="fas fa-oil-can"></i>
                                <h4>Strait of Hormuz</h4>
                                <p>Iran's ability to close critical oil shipping lane threatens global energy security</p>
                                <span class="factor-risk critical">CRITICAL</span>
                            </div>
                            <div class="factor-card">
                                <i class="fas fa-users"></i>
                                <h4>Proxy Networks</h4>
                                <p>Hezbollah, Hamas, and other proxies create multiple conflict vectors</p>
                                <span class="factor-risk high">HIGH</span>
                            </div>
                            <div class="factor-card">
                                <i class="fas fa-handshake"></i>
                                <h4>US Involvement</h4>
                                <p>American security guarantees to Israel could trigger broader conflict</p>
                                <span class="factor-risk high">HIGH</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="escalation-scenarios">
                        <h3>Escalation Scenarios</h3>
                        <div class="scenario-timeline">
                            <div class="timeline-item">
                                <div class="timeline-marker critical"></div>
                                <div class="timeline-content">
                                    <h4>Immediate (1-7 days)</h4>
                                    <p>Israeli preemptive strike on Iranian nuclear facilities</p>
                                    <span class="probability">Probability: 35%</span>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-marker high"></div>
                                <div class="timeline-content">
                                    <h4>Short-term (1-4 weeks)</h4>
                                    <p>Iranian retaliation through proxy forces and missile strikes</p>
                                    <span class="probability">Probability: 65%</span>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-marker moderate"></div>
                                <div class="timeline-content">
                                    <h4>Medium-term (1-6 months)</h4>
                                    <p>Regional powers choose sides, oil prices spike globally</p>
                                    <span class="probability">Probability: 45%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mitigation-strategies">
                        <h3>Risk Mitigation Strategies</h3>
                        <ul class="strategy-list">
                            <li><i class="fas fa-comments"></i> Immediate diplomatic intervention by major powers</li>
                            <li><i class="fas fa-shield-alt"></i> Enhanced regional security cooperation</li>
                            <li><i class="fas fa-balance-scale"></i> Economic incentives for de-escalation</li>
                            <li><i class="fas fa-eye"></i> Increased international monitoring of nuclear facilities</li>
                            <li><i class="fas fa-handshake"></i> Back-channel communications between adversaries</li>
                        </ul>
                    </div>
                </div>
            `
        },
        
        'russia-ukraine': {
            title: 'Russia-Ukraine War Escalation Analysis',
            content: `
                <div class="scenario-analysis">
                    <div class="risk-overview">
                        <h3>Current Risk Assessment</h3>
                        <div class="risk-metrics">
                            <div class="metric">
                                <span class="metric-label">Overall Risk Score</span>
                                <span class="metric-value high">78/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">NATO Involvement Risk</span>
                                <span class="metric-value high">75/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Nuclear Escalation Risk</span>
                                <span class="metric-value critical">82/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Energy Security Impact</span>
                                <span class="metric-value high">79/100</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="scenario-factors">
                        <h3>Key Risk Factors</h3>
                        <div class="factors-grid">
                            <div class="factor-card">
                                <i class="fas fa-shield-alt"></i>
                                <h4>NATO Article 5</h4>
                                <p>Russian attack on NATO territory would trigger collective defense</p>
                                <span class="factor-risk critical">CRITICAL</span>
                            </div>
                            <div class="factor-card">
                                <i class="fas fa-bolt"></i>
                                <h4>Energy Warfare</h4>
                                <p>Gas pipeline disruptions affect European energy security</p>
                                <span class="factor-risk high">HIGH</span>
                            </div>
                            <div class="factor-card">
                                <i class="fas fa-bomb"></i>
                                <h4>Tactical Nuclear Weapons</h4>
                                <p>Russia's threats to use tactical nukes in Ukraine</p>
                                <span class="factor-risk extreme">EXTREME</span>
                            </div>
                            <div class="factor-card">
                                <i class="fas fa-satellite"></i>
                                <h4>Cyber Warfare</h4>
                                <p>Attacks on critical infrastructure beyond Ukraine</p>
                                <span class="factor-risk high">HIGH</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="escalation-scenarios">
                        <h3>Escalation Scenarios</h3>
                        <div class="scenario-timeline">
                            <div class="timeline-item">
                                <div class="timeline-marker critical"></div>
                                <div class="timeline-content">
                                    <h4>Immediate (1-7 days)</h4>
                                    <p>Russian tactical nuclear weapon use in Ukraine</p>
                                    <span class="probability">Probability: 15%</span>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-marker high"></div>
                                <div class="timeline-content">
                                    <h4>Short-term (1-4 weeks)</h4>
                                    <p>NATO direct military intervention in Ukraine</p>
                                    <span class="probability">Probability: 25%</span>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-marker moderate"></div>
                                <div class="timeline-content">
                                    <h4>Medium-term (1-6 months)</h4>
                                    <p>Conflict spreads to Moldova or Baltic states</p>
                                    <span class="probability">Probability: 30%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mitigation-strategies">
                        <h3>Risk Mitigation Strategies</h3>
                        <ul class="strategy-list">
                            <li><i class="fas fa-comments"></i> Maintain diplomatic channels with Russia</li>
                            <li><i class="fas fa-shield-alt"></i> Strengthen NATO eastern flank defenses</li>
                            <li><i class="fas fa-bolt"></i> Diversify European energy sources</li>
                            <li><i class="fas fa-eye"></i> Enhanced nuclear monitoring and verification</li>
                            <li><i class="fas fa-users"></i> Humanitarian corridors and civilian protection</li>
                        </ul>
                    </div>
                </div>
            `
        },
        
        'us-china-taiwan': {
            title: 'US-China Taiwan Strait Crisis Analysis',
            content: `
                <div class="scenario-analysis">
                    <div class="risk-overview">
                        <h3>Current Risk Assessment</h3>
                        <div class="risk-metrics">
                            <div class="metric">
                                <span class="metric-label">Overall Risk Score</span>
                                <span class="metric-value high">72/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Military Confrontation Risk</span>
                                <span class="metric-value high">76/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Economic Disruption Risk</span>
                                <span class="metric-value critical">88/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Alliance Activation Risk</span>
                                <span class="metric-value moderate">68/100</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="scenario-factors">
                        <h3>Key Risk Factors</h3>
                        <div class="factors-grid">
                            <div class="factor-card">
                                <i class="fas fa-microchip"></i>
                                <h4>Semiconductor Crisis</h4>
                                <p>Taiwan produces 90% of advanced semiconductors globally</p>
                                <span class="factor-risk extreme">EXTREME</span>
                            </div>
                            <div class="factor-card">
                                <i class="fas fa-handshake"></i>
                                <h4>Alliance Networks</h4>
                                <p>QUAD, AUKUS, and bilateral treaties create escalation risks</p>
                                <span class="factor-risk high">HIGH</span>
                            </div>
                            <div class="factor-card">
                                <i class="fas fa-chart-line"></i>
                                <h4>Economic Interdependence</h4>
                                <p>US-China trade relationship complicates military response</p>
                                <span class="factor-risk moderate">MODERATE</span>
                            </div>
                            <div class="factor-card">
                                <i class="fas fa-water"></i>
                                <h4>Naval Blockade</h4>
                                <p>Chinese blockade of Taiwan would disrupt global shipping</p>
                                <span class="factor-risk high">HIGH</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="escalation-scenarios">
                        <h3>Escalation Scenarios</h3>
                        <div class="scenario-timeline">
                            <div class="timeline-item">
                                <div class="timeline-marker high"></div>
                                <div class="timeline-content">
                                    <h4>Immediate (1-7 days)</h4>
                                    <p>Chinese naval blockade of Taiwan</p>
                                    <span class="probability">Probability: 20%</span>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-marker critical"></div>
                                <div class="timeline-content">
                                    <h4>Short-term (1-4 weeks)</h4>
                                    <p>US naval intervention to break blockade</p>
                                    <span class="probability">Probability: 40%</span>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-marker high"></div>
                                <div class="timeline-content">
                                    <h4>Medium-term (1-6 months)</h4>
                                    <p>Full-scale amphibious invasion of Taiwan</p>
                                    <span class="probability">Probability: 15%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mitigation-strategies">
                        <h3>Risk Mitigation Strategies</h3>
                        <ul class="strategy-list">
                            <li><i class="fas fa-comments"></i> High-level diplomatic engagement</li>
                            <li><i class="fas fa-microchip"></i> Diversify semiconductor supply chains</li>
                            <li><i class="fas fa-balance-scale"></i> Maintain strategic ambiguity on Taiwan</li>
                            <li><i class="fas fa-shield-alt"></i> Strengthen Taiwan's defensive capabilities</li>
                            <li><i class="fas fa-handshake"></i> Multilateral crisis management mechanisms</li>
                        </ul>
                    </div>
                </div>
            `
        },
        
        'world-war': {
            title: 'World War III Risk Assessment',
            content: `
                <div class="scenario-analysis world-war-analysis">
                    <div class="alert-banner">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>EXTREME GLOBAL ALERT: Multiple scenarios show significant World War III escalation risk</span>
                    </div>
                    
                    <div class="risk-overview">
                        <h3>Global War Risk Assessment</h3>
                        <div class="risk-metrics">
                            <div class="metric">
                                <span class="metric-label">World War III Probability</span>
                                <span class="metric-value extreme">88/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Nuclear Exchange Risk</span>
                                <span class="metric-value extreme">91/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Alliance Cascade Risk</span>
                                <span class="metric-value critical">84/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Economic Collapse Risk</span>
                                <span class="metric-value critical">86/100</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="escalation-pathways">
                        <h3>Pathways to World War III</h3>
                        <div class="pathways-grid">
                            <div class="pathway-card critical">
                                <i class="fas fa-fire"></i>
                                <h4>Multi-Front Crisis</h4>
                                <p>Simultaneous conflicts in Europe, Middle East, and Pacific overwhelm global response</p>
                                <div class="pathway-probability">
                                    <span>Probability: HIGH</span>
                                    <span>Timeline: 2-8 weeks</span>
                                </div>
                            </div>
                            <div class="pathway-card extreme">
                                <i class="fas fa-atom"></i>
                                <h4>Nuclear Escalation</h4>
                                <p>First use of nuclear weapons triggers strategic exchange between superpowers</p>
                                <div class="pathway-probability">
                                    <span>Probability: VERY HIGH</span>
                                    <span>Timeline: 1-7 days</span>
                                </div>
                            </div>
                            <div class="pathway-card critical">
                                <i class="fas fa-network-wired"></i>
                                <h4>Alliance Cascade</h4>
                                <p>NATO Article 5 or equivalent triggers automatic military responses</p>
                                <div class="pathway-probability">
                                    <span>Probability: HIGH</span>
                                    <span>Timeline: 1-4 weeks</span>
                                </div>
                            </div>
                            <div class="pathway-card high">
                                <i class="fas fa-chart-line"></i>
                                <h4>Economic Warfare</h4>
                                <p>Complete economic decoupling escalates to military conflict</p>
                                <div class="pathway-probability">
                                    <span>Probability: MODERATE</span>
                                    <span>Timeline: 6-18 months</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="critical-thresholds">
                        <h3>Critical Thresholds</h3>
                        <div class="thresholds-list">
                            <div class="threshold-item extreme">
                                <div class="threshold-icon">
                                    <i class="fas fa-radiation"></i>
                                </div>
                                <div class="threshold-content">
                                    <h4>Nuclear Weapon Use</h4>
                                    <p>Any nuclear weapon detonation in anger</p>
                                    <span class="threshold-risk">WW3 Probability: >90%</span>
                                </div>
                            </div>
                            <div class="threshold-item critical">
                                <div class="threshold-icon">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <div class="threshold-content">
                                    <h4>NATO Article 5 Invocation</h4>
                                    <p>Collective defense clause activated</p>
                                    <span class="threshold-risk">WW3 Probability: 70-90%</span>
                                </div>
                            </div>
                            <div class="threshold-item high">
                                <div class="threshold-icon">
                                    <i class="fas fa-building"></i>
                                </div>
                                <div class="threshold-content">
                                    <h4>Capital City Attack</h4>
                                    <p>Direct attack on major power capital</p>
                                    <span class="threshold-risk">WW3 Probability: 60-80%</span>
                                </div>
                            </div>
                            <div class="threshold-item moderate">
                                <div class="threshold-icon">
                                    <i class="fas fa-wifi"></i>
                                </div>
                                <div class="threshold-content">
                                    <h4>Global Infrastructure Collapse</h4>
                                    <p>Internet, GPS, or financial system disruption</p>
                                    <span class="threshold-risk">WW3 Probability: 40-60%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="prevention-strategies">
                        <h3>Critical Prevention Strategies</h3>
                        <div class="strategies-urgent">
                            <h4>URGENT (Immediate Implementation Required)</h4>
                            <ul class="strategy-list urgent">
                                <li><i class="fas fa-phone"></i> Establish direct leader-to-leader communication channels</li>
                                <li><i class="fas fa-users"></i> Deploy immediate international mediation efforts</li>
                                <li><i class="fas fa-cogs"></i> Activate all available de-escalation mechanisms</li>
                                <li><i class="fas fa-chart-line"></i> Implement emergency economic stabilization measures</li>
                            </ul>
                        </div>
                        <div class="strategies-medium">
                            <h4>MEDIUM-TERM (1-6 months)</h4>
                            <ul class="strategy-list medium">
                                <li><i class="fas fa-balance-scale"></i> Strengthen international institutions and mediation capacity</li>
                                <li><i class="fas fa-eye"></i> Invest in early warning systems and crisis management</li>
                                <li><i class="fas fa-heart"></i> Prepare humanitarian response capabilities</li>
                                <li><i class="fas fa-shield-alt"></i> Establish cyber warfare norms and agreements</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="disclaimer">
                        <p><strong>DISCLAIMER:</strong> This analysis is for research and conflict prevention purposes only. All stakeholders should prioritize diplomatic solutions and de-escalation measures.</p>
                    </div>
                </div>
            `
        }
    };
    
    return scenarios[scenarioId] || {
        title: 'Scenario Not Found',
        content: '<p>The requested scenario analysis is not available.</p>'
    };
}

