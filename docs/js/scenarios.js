function getScenarioData(scenarioId) {
    const currentLang = document.documentElement.lang || 'en';
    
    const scenarios = {
        'israel-iran': {
            en: {
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
            pt: {
                title: 'Análise do Confronto Regional Israel-Irã',
                content: `
                    <div class="scenario-analysis">
                        <div class="risk-overview">
                            <h3>Avaliação Atual de Risco</h3>
                            <div class="risk-metrics">
                                <div class="metric">
                                    <span class="metric-label">Pontuação Geral de Risco</span>
                                    <span class="metric-value critical">85/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Risco de Escalada Nuclear</span>
                                    <span class="metric-value extreme">92/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Impacto Regional</span>
                                    <span class="metric-value high">78/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Impacto Econômico Global</span>
                                    <span class="metric-value high">81/100</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="scenario-factors">
                            <h3>Principais Fatores de Risco</h3>
                            <div class="factors-grid">
                                <div class="factor-card">
                                    <i class="fas fa-radiation"></i>
                                    <h4>Capacidades Nucleares</h4>
                                    <p>Arsenal nuclear não declarado de Israel vs programa nuclear iraniano cria risco extremo de escalada</p>
                                    <span class="factor-risk extreme">EXTREMO</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-oil-can"></i>
                                    <h4>Estreito de Hormuz</h4>
                                    <p>Capacidade do Irã de fechar rota crítica de petróleo ameaça segurança energética global</p>
                                    <span class="factor-risk critical">CRÍTICO</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-users"></i>
                                    <h4>Redes de Proxy</h4>
                                    <p>Hezbollah, Hamas e outros proxies criam múltiplos vetores de conflito</p>
                                    <span class="factor-risk high">ALTO</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-handshake"></i>
                                    <h4>Envolvimento dos EUA</h4>
                                    <p>Garantias de segurança americanas a Israel podem desencadear conflito mais amplo</p>
                                    <span class="factor-risk high">ALTO</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="escalation-scenarios">
                            <h3>Cenários de Escalada</h3>
                            <div class="scenario-timeline">
                                <div class="timeline-item">
                                    <div class="timeline-marker critical"></div>
                                    <div class="timeline-content">
                                        <h4>Imediato (1-7 dias)</h4>
                                        <p>Ataque preventivo israelense em instalações nucleares iranianas</p>
                                        <span class="probability">Probabilidade: 35%</span>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-marker high"></div>
                                    <div class="timeline-content">
                                        <h4>Curto prazo (1-4 semanas)</h4>
                                        <p>Retaliação iraniana através de forças proxy e ataques de mísseis</p>
                                        <span class="probability">Probabilidade: 65%</span>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-marker moderate"></div>
                                    <div class="timeline-content">
                                        <h4>Médio prazo (1-6 meses)</h4>
                                        <p>Potências regionais escolhem lados, preços do petróleo disparam globalmente</p>
                                        <span class="probability">Probabilidade: 45%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mitigation-strategies">
                            <h3>Estratégias de Mitigação de Risco</h3>
                            <ul class="strategy-list">
                                <li><i class="fas fa-comments"></i> Intervenção diplomática imediata das grandes potências</li>
                                <li><i class="fas fa-shield-alt"></i> Cooperação de segurança regional aprimorada</li>
                                <li><i class="fas fa-balance-scale"></i> Incentivos econômicos para desescalada</li>
                                <li><i class="fas fa-eye"></i> Monitoramento internacional aumentado de instalações nucleares</li>
                                <li><i class="fas fa-handshake"></i> Comunicações por canais alternativos entre adversários</li>
                            </ul>
                        </div>
                    </div>
                `
            }
        },
        'russia-ukraine': {
            en: {
                title: 'Russia-Ukraine Conflict Analysis',
                content: `
                    <div class="scenario-analysis">
                        <div class="risk-overview">
                            <h3>Current Conflict Status</h3>
                            <div class="risk-metrics">
                                <div class="metric">
                                    <span class="metric-label">Escalation Risk</span>
                                    <span class="metric-value critical">88/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">NATO Involvement Risk</span>
                                    <span class="metric-value high">75/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Nuclear Threat Level</span>
                                    <span class="metric-value extreme">95/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Global Economic Impact</span>
                                    <span class="metric-value critical">89/100</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="scenario-factors">
                            <h3>Critical Factors</h3>
                            <div class="factors-grid">
                                <div class="factor-card">
                                    <i class="fas fa-bomb"></i>
                                    <h4>Nuclear Arsenal</h4>
                                    <p>Russia's largest nuclear arsenal creates existential threat scenario</p>
                                    <span class="factor-risk extreme">EXTREME</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-shield-alt"></i>
                                    <h4>NATO Article 5</h4>
                                    <p>Any attack on NATO territory triggers collective defense</p>
                                    <span class="factor-risk critical">CRITICAL</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-gas-pump"></i>
                                    <h4>Energy Warfare</h4>
                                    <p>European energy dependence creates economic vulnerability</p>
                                    <span class="factor-risk high">HIGH</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-wheat-awn"></i>
                                    <h4>Food Security</h4>
                                    <p>Ukraine grain exports critical for global food supply</p>
                                    <span class="factor-risk high">HIGH</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            pt: {
                title: 'Análise do Conflito Rússia-Ucrânia',
                content: `
                    <div class="scenario-analysis">
                        <div class="risk-overview">
                            <h3>Status Atual do Conflito</h3>
                            <div class="risk-metrics">
                                <div class="metric">
                                    <span class="metric-label">Risco de Escalada</span>
                                    <span class="metric-value critical">88/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Risco de Envolvimento da OTAN</span>
                                    <span class="metric-value high">75/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Nível de Ameaça Nuclear</span>
                                    <span class="metric-value extreme">95/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Impacto Econômico Global</span>
                                    <span class="metric-value critical">89/100</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="scenario-factors">
                            <h3>Fatores Críticos</h3>
                            <div class="factors-grid">
                                <div class="factor-card">
                                    <i class="fas fa-bomb"></i>
                                    <h4>Arsenal Nuclear</h4>
                                    <p>Maior arsenal nuclear da Rússia cria cenário de ameaça existencial</p>
                                    <span class="factor-risk extreme">EXTREMO</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-shield-alt"></i>
                                    <h4>Artigo 5 da OTAN</h4>
                                    <p>Qualquer ataque ao território da OTAN aciona defesa coletiva</p>
                                    <span class="factor-risk critical">CRÍTICO</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-gas-pump"></i>
                                    <h4>Guerra Energética</h4>
                                    <p>Dependência energética europeia cria vulnerabilidade econômica</p>
                                    <span class="factor-risk high">ALTO</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-wheat-awn"></i>
                                    <h4>Segurança Alimentar</h4>
                                    <p>Exportações de grãos ucranianos críticas para suprimento global de alimentos</p>
                                    <span class="factor-risk high">ALTO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        },
        'china-taiwan': {
            en: {
                title: 'China-Taiwan Strait Crisis Analysis',
                content: `
                    <div class="scenario-analysis">
                        <div class="risk-overview">
                            <h3>Taiwan Strait Tension Assessment</h3>
                            <div class="risk-metrics">
                                <div class="metric">
                                    <span class="metric-label">Invasion Probability</span>
                                    <span class="metric-value high">72/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">US Military Response</span>
                                    <span class="metric-value critical">85/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Global Tech Impact</span>
                                    <span class="metric-value extreme">94/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Economic Disruption</span>
                                    <span class="metric-value critical">87/100</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="scenario-factors">
                            <h3>Strategic Factors</h3>
                            <div class="factors-grid">
                                <div class="factor-card">
                                    <i class="fas fa-microchip"></i>
                                    <h4>Semiconductor Dominance</h4>
                                    <p>Taiwan produces 90% of advanced semiconductors globally</p>
                                    <span class="factor-risk extreme">EXTREME</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-anchor"></i>
                                    <h4>Naval Blockade</h4>
                                    <p>Chinese naval capabilities enable effective blockade strategy</p>
                                    <span class="factor-risk critical">CRITICAL</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-flag-usa"></i>
                                    <h4>US Security Commitment</h4>
                                    <p>Strategic ambiguity vs Taiwan Relations Act obligations</p>
                                    <span class="factor-risk high">HIGH</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-globe-asia"></i>
                                    <h4>Regional Alliance</h4>
                                    <p>Japan, Australia involvement could escalate to regional war</p>
                                    <span class="factor-risk high">HIGH</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            pt: {
                title: 'Análise da Crise do Estreito de Taiwan China-Taiwan',
                content: `
                    <div class="scenario-analysis">
                        <div class="risk-overview">
                            <h3>Avaliação da Tensão no Estreito de Taiwan</h3>
                            <div class="risk-metrics">
                                <div class="metric">
                                    <span class="metric-label">Probabilidade de Invasão</span>
                                    <span class="metric-value high">72/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Resposta Militar dos EUA</span>
                                    <span class="metric-value critical">85/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Impacto Tecnológico Global</span>
                                    <span class="metric-value extreme">94/100</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Disrupção Econômica</span>
                                    <span class="metric-value critical">87/100</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="scenario-factors">
                            <h3>Fatores Estratégicos</h3>
                            <div class="factors-grid">
                                <div class="factor-card">
                                    <i class="fas fa-microchip"></i>
                                    <h4>Domínio de Semicondutores</h4>
                                    <p>Taiwan produz 90% dos semicondutores avançados globalmente</p>
                                    <span class="factor-risk extreme">EXTREMO</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-anchor"></i>
                                    <h4>Bloqueio Naval</h4>
                                    <p>Capacidades navais chinesas permitem estratégia de bloqueio efetiva</p>
                                    <span class="factor-risk critical">CRÍTICO</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-flag-usa"></i>
                                    <h4>Compromisso de Segurança dos EUA</h4>
                                    <p>Ambiguidade estratégica vs obrigações do Ato de Relações com Taiwan</p>
                                    <span class="factor-risk high">ALTO</span>
                                </div>
                                <div class="factor-card">
                                    <i class="fas fa-globe-asia"></i>
                                    <h4>Aliança Regional</h4>
                                    <p>Envolvimento do Japão e Austrália pode escalar para guerra regional</p>
                                    <span class="factor-risk high">ALTO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    };
    
    const lang = currentLang === 'pt' ? 'pt' : 'en';
    return scenarios[scenarioId] ? scenarios[scenarioId][lang] : null;
}

function getWorldWarAnalysis() {
    const currentLang = document.documentElement.lang || 'en';
    
    const analysis = {
        en: {
            title: 'World War Risk Analysis',
            content: `
                <div class="world-war-analysis">
                    <div class="risk-overview">
                        <h3>Global Conflict Escalation Assessment</h3>
                        <div class="risk-metrics">
                            <div class="metric">
                                <span class="metric-label">World War III Probability</span>
                                <span class="metric-value critical">23/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Nuclear Exchange Risk</span>
                                <span class="metric-value high">67/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Alliance Activation</span>
                                <span class="metric-value critical">78/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Economic Collapse Risk</span>
                                <span class="metric-value high">71/100</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="escalation-paths">
                        <h3>Escalation Pathways to Global Conflict</h3>
                        <div class="pathway-grid">
                            <div class="pathway-card">
                                <h4>NATO Article 5 Trigger</h4>
                                <p>Russian attack on NATO territory automatically involves all 31 members</p>
                                <div class="pathway-risk critical">HIGH PROBABILITY</div>
                                <div class="pathway-timeline">Timeline: Hours to Days</div>
                            </div>
                            <div class="pathway-card">
                                <h4>Taiwan Invasion Response</h4>
                                <p>US military intervention draws in Japan, Australia, potentially UK</p>
                                <div class="pathway-risk high">MODERATE PROBABILITY</div>
                                <div class="pathway-timeline">Timeline: Days to Weeks</div>
                            </div>
                            <div class="pathway-card">
                                <h4>Middle East Nuclear Exchange</h4>
                                <p>Israel-Iran nuclear conflict forces global powers to choose sides</p>
                                <div class="pathway-risk moderate">LOW PROBABILITY</div>
                                <div class="pathway-timeline">Timeline: Weeks to Months</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="combined-scenarios">
                        <h3>Multi-Front Conflict Analysis</h3>
                        <div class="scenario-combinations">
                            <div class="combination-item">
                                <h4>Russia-Ukraine + China-Taiwan</h4>
                                <p>Coordinated action by authoritarian powers</p>
                                <span class="combination-risk extreme">EXTREME RISK</span>
                            </div>
                            <div class="combination-item">
                                <h4>Middle East + Europe Conflicts</h4>
                                <p>Simultaneous crises strain Western resources</p>
                                <span class="combination-risk critical">CRITICAL RISK</span>
                            </div>
                            <div class="combination-item">
                                <h4>Cyber + Kinetic Warfare</h4>
                                <p>Digital attacks precede physical conflicts</p>
                                <span class="combination-risk high">HIGH RISK</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="prevention-measures">
                        <h3>Global War Prevention Strategies</h3>
                        <ul class="prevention-list">
                            <li><i class="fas fa-comments"></i> Maintain diplomatic channels even during crises</li>
                            <li><i class="fas fa-balance-scale"></i> Economic interdependence as conflict deterrent</li>
                            <li><i class="fas fa-shield-alt"></i> Nuclear deterrence and arms control agreements</li>
                            <li><i class="fas fa-users"></i> International institutions and peacekeeping forces</li>
                            <li><i class="fas fa-eye"></i> Early warning systems and conflict prediction</li>
                            <li><i class="fas fa-handshake"></i> Crisis management protocols between superpowers</li>
                        </ul>
                    </div>
                </div>
            `
        },
        pt: {
            title: 'Análise de Risco de Guerra Mundial',
            content: `
                <div class="world-war-analysis">
                    <div class="risk-overview">
                        <h3>Avaliação de Escalada de Conflito Global</h3>
                        <div class="risk-metrics">
                            <div class="metric">
                                <span class="metric-label">Probabilidade de Terceira Guerra Mundial</span>
                                <span class="metric-value critical">23/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Risco de Troca Nuclear</span>
                                <span class="metric-value high">67/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Ativação de Alianças</span>
                                <span class="metric-value critical">78/100</span>
                            </div>
                            <div class="metric">
                                <span class="metric-label">Risco de Colapso Econômico</span>
                                <span class="metric-value high">71/100</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="escalation-paths">
                        <h3>Caminhos de Escalada para Conflito Global</h3>
                        <div class="pathway-grid">
                            <div class="pathway-card">
                                <h4>Ativação do Artigo 5 da OTAN</h4>
                                <p>Ataque russo ao território da OTAN envolve automaticamente todos os 31 membros</p>
                                <div class="pathway-risk critical">ALTA PROBABILIDADE</div>
                                <div class="pathway-timeline">Cronograma: Horas a Dias</div>
                            </div>
                            <div class="pathway-card">
                                <h4>Resposta à Invasão de Taiwan</h4>
                                <p>Intervenção militar dos EUA atrai Japão, Austrália, potencialmente Reino Unido</p>
                                <div class="pathway-risk high">PROBABILIDADE MODERADA</div>
                                <div class="pathway-timeline">Cronograma: Dias a Semanas</div>
                            </div>
                            <div class="pathway-card">
                                <h4>Troca Nuclear no Oriente Médio</h4>
                                <p>Conflito nuclear Israel-Irã força potências globais a escolher lados</p>
                                <div class="pathway-risk moderate">BAIXA PROBABILIDADE</div>
                                <div class="pathway-timeline">Cronograma: Semanas a Meses</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="combined-scenarios">
                        <h3>Análise de Conflito Multi-Frente</h3>
                        <div class="scenario-combinations">
                            <div class="combination-item">
                                <h4>Rússia-Ucrânia + China-Taiwan</h4>
                                <p>Ação coordenada por potências autoritárias</p>
                                <span class="combination-risk extreme">RISCO EXTREMO</span>
                            </div>
                            <div class="combination-item">
                                <h4>Conflitos Oriente Médio + Europa</h4>
                                <p>Crises simultâneas sobrecarregam recursos ocidentais</p>
                                <span class="combination-risk critical">RISCO CRÍTICO</span>
                            </div>
                            <div class="combination-item">
                                <h4>Guerra Cibernética + Cinética</h4>
                                <p>Ataques digitais precedem conflitos físicos</p>
                                <span class="combination-risk high">RISCO ALTO</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="prevention-measures">
                        <h3>Estratégias de Prevenção de Guerra Global</h3>
                        <ul class="prevention-list">
                            <li><i class="fas fa-comments"></i> Manter canais diplomáticos mesmo durante crises</li>
                            <li><i class="fas fa-balance-scale"></i> Interdependência econômica como dissuasor de conflitos</li>
                            <li><i class="fas fa-shield-alt"></i> Dissuasão nuclear e acordos de controle de armas</li>
                            <li><i class="fas fa-users"></i> Instituições internacionais e forças de manutenção da paz</li>
                            <li><i class="fas fa-eye"></i> Sistemas de alerta precoce e previsão de conflitos</li>
                            <li><i class="fas fa-handshake"></i> Protocolos de gestão de crises entre superpotências</li>
                        </ul>
                    </div>
                </div>
            `
        }
    };
    
    const lang = currentLang === 'pt' ? 'pt' : 'en';
    return analysis[lang];
}

// Modal functions
function openScenarioModal(scenarioId) {
    const modal = document.getElementById('scenario-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    const scenarioData = getScenarioData(scenarioId);
    if (scenarioData) {
        modalTitle.textContent = scenarioData.title;
        modalContent.innerHTML = scenarioData.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function openWorldWarModal() {
    const modal = document.getElementById('scenario-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    const analysisData = getWorldWarAnalysis();
    modalTitle.textContent = analysisData.title;
    modalContent.innerHTML = analysisData.content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('scenario-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('scenario-modal');
    if (event.target === modal) {
        closeModal();
    }
}

