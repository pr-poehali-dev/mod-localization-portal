import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export function InstructionsSection() {
  return (
    <section id="instructions" className="mb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Инструкции по установке</h2>
        <p className="text-muted-foreground">Подробные гайды для каждой игры</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BookOpen" size={24} className="text-primary" />
              TES V SKYRIM
            </CardTitle>
            <CardDescription>
              Установка русификаторов для Skyrim
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 glow-red">
                <span className="text-primary font-bold">1</span>
              </div>
              <p className="text-sm text-muted-foreground">Скачайте нужный русификатор из каталога</p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 glow-red">
                <span className="text-primary font-bold">2</span>
              </div>
              <p className="text-sm text-muted-foreground">Распакуйте архив в папку Data игры</p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 glow-red">
                <span className="text-primary font-bold">3</span>
              </div>
              <p className="text-sm text-muted-foreground">Активируйте ESP/ESM файлы в лаунчере</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="BookOpen" size={24} className="text-primary" />
              The Witcher Wild Hunt
            </CardTitle>
            <CardDescription>
              Установка русификаторов для Ведьмака 3
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 glow-red">
                <span className="text-primary font-bold">1</span>
              </div>
              <p className="text-sm text-muted-foreground">Загрузите файлы русификации</p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 glow-red">
                <span className="text-primary font-bold">2</span>
              </div>
              <p className="text-sm text-muted-foreground">Скопируйте в папку Mods игры</p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 glow-red">
                <span className="text-primary font-bold">3</span>
              </div>
              <p className="text-sm text-muted-foreground">Запустите игру через Script Merger</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
