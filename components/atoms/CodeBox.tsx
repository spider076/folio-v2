'use client';

import { Copy } from 'lucide-react';
import React, { useEffect } from 'react'
import { toast } from 'sonner';
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";

import "highlight.js/styles/github-dark.css";

const CodeBox = ({ code, language}: any) => {
    // const code: string = block.properties.title[0].toString();
    hljs.registerLanguage(language, javascript);
  
    useEffect(() => {
      hljs.highlightAll();
    }, []);

  const handleCopyClick = (code : string) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success("Code copied to clipboard!");
    });
  };
  return (
    <div className="w-full relative">
    <div className="absolute rounded-s-md w-1 inset-y-0 bg-gradient-to-b from-accent_opacity to-accent" />
    <pre className="rounded-md text-sm sm:text-base dark:!bg-[#151515] px-4 sm:px-6 md:px-8 whitespace-pre-wrap break-word flex justify-between">
      <code className={`language-${language} !bg-transparent`}>{code}</code>
    </pre>
    <button className="text-gray-500 p-2 absolute top-2 right-2 hover:opacity-80" onClick={()=> handleCopyClick(code)}>
      <Copy className="size-5 text-primary/50" />
    </button>
  </div>
  )
}

export default CodeBox