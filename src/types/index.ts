/**
 * Codia Types Definition
 * Core domain types for Codia — Undetectable AI Copilot Desktop App
 */

// =============================================================================
// 1. FEATURE TYPES
// =============================================================================

export type FeatureCategory =
  | 'stealth-technology'
  | 'realtime-audio'
  | 'code-synthesis'
  | 'system-design'
  | 'meeting-intel'
  | 'security-architecture';

export type FeatureBadge =
  | 'Stealth Core'
  | 'Sub-300ms'
  | 'Kernel-Level'
  | 'New v2.4'
  | 'Enterprise-Grade'
  | 'Popular';

export type WindowRenderingMode =
  | 'Kernel-Bypass-Overlay'
  | 'OS-DisplayAffinity-Exclude'
  | 'Direct3D-Hardware-Hook'
  | 'Wayland-Safe-Surface';

export type AudioCaptureProtocol =
  | 'WASAPI-Loopback-Isolation'
  | 'CoreAudio-Hardware-Tap'
  | 'ALSA-Pulse-Sink'
  | 'Virtual-Audio-Driver';

export interface StealthSpecification {
  /** Screen share invisibility verification across common interview software */
  bypassZoom: boolean;
  bypassGoogleMeet: boolean;
  bypassTeams: boolean;
  bypassCoderPad: boolean;
  bypassHackerRank: boolean;
  bypassCodeSignal: boolean;
  /** OS-level window rendering technique used to guarantee screen-capture invisibility */
  windowRenderingMode: WindowRenderingMode;
  /** Audio capture mechanism preventing mic loopback echo or interviewer echo */
  audioCaptureType: AudioCaptureProtocol;
  /** Eye-tracking gaze alignment mode to maintain direct camera contact */
  gazeTrackingSupport: boolean;
  /** Global instant panic button hotkey */
  emergencyDisguiseHotkey: string;
}

export interface FeatureMetric {
  label: string;
  value: string;
  description: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  category: FeatureCategory;
  badge?: FeatureBadge;
  icon: string;
  previewType: 'dynamic-notch' | 'code-stream' | 'system-diagram' | 'stealth-radar';
  metrics?: FeatureMetric[];
  keyCapabilities: string[];
  stealthSpecs?: StealthSpecification;
}

// =============================================================================
// 2. TRANSFORM TYPES (Audio-to-Code / Speech-to-Solution / Question-to-Answer)
// =============================================================================

export type TransformInputType =
  | 'live-speech-stream'
  | 'audio-chunk'
  | 'screen-ocr'
  | 'pasted-prompt'
  | 'ide-capture';

export type TransformStageStatus =
  | 'idle'
  | 'listening'
  | 'transcribing'
  | 'reasoning'
  | 'generating'
  | 'streaming'
  | 'completed'
  | 'error';

export interface TransformStage {
  id: string;
  name: string;
  description: string;
  status: TransformStageStatus;
  latencyMs: number;
}

export type SupportedLanguage =
  | 'python'
  | 'typescript'
  | 'javascript'
  | 'cpp'
  | 'java'
  | 'go'
  | 'rust';

export interface CodeComplexity {
  time: string;
  space: string;
  timeExplanation: string;
  spaceExplanation: string;
}

export interface ApproachAlternative {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  tradeOff: string;
}

export interface TestCaseExample {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface CodeTransformResult {
  language: SupportedLanguage;
  optimalCode: string;
  bruteForceCode?: string;
  algorithmName: string;
  dataStructuresUsed: string[];
  complexity: CodeComplexity;
  keyInsights: string[];
  potentialFollowUps: string[];
  edgeCases: string[];
  alternativeApproaches: ApproachAlternative[];
  testCases: TestCaseExample[];
}

export interface AudioToCodeTransform {
  streamId: string;
  timestamp: number;
  durationMs: number;
  transcribedQuestion: string;
  detectedProblem: {
    title: string;
    domain: 'dsa' | 'system-design' | 'sql' | 'concurrency';
    difficulty: 'Easy' | 'Medium' | 'Hard';
  };
  stages: TransformStage[];
  generatedSolution: CodeTransformResult;
  processingLatency: {
    speechToTextMs: number;
    astParsingMs: number;
    llmInferenceMs: number;
    totalMs: number;
  };
  confidenceScore: number;
}

export interface SystemDesignTransformResult {
  architectureName: string;
  estimatedRPS: string;
  dataScale: string;
  components: {
    name: string;
    role: string;
    technology: string;
    scalingStrategy: string;
  }[];
  apiEndpoints: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    description: string;
  }[];
  databaseChoice: {
    type: 'SQL' | 'NoSQL' | 'Key-Value' | 'Graph' | 'Time-series';
    rationale: string;
    schemaOverview: string;
  };
  tradeOffs: {
    decision: string;
    pros: string[];
    cons: string[];
  }[];
  bottlenecksAndMitigations: {
    bottleneck: string;
    mitigation: string;
  }[];
}

