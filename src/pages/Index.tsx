import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';
import { AuthDialog } from '@/components/AuthDialog';
import { HeroSection } from '@/components/HeroSection';
import { RussificatorsSection } from '@/components/RussificatorsSection';
import { InstructionsSection } from '@/components/InstructionsSection';
import { NewsSection } from '@/components/NewsSection';
import { NewsDialog } from '@/components/NewsDialog';

interface Russificator {
  id: number;
  title: string;
  game: 'skyrim' | 'witcher3';
  author: string;
  version: string;
  date: string;
}

interface NewsPost {
  id: number;
  title: string;
  content: string;
  date: string;
}

const mockRussificators: Russificator[] = [];

function Index() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<'all' | 'skyrim' | 'witcher3'>('all');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [news, setNews] = useState<NewsPost[]>([
    {
      id: 1,
      title: 'Добро пожаловать на ruprojectgames!',
      content: 'Запуск нового портала русификации для модов TES V SKYRIM и The Witcher Wild Hunt. Скоро здесь появятся первые переводы!',
      date: '27 октября 2025'
    }
  ]);
  const [showNewsDialog, setShowNewsDialog] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsPost | null>(null);
  const [newsForm, setNewsForm] = useState({ title: '', content: '' });
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [isLoadingVerification, setIsLoadingVerification] = useState(false);

  const filteredRussificators = mockRussificators.filter(rus => {
    const matchesSearch = rus.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         rus.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === 'all' || rus.game === selectedGame;
    return matchesSearch && matchesGame;
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailInput = (e.target as HTMLFormElement).email.value;
    
    if (authMode === 'register' && !showVerificationStep) {
      setIsLoadingVerification(true);
      try {
        const response = await fetch('https://functions.poehali.dev/0e01834e-3292-44f3-be09-8736efd2cd47', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailInput })
        });
        const data = await response.json();
        if (data.success) {
          setSentCode(data.code);
          setShowVerificationStep(true);
          toast({ title: 'Код отправлен', description: 'Проверьте свою почту' });
        } else {
          toast({ title: 'Ошибка', description: 'Не удалось отправить код', variant: 'destructive' });
        }
      } catch (error) {
        toast({ title: 'Ошибка', description: 'Проблема с подключением', variant: 'destructive' });
      }
      setIsLoadingVerification(false);
      return;
    }
    
    if (authMode === 'register' && showVerificationStep) {
      if (verificationCode !== sentCode) {
        toast({ title: 'Неверный код', description: 'Проверьте код из письма', variant: 'destructive' });
        return;
      }
    }
    
    const isAdminUser = emailInput === 'admin@ruprojectgames.com';
    setIsLoggedIn(true);
    setIsAdmin(isAdminUser);
    setShowAuthDialog(false);
    setShowVerificationStep(false);
    setVerificationCode('');
    setSentCode('');
    toast({ title: 'Добро пожаловать!', description: 'Вы успешно вошли' });
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNews) {
      setNews(news.map(n => n.id === editingNews.id ? { ...n, title: newsForm.title, content: newsForm.content } : n));
      toast({ title: 'Новость обновлена', description: 'Изменения успешно сохранены' });
    } else {
      const newPost: NewsPost = {
        id: Date.now(),
        title: newsForm.title,
        content: newsForm.content,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      setNews([newPost, ...news]);
      toast({ title: 'Новость добавлена', description: 'Новая запись опубликована' });
    }
    setNewsForm({ title: '', content: '' });
    setEditingNews(null);
    setShowNewsDialog(false);
  };

  const handleEditNews = (post: NewsPost) => {
    setEditingNews(post);
    setNewsForm({ title: post.title, content: post.content });
    setShowNewsDialog(true);
  };

  const handleDeleteNews = (id: number) => {
    setNews(news.filter(n => n.id !== id));
    toast({ title: 'Новость удалена', description: 'Запись успешно удалена' });
  };

  const handleAddNews = () => {
    setEditingNews(null);
    setNewsForm({ title: '', content: '' });
    setShowNewsDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <Header
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          onNavigateProfile={() => navigate('/profile')}
          onLogout={() => { setIsLoggedIn(false); setIsAdmin(false); }}
        />
        <AuthDialog
          open={showAuthDialog}
          onOpenChange={setShowAuthDialog}
          authMode={authMode}
          setAuthMode={setAuthMode}
          onSubmit={handleAuth}
          showVerificationStep={showVerificationStep}
          setShowVerificationStep={setShowVerificationStep}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          isLoadingVerification={isLoadingVerification}
        />
      </Dialog>

      <main className="container mx-auto px-4 py-12">
        <HeroSection />
        <RussificatorsSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          filteredRussificators={filteredRussificators}
        />
        <InstructionsSection />
        <NewsSection
          news={news}
          isAdmin={isAdmin}
          onAddNews={handleAddNews}
          onEditNews={handleEditNews}
          onDeleteNews={handleDeleteNews}
        />
      </main>

      <NewsDialog
        open={showNewsDialog}
        onOpenChange={setShowNewsDialog}
        isEditing={!!editingNews}
        newsForm={newsForm}
        setNewsForm={setNewsForm}
        onSubmit={handleNewsSubmit}
      />

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
