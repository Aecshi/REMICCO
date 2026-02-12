import { Calendar, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEvents } from '@/hooks/useSupabaseData';

export function NewsTicker() {
  const { data: events, isLoading } = useEvents();

  if (isLoading) {
    return (
      <section className="bg-card py-6 border-b border-border">
        <div className="container flex justify-center">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      </section>
    );
  }

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <section className="bg-card py-6 border-b border-border">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Label */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-bold uppercase rounded">
                Upcoming
              </span>
            </div>
            <span className="font-bold text-foreground text-lg uppercase tracking-wide">
              Event Updates
            </span>
          </div>

          {/* Events list */}
          <div className="flex-1 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              {events.map((event, index) => (
                <div key={event.id} className="flex items-start gap-3 shrink-0">
                  <div className="flex flex-col">
                    <h4 className="font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{event.date_display}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                  {index < events.length - 1 && (
                    <div className="hidden md:block w-px h-10 bg-border ml-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button variant="default" className="shrink-0 bg-primary hover:bg-primary/90">
            All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
