import { content } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ZodiacSigns() {
  const { title, description } = content.sections.zodiacSigns;
  return (
    <section id="zodiac-signs" className="bg-primary/5">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-primary sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-primary/80">
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.zodiacSigns.map((sign) => (
            <Card key={sign.name} className="flex flex-col text-center hover:shadow-lg transition-shadow bg-card">
              <CardHeader className="items-center">
                <sign.icon className="w-16 h-16 text-accent" />
                <CardTitle className="font-headline text-2xl mt-4">{sign.name}</CardTitle>
                <p className="text-muted-foreground">{sign.dates}</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-foreground/80 mb-6 flex-grow">
                  {(sign.details[0].content as string)}
                </p>
                <Button asChild>
                  <Link href={`/zodiac/${sign.slug}`}>အသေးစိတ်ကြည့်ရန်</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
