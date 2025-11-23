"use client";

import { IEvent, ICategory } from "@/types/global";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

interface InfoTabProps {
  event: IEvent;
  onUpdate: () => void;
}

export const InfoTab = ({ event, onUpdate }: InfoTabProps) => {
  const { register, handleSubmit, watch, setValue } = useForm<IEvent>({
    defaultValues: event,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(
    event.start_date ? new Date(event.start_date) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    event.end_date ? new Date(event.end_date) : undefined
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("category").select("id, name");
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: IEvent) => {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("event")
        .update({
          title: data.title,
          description: data.description,
          category_id: data.category_id,
          location: data.location,
          start_date: startDate?.toISOString(),
          end_date: endDate?.toISOString(),
          status: data.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", event.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Event berhasil diperbarui");
      onUpdate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Event Information</h3>
        <p className="text-sm text-gray-500 mb-6">Manage information of this event</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("title")}
              id="title"
              placeholder="Event name"
              className="py-5"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              {...register("title")}
              id="slug"
              placeholder="event-slug"
              className="py-5"
              disabled
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category_id">Category</Label>
            <Select
              value={watch("category_id") || ""}
              onValueChange={(val) => setValue("category_id", val)}
            >
              <SelectTrigger className="py-5 w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id || ""}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start_date">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="start_date"
                    className="w-full justify-between font-normal py-5"
                  >
                    {startDate ? startDate.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setStartDate(date);
                      setStartDateOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end_date">
                End Date <span className="text-red-500">*</span>
              </Label>
              <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="end_date"
                    className="w-full justify-between font-normal py-5"
                  >
                    {endDate ? endDate.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setEndDate(date);
                      setEndDateOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={watch("status") || "unpublished"}
              onValueChange={(val) => setValue("status", val)}
            >
              <SelectTrigger className="py-5 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="unpublished">Unpublished</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">
              Location <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("location")}
              id="location"
              placeholder="Event location"
              className="py-5"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register("description")}
              id="description"
              placeholder="Event description"
              className="resize-none"
              rows={4}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
};
