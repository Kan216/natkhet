"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

import { astrologyQuery, AstrologyQueryOutput } from "@/ai/flows/query-tool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
const questions = ["အချစ်ရေး", "လူမှုရေး", "အလုပ်အကိုင်", "ကျန်းမာရေး"];

export function AiQueryTool() {
  const [apiKey, setApiKey] = useState("");
  const [selectedSign, setSelectedSign] = useState(signs[0]);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [result, setResult] = useState<AstrologyQueryOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        variant: "destructive",
        title: "API Key လိုအပ်ပါသည်",
        description: "ကျေးဇူးပြု၍ သင်၏ Google AI API Key ကိုထည့်ပါ။",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const signForQuery = (selectedSign === "all-signs" || !selectedSign) ? undefined : selectedSign;
      const response = await astrologyQuery({ 
        apiKey,
        query: selectedQuestion,
        zodiacSign: signForQuery
      });
      setResult(response);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while fetching the answer. Please check your API key and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-primary/80">Google AI API Key</Label>
            <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="သင်၏ API Key ကိုဤနေရာတွင် ထည့်ပါ"
                className="w-full bg-card/80 text-base"
                disabled={loading}
            />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Select value={selectedSign} onValueChange={setSelectedSign}>
                <SelectTrigger className="w-full bg-card/80 text-base h-auto py-2.5">
                    <SelectValue placeholder="ရာသီခွင်ကို ရွေးပါ" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all-signs">ရာသီခွင်အားလုံး</SelectItem>
                    {signs.map(sign => <SelectItem key={sign} value={sign}>{sign}</SelectItem>)}
                </SelectContent>
            </Select>

            <Select value={selectedQuestion} onValueChange={setSelectedQuestion}>
                <SelectTrigger className="w-full bg-card/80 text-base h-auto py-2.5">
                    <SelectValue placeholder="မေးခွန်းကို ရွေးပါ" />
                </SelectTrigger>
                <SelectContent>
                    {questions.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
        
        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          AI ကို မေးရန်
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