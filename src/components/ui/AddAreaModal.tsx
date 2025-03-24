import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddAreaModalProps {
  onAreaAdded: (newArea: { id: string; name: string }) => void;
}

export default function AddAreaModal({ onAreaAdded }: AddAreaModalProps) {
  const [newArea, setNewArea] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddArea = async () => {
    if (!newArea.trim()) return;

    // Simulate API call to add new area
    const response = await fetch("/api/area", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newArea }),
    });

    if (response.ok) {
      const addedArea = await response.json();
      onAreaAdded(addedArea); // Pass new area to parent
      setNewArea("");
      setOpen(false); // Close modal
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Area</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Area</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Label>Area Name</Label>
          <Input
            type="text"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder="Enter area name"
          />
          <Button onClick={handleAddArea}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}