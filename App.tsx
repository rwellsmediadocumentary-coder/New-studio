import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageEnhancer from './components/ImageEnhancer';
import VideoGenerator from './components/VideoGenerator';
import LogoAnimator from './components/LogoAnimator';
import { AppTab } from './types';

// The AIStudio interface and window.aistudio declaration are removed here
// because they are already provided by the global environment. 
// Redefining them caused "Subsequent property declarations" and 
// "identical modifiers" errors in the TypeScript compiler.

function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('logo');
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  useEffect(() => {
    const checkApiKey = async () => {
      // Use window.aistudio directly as it is pre-configured in the execution context
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkApiKey();
  }, []);

  const handleOpenKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success as per guidelines to avoid race condition
      setHasApiKey(true);
    }
  };

  if (!hasApiKey) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-6 text-center">
        <div className="max-w-md w-full space-y-8 bg-white/5 p-10 rounded-[40px] border border-white/10 shadow-2xl">
          <div className="w-20 h-20 bg-primary-teal/20 rounded-full flex items-center justify-center mx-auto text-3xl">🔑</div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight">API Key Required</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              To use Veo video generation models, you must select a paid API key from a Google Cloud project with billing enabled.
            </p>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-[10px] font-black uppercase tracking-widest text-primary-teal hover:underline"
            >
              Billing Documentation
            </a>
          </div>
          <button 
            onClick={handleOpenKeySelector}
            className="w-full py-5 bg-primary-teal hover:bg-teal-600 text-white font-black rounded-2xl shadow-xl shadow-teal-500/20 transition-all uppercase tracking-[0.2em] text-xs"
          >
            Select API Key
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="animate-in fade-in duration-500">
          {activeTab === 'logo' && <LogoAnimator />}
          {activeTab === 'generate' && <VideoGenerator />}
          {activeTab === 'enhance' && <ImageEnhancer />}
        </div>
      </main>

      <footer className="py-8 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary-teal/20 flex items-center justify-center text-[10px] font-bold text-primary-teal">J</div>
            <span className="text-xs font-bold text-white/40">Jyb Tv Studio</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
            <span>High Fidelity</span>
            <span>Spatial Consistency</span>
            <span>Real-time Rendering</span>
          </div>
          <div className="text-[10px] text-white/20">
            &copy; {new Date().getFullYear()} Jyb Production Systems. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;