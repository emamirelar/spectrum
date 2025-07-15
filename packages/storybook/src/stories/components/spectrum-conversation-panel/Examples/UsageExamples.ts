import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Customer Support Scenarios
export const technicalSupportConversation = `[
  {
    "id": "tech-support-001",
    "message": "I'm getting a 'Failed to Connect' error when trying to access my account dashboard. This started happening after the latest update.",
    "sender": "request",
    "timestamp": "2024-03-20T09:30:00Z"
  },
  {
    "id": "tech-support-002",
    "message": "I understand you're experiencing connection issues after our recent update. Let me help you resolve this quickly.<br><br><strong>Let's start with these troubleshooting steps:</strong><br><br>**Step 1: Clear Browser Data**<br>• Clear your browser cache and cookies<sup>1</sup><br>• Try accessing your dashboard in an incognito/private window<cite>2</cite><br><br>**Step 2: Check Network Settings**<br>• Verify your internet connection is stable<br>• Disable any VPN or proxy connections temporarily<sup>3</sup><br><br>**Step 3: Browser Compatibility**<br>• Ensure you're using a supported browser version<cite>4</cite><br>• Try accessing from a different browser<br><br>Can you try Step 1 first and let me know if the issue persists?",
    "sender": "response",
    "timestamp": "2024-03-20T09:30:45Z",
    "sources": [
      {
        "label": "Browser Cache Clearing Guide",
        "value": "https://support.help/clear-cache-cookies",
        "snippet": "Step-by-step instructions for clearing browser cache and cookies in all major browsers.",
        "number": "1"
      },
      {
        "label": "Incognito Mode Troubleshooting",
        "value": "https://support.help/incognito-troubleshooting",
        "snippet": "How to use private browsing mode to diagnose browser-related issues.",
        "number": "2"
      },
      {
        "label": "Network Connection Diagnostics",
        "value": "https://support.help/network-diagnostics",
        "snippet": "Guide to diagnosing and resolving network connectivity problems.",
        "number": "3"
      },
      {
        "label": "Supported Browser Versions",
        "value": "https://support.help/browser-compatibility",
        "snippet": "List of supported browsers and minimum version requirements for optimal performance.",
        "number": "4"
      }
    ],
    "explorations": [
      {
        "label": "What if clearing cache doesn't work?",
        "value": "I tried clearing my cache but I'm still getting the same error. What's the next step?"
      },
      {
        "label": "How can I prevent this issue in the future?",
        "value": "What can I do to avoid connection problems after future updates?"
      },
      {
        "label": "Is this a known issue affecting other users?",
        "value": "Are other users reporting similar connection problems after the update?"
      }
    ]
  }
]`;

