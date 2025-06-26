"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const signs = content.zodiacSigns.map(s => s.name);
const signData = content.zodiacSigns;

const getCompatibility = (sign1Name: string, sign2Name: string) => {
  if (sign1Name === sign2Name) return 3;

  const sign1 = signData.find(s => s.name === sign1Name);
  const sign2 = signData.find(s => s.name === sign2Name);
  if (!sign1 || !sign2) return 0;

  const sign1Index = signData.indexOf(sign1);
  const sign2Index = signData.indexOf(sign2);

  if (Math.abs(sign1Index - sign2Index) === 6) return 4; // Opposition
  if (sign1.element === sign2.element) return 3; // Same element
  if ((sign1.element === "လေ" && sign2.element === "မီး") || (sign1.element === "မီး" && sign2.element === "လေ")) return 3;
  if ((sign1.element === "ရေ" && sign2.element === "မြေ") || (sign1.element === "မြေ" && sign2.element === "ရေ")) return 3;
  if (Math.abs(sign1Index - sign2Index) % 3 === 0) return 2; // Square
  if (Math.abs(sign1Index - sign2Index) % 2 !== 0) return 1; // Quincunx/Semi-sextile

  return 1;
};

const CompatibilityHeart = ({ level }: { level: number }) => {
  const styles = [
    { size: "w-3 h-3", opacity: "opacity-20", fill: "fill-none" }, // Level 0
    { size: "w-4 h-4", opacity: "opacity-40", fill: "fill-destructive/20" }, // Level 1
    { size: "w-5 h-5", opacity: "opacity-60", fill: "fill-destructive/50" }, // Level 2
    { size: "w-6 h-6", opacity: "opacity-80", fill: "fill-destructive/80" }, // Level 3
    { size: "w-7 h-7", opacity: "opacity-100", fill: "fill-destructive" }, // Level 4
  ];
  const currentStyle = styles[level] || styles[0];
  return <Heart className={cn(currentStyle.size, currentStyle.opacity, currentStyle.fill, "text-destructive transition-all")} />;
};

export function LoveCompatibility() {
  const { title, description, explanation } = content.sections.loveCompatibility;
  const [selectedSign1, setSelectedSign1] = useState(signs[0]);
  const [selectedSign2, setSelectedSign2] = useState(signs[1]);

  const compatibilityLevel = getCompatibility(selectedSign1, selectedSign2);
  const compatibilityText = ["အနိမ့်ဆုံး", "အနိမ့်", "အလယ်အလတ်", "အကောင်း", "အလွန်အကောင်း"];

  return (
    <section id="love-compatibility" className="bg-primary/5">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-primary sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-primary/80">
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {explanation.map((item, index) => (
             <Card key={index} className="bg-card/50">
               <CardHeader>
                 <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
               </CardHeader>
               <CardContent>
                 <p className="text-base text-foreground/80">{item.text}</p>
               </CardContent>
             </Card>
          ))}
        </div>

        <Card className="mt-16 bg-card/50">
          <CardHeader>
            <CardTitle className="text-center font-headline text-2xl">
              လိုက်ဖက်ညီမှု စစ်ဆေးရန်
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
                <Select value={selectedSign1} onValueChange={setSelectedSign1}>
                    <SelectTrigger className="w-full sm:w-1/2 text-lg h-12">
                        <SelectValue placeholder="ရာသီခွင်ကို ရွေးချယ်ပါ" />
                    </SelectTrigger>
                    <SelectContent>
                        {signs.map(sign => <SelectItem key={sign} value={sign}>{sign}</SelectItem>)}
                    </SelectContent>
                </Select>

                <div className="text-3xl font-bold text-destructive">&amp;</div>
                
                <Select value={selectedSign2} onValueChange={setSelectedSign2}>
                    <SelectTrigger className="w-full sm:w-1/2 text-lg h-12">
                        <SelectValue placeholder="ရာသီခွင်ကို ရွေးချယ်ပါ" />
                    </SelectTrigger>
                    <SelectContent>
                        {signs.map(sign => <SelectItem key={sign} value={sign}>{sign}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="mt-4 text-center">
                <p className="text-xl font-medium">လိုက်ဖက်ညီမှု အဆင့်:</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <CompatibilityHeart level={compatibilityLevel} />
                    <p className="text-2xl font-bold font-headline text-destructive">{compatibilityText[compatibilityLevel]}</p>
                </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  );
}
