"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

import { astrologyQuery, AstrologyQueryOutput } from "@/ai/flows/query-tool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { content } from "@/lib/content";

const signs = content.zodiacSigns.map(s => s.name);

export function AiQueryTool() {
  const [query, setQuery] = useState("");
  const [selectedSign, setSelectedSign] = useState("");
  const [result, setResult] = useState<AstrologyQueryOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      // If selectedSign is "all-signs" or empty, pass undefined to the AI flow.
      const signForQuery = (selectedSign === "all-signs" || !selectedSign) ? undefined : selectedSign;
      const response = await astrologyQuery({ 
        query, 
        zodiacSign: signForQuery
      });
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
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <Select value={selectedSign} onValueChange={setSelectedSign}>
            <SelectTrigger className="w-full sm:w-[200px] bg-card/80 text-base h-auto py-2.5">
                <SelectValue placeholder="ရာသီခွင်ကို ရွေးပါ" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all-signs">ရာသီခွင်အားလုံး</SelectItem>
                {signs.map(sign => <SelectItem key={sign} value={sign}>{sign}</SelectItem>)}
            </SelectContent>
        </Select>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ဥပမာ- အချစ်ရေးအကြောင်းမေးရန်"
          className="flex-1 bg-card/80 text-base"
          disabled={loading}
        />
        <Button type="submit" disabled={loading} size="lg" className="w-full sm:w-auto">
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