// Educational/Tutoring Scenarios
export const languageLearningConversation = `[
  {
    "id": "language-001",
    "message": "I'm learning French and I'm confused about when to use 'être' vs 'avoir' as auxiliary verbs in compound tenses. Can you explain this?",
    "sender": "request",
    "timestamp": "2024-03-20T14:15:00Z"
  },
  {
    "id": "language-002",
    "message": "Excellent question! The choice between 'être' and 'avoir' in French compound tenses follows specific patterns<sup>1</sup>.<br><br><strong>Use ÊTRE with:</strong><br>• **Movement verbs**: aller, venir, partir, arriver, sortir, entrer<cite>2</cite><br>• **State-change verbs**: naître, mourir, devenir<sup>3</sup><br>• **Reflexive verbs**: se laver, se lever, s'habiller<cite>4</cite><br><br><strong>Use AVOIR with:</strong><br>• **Most other verbs**: manger, parler, finir, prendre<sup>5</sup><br>• **Transitive verbs** (verbs with direct objects)<cite>6</cite><br><br><strong>Memory Tip:</strong> Remember the acronym **DR MRS VANDERTRAMP**<sup>7</sup> for the main être verbs!<br><br>**Examples:**<br>• J'ai mangé (I ate) - AVOIR<br>• Je suis allé(e) (I went) - ÊTRE<br>• Elle s'est lavée (She washed herself) - ÊTRE",
    "sender": "response",
    "timestamp": "2024-03-20T14:15:30Z",
    "sources": [
      {
        "label": "French Grammar Guide - Auxiliary Verbs",
        "value": "https://www.lawlessfrench.com/grammar/auxiliary-verbs/",
        "snippet": "Comprehensive guide to être and avoir usage in French compound tenses.",
        "number": "1"
      },
      {
        "label": "Movement Verbs with Être",
        "value": "https://www.frenchgrammar.org/movement-verbs",
        "snippet": "Complete list of French movement verbs that require être as auxiliary.",
        "number": "2"
      },
      {
        "label": "State-Change Verbs Reference",
        "value": "https://www.conjugation.com/state-change-verbs",
        "snippet": "French verbs indicating state changes and their conjugation with être.",
        "number": "3"
      },
      {
        "label": "Reflexive Verbs Conjugation",
        "value": "https://www.frenchreflexiveverbs.com/conjugation",
        "snippet": "Guide to conjugating French reflexive verbs with être auxiliary.",
        "number": "4"
      },
      {
        "label": "Avoir Auxiliary Verb Usage",
        "value": "https://www.frenchgrammar.org/avoir-auxiliary",
        "snippet": "When and how to use avoir as auxiliary verb in French compound tenses.",
        "number": "5"
      },
      {
        "label": "Transitive vs Intransitive Verbs",
        "value": "https://www.frenchverbs.org/transitive-intransitive",
        "snippet": "Understanding the difference between transitive and intransitive French verbs.",
        "number": "6"
      },
      {
        "label": "DR MRS VANDERTRAMP Memory Aid",
        "value": "https://www.frenchmemory.com/vandertramp",
        "snippet": "Mnemonic device for remembering French verbs that use être auxiliary.",
        "number": "7"
      }
    ],
    "explorations": [
      {
        "label": "Can you give me practice exercises with être and avoir?",
        "value": "I'd like some practice sentences to conjugate using être and avoir auxiliaries"
      },
      {
        "label": "What about past participle agreement rules?",
        "value": "How do past participle agreement rules work with être and avoir?"
      },
      {
        "label": "Are there any exceptions to these rules?",
        "value": "Are there French verbs that break the normal être/avoir patterns?"
      }
    ]
  }
]`;

