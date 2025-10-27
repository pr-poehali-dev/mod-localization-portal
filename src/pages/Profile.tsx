import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UploadedRussificator {
  id: number;
  title: string;
  game: 'skyrim' | 'witcher3';
  version: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [userMods, setUserMods] = useState<UploadedRussificator[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    game: '',
    version: '',
    description: '',
    file: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    setTimeout(() => {
      const newMod: UploadedRussificator = {
        id: Date.now(),
        title: formData.title,
        game: formData.game as 'skyrim' | 'witcher3',
        version: formData.version,
        date: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      
      setUserMods([newMod, ...userMods]);
      setFormData({ title: '', game: '', version: '', description: '', file: null });
      setIsUploading(false);
      
      toast({
        title: "Русификатор загружен!",
        description: "Ваш перевод отправлен на модерацию",
      });
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-600">Одобрен</Badge>;
      case 'pending':
        return <Badge variant="secondary">На модерации</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Отклонён</Badge>;
      default:
        return null;
    }
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
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button variant="outline" className="border-primary text-primary">
                <Icon name="Shield" size={18} className="mr-2" />
                Админ
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Админ-панель</h2>
          <p className="text-muted-foreground">Загружайте и управляйте русификаторами</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-card border-border h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Upload" size={24} className="text-primary" />
                Загрузить русификатор
              </CardTitle>
              <CardDescription>
                Заполните форму и загрузите архив с переводом
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Название мода *</Label>
                  <Input
                    id="title"
                    placeholder="Immersive Armors - Полный перевод"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-secondary border-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="game">Игра *</Label>
                  <Select value={formData.game} onValueChange={(value) => setFormData({ ...formData, game: value })} required>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Выберите игру" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skyrim">TES V SKYRIM</SelectItem>
                      <SelectItem value="witcher3">The Witcher Wild Hunt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">Версия *</Label>
                  <Input
                    id="version"
                    placeholder="1.0"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    className="bg-secondary border-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    placeholder="Краткое описание русификатора, особенности перевода..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-secondary border-border min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Файл русификатора *</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file"
                      type="file"
                      accept=".zip,.rar,.7z"
                      onChange={handleFileChange}
                      className="bg-secondary border-border"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Поддерживаются форматы: ZIP, RAR, 7Z
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 glow-red"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    <>
                      <Icon name="Upload" size={18} className="mr-2" />
                      Загрузить
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" size={24} className="text-primary" />
                  Мои русификаторы
                </CardTitle>
                <CardDescription>
                  {userMods.length > 0 
                    ? `Загружено переводов: ${userMods.length}` 
                    : 'Здесь будут отображаться ваши загруженные русификаторы'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userMods.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="FolderOpen" size={48} className="mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Вы ещё не загрузили ни одного русификатора
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userMods.map((mod) => (
                      <div 
                        key={mod.id}
                        className="p-4 rounded-lg border border-border bg-secondary/50 hover:border-primary transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold">{mod.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {mod.game === 'skyrim' ? 'TES V SKYRIM' : 'The Witcher Wild Hunt'} • v{mod.version}
                            </p>
                          </div>
                          {getStatusBadge(mod.status)}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon name="Calendar" size={14} />
                          <span>{new Date(mod.date).toLocaleDateString('ru-RU')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Info" size={24} className="text-primary" />
                  Правила публикации
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <p>Используйте понятные названия переводов</p>
                </div>
                <div className="flex gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <p>Указывайте корректную версию мода</p>
                </div>
                <div className="flex gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <p>Архив должен содержать все необходимые файлы</p>
                </div>
                <div className="flex gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <p>Модерация занимает 1-3 дня</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 ruprojectgames. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

export default Profile;