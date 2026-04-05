"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  FileText, 
  Camera, 
  Share2, 
  MessageCircle, 
  Briefcase,
  Mail,
  Zap,
  Copy,
  Check,
  RefreshCw,
  Save,
  Send
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const contentTypes = [
  { id: "blog_post", label: "Blog Post", icon: FileText },
  { id: "social_facebook", label: "Facebook", icon: Share2 },
  { id: "social_instagram", label: "Instagram", icon: Camera },
  { id: "social_twitter", label: "Twitter/X", icon: MessageCircle },
  { id: "social_linkedin", label: "LinkedIn", icon: Briefcase },
  { id: "email_campaign", label: "Email", icon: Mail },
];

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly & Approachable" },
  { value: "luxury", label: "Premium & Luxury" },
  { value: "informative", label: "Informative & Educational" },
  { value: "urgent", label: "Urgent & Action-Oriented" },
];

export function ContentGenerator() {
  const [contentType, setContentType] = useState("blog_post");
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("professional");
  const [targetAudience, setTargetAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-content-generator', {
        body: {
          contentType,
          topic,
          keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
          tone,
          targetAudience: targetAudience || undefined
        }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedContent(data.generated);
      toast.success("Content generated successfully!");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    const textToCopy = generatedContent?.content || generatedContent?.title || JSON.stringify(generatedContent, null, 2);
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveDraft = async () => {
    try {
      const { error } = await supabase
        .from('content_drafts')
        .insert([{
          content_type: contentType as any,
          title: generatedContent?.title || generatedContent?.subject || topic,
          content: generatedContent?.content || JSON.stringify(generatedContent),
          meta_description: generatedContent?.metaDescription || generatedContent?.previewText,
          keywords: generatedContent?.suggestedKeywords || keywords.split(',').map(k => k.trim()).filter(Boolean),
          ai_prompt: topic,
          status: 'draft'
        }]);

      if (error) throw error;
      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save draft");
    }
  };

  const selectedType = contentTypes.find(t => t.id === contentType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl group hover:scale-105 transition-transform">
          <Lightbulb className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground font-serif">AI Content Generator</h2>
          <p className="text-muted-foreground text-sm">Create compelling content powered by AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif font-serif">Content Settings</CardTitle>
            <CardDescription>Configure what you want to generate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content Type Selection */}
            <div className="space-y-3">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content Type</Label>
              <div className="grid grid-cols-3 gap-2">
                {contentTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={contentType === type.id ? "default" : "outline"}
                    className={`flex flex-col h-auto py-4 border-border/50 group transition-all ${
                      contentType === type.id ? "bg-accent text-accent-foreground border-accent shadow-md" : "hover:border-accent/50"
                    }`}
                    onClick={() => setContentType(type.id)}
                  >
                    <type.icon className={`h-5 w-5 mb-1.5 transition-transform ${contentType === type.id ? "scale-110" : "group-hover:scale-110"}`} />
                    <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">{type.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Topic / Subject</Label>
              <Textarea
                placeholder="e.g., How vehicle tracking saves fleet businesses 20% on fuel costs"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={4}
                className="bg-secondary/30 border-border resize-none focus:ring-accent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Keywords */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Target Keywords</Label>
                <Input
                  placeholder="e.g., GPS, fleet, fuel saving"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="bg-secondary/30 border-border h-10"
                />
              </div>

              {/* Tone */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tone of Voice</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="bg-secondary/30 border-border h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {toneOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Target Audience */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Target Audience (optional)</Label>
              <Input
                placeholder="e.g., Logistics managers, small business owners"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="bg-secondary/30 border-border h-10"
              />
            </div>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !topic}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground btn-premium h-12 text-base font-semibold"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="bg-card border-border relative overflow-hidden shadow-sm">
          <CardHeader className="bg-secondary/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 font-serif font-serif">
                   {selectedType && <selectedType.icon className="h-5 w-5 text-accent" />}
                   Generated Result
                </CardTitle>
                <CardDescription className="text-xs">Review and edit before publishing</CardDescription>
              </div>
              {generatedContent && (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0 hover:text-accent">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleSaveDraft} className="h-8 w-8 p-0 hover:text-accent">
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse" />
                  <RefreshCw className="h-14 w-14 text-accent animate-spin relative z-10" />
                </div>
                <p className="text-muted-foreground font-serif text-lg">AI is crafting your {selectedType?.label}...</p>
                <p className="text-xs text-muted-foreground/60 mt-2">This may take up to 30 seconds</p>
              </div>
            ) : generatedContent ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 space-y-6"
              >
                {/* Title */}
                {(generatedContent.title || generatedContent.subject) && (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      {generatedContent.subject ? "Subject Line" : "Post Title"}
                    </Label>
                    <div className="p-3 bg-secondary/30 rounded-sm border border-border/50 text-foreground font-semibold text-lg font-serif">
                      {generatedContent.title || generatedContent.subject}
                    </div>
                  </div>
                )}

                {/* Subtitle / Meta */}
                {(generatedContent.metaDescription || generatedContent.previewText) && (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                      {generatedContent.previewText ? "Preview Text" : "SEO Meta Description"}
                    </Label>
                    <div className="p-3 bg-secondary/30 rounded-sm border border-border/50 text-sm text-foreground/80 leading-relaxed italic">
                      {generatedContent.metaDescription || generatedContent.previewText}
                    </div>
                  </div>
                )}

                {/* Main Content */}
                {generatedContent.content && (
                  <div className="space-y-1.5">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Live Preview</Label>
                    <div className="p-4 bg-secondary/30 rounded-sm border border-border/50 max-h-[360px] overflow-y-auto custom-scrollbar">
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-serif prose-p:leading-relaxed prose-p:text-foreground/90">
                        <ReactMarkdown>{generatedContent.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}

                {/* Keywords/Hashtags */}
                {(generatedContent.suggestedKeywords || generatedContent.suggestedHashtags) && (
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Recommended tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {(generatedContent.suggestedKeywords || generatedContent.suggestedHashtags)?.map(
                        (tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="bg-background text-[10px] font-mono border-accent/20 text-accent">
                            {tag.startsWith('#') ? tag : `#${tag}`}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-border mt-4">
                  <Button onClick={handleSaveDraft} variant="outline" className="flex-1 h-10 text-xs uppercase tracking-widest font-bold">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-10 text-xs uppercase tracking-widest font-bold">
                    <Send className="h-4 w-4 mr-2" />
                    Publish Now
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center px-8">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
                  <Lightbulb className="h-8 w-8 text-muted-foreground/40" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 font-serif text-xl">Ready to Create?</h3>
                <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                  Fill in the details on the left, and our AI will generate professional marketing content tailored to your brand.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
