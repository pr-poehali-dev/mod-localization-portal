import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onNavigateProfile: () => void;
  onLogout: () => void;
}

export function Header({ isLoggedIn, isAdmin, onNavigateProfile, onLogout }: HeaderProps) {
  return (
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
            <a href="#news" className="text-foreground hover:text-primary transition-colors">Новости</a>
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={onNavigateProfile}
                  >
                    <Icon name="User" size={18} className="mr-2" />
                    Админ-панель
                  </Button>
                )}
                <Button variant="ghost" onClick={onLogout}>
                  <Icon name="LogOut" size={18} />
                </Button>
              </div>
            ) : (
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 glow-red">
                  <Icon name="LogIn" size={18} className="mr-2" />
                  Войти
                </Button>
              </DialogTrigger>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
