
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { content } from '@/lib/content';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  return content.zodiacSigns.map((sign) => ({
    sign: sign.slug,
  }));
}

// Helper component to render text with bold tags
const BoldRenderer = ({ text }: { text: string }) => {
    const parts = text.split('**');
    return (
        <>
            {parts.map((part, i) =>
                i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part
            )}
        </>
    );
};

export default function ZodiacSignPage({ params }: { params: { sign: string } }) {
  const signData = content.zodiacSigns.find((s) => s.slug === params.sign);

  if (!signData) {
    notFound();
  }
  
  const signPrediction = signData.fullPrediction;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container">
          <div className="mb-8">
            <Button asChild variant="outline">
              <Link href="/#zodiac-signs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ရာသီခွင်များအားလုံးသို့ ပြန်သွားရန်
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
                <Card className="sticky top-24 text-center bg-card">
                    <CardHeader className="items-center">
                        <signData.icon className="w-24 h-24 text-accent" />
                        <CardTitle className="font-headline text-3xl mt-4">{signData.name}</CardTitle>
                        <p className="text-muted-foreground text-lg">{signData.dates}</p>
                    </CardHeader>
                    <CardContent>
                        <div className="text-left space-y-2">
                           <p><strong className="font-semibold">ဒြပ်:</strong> {signData.element}</p>
                           <p><strong className="font-semibold">အုပ်စိုးသောဂြိုဟ်:</strong> {signData.rulingPlanet}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4">
                <Card className="bg-card">
                    <CardHeader>
                        <CardTitle className="font-headline text-3xl">အသေးစိတ် ခန့်မှန်းချက်</CardTitle>
                    </CardHeader>
                    <CardContent className="text-base md:text-lg leading-relaxed whitespace-pre-line">
                        <BoldRenderer text={signPrediction} />
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
