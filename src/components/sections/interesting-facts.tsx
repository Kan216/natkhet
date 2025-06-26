import { content } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export function InterestingFacts() {
  const { title, description } = content.sections.interestingFacts;
  return (
    <section id="interesting-facts">
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
            <CardContent className="p-6 md:p-8">
                <ul className="space-y-6">
                    {content.interestingFacts.map((fact, index) => (
                        <li key={index} className="flex items-start gap-4">
                            <Star className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                            <p className="text-lg text-foreground/90">{fact.content}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