// Research and Academic Scenarios
export const literatureResearchConversation = `[
  {
    "id": "lit-research-001",
    "message": "I'm writing a paper on the influence of Gothic literature on modern horror fiction. Can you help me find scholarly sources and identify key connections?",
    "sender": "request",
    "timestamp": "2024-03-20T11:45:00Z"
  },
  {
    "id": "lit-research-002",
    "message": "I'd be delighted to assist with your Gothic literature research! This is a rich field with extensive scholarly work.<br><br><strong>Key Gothic Elements in Modern Horror:</strong><br><br>**Atmosphere & Setting:**<br>• **Sublime landscapes**: Gothic's emphasis on overwhelming, mysterious environments<sup>1</sup><sup>2</sup><br>• **Architectural symbolism**: Decaying mansions evolving into modern haunted spaces<cite>3</cite><br><br>**Psychological Themes:**<br>• **The uncanny**: Freud's concept rooted in Gothic tradition<cite>4</cite><cite>5</cite><br>• **Transgression and taboo**: Boundary-crossing from Gothic to contemporary horror<sup>6</sup><br><br>**Narrative Techniques:**<br>• **Unreliable narrators**: From Gothic confessions to modern psychological horror<cite>7</cite><sup>8</sup><br>• **Frame narratives**: Multi-layered storytelling traditions<sup>9</sup><cite>10</cite><br><br>**Key Scholars to Explore:**<br>• **David Punter** - Gothic criticism and theory<cite>11</cite><br>• **Julia Kristeva** - Abjection theory in horror<sup>12</sup><br>• **Fred Botting** - Gothic and postmodern horror connections<cite>13</cite>",
    "sender": "response",
    "timestamp": "2024-03-20T11:46:15Z",
    "sources": [
      {
        "label": "Burke, Edmund - A Philosophical Enquiry into the Sublime and Beautiful",
        "value": "https://www.gutenberg.org/ebooks/15043",
        "snippet": "Foundational text on the sublime that influenced Gothic aesthetic theory and modern horror atmosphere.",
        "number": "1"
      },
      {
        "label": "Radcliffe, Ann - On the Supernatural in Poetry",
        "value": "https://www.jstor.org/stable/gothic-supernatural-theory",
        "snippet": "Key Gothic theorist's distinction between terror and horror, influential in modern horror theory.",
        "number": "2"
      },
      {
        "label": "Bachelard, Gaston - The Poetics of Space",
        "value": "https://www.jstor.org/stable/architectural-psychology",
        "snippet": "Analysis of architectural psychology in literature, connecting Gothic spaces to modern horror settings.",
        "number": "3"
      },
      {
        "label": "Freud, Sigmund - The Uncanny",
        "value": "https://www.jstor.org/stable/freud-uncanny-1919",
        "snippet": "Foundational psychoanalytic text connecting Gothic unease to modern psychological horror techniques.",
        "number": "4"
      },
      {
        "label": "Vidler, Anthony - The Architectural Uncanny",
        "value": "https://www.jstor.org/stable/architectural-uncanny",
        "snippet": "Modern analysis of uncanny spaces in literature and film, bridging Gothic and contemporary horror.",
        "number": "5"
      },
      {
        "label": "Halberstam, Jack - Skin Shows: Gothic Horror and the Technology of Monsters",
        "value": "https://www.jstor.org/stable/skin-shows-gothic",
        "snippet": "Analysis of Gothic monster traditions and their evolution in modern horror media.",
        "number": "6"
      },
      {
        "label": "Hogle, Jerrold - The Cambridge Companion to Gothic Fiction",
        "value": "https://www.cambridge.org/core/books/gothic-fiction",
        "snippet": "Comprehensive academic overview of Gothic narrative techniques and their modern manifestations.",
        "number": "7"
      },
      {
        "label": "Beville, Maria - Gothic-Postmodernism",
        "value": "https://www.jstor.org/stable/gothic-postmodernism",
        "snippet": "Analysis of Gothic narrative strategies in postmodern and contemporary horror fiction.",
        "number": "8"
      },
      {
        "label": "Kilgour, Maggie - The Rise of the Gothic Novel",
        "value": "https://www.jstor.org/stable/rise-gothic-novel",
        "snippet": "Historical analysis of Gothic frame narratives and their influence on modern horror storytelling.",
        "number": "9"
      },
      {
        "label": "Clemens, Valdine - The Return of the Repressed",
        "value": "https://www.jstor.org/stable/return-repressed-gothic",
        "snippet": "Psychoanalytic reading of Gothic narrative structures in contemporary horror literature.",
        "number": "10"
      },
      {
        "label": "Punter, David - The Literature of Terror",
        "value": "https://www.jstor.org/stable/literature-of-terror",
        "snippet": "Seminal two-volume study tracing Gothic literature's evolution into modern horror fiction.",
        "number": "11"
      },
      {
        "label": "Kristeva, Julia - Powers of Horror: An Essay on Abjection",
        "value": "https://www.jstor.org/stable/powers-of-horror",
        "snippet": "Influential theory of abjection explaining Gothic and modern horror's psychological impact.",
        "number": "12"
      },
      {
        "label": "Botting, Fred - Gothic Romanced",
        "value": "https://www.jstor.org/stable/gothic-romanced",
        "snippet": "Analysis of Gothic tradition's transformation in postmodern and contemporary horror narratives.",
        "number": "13"
      }
    ],
    "explorations": [
      {
        "label": "What are the best databases for Gothic literature research?",
        "value": "Which academic databases should I search for peer-reviewed Gothic literature sources?"
      },
      {
        "label": "How do I properly cite these scholarly sources in MLA format?",
        "value": "Can you help me with proper MLA citations for literary criticism and JSTOR articles?"
      },
      {
        "label": "What modern horror authors show the strongest Gothic influence?",
        "value": "Which contemporary horror writers demonstrate clear connections to Gothic traditions?"
      }
    ]
  }
]`;

