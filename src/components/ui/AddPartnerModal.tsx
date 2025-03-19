"use client";

import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { IDeliveryPartner } from "@/types/partner";

interface PartnerFormModalProps {
  partner: IDeliveryPartner | null;
  onSubmit: (data: IDeliveryPartner) => void;
}

export const AddPartnerModal = ({ partner, onSubmit }: PartnerFormModalProps) => {
  const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/area")
      .then((res) => res.json())
      .then((data) => {
        setAreas(Array.isArray(data.data) ? data.data : []);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching areas:", err);
        setIsLoaded(true);
      });
  }, [open]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
  } = useForm<IDeliveryPartner>({
    defaultValues: {
      name: partner?.name || "",
      email: partner?.email || "",
      phone: partner?.phone || "",
      status: partner?.status || "inactive",
      areas: partner?.areas || [],
      shift: {
        start: partner?.shift?.start || "",
        end: partner?.shift?.end || "",
      },
    },
  });

  useEffect(() => {
    if (partner) {
      Object.entries(partner).forEach(([key, value]) => {
        if (key !== "_id") {
          setValue(key as keyof Omit<IDeliveryPartner, "_id">, value);
        }
      });
    }
  }, [partner, setValue]);

  const handleFormSubmit = (data: IDeliveryPartner) => {
    onSubmit(data);
    reset();
    setOpen(false);
  };

  const areaOptions = areas.map((area) => ({
    value: area.name,
    label: area.name,
  }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{partner ? "Edit Partner" : "Add New Partner"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{partner ? "Edit Partner" : "Add New Partner"}</DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input type="text" {...register("name")} placeholder="Enter name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" {...register("email")} placeholder="Enter email" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input type="text" {...register("phone")} placeholder="Enter phone number" />
              </div>
              <div>
                <Label>Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <select {...field} className="border p-2 w-full rounded">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  )}
                />
              </div>
              <div>
                <Label>Areas</Label>
                {isLoaded ? (
                  <Controller
                    control={control}
                    name="areas"
                    render={({ field }) => (
                      <Select
                        key={areaOptions.length}
                        {...field}
                        isMulti
                        options={areaOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selectedOptions) =>
                          // Pass array of { _id, name } objects instead of IDs
                          field.onChange(
                            selectedOptions.map((option) => ({
                              _id: option.value, // Assuming option.value is the _id
                              name: option.label, // Assuming option.label is the name
                            }))
                          )
                        }
                        value={areaOptions.filter((option) =>
                          // Check if the option's value (id) exists in field.value's _id array
                          field.value.some((item) => item._id === option.value)
                        )}
                      />
                    )}
                  />
                ) : (
                  <p>Loading areas...</p>
                )}
              </div>
              <div>
                <Label>Shift Start</Label>
                <Input type="time" {...register("shift.start")} />
              </div>
              <div>
                <Label>Shift End</Label>
                <Input type="time" {...register("shift.end")} />
              </div>
              <Button type="submit" className="w-full">
                {partner ? "Update Partner" : "Add Partner"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