export interface QuestionToAnswerTransform {
  question: string;
  category: 'behavioral-star' | 'system-design' | 'technical-dsa' | 'culture-fit';
  suggestedVerbalHook: string;
  bulletPointsToSpeak: string[];
  trapWarnings: string[];
  suggestedFollowUpQuestionsToAsk: string[];
}

// =============================================================================
// 3. PRICING TIERS
// =============================================================================

export type PricingBillingCycle =
  | 'monthly'
  | 'quarterly'
  | 'annual'
  | 'one-time-interview-pass';

export interface PricingFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
  tooltip?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  price: {
    monthly: number;
    annual: number;
    quarterly?: number;
    oneTimePass?: number;
  };
  billingCycleText: string;
  description: string;
  maxLiveHoursPerMonth: number | 'Unlimited';
  maxConcurrentSessions: number;
  latencySLA: string;
  stealthLevel:
    | 'Standard Invisibility'
    | 'Kernel-Level Invisibility'
    | 'Military-Grade Ring 0 Bypass';
  supportedPlatforms: string[];
  features: PricingFeature[];
  limitations: string[];
  ctaText: string;
  ctaHref: string;
}

// =============================================================================
// 4. TEST INTERVIEW SCENARIOS
// =============================================================================

export type InterviewPlatform =
  | 'leetcode'
  | 'hackerrank'
  | 'codesignal'
  | 'coderpad'
  | 'karat'
  | 'google-meet'
  | 'zoom'
  | 'microsoft-teams'
  | 'webex';

export type InterviewRoundType =
  | 'algorithms-dsa'
  | 'system-design'
  | 'frontend-architecture'
  | 'backend-distributed'
  | 'behavioral-star'
  | 'live-debugging';

export type DifficultyRating =
  | 'Junior'
  | 'Mid-Level'
  | 'Senior'
  | 'Staff / Principal'
  | 'FAANG-Hard';

export interface InterviewScenario {
  id: string;
  companyTarget: string;
  roleTitle: string;
  roundType: InterviewRoundType;
  platform: InterviewPlatform;
  difficulty: DifficultyRating;
  durationMinutes: number;
  problemTitle: string;
  problemStatement: string;
  interviewerAudioSimulation: {
    transcriptSnippet: string;
    interviewerTone: 'neutral' | 'probing' | 'fast-paced' | 'collaborative';
    interviewerPrompt: string;
  };
  codiaHudState: {
    notchMode: 'compact' | 'expanded' | 'stealth-pill' | 'teleprompter';
    detectedPattern: string;
    suggestedVerbalOpening: string;
    optimalSolutionCode: string;
    language: SupportedLanguage;
    complexity: CodeComplexity;
    interviewerTalkingPoints: string[];
    pitfallsToAvoid: string[];
  };
  responseMetrics: {
    speechToDetectionMs: number;
    solutionRenderMs: number;
    totalResponseTimeMs: number;
    accuracyPercentage: number;
  };
  stealthSafetyReport: {
    screenShareCaptured: false;
    audioSourceSeparation: boolean;
    antiCheatStatus: 'Clean / Passed';
    eyeGazeDeviationDegrees: number;
  };
}

// =============================================================================
// 5. HUD COMPONENT STATE TYPES (For Interactive Previews)
// =============================================================================

export type NotchState = 'idle' | 'listening' | 'analyzing' | 'solution-ready' | 'panic-disguise';

export interface HudNotchProps {
  state: NotchState;
  activeScenario?: InterviewScenario;
  onStateChange?: (state: NotchState) => void;
}