// Healthcare and Medical Information
export const medicalConsultationConversation = `[
  {
    "id": "medical-001",
    "message": "I've been experiencing persistent headaches for the past two weeks, along with some fatigue. Should I be concerned, and what information should I track before seeing a doctor?",
    "sender": "request", 
    "timestamp": "2024-03-20T16:20:00Z"
  },
  {
    "id": "medical-002",
    "message": "Persistent headaches warrant medical attention, especially when lasting two weeks<sup>1</sup>. Here's what you should track and consider:<br><br><strong>Important Information to Document:</strong><br><br>**Headache Characteristics:**<br>• **Timing**: When do they occur? Morning, evening, specific triggers?<cite>2</cite><br>• **Intensity**: Rate pain level 1-10, track changes<sup>3</sup><br>• **Location**: Where exactly? Front, back, sides, temples?<br>• **Duration**: How long do individual episodes last?<cite>4</cite><br><br>**Associated Symptoms:**<br>• **Fatigue level**: Rate your energy 1-10 daily<sup>5</sup><br>• **Sleep patterns**: Quality, duration, interruptions<cite>6</cite><br>• **Nausea, vision changes, sensitivity to light/sound**<br>• **Neck stiffness or other neurological symptoms**<cite>7</cite><br><br><strong>⚠️ Seek immediate medical attention if you experience:</strong><br>• Sudden, severe headache unlike any before<br>• Headache with fever, neck stiffness, confusion<br>• Vision changes or weakness<cite>8</cite><br><br>**Recommended next steps:**<br>1. **Schedule an appointment** with your primary care physician<br>2. **Keep a headache diary** for 1-2 weeks before your visit<sup>9</sup><br>3. **List all medications** and supplements you're taking<cite>10</cite>",
    "sender": "response",
    "timestamp": "2024-03-20T16:21:00Z",
    "sources": [
      {
        "label": "Mayo Clinic - When to See a Doctor for Headaches",
        "value": "https://www.mayoclinic.org/diseases-conditions/chronic-daily-headaches/symptoms-causes/syc-20370891",
        "snippet": "Medical guidelines for determining when headaches require professional evaluation.",
        "number": "1"
      },
      {
        "label": "American Migraine Foundation - Headache Tracking",
        "value": "https://americanmigrainefoundation.org/resource-library/headache-tracker/",
        "snippet": "Evidence-based approach to documenting headache patterns for medical evaluation.",
        "number": "2"
      },
      {
        "label": "International Headache Society Pain Scale",
        "value": "https://ichd-3.org/classification-tools/pain-assessment/",
        "snippet": "Standardized pain assessment tools used in headache diagnosis and treatment.",
        "number": "3"
      },
      {
        "label": "National Institute of Neurological Disorders - Headache Classification",
        "value": "https://www.ninds.nih.gov/health-information/disorders/headache",
        "snippet": "NINDS guidelines for headache symptom documentation and medical evaluation.",
        "number": "4"
      },
      {
        "label": "Cleveland Clinic - Fatigue Assessment",
        "value": "https://my.clevelandclinic.org/health/symptoms/fatigue",
        "snippet": "Medical approach to evaluating fatigue symptoms and their relationship to other conditions.",
        "number": "5"
      },
      {
        "label": "Sleep Foundation - Sleep and Headaches",
        "value": "https://www.sleepfoundation.org/how-sleep-works/sleep-and-headaches",
        "snippet": "Research on the connection between sleep quality and headache frequency/intensity.",
        "number": "6"
      },
      {
        "label": "Johns Hopkins - Neurological Warning Signs",
        "value": "https://www.hopkinsmedicine.org/health/conditions-and-diseases/headache/when-to-worry-about-a-headache",
        "snippet": "Medical criteria for identifying serious neurological symptoms requiring immediate attention.",
        "number": "7"
      },
      {
        "label": "American College of Emergency Physicians - Headache Red Flags",
        "value": "https://www.acep.org/patient-care/clinical-policies/headache-emergency-evaluation/",
        "snippet": "Emergency medicine guidelines for headache symptoms requiring urgent medical evaluation.",
        "number": "8"
      },
      {
        "label": "Headache Diary Template - National Headache Foundation",
        "value": "https://headaches.org/resources/headache-diary/",
        "snippet": "Structured headache tracking template recommended by medical professionals.",
        "number": "9"
      },
      {
        "label": "FDA - Medication Lists for Medical Visits",
        "value": "https://www.fda.gov/drugs/medication-lists-medical-visits",
        "snippet": "Guidelines for preparing comprehensive medication information for healthcare providers.",
        "number": "10"
      }
    ],
    "explorations": [
      {
        "label": "What questions should I ask my doctor about my headaches?",
        "value": "What specific questions should I prepare for my medical appointment about persistent headaches?"
      },
      {
        "label": "Are there lifestyle changes that might help with headaches?",
        "value": "What lifestyle modifications are evidence-based for reducing headache frequency?"
      },
      {
        "label": "How do I know if my headaches are tension, migraine, or something else?",
        "value": "What are the key differences between common headache types and their symptoms?"
      }
    ]
  }
]`;

