"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { IEvent, ICategory } from "@/types/global";
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
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface CreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<IEvent>;
  onSubmit: (data: IEvent) => Promise<void>;
  onImageChange: (file: File | null) => void;
  preview: string | null;
  isLoading: boolean;
}

const CreateDialog = ({
  open,
  onOpenChange,
  form,
  onSubmit,
  onImageChange,
  preview,
  isLoading,
}: CreateDialogProps) => {
  const { register, handleSubmit, setValue } = form;
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("category").select("id, name");
      if (data) setCategories(data as ICategory[]);
    };
    fetchCategories();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-primary">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle>Tambah Event Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">
                  Judul Event <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("title")}
                  className="py-5"
                  id="title"
                  placeholder="Masukkan Judul Event"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category_id">Kategori</Label>
                <Select
                  onValueChange={(val) => form.setValue("category_id", val)}
                >
                  <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="Pilih Kategori" />
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

              <div className="grid gap-2">
                <Label htmlFor="location">
                  Lokasi <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("location")}
                  className="py-5"
                  id="location"
                  placeholder="Masukkan Lokasi Event"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start_date">
                    Tanggal Mulai <span className="text-red-500">*</span>
                  </Label>
                  <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="start_date"
                        className="w-full justify-between font-normal py-5"
                      >
                        {startDate
                          ? startDate.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={startDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setStartDate(date);
                          setValue("start_date", date?.toISOString() || "");
                          setStartDateOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end_date">
                    Tanggal Selesai <span className="text-red-500">*</span>
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
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={endDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setEndDate(date);
                          setValue("end_date", date?.toISOString() || "");
                          setEndDateOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  {...register("description")}
                  id="description"
                  placeholder="Deskripsi Event"
                  className="resize-none"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label>Banner Image</Label>
                <div className="relative">
                  {preview ? (
                    <div className="relative w-full h-48 rounded-md border-2 border-dashed overflow-hidden">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => onImageChange(null)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="w-full h-48 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400 transition">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">
                            Click to upload file here
                          </span>
                        </p>
                      </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          onImageChange(e.target.files?.[0] ?? null)
                        }
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
