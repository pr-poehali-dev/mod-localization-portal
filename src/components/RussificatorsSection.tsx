import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Russificator {
  id: number;
  title: string;
  game: 'skyrim' | 'witcher3';
  author: string;
  version: string;
  date: string;
}

interface RussificatorsSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGame: 'all' | 'skyrim' | 'witcher3';
  setSelectedGame: (game: 'all' | 'skyrim' | 'witcher3') => void;
  filteredRussificators: Russificator[];
}

export function RussificatorsSection({
  searchQuery,
  setSearchQuery,
  selectedGame,
  setSelectedGame,
  filteredRussificators
}: RussificatorsSectionProps) {
  return (
    <section id="russificators" className="mb-12">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Поиск русификаторов..."
            className="pl-10 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={selectedGame} onValueChange={(value) => setSelectedGame(value as 'all' | 'skyrim' | 'witcher3')}>
        <TabsList className="mb-8 bg-secondary">
          <TabsTrigger value="all">Все игры</TabsTrigger>
          <TabsTrigger value="skyrim">TES V SKYRIM</TabsTrigger>
          <TabsTrigger value="witcher3">The Witcher Wild Hunt</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedGame} className="mt-0">
          {filteredRussificators.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRussificators.map((rus) => (
                <Card key={rus.id} className="bg-card border-border hover:border-primary transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{rus.title}</CardTitle>
                      <Badge variant="secondary" className="ml-2">
                        {rus.game === 'skyrim' ? 'TES V SKYRIM' : 'The Witcher Wild Hunt'}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Icon name="User" size={14} />
                        {rus.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {rus.date}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {rus.game === 'skyrim' ? 'TES V SKYRIM' : 'The Witcher Wild Hunt'} • v{rus.version}
                      </span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 glow-red">
                        <Icon name="Download" size={14} className="mr-1" />
                        Скачать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Icon name="Frown" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {searchQuery ? 'Ничего не найдено. Попробуйте изменить запрос.' : 'Русификаторы скоро появятся!'}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
