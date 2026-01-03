import { useState, useCallback } from 'react';
import { Template, Project, ProofPage, SandboxCustomizations, Prototype } from '@/types/sandbox';
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
import { PrototypePreview } from '@/components/prototype/PrototypePreview';
import { TrustedBySection } from '@/components/home/TrustedBySection';
import { StatsSection } from '@/components/home/StatsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { Sparkles } from 'lucide-react';

type AppState = 'gallery' | 'generating-prototype' | 'prototype' | 'creating-sandbox' | 'sandbox' | 'forking' | 'deployed';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('gallery');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showForkModal, setShowForkModal] = useState(false);
  const [deployedProject, setDeployedProject] = useState<Project | null>(null);
  const [proofPage, setProofPage] = useState<ProofPage | null>(null);
  const [currentPrototype, setCurrentPrototype] = useState<Prototype | null>(null);
  const [isGeneratingPrototype, setIsGeneratingPrototype] = useState(false);

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

  // Handle template selection - goes to prototype first
  const handleSelectTemplate = useCallback(async (template: Template) => {
    setSelectedTemplate(template);
    setIsGeneratingPrototype(true);
    setAppState('generating-prototype');
    
    // Simulate prototype generation
    setTimeout(() => {
      const prototype: Prototype = {
        id: `prototype-${Date.now()}`,
        name: template.name,
        description: template.description,
        templateId: template.id,
        status: 'ready',
        previewUrl: `https://prototype-${template.id}.lovable.app`,
        createdAt: new Date(),
      };
      setCurrentPrototype(prototype);
      setIsGeneratingPrototype(false);
      setAppState('prototype');
    }, 2000);
  }, []);

  // Handle build from prompt
  const handleBuildFromPrompt = useCallback(async (prompt: string) => {
    setIsGeneratingPrototype(true);
    setAppState('generating-prototype');
    setSelectedTemplate(null);
    
    // Simulate AI prototype generation
    setTimeout(() => {
      const prototype: Prototype = {
        id: `prototype-${Date.now()}`,
        name: prompt.split(' ').slice(0, 3).join(' ') + '...',
        description: prompt,
        prompt: prompt,
        status: 'ready',
        previewUrl: `https://prototype-ai-${Date.now()}.lovable.app`,
        createdAt: new Date(),
      };
      setCurrentPrototype(prototype);
      setIsGeneratingPrototype(false);
      setAppState('prototype');
    }, 3000);
  }, []);

  // Handle "Test in Sandbox" click
  const handleTestInSandbox = useCallback(async () => {
    if (!currentPrototype) return;
    
    setAppState('creating-sandbox');
    
    // If we have a template, use it; otherwise create a generic sandbox
    if (selectedTemplate) {
      await createSandbox(selectedTemplate);
    } else {
      // Create sandbox from prompt-based prototype
      const genericTemplate: Template = {
        id: 'custom',
        name: currentPrototype.name,
        description: currentPrototype.description,
        category: 'Custom',
        thumbnail: '/placeholder.svg',
        author: 'You',
        popularity: 0,
        tags: ['custom', 'ai-generated'],
      };
      setSelectedTemplate(genericTemplate);
      await createSandbox(genericTemplate);
    }
  }, [currentPrototype, selectedTemplate, createSandbox]);

  const handleSandboxCreated = useCallback(() => {
    setAppState('sandbox');
  }, []);

  const handleBackToGallery = useCallback(() => {
    destroySandbox();
    setSelectedTemplate(null);
    setCurrentPrototype(null);
    setAppState('gallery');
  }, [destroySandbox]);

  const handleBackToPrototype = useCallback(() => {
    setAppState('prototype');
  }, []);

  const handleForkProject = useCallback(() => {
    setShowForkModal(true);
  }, []);

  const handleForkConfirm = useCallback((options: { projectName: string; includeTestData: boolean; includeCustomizations: boolean }) => {
    setShowForkModal(false);
    setAppState('forking');

    // Simulate project creation and deployment
    setTimeout(() => {
      const deployUrl = `https://${options.projectName.toLowerCase().replace(/\s+/g, '-')}.lovable.app`;
      
      const project: Project = {
        id: `project-${Date.now()}`,
        name: options.projectName,
        description: sandbox?.customizations.description || selectedTemplate?.description || '',
        sandboxId: sandbox?.id,
        templateId: selectedTemplate?.id,
        status: 'live',
        deployUrl: deployUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        creditsEarned: 5,
        isInPortfolio: false,
      };

      const proof: ProofPage = {
        id: `proof-${Date.now()}`,
        projectId: project.id,
        title: options.projectName,
        description: `Built with Lovable Smart Sandbox from the ${selectedTemplate?.name || 'custom'} template.`,
        thumbnailUrl: '/placeholder.svg',
        liveUrl: deployUrl,
        templateAttribution: selectedTemplate ? {
          templateName: selectedTemplate.name,
          authorName: selectedTemplate.author,
        } : undefined,
        shareLinks: {
          direct: deployUrl,
          twitter: `https://twitter.com/intent/tweet?text=I just shipped ${encodeURIComponent(options.projectName)} with @Lovable!&url=${encodeURIComponent(deployUrl)}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(deployUrl)}`,
          portfolio: `https://lovable.dev/portfolio/${project.id}`,
        },
        creditsEarned: 5,
      };

      setDeployedProject(project);
      setProofPage(proof);
      setAppState('deployed');
    }, 2500);
  }, [sandbox, selectedTemplate]);

  const handleShareToPortfolio = useCallback(() => {
    if (deployedProject) {
      setDeployedProject({
        ...deployedProject,
        isInPortfolio: true,
      });
    }
  }, [deployedProject]);

  const handleCloseProofPage = useCallback(() => {
    setAppState('gallery');
    setSelectedTemplate(null);
    setDeployedProject(null);
    setProofPage(null);
    setCurrentPrototype(null);
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
        onShareToPortfolio={handleShareToPortfolio}
      />
    );
  }

  // Render prototype preview (before sandbox)
  if (appState === 'prototype' && currentPrototype) {
    return (
      <PrototypePreview
        prototype={currentPrototype}
        template={selectedTemplate || undefined}
        onBack={handleBackToGallery}
        onTestInSandbox={handleTestInSandbox}
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
          onBack={handleBackToPrototype}
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
    <div className="min-h-screen bg-background overflow-x-hidden page-transition">
      <Header />
      
      <main>
        <HeroSection 
          onExploreTemplates={scrollToTemplates} 
          onBuildFromPrompt={handleBuildFromPrompt}
          isGenerating={isGeneratingPrototype}
        />

        {/* Trusted by section */}
        <TrustedBySection />

        {/* Stats section */}
        <StatsSection />
        
        <div id="templates">
          <TemplateGallery onSelectTemplate={handleSelectTemplate} />
        </div>

        <FeaturesSection />

        {/* Testimonials */}
        <TestimonialsSection />

        <CTASection onExploreTemplates={scrollToTemplates} />
      </main>

      {/* Sandbox/Prototype creation modal */}
      <SandboxCreationModal
        open={appState === 'creating-sandbox' || appState === 'forking' || appState === 'generating-prototype'}
        template={selectedTemplate}
        onComplete={appState === 'creating-sandbox' ? handleSandboxCreated : appState === 'generating-prototype' ? () => {} : () => {}}
        mode={appState === 'generating-prototype' ? 'prototype' : 'sandbox'}
      />

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 group">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-xl">Lovable</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ship faster with Smart Sandbox. From idea to production in minutes.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">Templates</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">Guides</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-300 link-underline">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Lovable. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors duration-300 hover:scale-105">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors duration-300 hover:scale-105">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors duration-300 hover:scale-105">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
