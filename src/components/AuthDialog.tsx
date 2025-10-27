import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  onSubmit: (e: React.FormEvent) => void;
  showVerificationStep: boolean;
  setShowVerificationStep: (show: boolean) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  isLoadingVerification: boolean;
}

export function AuthDialog({
  open,
  onOpenChange,
  authMode,
  setAuthMode,
  onSubmit,
  showVerificationStep,
  setShowVerificationStep,
  verificationCode,
  setVerificationCode,
  isLoadingVerification
}: AuthDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          {!showVerificationStep ? (
            <>
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
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 glow-red" disabled={isLoadingVerification}>
                {isLoadingVerification ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  authMode === 'login' ? 'Войти' : 'Получить код'
                )}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="verification-code">Код подтверждения</Label>
                <Input 
                  id="verification-code" 
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="bg-secondary border-border text-center text-2xl tracking-widest"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Введите 6-значный код из письма
                </p>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 glow-red">
                Подтвердить
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => setShowVerificationStep(false)}
              >
                Вернуться назад
              </Button>
            </>
          )}
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
  );
}
