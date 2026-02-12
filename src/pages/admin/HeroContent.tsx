import { useState, useEffect } from "react";
import { useAdminHeroContent } from "@/hooks/useAdminData";
import { useHeroContentMutation } from "@/hooks/useSupabaseMutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import type { Database } from "@/types/database";

type HeroContent = Database["public"]["Tables"]["hero_content"]["Row"];

export default function HeroContentAdmin() {
  const { data: heroContent, isLoading } = useAdminHeroContent();
  const mutations = useHeroContentMutation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    tagline: "",
    heading: "",
    heading_highlight: "",
    description: "",
    primary_button_text: "",
    primary_button_link: "",
    secondary_button_text: "",
    secondary_button_link: "",
  });

  useEffect(() => {
    if (heroContent) {
      setFormData({
        tagline: heroContent.tagline || "",
        heading: heroContent.heading || "",
        heading_highlight: heroContent.heading_highlight || "",
        description: heroContent.description || "",
        primary_button_text: heroContent.primary_button_text || "",
        primary_button_link: heroContent.primary_button_link || "",
        secondary_button_text: heroContent.secondary_button_text || "",
        secondary_button_link: heroContent.secondary_button_link || "",
      });
    }
  }, [heroContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (heroContent) {
        await mutations.update.mutateAsync({
          id: heroContent.id,
          data: formData,
        });
      } else {
        await mutations.insert.mutateAsync(formData);
      }
      toast({ title: "Homepage banner saved successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Homepage Banner</h1>
        <p className="text-gray-600 mt-1">Edit the main hero section text and buttons</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g., Welcome to REMICCO"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heading">Heading</Label>
                <Input
                  id="heading"
                  value={formData.heading}
                  onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                  placeholder="Main heading text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heading_highlight">Heading Highlight</Label>
                <Input
                  id="heading_highlight"
                  value={formData.heading_highlight}
                  onChange={(e) => setFormData({ ...formData, heading_highlight: e.target.value })}
                  placeholder="Highlighted text portion"
                />
                <p className="text-xs text-gray-500">This text will be styled differently</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Hero section description"
                rows={3}
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Primary Button</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary_button_text">Button Text</Label>
                  <Input
                    id="primary_button_text"
                    value={formData.primary_button_text}
                    onChange={(e) => setFormData({ ...formData, primary_button_text: e.target.value })}
                    placeholder="e.g., Learn More"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary_button_link">Button Link</Label>
                  <Input
                    id="primary_button_link"
                    value={formData.primary_button_link}
                    onChange={(e) => setFormData({ ...formData, primary_button_link: e.target.value })}
                    placeholder="e.g., #about or /about"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Secondary Button</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secondary_button_text">Button Text</Label>
                  <Input
                    id="secondary_button_text"
                    value={formData.secondary_button_text}
                    onChange={(e) => setFormData({ ...formData, secondary_button_text: e.target.value })}
                    placeholder="e.g., Contact Us"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary_button_link">Button Link</Label>
                  <Input
                    id="secondary_button_link"
                    value={formData.secondary_button_link}
                    onChange={(e) => setFormData({ ...formData, secondary_button_link: e.target.value })}
                    placeholder="e.g., #contact or /contact"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={mutations.update.isPending || mutations.insert.isPending}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
