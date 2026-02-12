import { useAdminHeroSlides, useAdminServices, useAdminNewsArticles, useAdminEvents, useAdminGalleryImages } from "@/hooks/useAdminData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, FileText, Calendar, Layers, Settings } from "lucide-react";

export default function Dashboard() {
  const { data: heroSlides } = useAdminHeroSlides();
  const { data: services } = useAdminServices();
  const { data: news } = useAdminNewsArticles();
  const { data: events } = useAdminEvents();
  const { data: gallery } = useAdminGalleryImages();

  const stats = [
    {
      title: "Homepage Slideshow",
      value: heroSlides?.length || 0,
      icon: Layers,
      color: "text-blue-600",
    },
    {
      title: "Services",
      value: services?.length || 0,
      icon: Settings,
      color: "text-green-600",
    },
    {
      title: "News Articles",
      value: news?.length || 0,
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Events",
      value: events?.length || 0,
      icon: Calendar,
      color: "text-orange-600",
    },
    {
      title: "Gallery Images",
      value: gallery?.length || 0,
      icon: Image,
      color: "text-pink-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to the REMICCO Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {news?.slice(0, 5).map((article) => (
                <div key={article.id} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
                  <FileText className="h-4 w-4 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-sm">{article.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(article.published_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!news || news.length === 0) && (
                <p className="text-gray-500 text-sm">No news articles yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events?.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
                  <Calendar className="h-4 w-4 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(event.event_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!events || events.length === 0) && (
                <p className="text-gray-500 text-sm">No upcoming events.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
