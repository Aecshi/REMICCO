import { useState, useEffect } from "react";
import { useAdminContactInfo } from "@/hooks/useAdminData";
import { useContactInfoMutation } from "@/hooks/useSupabaseMutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";
import type { Database } from "@/types/database";

type ContactInfo = Database["public"]["Tables"]["contact_info"]["Row"];

export default function ContactAdmin() {
  const { data: contactInfo, isLoading } = useAdminContactInfo();
  const mutations = useContactInfoMutation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    email: "",
    facebook_url: "",
    office_hours: [""],
  });

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        address: contactInfo.address || "",
        phone: contactInfo.phone || "",
        email: contactInfo.email || "",
        facebook_url: contactInfo.facebook_url || "",
        office_hours: contactInfo.office_hours?.length ? contactInfo.office_hours : [""],
      });
    }
  }, [contactInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Filter out empty office hours
      const dataToSave = {
        ...formData,
        office_hours: formData.office_hours.filter(h => h.trim() !== ""),
      };

      if (contactInfo) {
        await mutations.update.mutateAsync({
          id: contactInfo.id,
          data: dataToSave,
        });
      } else {
        await mutations.insert.mutateAsync(dataToSave);
      }
      toast({ title: "Contact information saved successfully" });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const addOfficeHour = () => {
    setFormData({
      ...formData,
      office_hours: [...formData.office_hours, ""],
    });
  };

  const updateOfficeHour = (index: number, value: string) => {
    const newHours = [...formData.office_hours];
    newHours[index] = value;
    setFormData({ ...formData, office_hours: newHours });
  };

  const removeOfficeHour = (index: number) => {
    const newHours = formData.office_hours.filter((_, i) => i !== index);
    setFormData({ ...formData, office_hours: newHours.length ? newHours : [""] });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Information</h1>
        <p className="text-gray-600 mt-1">Manage contact details and social links</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Full office address"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g., (123) 456-7890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@example.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Office Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Office Hours</Label>
                <Button type="button" variant="outline" size="sm" onClick={addOfficeHour}>
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              {formData.office_hours.map((hour, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={hour}
                    onChange={(e) => updateOfficeHour(index, e.target.value)}
                    placeholder="e.g., Monday - Friday: 8:00 AM - 5:00 PM"
                    className="flex-1"
                  />
                  {formData.office_hours.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOfficeHour(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input
                id="facebook_url"
                value={formData.facebook_url}
                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                placeholder="https://facebook.com/..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={mutations.update.isPending || mutations.insert.isPending}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
