"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Eye, EyeOff, Save, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ApiCredentials } from '@/lib/api/icmarkets';

interface ApiCredentialsFormProps {
  onSave: (credentials: ApiCredentials | null) => void;
  currentCredentials: ApiCredentials | null;
  isUsingLiveData: boolean;
}

export default function ApiCredentialsForm({ 
  onSave, 
  currentCredentials,
  isUsingLiveData
}: ApiCredentialsFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(currentCredentials?.apiKey || '');
  const [apiSecret, setApiSecret] = useState(currentCredentials?.apiSecret || '');
  const [showSecret, setShowSecret] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (apiKey && apiSecret) {
      onSave({ apiKey, apiSecret });
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setIsOpen(false);
      }, 2000);
    } else {
      setStatus('error');
    }
  };
  
  const handleClear = () => {
    setApiKey('');
    setApiSecret('');
    onSave(null);
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setIsOpen(false);
    }, 2000);
  };
  
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
      >
        <Key className="h-4 w-4 mr-2" />
        {isUsingLiveData ? 'Update API Credentials' : 'Connect to IC Markets API'}
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
                <Key className="h-5 w-5 mr-2 text-amber-500" />
                IC Markets API Credentials
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key
                </label>
                <input
                  type="text"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your IC Markets API Key"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="apiSecret" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Secret
                </label>
                <div className="relative">
                  <input
                    type={showSecret ? "text" : "password"}
                    id="apiSecret"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter your IC Markets API Secret"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    onClick={() => setShowSecret(!showSecret)}
                  >
                    {showSecret ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your credentials are stored locally in your browser and are never sent to our servers.
                </p>
              </div>
              
              {status === 'error' && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md flex items-center text-red-700 dark:text-red-300">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  Please enter both API Key and API Secret.
                </div>
              )}
              
              {status === 'success' && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md flex items-center text-green-700 dark:text-green-300">
                  <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                  Credentials saved successfully!
                </div>
              )}
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Clear Credentials
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium rounded-md bg-amber-500 text-white hover:bg-amber-600 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Credentials
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}