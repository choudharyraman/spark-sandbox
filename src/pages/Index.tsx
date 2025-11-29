import { useState, useCallback } from 'react';
import { Template, Project, ProofPage, SandboxCustomizations } from '@/types/sandbox';
import { mockTemplates } from '@/data/mockTemplates';
import { useSandbox } from '@/hooks/useSandbox';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/hero/HeroSection';
import { TemplateGallery } from '@/components/templates/TemplateGallery';
import { FeaturesSection } from '@/components/features/FeaturesSection';
import { CTASection } from '@/components/cta/CTASection';
import { SandboxCreationModal } from '@/components/sandbox/SandboxCreationModal';
import { SandboxView } from '@/components/sandbox/SandboxView';
import { ForkProjectModal } from '@/components/sandbox/ForkProjectModal';
import { ProofPageView } from '@/components/proof/ProofPage';

type AppState = 'gallery' | 'creating-sandbox' | 'sandbox' | 'forking' | 'deployed';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('gallery');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showForkModal, setShowForkModal] = useState(false);
  const [deployedProject, setDeployedProject] = useState<Project | null>(null);
  const [proofPage, setProofPage] = useState<ProofPage | null>(null);

  const {
    sandbox,
    isCreating,
    createSandbox,
    updateCustomizations,
    regenerateData,
    submitDataFeedback,
    resetSandbox,
    destroySandbox,
  } = useSandbox();

  const handleSelectTemplate = useCallback(async (template: Template) => {
    setSelectedTemplate(template);
    setAppState('creating-sandbox');
    await createSandbox(template);
  }, [createSandbox]);

  const handleSandboxCreated = useCallback(() => {
    setAppState('sandbox');
  }, []);

  const handleBackToGallery = useCallback(() => {
    destroySandbox();
    setSelectedTemplate(null);
    setAppState('gallery');
  }, [destroySandbox]);

  const handleForkProject = useCallback(() => {
    setShowForkModal(true);
  }, []);

  const handleForkConfirm = useCallback((options: { projectName: string; includeTestData: boolean; includeCustomizations: boolean }) => {
    setShowForkModal(false);
    setAppState('forking');

    // Simulate project creation and deployment
    setTimeout(() => {
      const project: Project = {
        id: `project-${Date.now()}`,
        name: options.projectName,
        description: sandbox?.customizations.description || selectedTemplate?.description || '',
        sandboxId: sandbox?.id,
        templateId: selectedTemplate?.id,
        status: 'live',
        deployUrl: `https://${options.projectName.toLowerCase().replace(/\s+/g, '-')}.lovable.app`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const proof: ProofPage = {
        id: `proof-${Date.now()}`,
        projectId: project.id,
        title: options.projectName,
        description: `Built with Lovable Smart Sandbox from the ${selectedTemplate?.name} template.`,
        thumbnailUrl: '/placeholder.svg',
        liveUrl: project.deployUrl!,
        templateAttribution: {
          templateName: selectedTemplate?.name || '',
          authorName: selectedTemplate?.author || '',
        },
        shareLinks: {
          direct: project.deployUrl!,
          twitter: `https://twitter.com/intent/tweet?text=I just shipped ${encodeURIComponent(options.projectName)} with @Lovable!&url=${encodeURIComponent(project.deployUrl!)}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(project.deployUrl!)}`,
        },
      };

      setDeployedProject(project);
      setProofPage(proof);
      setAppState('deployed');
    }, 2500);
  }, [sandbox, selectedTemplate]);

  const handleCloseProofPage = useCallback(() => {
    setAppState('gallery');
    setSelectedTemplate(null);
    setDeployedProject(null);
    setProofPage(null);
    destroySandbox();
  }, [destroySandbox]);

  const scrollToTemplates = useCallback(() => {
    const element = document.getElementById('templates');
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Render deployed state
  if (appState === 'deployed' && deployedProject && proofPage) {
    return (
      <ProofPageView
        project={deployedProject}
        proofPage={proofPage}
        onClose={handleCloseProofPage}
      />
    );
  }

  // Render sandbox view
  if (appState === 'sandbox' && sandbox && selectedTemplate) {
    return (
      <>
        <SandboxView
          sandbox={sandbox}
          template={selectedTemplate}
          onBack={handleBackToGallery}
          onUpdateCustomizations={updateCustomizations}
          onRegenerateData={regenerateData}
          onSubmitFeedback={submitDataFeedback}
          onResetSandbox={resetSandbox}
          onForkProject={handleForkProject}
        />
        <ForkProjectModal
          open={showForkModal}
          onClose={() => setShowForkModal(false)}
          sandbox={sandbox}
          template={selectedTemplate}
          onFork={handleForkConfirm}
        />
      </>
    );
  }

  // Render gallery view (default)
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection onExploreTemplates={scrollToTemplates} />
        
        <div id="templates">
          <TemplateGallery onSelectTemplate={handleSelectTemplate} />
        </div>

        <FeaturesSection />

        <CTASection onExploreTemplates={scrollToTemplates} />
      </main>

      {/* Sandbox creation modal */}
      <SandboxCreationModal
        open={appState === 'creating-sandbox' || appState === 'forking'}
        template={selectedTemplate}
        onComplete={appState === 'creating-sandbox' ? handleSandboxCreated : () => {}}
      />

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md gradient-primary" />
              <span className="font-display font-semibold">Lovable</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ship faster with Smart Sandbox. No setup, no friction.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Docs</a>
              <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
