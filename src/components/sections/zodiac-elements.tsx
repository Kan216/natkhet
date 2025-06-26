import { content } from "@/lib/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Flame, Droplets, Wind, Mountain } from "lucide-react";

const elementIcons = {
    "မီးရာသီခွင်များ (Fire Signs)": <Flame className="w-8 h-8 text-destructive" />,
    "ရေရာသီခွင်များ (Water Signs)": <Droplets className="w-8 h-8 text-blue-500" />,
    "လေရာသီခွင်များ (Air Signs)": <Wind className="w-8 h-8 text-sky-400" />,
    "မြေရာသီခွင်များ (Earth Signs)": <Mountain className="w-8 h-8 text-amber-700" />,
};

export function ZodiacElements() {
  const { title, description } = content.sections.zodiacElements;
  
  return (
    <section id="zodiac-elements">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-primary sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-primary/80">
            {description}
          </p>
        </div>

        <Tabs defaultValue={content.zodiacElements[0].name} className="mt-12 w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            {content.zodiacElements.map((element) => (
              <TabsTrigger key={element.name} value={element.name} className="py-2 text-base">
                {element.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {content.zodiacElements.map((element) => (
            <TabsContent key={element.name} value={element.name}>
              <Card className="bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {elementIcons[element.name as keyof typeof elementIcons]}
                    <CardTitle className="font-headline text-2xl">{element.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base pt-4">{element.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <h4 className="font-bold mb-2">ဤဒြပ်စင်အောက်ရှိ ရာသီခွင်များ:</h4>
                    <div className="flex flex-wrap gap-4">
                        {element.signs.map(sign => (
                            <div key={sign} className="py-2 px-4 rounded-full bg-accent text-accent-foreground font-medium">
                                {sign}
                            </div>
                        ))}
                    </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