// Business and Professional Scenarios
export const projectManagementConversation = `[
  {
    "id": "pm-001",
    "message": "Our development team is behind schedule on the Q2 product release. We have 6 weeks left and still need to complete 3 major features. How should we prioritize and manage this situation?",
    "sender": "request",
    "timestamp": "2024-03-20T10:15:00Z"
  },
  {
    "id": "pm-002",
    "message": "This is a common but critical situation. Let's develop a strategic approach to get your project back on track<sup>1</sup>.<br><br><strong>Immediate Priority Assessment:</strong><br><br>**Step 1: Feature Triage**<cite>2</cite><br>• **Must-Have**: Core features essential for minimum viable release<br>• **Should-Have**: Important but can be delayed to v2.0<br>• **Could-Have**: Nice-to-have features for future releases<sup>3</sup><br><br>**Step 2: Resource Reallocation**<br>• **Cross-team collaboration**: Can other teams contribute resources?<cite>4</cite><br>• **Scope reduction**: Simplify features while maintaining core value<sup>5</sup><br>• **Parallel development**: Identify tasks that can run simultaneously<cite>6</cite><br><br>**Step 3: Stakeholder Communication**<br>• **Transparent updates**: Weekly progress reports with metrics<sup>7</sup><br>• **Risk mitigation plans**: Prepare contingency scenarios<cite>8</cite><br>• **Expectation management**: Discuss potential scope adjustments<sup>9</sup><br><br>**Quick Win Strategy:**<br>Focus on delivering **80% of planned value in 100% of timeline** rather than 100% of features late<cite>10</cite>.",
    "sender": "response",
    "timestamp": "2024-03-20T10:16:30Z",
    "sources": [
      {
        "label": "PMI Guide to Project Recovery",
        "value": "https://www.pmi.org/learning/library/project-recovery-strategies-best-practices",
        "snippet": "Project Management Institute's evidence-based strategies for recovering delayed projects.",
        "number": "1"
      },
      {
        "label": "Agile Feature Prioritization Framework",
        "value": "https://www.scrum.org/resources/feature-prioritization-techniques",
        "snippet": "Scrum.org guide to prioritizing features using MoSCoW and other proven methods.",
        "number": "2"
      },
      {
        "label": "MoSCoW Prioritization Method",
        "value": "https://www.productplan.com/glossary/moscow-prioritization/",
        "snippet": "Detailed explanation of Must/Should/Could/Won't prioritization framework for product management.",
        "number": "3"
      },
      {
        "label": "Cross-Functional Team Resource Management",
        "value": "https://hbr.org/2019/05/cross-functional-teams-that-work",
        "snippet": "Harvard Business Review research on effective cross-team collaboration strategies.",
        "number": "4"
      },
      {
        "label": "Scope Reduction Without Quality Loss",
        "value": "https://www.atlassian.com/agile/project-management/scope-management",
        "snippet": "Atlassian's guide to intelligent scope reduction while maintaining project value.",
        "number": "5"
      },
      {
        "label": "Parallel Development Best Practices",
        "value": "https://www.thoughtworks.com/insights/blog/parallel-development-strategies",
        "snippet": "ThoughtWorks analysis of effective parallel development and integration strategies.",
        "number": "6"
      },
      {
        "label": "Project Communication Framework",
        "value": "https://www.pmi.org/learning/library/effective-communication-better-project-management",
        "snippet": "PMI research on communication strategies that improve project success rates.",
        "number": "7"
      },
      {
        "label": "Risk Management in Agile Projects",
        "value": "https://www.scaledagile.com/risk-management/",
        "snippet": "Scaled Agile Framework approach to identifying and mitigating project risks.",
        "number": "8"
      },
      {
        "label": "Stakeholder Expectation Management",
        "value": "https://www.mckinsey.com/capabilities/operations/our-insights/stakeholder-management",
        "snippet": "McKinsey insights on effective stakeholder communication during project challenges.",
        "number": "9"
      },
      {
        "label": "Pareto Principle in Project Management",
        "value": "https://www.projectmanager.com/blog/pareto-principle-project-management",
        "snippet": "Application of the 80/20 rule to deliver maximum project value within constraints.",
        "number": "10"
      }
    ],
    "explorations": [
      {
        "label": "How do we communicate delays to executive stakeholders?",
        "value": "What's the best way to present project delays and recovery plans to senior leadership?"
      },
      {
        "label": "Should we consider bringing in additional contractors?",
        "value": "What are the pros and cons of adding external resources to an already delayed project?"
      },
      {
        "label": "How can we prevent similar delays in future projects?",
        "value": "What process improvements can we implement to avoid schedule overruns in future releases?"
      }
    ]
  }
]`;

