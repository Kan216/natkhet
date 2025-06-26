import { content } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function WhyBelieve() {
  const { title, description } = content.sections.whyBelieve;
  return (
    <section id="why-believe" className="bg-primary/5">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-primary sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-primary/80">
            {description}
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.whyBelieve.map((reason, index) => (
            <Card key={index} className="bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-start gap-3 font-headline text-xl">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <span>{reason.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-foreground/80">{reason.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
