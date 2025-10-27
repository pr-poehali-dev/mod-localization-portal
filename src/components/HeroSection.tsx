import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export function HeroSection() {
  return (
    <section className="mb-16 text-center animate-fade-in">
      <h2 className="text-5xl font-bold mb-4 text-glow">
        Русификация модов для RPG
      </h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        База переводов для модов TES V SKYRIM и The Witcher Wild Hunt.
      </p>
      <div className="flex gap-4 justify-center">
        <Button size="lg" className="bg-primary hover:bg-primary/90 glow-red-strong">
          <Icon name="Download" size={20} className="mr-2" />
          Скачать русификатор
        </Button>
        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <Icon name="BookOpen" size={20} className="mr-2" />
          Инструкции
        </Button>
      </div>
    </section>
  );
}
