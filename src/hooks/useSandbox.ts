import { useState, useCallback } from 'react';
import { Sandbox, SandboxCustomizations, Template, DataQualityFeedback } from '@/types/sandbox';

interface UseSandboxReturn {
  sandbox: Sandbox | null;
  isCreating: boolean;
  error: string | null;
  createSandbox: (template: Template) => Promise<void>;
  updateCustomizations: (customizations: Partial<SandboxCustomizations>) => void;
  regenerateData: () => Promise<void>;
  submitDataFeedback: (feedback: DataQualityFeedback) => void;
  resetSandbox: () => Promise<void>;
  destroySandbox: () => void;
}

export function useSandbox(): UseSandboxReturn {
  const [sandbox, setSandbox] = useState<Sandbox | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSandbox = useCallback(async (template: Template) => {
    setIsCreating(true);
    setError(null);

    try {
      // Simulate sandbox creation (in real implementation, this would call the backend)
      await new Promise(resolve => setTimeout(resolve, 2500));

      const newSandbox: Sandbox = {
        id: `sandbox-${Date.now()}`,
        templateId: template.id,
        userId: 'demo-user',
        status: 'ready',
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
        previewUrl: `https://sandbox-${template.id}.lovable.app`,
        customizations: {},
      };

      setSandbox(newSandbox);
    } catch (err) {
      setError('Failed to create sandbox. Please try again.');
      console.error('Sandbox creation error:', err);
    } finally {
      setIsCreating(false);
    }
  }, []);

  const updateCustomizations = useCallback((customizations: Partial<SandboxCustomizations>) => {
    setSandbox(prev => {
      if (!prev) return null;
      return {
        ...prev,
        customizations: {
          ...prev.customizations,
          ...customizations,
        },
      };
    });
  }, []);

  const regenerateData = useCallback(async () => {
    if (!sandbox) return;

    setSandbox(prev => prev ? { ...prev, status: 'creating' } : null);
    
    // Simulate data regeneration
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSandbox(prev => prev ? { ...prev, status: 'ready', dataQuality: undefined } : null);
  }, [sandbox]);

  const submitDataFeedback = useCallback((feedback: DataQualityFeedback) => {
    setSandbox(prev => {
      if (!prev) return null;
      return { ...prev, dataQuality: feedback };
    });
  }, []);

  const resetSandbox = useCallback(async () => {
    if (!sandbox) return;

    setSandbox(prev => prev ? { ...prev, status: 'creating' } : null);
    
    // Simulate reset
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSandbox(prev => prev ? { 
      ...prev, 
      status: 'ready', 
      customizations: {},
      dataQuality: undefined,
    } : null);
  }, [sandbox]);

  const destroySandbox = useCallback(() => {
    setSandbox(null);
    setError(null);
  }, []);

  return {
    sandbox,
    isCreating,
    error,
    createSandbox,
    updateCustomizations,
    regenerateData,
    submitDataFeedback,
    resetSandbox,
    destroySandbox,
  };
}
