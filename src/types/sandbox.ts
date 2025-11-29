export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  author: string;
  popularity: number;
  tags: string[];
  previewUrl?: string;
  schema?: TemplateSchema;
}

export interface TemplateSchema {
  tables: TableSchema[];
  relationships: Relationship[];
}

export interface TableSchema {
  name: string;
  fields: FieldSchema[];
  rowCount: number;
}

export interface FieldSchema {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'email' | 'url' | 'currency' | 'json';
  nullable: boolean;
  isPrimary?: boolean;
  isForeignKey?: boolean;
  foreignTable?: string;
}

export interface Relationship {
  from: string;
  to: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

export interface Sandbox {
  id: string;
  templateId: string;
  userId: string;
  status: 'creating' | 'ready' | 'error' | 'expired';
  createdAt: Date;
  expiresAt: Date;
  previewUrl: string;
  customizations: SandboxCustomizations;
  dataQuality?: DataQualityFeedback;
}

export interface SandboxCustomizations {
  brandName?: string;
  primaryColor?: string;
  logoUrl?: string;
  description?: string;
  category?: string;
}

export interface DataQualityFeedback {
  rating: 'positive' | 'negative' | null;
  comment?: string;
}

export interface WizardStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  sandboxId?: string;
  templateId?: string;
  status: 'draft' | 'deploying' | 'live' | 'error';
  deployUrl?: string;
  proofPageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProofPage {
  id: string;
  projectId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  liveUrl: string;
  templateAttribution?: {
    templateName: string;
    authorName: string;
  };
  shareLinks: {
    direct: string;
    twitter: string;
    linkedin: string;
  };
}

// Analytics tracking types
export interface SandboxEvent {
  type: 'sandbox_created' | 'sandbox_interaction' | 'data_regenerated' | 'data_feedback' | 'wizard_step' | 'fork_initiated' | 'fork_completed' | 'deploy_started' | 'deploy_success' | 'deploy_failed' | 'proof_page_shared';
  sandboxId?: string;
  projectId?: string;
  templateId: string;
  userId: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}
