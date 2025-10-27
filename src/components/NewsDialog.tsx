import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  newsForm: { title: string; content: string };
  setNewsForm: (form: { title: string; content: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function NewsDialog({ open, onOpenChange, isEditing, newsForm, setNewsForm, onSubmit }: NewsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isEditing ? 'Редактировать новость' : 'Добавить новость'}
          </DialogTitle>
          <DialogDescription>
            Заполните информацию о новости
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="news-title">Заголовок *</Label>
            <Input
              id="news-title"
              placeholder="Название новости"
              value={newsForm.title}
              onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
              className="bg-secondary border-border"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="news-content">Содержание *</Label>
            <Textarea
              id="news-content"
              placeholder="Текст новости..."
              value={newsForm.content}
              onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
              className="bg-secondary border-border min-h-[150px]"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 glow-red">
            {isEditing ? 'Сохранить изменения' : 'Опубликовать'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
