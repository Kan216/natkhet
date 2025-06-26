import { content } from "@/lib/content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <Card key={sign.name} className="flex flex-col">
              <CardHeader className="items-center text-center">
                <sign.icon className="w-16 h-16 text-accent" />
                <CardTitle className="font-headline text-2xl mt-4">{sign.name}</CardTitle>
                <p className="text-muted-foreground">{sign.dates}</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <Accordion type="single" collapsible className="w-full mt-auto">
                    {sign.details.map((detail, index) => (
                         <AccordionItem key={index} value={`item-${index}`}>
                         <AccordionTrigger>{detail.title}</AccordionTrigger>
                         <AccordionContent className="text-base">
                           {detail.content}
                         </AccordionContent>
                       </AccordionItem>
                    ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
