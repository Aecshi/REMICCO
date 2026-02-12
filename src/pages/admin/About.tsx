import { useState, useEffect } from "react";
import { useAdminAboutContent, useAdminHighlights, useAdminAwards } from "@/hooks/useAdminData";
import { useAboutContentMutation, useHighlightsMutation, useAwardsMutation } from "@/hooks/useSupabaseMutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/types/database";

type Highlight = Database["public"]["Tables"]["highlights"]["Row"];
type Award = Database["public"]["Tables"]["awards"]["Row"];

export default function AboutAdmin() {
  const { data: aboutContent, isLoading: aboutLoading } = useAdminAboutContent();
  const { data: highlights, isLoading: highlightsLoading } = useAdminHighlights();
  const { data: awards, isLoading: awardsLoading } = useAdminAwards();
  
  const aboutMutation = useAboutContentMutation();
  const highlightsMutation = useHighlightsMutation();
  const awardsMutation = useAwardsMutation();
  
  const { toast } = useToast();

  // About Content Form
  const [aboutForm, setAboutForm] = useState({
    section_tag: "",
    section_title: "",
    paragraphs: [""],
    quote_text: "",
    quote_author: "",
    citation_text: "",
    citation_url: "",
    vision_title: "",
    vision_text: "",
    mission_title: "",
    mission_text: "",
  });

  // Highlight Form
  const [highlightDialogOpen, setHighlightDialogOpen] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<Highlight | null>(null);
  const [highlightForm, setHighlightForm] = useState({
    text: "",
    order_index: 0,
  });
  const [deleteHighlightId, setDeleteHighlightId] = useState<string | null>(null);

  // Award Form
  const [awardDialogOpen, setAwardDialogOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [awardForm, setAwardForm] = useState({
    title: "",
    year: "",
    order_index: 0,
  });
  const [deleteAwardId, setDeleteAwardId] = useState<string | null>(null);

  useEffect(() => {
    if (aboutContent) {
      setAboutForm({
        section_tag: aboutContent.section_tag || "",
        section_title: aboutContent.section_title || "",
        paragraphs: aboutContent.paragraphs || [""],
        quote_text: aboutContent.quote_text || "",
        quote_author: aboutContent.quote_author || "",
        citation_text: aboutContent.citation_text || "",
        citation_url: aboutContent.citation_url || "",
        vision_title: aboutContent.vision_title || "",
        vision_text: aboutContent.vision_text || "",
        mission_title: aboutContent.mission_title || "",
        mission_text: aboutContent.mission_text || "",
      });
    }
  }, [aboutContent]);

  // About Content Handlers
  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (aboutContent) {
        await aboutMutation.update.mutateAsync({
          id: aboutContent.id,
          data: aboutForm,
        });
      } else {
        await aboutMutation.insert.mutateAsync(aboutForm);
      }
      toast({ title: "About content saved successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const addParagraph = () => {
    setAboutForm({
      ...aboutForm,
      paragraphs: [...aboutForm.paragraphs, ""],
    });
  };

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...aboutForm.paragraphs];
    newParagraphs[index] = value;
    setAboutForm({ ...aboutForm, paragraphs: newParagraphs });
  };

  const removeParagraph = (index: number) => {
    const newParagraphs = aboutForm.paragraphs.filter((_, i) => i !== index);
    setAboutForm({ ...aboutForm, paragraphs: newParagraphs });
  };

  // Highlight Handlers
  const openHighlightDialog = (highlight?: Highlight) => {
    if (highlight) {
      setEditingHighlight(highlight);
      setHighlightForm({
        text: highlight.text,
        order_index: highlight.order_index,
      });
    } else {
      setEditingHighlight(null);
      setHighlightForm({
        text: "",
        order_index: (highlights?.length || 0) + 1,
      });
    }
    setHighlightDialogOpen(true);
  };

  const handleSaveHighlight = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHighlight) {
        await highlightsMutation.update.mutateAsync({
          id: editingHighlight.id,
          data: highlightForm,
        });
        toast({ title: "Highlight updated successfully" });
      } else {
        await highlightsMutation.insert.mutateAsync(highlightForm);
        toast({ title: "Highlight created successfully" });
      }
      setHighlightDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleDeleteHighlight = async () => {
    if (!deleteHighlightId) return;
    try {
      await highlightsMutation.delete.mutateAsync(deleteHighlightId);
      toast({ title: "Highlight deleted successfully" });
      setDeleteHighlightId(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // Award Handlers
  const openAwardDialog = (award?: Award) => {
    if (award) {
      setEditingAward(award);
      setAwardForm({
        title: award.title,
        year: award.year,
        order_index: award.order_index,
      });
    } else {
      setEditingAward(null);
      setAwardForm({
        title: "",
        year: new Date().getFullYear().toString(),
        order_index: (awards?.length || 0) + 1,
      });
    }
    setAwardDialogOpen(true);
  };

  const handleSaveAward = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAward) {
        await awardsMutation.update.mutateAsync({
          id: editingAward.id,
          data: awardForm,
        });
        toast({ title: "Award updated successfully" });
      } else {
        await awardsMutation.insert.mutateAsync(awardForm);
        toast({ title: "Award created successfully" });
      }
      setAwardDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAward = async () => {
    if (!deleteAwardId) return;
    try {
      await awardsMutation.delete.mutateAsync(deleteAwardId);
      toast({ title: "Award deleted successfully" });
      setDeleteAwardId(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (aboutLoading || highlightsLoading || awardsLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        <p className="text-gray-600 mt-1">Manage the About Us section content</p>
      </div>

      <Tabs defaultValue="content">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About Content</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAbout} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="section_tag">Section Tag</Label>
                    <Input
                      id="section_tag"
                      value={aboutForm.section_tag}
                      onChange={(e) => setAboutForm({ ...aboutForm, section_tag: e.target.value })}
                      placeholder="e.g., About Us"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section_title">Section Title</Label>
                    <Input
                      id="section_title"
                      value={aboutForm.section_title}
                      onChange={(e) => setAboutForm({ ...aboutForm, section_title: e.target.value })}
                      placeholder="Main section title"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Paragraphs</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addParagraph}>
                      <Plus className="h-4 w-4 mr-1" /> Add Paragraph
                    </Button>
                  </div>
                  {aboutForm.paragraphs.map((paragraph, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={paragraph}
                        onChange={(e) => updateParagraph(index, e.target.value)}
                        placeholder={`Paragraph ${index + 1}`}
                        rows={3}
                        className="flex-1"
                      />
                      {aboutForm.paragraphs.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeParagraph(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Quote Section</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="quote_text">Quote Text</Label>
                      <Textarea
                        id="quote_text"
                        value={aboutForm.quote_text}
                        onChange={(e) => setAboutForm({ ...aboutForm, quote_text: e.target.value })}
                        placeholder="Enter a quote"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote_author">Quote Author</Label>
                      <Input
                        id="quote_author"
                        value={aboutForm.quote_author}
                        onChange={(e) => setAboutForm({ ...aboutForm, quote_author: e.target.value })}
                        placeholder="Author name"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Citation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="citation_text">Citation Text</Label>
                      <Input
                        id="citation_text"
                        value={aboutForm.citation_text}
                        onChange={(e) => setAboutForm({ ...aboutForm, citation_text: e.target.value })}
                        placeholder="e.g., Learn more"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="citation_url">Citation URL</Label>
                      <Input
                        id="citation_url"
                        value={aboutForm.citation_url}
                        onChange={(e) => setAboutForm({ ...aboutForm, citation_url: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Vision</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vision_title">Vision Title</Label>
                      <Input
                        id="vision_title"
                        value={aboutForm.vision_title}
                        onChange={(e) => setAboutForm({ ...aboutForm, vision_title: e.target.value })}
                        placeholder="e.g., Our Vision"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vision_text">Vision Text</Label>
                      <Textarea
                        id="vision_text"
                        value={aboutForm.vision_text}
                        onChange={(e) => setAboutForm({ ...aboutForm, vision_text: e.target.value })}
                        placeholder="Enter vision statement"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Mission</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mission_title">Mission Title</Label>
                      <Input
                        id="mission_title"
                        value={aboutForm.mission_title}
                        onChange={(e) => setAboutForm({ ...aboutForm, mission_title: e.target.value })}
                        placeholder="e.g., Our Mission"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mission_text">Mission Text</Label>
                      <Textarea
                        id="mission_text"
                        value={aboutForm.mission_text}
                        onChange={(e) => setAboutForm({ ...aboutForm, mission_text: e.target.value })}
                        placeholder="Enter mission statement"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={aboutMutation.update.isPending || aboutMutation.insert.isPending}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="highlights" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Highlights</CardTitle>
              <Dialog open={highlightDialogOpen} onOpenChange={setHighlightDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => openHighlightDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Highlight
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingHighlight ? "Edit Highlight" : "Add New Highlight"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSaveHighlight} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="highlight_text">Highlight Text</Label>
                      <Textarea
                        id="highlight_text"
                        value={highlightForm.text}
                        onChange={(e) => setHighlightForm({ ...highlightForm, text: e.target.value })}
                        placeholder="Enter highlight text"
                        rows={3}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="highlight_order">Order</Label>
                      <Input
                        id="highlight_order"
                        type="number"
                        value={highlightForm.order_index}
                        onChange={(e) => setHighlightForm({ ...highlightForm, order_index: parseInt(e.target.value) || 0 })}
                        min={0}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setHighlightDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingHighlight ? "Update" : "Create"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {highlights?.map((highlight) => (
                  <div key={highlight.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">#{highlight.order_index}</span>
                      <span className="text-gray-700">{highlight.text}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openHighlightDialog(highlight)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteHighlightId(highlight.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
                {(!highlights || highlights.length === 0) && (
                  <p className="text-center text-gray-500 py-8">No highlights yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="awards" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Awards</CardTitle>
              <Dialog open={awardDialogOpen} onOpenChange={setAwardDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => openAwardDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Award
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingAward ? "Edit Award" : "Add New Award"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSaveAward} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="award_title">Title</Label>
                      <Input
                        id="award_title"
                        value={awardForm.title}
                        onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })}
                        placeholder="Award title"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="award_year">Year</Label>
                      <Input
                        id="award_year"
                        value={awardForm.year}
                        onChange={(e) => setAwardForm({ ...awardForm, year: e.target.value })}
                        placeholder="e.g., 2024"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="award_order">Order</Label>
                      <Input
                        id="award_order"
                        type="number"
                        value={awardForm.order_index}
                        onChange={(e) => setAwardForm({ ...awardForm, order_index: parseInt(e.target.value) || 0 })}
                        min={0}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setAwardDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingAward ? "Update" : "Create"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {awards?.map((award) => (
                  <div key={award.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">#{award.order_index}</span>
                      <div>
                        <p className="font-medium">{award.title}</p>
                        <p className="text-sm text-gray-500">{award.year}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openAwardDialog(award)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteAwardId(award.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
                {(!awards || awards.length === 0) && (
                  <p className="text-center text-gray-500 py-8">No awards yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Highlight Dialog */}
      <AlertDialog open={!!deleteHighlightId} onOpenChange={() => setDeleteHighlightId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Highlight</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this highlight? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteHighlight} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Award Dialog */}
      <AlertDialog open={!!deleteAwardId} onOpenChange={() => setDeleteAwardId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Award</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this award? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAward} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
