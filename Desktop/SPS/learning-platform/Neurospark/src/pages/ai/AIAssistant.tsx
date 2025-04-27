
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI study assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      // Example responses - in a real app, this would come from an AI API
      const responses = [
        "I can help you understand that concept. Let's break it down step by step...",
        "That's a great question! In simple terms, this topic works like...",
        "I've found some helpful resources on this subject. Would you like me to explain the key points?",
        "Let's work through this problem together. First, we need to identify what we're solving for...",
        "I notice you're working on this topic. Here's an approach that many students find helpful..."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        role: 'assistant',
        content: randomResponse
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AppShell userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Learning Assistant</h1>
          <p className="text-muted-foreground">Ask questions and get personalized help with your studies</p>
        </div>
        
        <Card className="border-border h-[calc(100vh-220px)] flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex-1 overflow-auto mb-4 space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="mt-1">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-electric-blue text-white">AI</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div 
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-electric-blue text-white' 
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                  
                  {message.role === 'user' && (
                    <Avatar className="mt-1">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start items-start gap-3">
                  <Avatar className="mt-1">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-electric-blue text-white">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted text-foreground rounded-lg p-4">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse" />
                      <div className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse delay-150" />
                      <div className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse delay-300" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Ask any question about your studies..." 
                className="flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-electric-blue hover:bg-electric-blue/90"
              >
                <Send size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default AIAssistant;