// Usage example functions
export function CustomerSupportScenario() {
  return html`
    <spectrum-theme color="#10b981" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f0fdf4);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-success-container, #d4edda); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-success-container);">🎧 Customer Support Chat</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-success-container); font-size: 0.875rem;">
            <strong>Technical support scenario</strong> with structured troubleshooting steps, helpful resources, and follow-up exploration options. Demonstrates professional customer service conversation flow.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${technicalSupportConversation}
          .conversationtitle=${'Support Case #CS-2024-0789'}
          .actions=${'[{"label": "Escalate to Tier 2", "icon": "person_add", "value": "escalate"}, {"label": "Send Transcript", "icon": "email", "value": "transcript"}, {"label": "Schedule Follow-up", "icon": "schedule", "value": "followup"}]'}
          .background=${'opaque'}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
}

export function EducationalTutoringScenario() {
  return html`
    <spectrum-theme color="#4f46e5" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-primary-container, #e7f3ff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-primary-container);">📚 Language Learning Tutor</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-primary-container); font-size: 0.875rem;">
            <strong>Educational conversation</strong> explaining complex grammar concepts with structured explanations, examples, memory aids, and practice opportunities. Perfect for AI tutoring applications.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${languageLearningConversation}
          .conversationtitle=${'French Grammar - Auxiliary Verbs'}
          .actions=${'[{"label": "Add to Study Guide", "icon": "bookmark", "value": "study"}, {"label": "Practice Quiz", "icon": "quiz", "value": "quiz"}, {"label": "Share Progress", "icon": "share", "value": "progress"}]'}
          .background=${'opaque'}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
}

export function AcademicResearchScenario() {
  return html`
    <spectrum-theme color="#7c3aed" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #faf5ff);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-secondary-container, #f3e8ff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-secondary-container);">🔬 Academic Research Assistant</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-secondary-container); font-size: 0.875rem;">
            <strong>Research consultation</strong> with extensive scholarly citations, academic source recommendations, and research methodology guidance. Ideal for academic AI assistants.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${literatureResearchConversation}
          .conversationtitle=${'Gothic Literature Research Project'}
          .actions=${'[{"label": "Export Bibliography", "icon": "assignment", "value": "bibliography"}, {"label": "Generate Citations", "icon": "format_quote", "value": "citations"}, {"label": "Save Research", "icon": "save", "value": "save"}]'}
          .background=${'opaque'}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
}

export function HealthcareInformationScenario() {
  return html`
    <spectrum-theme color="#dc2626" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #fef2f2);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-error-container, #f8d7da); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-error-container);">🏥 Healthcare Information Assistant</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-error-container); font-size: 0.875rem;">
            <strong>Medical information scenario</strong> with symptom tracking guidance, warning signs, and preparation for medical visits. Note: This is for informational purposes only, not medical advice.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${medicalConsultationConversation}
          .conversationtitle=${'Health Information - Headache Consultation'}
          .actions=${'[{"label": "Find Doctors", "icon": "local_hospital", "value": "doctors"}, {"label": "Download Tracker", "icon": "download", "value": "tracker"}, {"label": "Emergency Info", "icon": "emergency", "value": "emergency"}]'}
          .background=${'opaque'}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
}

export function BusinessConsultingScenario() {
  return html`
    <spectrum-theme color="#059669" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f0fdf4);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-success-container, #d4edda); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-success-container);">💼 Project Management Consulting</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-success-container); font-size: 0.875rem;">
            <strong>Business consulting scenario</strong> with strategic planning, risk management, and stakeholder communication guidance. Demonstrates professional business advisory conversations.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${projectManagementConversation}
          .conversationtitle=${'Q2 Release Recovery Strategy'}
          .actions=${'[{"label": "Create Action Plan", "icon": "assignment", "value": "plan"}, {"label": "Schedule Review", "icon": "schedule", "value": "review"}, {"label": "Share Strategy", "icon": "share", "value": "strategy"}]'}
          .background=${'opaque'}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
}

export function MultiModalConversation() {
  return html`
    <spectrum-theme color="#8b5cf6" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #faf5ff);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-secondary-container, #f3e8ff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-secondary-container);">🎯 Multi-Modal AI Assistant</h3>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-secondary-container); font-size: 0.875rem;">
            <strong>Comprehensive AI assistant</strong> combining multiple conversation types: technical support, education, research, and business consulting all in one interface.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${`[
            ${technicalSupportConversation.slice(1, -1)},
            ${languageLearningConversation.slice(1, -1)}
          ]`}
          .conversationtitle=${'Multi-Modal AI Assistant Session'}
          .actions=${'[{"label": "Switch Mode", "icon": "swap_horiz", "value": "mode"}, {"label": "Export All", "icon": "download", "value": "export"}, {"label": "Share Session", "icon": "share", "value": "session"}]'}
          .background=${'partial-frost'}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
} 