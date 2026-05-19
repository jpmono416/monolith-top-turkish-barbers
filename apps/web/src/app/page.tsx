import { APP_NAME } from '@monolith/config';
import { Button } from '@monolith/ui';
import { getApiHealth } from '@/lib/api';

export default async function HomePage() {
  const health = await getApiHealth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">{APP_NAME}</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          AI-Native Engineering Platform
        </p>
      </div>
      <div className="bg-card text-card-foreground rounded-lg border p-4 text-sm">
        <p>
          API status:{' '}
          <span className="font-mono">{health?.status ?? 'unavailable'}</span>
        </p>
      </div>
      <Button>Get started</Button>
    </main>
  );
}
