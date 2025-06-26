import { content } from "@/lib/content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export function OtherSystems() {
  const { title, description } = content.sections.otherSystems;

  return (
    <section id="other-systems">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-primary sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-primary/80">
            {description}
          </p>
        </div>
        <Card className="mt-12 max-w-4xl mx-auto bg-primary/5">
            <CardContent className="p-2 md:p-4">
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {content.otherSystems.map((system, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-xl font-headline text-left">{system.title}</AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/80 leading-relaxed">
                        {system.content}
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
