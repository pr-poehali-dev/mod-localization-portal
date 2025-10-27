import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Russificator {
  id: number;
  title: string;
  game: 'skyrim' | 'witcher3';
  author: string;
  version: string;
  date: string;
}

const mockRussificators: Russificator[] = [];

function Index() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<'all' | 'skyrim' | 'witcher3'>('all');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const filteredRussificators = mockRussificators.filter(rus => {
    const matchesSearch = rus.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         rus.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === 'all' || rus.game === selectedGame;
    return matchesSearch && matchesGame;
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuthDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center glow-red">
                <Icon name="Languages" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-glow">ruprojectgames</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#russificators" className="text-foreground hover:text-primary transition-colors">Русификаторы</a>
              <a href="#instructions" className="text-foreground hover:text-primary transition-colors">Инструкции</a>
              <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => navigate('/profile')}
                  >
                    <Icon name="User" size={18} className="mr-2" />
                    Профиль
                  </Button>
                  <Button variant="ghost" onClick={() => setIsLoggedIn(false)}>
                    <Icon name="LogOut" size={18} />
                  </Button>
                </div>
              ) : (
                <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 glow-red">
                      <Icon name="LogIn" size={18} className="mr-2" />
                      Войти
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        {authMode === 'login' ? 'Вход' : 'Регистрация'}
                      </DialogTitle>
                      <DialogDescription>
                        {authMode === 'login' 
                          ? 'Войдите в свой аккаунт для доступа ко всем функциям' 
                          : 'Создайте аккаунт для публикации русификаторов'}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAuth} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your@email.com"
                          className="bg-secondary border-border"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Пароль</Label>
                        <Input 
                          id="password" 
                          type="password"
                          placeholder="••••••••"
                          className="bg-secondary border-border"
                          required
                        />
                      </div>
                      {authMode === 'register' && (
                        <div className="space-y-2">
                          <Label htmlFor="username">Имя пользователя</Label>
                          <Input 
                            id="username" 
                            placeholder="Drakonov"
                            className="bg-secondary border-border"
                            required
                          />
                        </div>
                      )}
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 glow-red">
                        {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                      </Button>
                      <p className="text-center text-sm text-muted-foreground">
                        {authMode === 'login' ? (
                          <>
                            Нет аккаунта?{' '}
                            <button 
                              type="button"
                              onClick={() => setAuthMode('register')}
                              className="text-primary hover:underline"
                            >
                              Зарегистрируйтесь
                            </button>
                          </>
                        ) : (
                          <>
                            Уже есть аккаунт?{' '}
                            <button 
                              type="button"
                              onClick={() => setAuthMode('login')}
                              className="text-primary hover:underline"
                            >
                              Войдите
                            </button>
                          </>
                        )}
                      </p>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 text-glow">
            Русификация модов для RPG
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Крупнейшая база переводов для модов TES V SKYRIM и The Witcher Wild Hunt. 
            Качественная локализация от сообщества для сообщества.
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

        <section id="russificators" className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск по названию или автору..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <Tabs value={selectedGame} onValueChange={(v) => setSelectedGame(v as any)} className="w-full md:w-auto">
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="skyrim">TES V SKYRIM</TabsTrigger>
                <TabsTrigger value="witcher3">The Witcher Wild Hunt</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRussificators.map((rus, index) => (
              <Card 
                key={rus.id} 
                className="bg-card border-border hover:border-primary transition-all duration-300 hover:glow-red group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/50">
                      {rus.game === 'skyrim' ? 'TES V SKYRIM' : 'The Witcher Wild Hunt'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">v{rus.version}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {rus.title}
                  </CardTitle>
                  <CardDescription>
                    Автор: {rus.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={16} />
                      <span>{new Date(rus.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 group-hover:glow-red-strong transition-all">
                    <Icon name="Download" size={18} className="mr-2" />
                    Скачать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRussificators.length === 0 && (
            <div className="text-center py-12">
              <Icon name="FolderOpen" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground mb-2">
                Русификаторы скоро появятся
              </p>
              <p className="text-sm text-muted-foreground">
                Здесь будут отображаться все доступные переводы модов
              </p>
            </div>
          )}
        </section>

        <section id="instructions" className="mb-12">
          <h3 className="text-3xl font-bold mb-6 text-center">Как установить русификатор?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Swords" size={24} className="text-primary" />
                  TES V SKYRIM
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">1</div>
                  <p>Скачайте архив с русификатором</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">2</div>
                  <p>Распакуйте в папку Data игры</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">3</div>
                  <p>Активируйте плагины через лаунчер или mod manager</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">4</div>
                  <p>Запустите игру и наслаждайтесь переводом!</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sword" size={24} className="text-primary" />
                  The Witcher Wild Hunt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">1</div>
                  <p>Скачайте русификатор мода</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">2</div>
                  <p>Поместите файлы в Mods или DLC папку</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">3</div>
                  <p>Используйте Script Merger при конфликтах</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold flex-shrink-0">4</div>
                  <p>Проверьте перевод в игре</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="contacts" className="text-center">
          <Card className="bg-card border-border max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Связаться с нами</CardTitle>
              <CardDescription>
                Есть вопросы или предложения? Мы всегда на связи!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Icon name="Mail" size={18} className="mr-2" />
                Email
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Discord
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Icon name="Send" size={18} className="mr-2" />
                Telegram
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 ruprojectgames. Все права защищены.</p>
          <p className="mt-2 text-sm">
            Сделано с ❤️ для русскоязычного комьюнити модеров
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Index;