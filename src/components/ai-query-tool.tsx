"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

import { astrologyQuery, AstrologyQueryOutput } from "@/ai/flows/query-tool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function AiQueryTool() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<AstrologyQueryOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await astrologyQuery({ query });
      setResult(response);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while fetching the answer. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ဥပမာ- မိဿရာသီဖွားအကြောင်းပြောပြပါ"
          className="flex-1 bg-card/80 text-base"
          disabled={loading}
        />
        <Button type="submit" disabled={loading} size="lg">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          မေးရန်
        </Button>
      </form>
      
      {loading && (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {result && (
        <Card className="text-left bg-card/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="text-accent" /> AI မှ အဖြေ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap font-body leading-relaxed">{result.answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
