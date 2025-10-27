import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface NewsPost {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface NewsSectionProps {
  news: NewsPost[];
  isAdmin: boolean;
  onAddNews: () => void;
  onEditNews: (post: NewsPost) => void;
  onDeleteNews: (id: number) => void;
}

export function NewsSection({ news, isAdmin, onAddNews, onEditNews, onDeleteNews }: NewsSectionProps) {
  return (
    <section id="news">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Новости</h2>
          <p className="text-muted-foreground">Последние обновления и анонсы</p>
        </div>
        {isAdmin && (
          <Button onClick={onAddNews} className="bg-primary hover:bg-primary/90 glow-red">
            <Icon name="Plus" size={18} className="mr-2" />
            Добавить новость
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {news.map((post) => (
          <Card key={post.id} className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Icon name="Calendar" size={14} />
                    {post.date}
                  </CardDescription>
                </div>
                {isAdmin && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => onEditNews(post)}>
                      <Icon name="Pencil" size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteNews(post.id)}>
                      <Icon name="Trash2" size={16} className="text-destructive" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">
                {post.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
