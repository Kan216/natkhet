import { content } from "@/lib/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-primary/5">
      <div className="container relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-0 opacity-10">
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] bg-cover bg-center moon-rotation" 
                style={{backgroundImage: "url('https://placehold.co/1000x1000.png')", backgroundBlendMode: 'screen'}}
                data-ai-hint="moon texture"
            />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary sm:text-5xl md:text-6xl lg:text-7xl">
          {content.appName}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-primary/80 sm:text-xl md:text-2xl">
          {content.appSubtitle}
        </p>
        <div className="mt-10">
            <Button asChild size="lg">
                <Link href="#horoscope-predictions">ဇာတာခန့်မှန်းချက်များကို ကြည့်ရန်</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
