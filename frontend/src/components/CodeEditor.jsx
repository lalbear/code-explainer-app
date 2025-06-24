import React, { useState } from 'react';
import { explainCode } from '../services/api';

export default function CodeEditor({ setExplanation }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!code.trim()) return;

    setLoading(true);
    try {
      const result = await explainCode(code);
      setExplanation(result);
    } catch (error) {
      console.error('Error explaining code:', error);
      setExplanation({
        success: false,
        explanation: 'Sorry, there was an error explaining your code. Please try again.'
      });
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const clearCode = () => {
    setCode('');
    setExplanation(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <h2 className="text-lg font-semibold text-slate-700">Code Editor</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500">{code.length} characters</span>
            {code && (
              <button
                onClick={clearCode}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                title="Clear code"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Code Input Area */}
      <div className="p-6">
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="// Paste your code here and click 'Explain Code' to get a detailed explanation
// Supports all programming languages: JavaScript, Python, C++, Java, and more!

function example() {
  console.log('Hello, World!');
}"
            className="w-full h-80 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl font-mono text-sm leading-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
            style={{ fontFamily: "'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace" }}
          />
          
          {/* Line numbers effect */}
          <div className="absolute left-2 top-4 text-slate-400 text-sm font-mono leading-6 pointer-events-none select-none">
            {code.split('\n').map((_, index) => (
              <div key={index} className="pr-2 text-right" style={{ minWidth: '20px' }}>
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Press Tab for indentation</span>
          </div>
          
          <div className="flex items-center space-x-3">
            {code.trim() && (
              <button
                onClick={clearCode}
                className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Clear</span>
              </button>
            )}
            
            <button
              onClick={handleExplain}
              disabled={loading || !code.trim()}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                loading || !code.trim()
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span>Explain Code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}